import axios, { AxiosProgressEvent } from "axios";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { ResType } from "../../Models/ResType";
import styled from "styled-components";
import { Post } from "../../Models/Post";
import Modal from "../../Common/Modal";
import ProgressBar from "@ramonak/react-progress-bar";
import { useNavigate } from "react-router-dom";

const PostBox = styled.div`
    height: 100%;
    padding-top: 100px;
    padding-left: 150px;
    padding-right: 150px;

    div.title_box {
        margin-bottom: 14px;
        input.title {
            width: 99.7%;
            height: 58px;
            background-color: #FBFBFB;
            border: 1px solid #DCDCDC;
            font-size: 20px;
            color: #797979;
            padding-left: 5px;
        }
    }

    div.attach_box {
        display: flex;
        justify-content: space-between;

        div.box1 {

            p.help {
                margin-top: 6px;
                font-size: 12px;
                color: #BDBDBD;
            }
        }

        div.box2 {
            display: flex;
            align-items: center;

            img {
                width: 18px;
                height: 18px;
                margin-right: 7px;
            }

            div.file_list {
                display: flex;
                gap: 15px;

                p {
                    line-height: 20px;
                    font-size: 20px;
                    font-weight: 300;
                    text-decoration: underline #383838 1px;
                    color: #383838;
                    cursor: pointer;
                }
            }
        }

        div.upload {
            width: 111px;
            height: 34px;
            border: 1px solid #BEBEBE;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            cursor: pointer;

            p {
                font-size: 20px;
                color: #696969;
                line-height: 20px;

            }

            img {
                width: 24px;
                height: 24px;
            }
        }
    }

    div.content {
        margin-top: 10px;

        textarea.content {
            width: 99.3%;
            height: 500px;
            background-color: #FBFBFB;
            border: 1px solid #DCDCDC;
            font-size: 20px;
            color: #797979;
            padding: 5px;

        }
    }

    div.save_box {
        width: 100%;
        display: flex;
        justify-content: right;
        margin-top: 15px;

        div.save {
            width: 81px;
            height: 34px;
            border: 1px solid #BEBEBE;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            cursor: pointer;
    
            p {
                font-size: 20px;
                color: #696969;
                line-height: 20px;
    
            }
    
            img {
                width: 24px;
                height: 24px;
            }
        }
    }
`;

const Divider = styled.hr`
    width: 100%;
`;

const ProgressStyle = styled.div`
    display: flex;
    padding-left: 20px;
    padding-right: 20px;
    align-items: center;


    & > div {
        width: 100%;
    }

    .p_container {
        margin-top: 10px;
        width: 100%;  
    }
`;

const PostEditPage = () => {

    const navigate = useNavigate();
    
    const fileRef = useRef<HTMLInputElement>(null);
    const [files, setFiles] = useState<Array<File>>([]);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [progress, setProgress] = useState(0);
    const [isUploading, setUploading] = useState(false);

    const onUploadClick = () => {
        fileRef.current?.click();
    }

    const onUploadChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFiles(files.concat(Array.from(e.target.files!!)))
    }

    const onFileClick = (fileName: string) => {
        setFiles(files.filter(file => file.name != fileName));
    }

    const onTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    }

    const onContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setContent(e.target.value);
    }

    const onUploadingProgress = (e: AxiosProgressEvent) => {
        setUploading(true);
        if(e.total != undefined) {
            const percent = Math.round(e.loaded / e.total * 100);
            setProgress(percent)
            console.log(percent);
        }
    }

    const onSaveClick = async () => {
        if(title === "" || content === "") {
            alert("내용을 작성해주세요.");
            return;
        }

        const data: {[key: string]: any} = {
            "title": title,
            "content": content,
        };
        if(files.length > 0) {
            const formData = new FormData();
            files.forEach(file => formData.append("file", file))

            const fileReq = await axios.post("/api/posts/file", formData, {headers: {"Content-Type": "multipart/form-data"}, onUploadProgress: onUploadingProgress});
            const result = ResType.fromJson(fileReq.data);
            data["attaches"] = result.result;
            // const fileRes = ResType.fromJson((await axios.post("/api/posts/file", formData, {headers: {"Content-Type": "multipart/form-data"}})).data);
            // fileNames = fileRes.result;
        }

        axios.post("/api/posts", JSON.stringify(data), {headers: {"Content-Type": "application/json"}}).then(res => {
            setUploading(false);
            const result = ResType.fromJson(res.data);
            navigate(`/post/${result.result}`)
        });
        
        
        
    }
    
    return(
        <div>
            <PostBox>
                <div className="title_box">
                    <input className="title" type="text" placeholder="제목" onChange={onTitleChange} />
                </div>
                <Divider />
                <div className="attach_box">
                    <div className="box1">
                        <div className="box2">
                            <img src="imgs/attach.png" alt="attach" />
                            <div className="file_list">
                                {files.map((file => {
                                    return <p className="file" key={file.name} onClick={() => onFileClick(file.name)}>{file.name}</p>
                                }))}
                            </div>
                        </div>
                        <p className="help">첨부파일을 삭제하시려면 파일 이름을 누르세요.</p>
                    </div>
                    <div className="upload" onClick={onUploadClick}>
                        <p>업로드</p>
                        <img src="/imgs/upload.svg" alt="upload" />
                        <input type="file" className="file_upload" multiple={true} ref={fileRef} onChange={onUploadChange} hidden />
                    </div>
                </div>
                <div className="content">
                    <textarea className="content" placeholder="내용" onChange={onContentChange} />
                </div>
                <div className="save_box">
                    <div className="save" onClick={onSaveClick}>
                        <p>저장</p>
                        <img src="/imgs/save.svg" alt="save" />
                    </div>
                </div>
            </PostBox>
            {isUploading && 
                <Modal width={300} height={100}>
                    <ProgressStyle>
                        <div>
                            <p>Uploading..</p>
                            <ProgressBar completed={progress} className="p_container" maxCompleted={100} transitionDuration="0.1s" isLabelVisible={false}/>
                        </div>
                    </ProgressStyle>
                </Modal>
            }
        </div>
    )
}

export default PostEditPage;