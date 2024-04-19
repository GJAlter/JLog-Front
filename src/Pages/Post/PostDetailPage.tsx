import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ResType } from "../../Models/ResType";
import styled from "styled-components";
import { Post } from "../../Models/Post";

const PostBox = styled.div`
    // width: 100%;
    height: 100%;
    padding-top: 100px;
    padding-bottom: 100px;
    padding-left: 150px;
    padding-right: 150px;

    div.title_box {
        display:flex;
        align-items: center;
        justify-content: space-between;

        div.left {
            display: flex;
            align-items: center;
        }

        p.title {
            font-size: 35px;
        }

        img {
            width: 36px;
            height: 36px;
            margin-top: 5px;
            margin-left: 34px;
        }

        img:hover {
            cursor: pointer;
        }

        p.modified_date {
            font-size: 15px;
            color: #484848;
        }
    }

    div.attach_box {
        display: flex;
        align-items: center;
        margin-top: 6px;
        
        img {
            width: 18px;
            height: 18px;
            margin-right: 7px;
        }

        div.file_list {
            display: flex;
            align-items: center;
            gap: 15px;
        }

        p {
            line-height: 20px;
            font-size: 20px;
            font-weight: 300;
            text-decoration: underline #383838 1px;
            color: #383838;
            cursor: pointer;
        }
    }

    p.content {
        margin-top: 33px;
        white-space: normal;
        word-wrap: break-word;
    }
`

const Divider = styled.hr`
    width: 100%;
    margin-top: 10px;
`;

const PostDetailPage = () => {

    const { id } = useParams();
    const [post, setPost] = useState<Post>();

    useEffect(() => {
        axios.get(`/api/posts/${id}`).then(res => {
            const result = ResType.fromJson(res.data);
            console.log(result);
            setPost(Post.fromJson(result.result));
        })
    }, []);
    
    return(
        <PostBox>
            <div className="title_box">
                <div className="left">
                    <p className="title">{post?.title}</p>
                    <img src="imgs/edit.png" alt="edit_post" />
                </div>
                <p className="modified_date">{post?.modifiedDatetime.toString().split("T")[0]}</p>
            </div>
            <Divider />
            {post?.attaches != null && 
                <div className="attach_box">
                    <img src="imgs/attach.png" alt="attach" />
                    <div className="file_list">
                        {post.attaches?.map((attach => {
                            return <p className="file">{attach}</p>
                        }))}
                    </div>
                </div>
            }
            <p className="content">{post?.content}</p>
        </PostBox>
    )
}

export default PostDetailPage;