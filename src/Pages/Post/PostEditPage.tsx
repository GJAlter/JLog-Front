import axios, { AxiosProgressEvent } from "axios";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { ResType } from "../../Models/ResType";
import styled from "styled-components";
import { Post } from "../../Models/Post";
import Modal from "../../Common/Modal";
import ProgressBar from "@ramonak/react-progress-bar";
import { useNavigate, useLocation } from "react-router-dom";
import { getFileName } from "../../Common/Util";

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
            background-color: #fbfbfb;
            border: 1px solid #dcdcdc;
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
                color: #bdbdbd;
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
            border: 1px solid #bebebe;
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
            background-color: #fbfbfb;
            border: 1px solid #dcdcdc;
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
        margin-bottom: 50px;

        div.save {
            width: 81px;
            height: 34px;
            border: 1px solid #bebebe;
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
    const location = useLocation();

    const post: Post = location.state?.post;
    const fileRef = useRef<HTMLInputElement>(null);

    const [defaultFiles, setDefaultFiles] = useState<Array<string>>([]);
    const [files, setFiles] = useState<Array<File>>([]);
    const [deleteFiles, setDeleteFiles] = useState<Array<string>>([]);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [progress, setProgress] = useState(0);
    const [isUploading, setUploading] = useState(false);

    useEffect(() => {
        if (post != undefined) {
            setTitle(post.title);
            setContent(post.content);
            setDefaultFiles(post.attaches ?? []);
        }
    }, [post]);

    const onUploadClick = () => {
        fileRef.current?.click();
    };

    const onUploadChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (defaultFiles.length + files.length > 2 || defaultFiles.length + e.target.files!!.length > 3) {
            alert("파일은 최대 3개까지 업로드 가능합니다.");
            return;
        }
        setFiles(files.concat(Array.from(e.target.files!!)));
    };

    const onDefaultFileClick = (fileName: string) => {
        setDefaultFiles(defaultFiles.filter((file) => file != fileName));
    };

    const onFileClick = (fileName: string) => {
        if (defaultFiles.indexOf(fileName) > -1) {
            setDeleteFiles([...deleteFiles, fileName]);
        }
        setFiles(files.filter((file) => file.name != fileName));
    };

    const onTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const onContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setContent(e.target.value);
    };

    const onUploadingProgress = (e: AxiosProgressEvent) => {
        setUploading(true);
        if (e.total != undefined) {
            const percent = Math.round((e.loaded / e.total) * 100);
            setProgress(percent);
        }
    };

    const onSaveClick = async () => {
        if (title === "" || content === "") {
            alert("내용을 작성해주세요.");
            return;
        }

        const data: { [key: string]: any } = {
            title: title,
            content: content,
        };

        if (files.length > 0) {
            const formData = new FormData();
            files.forEach((file) => formData.append("file", file));

            const fileReq = await axios.post("/api/posts/file", formData, { headers: { "Content-Type": "multipart/form-data" }, onUploadProgress: onUploadingProgress });
            const result = ResType.fromJson(fileReq.data);
            data["attaches"] = result.result;
        }

        const sendReq = async (): Promise<ResType> => {
            if (post != undefined) {
                if (deleteFiles.length > 0) {
                    await axios.delete(`/api/posts/${post.id}/file`, { data: JSON.stringify(defaultFiles), headers: { "Content-Type": "application/json" } });
                }
                const newFiles = defaultFiles.filter((file) => deleteFiles.indexOf(file) == -1);
                console.log(defaultFiles);
                if (data["attaches"] == null) {
                    data["attaches"] = newFiles;
                } else {
                    data["attaches"] = [...newFiles, ...data["attaches"]];
                }
                console.log(data["attaches"]);
                return ResType.fromJson((await axios.patch(`/api/posts/${post.id}`, JSON.stringify(data), { headers: { "Content-Type": "application/json" } })).data);
            }
            return ResType.fromJson((await axios.post("/api/posts", JSON.stringify(data), { headers: { "Content-Type": "application/json" } })).data);
        };

        sendReq().then((result) => {
            setUploading(false);
            navigate(`/post/${result.result}`);
        });
    };

    return (
        <div>
            <PostBox>
                <div className="title_box">
                    <input className="title" type="text" placeholder="제목" onChange={onTitleChange} value={title} />
                </div>
                <Divider />
                <div className="attach_box">
                    <div className="box1">
                        <div className="box2">
                            <img src="imgs/attach.png" alt="attach" />
                            <div className="file_list">
                                {defaultFiles?.map((file) => {
                                    return (
                                        <p className="file" key={file} onClick={() => onDefaultFileClick(file)}>
                                            {getFileName(file)}
                                        </p>
                                    );
                                })}
                                {files.map((file) => {
                                    return (
                                        <p className="file" key={file.name} onClick={() => onFileClick(file.name)}>
                                            {getFileName(file.name)}
                                        </p>
                                    );
                                })}
                            </div>
                        </div>
                        <p className="help">첨부파일을 삭제하시려면 파일 이름을 누르세요.</p>
                    </div>
                    <div className="upload" onClick={onUploadClick}>
                        <p>업로드</p>
                        <img src={`${process.env.PUBLIC_URL}/imgs/upload.svg`} alt="upload" />
                        <input type="file" className="file_upload" multiple={true} ref={fileRef} onChange={onUploadChange} hidden />
                    </div>
                </div>
                <div className="content">
                    <textarea className="content" placeholder="내용" onChange={onContentChange} value={content} />
                </div>
                <div className="save_box">
                    <div className="save" onClick={onSaveClick}>
                        <p>저장</p>
                        <img src={`${process.env.PUBLIC_URL}/imgs/save.svg`} alt="save" />
                    </div>
                </div>
            </PostBox>
            {isUploading && (
                <Modal width={300} height={100}>
                    <ProgressStyle>
                        <div>
                            <p>Uploading..</p>
                            <ProgressBar completed={progress} className="p_container" maxCompleted={100} transitionDuration="0.1s" isLabelVisible={false} />
                        </div>
                    </ProgressStyle>
                </Modal>
            )}
        </div>
    );
};

export default PostEditPage;
