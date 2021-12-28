import React from "react";
import style from "./post.module.css" 

const Post = ({ post }) => {
  return (
    <div className={style.post}>
      <img src={post.cover} alt={post.title} />
      <div className={style.postContent}>
        <h2>{post.title}</h2>
        <p>{post.body}</p>
      </div>
    </div>
  );
};

export default Post;
