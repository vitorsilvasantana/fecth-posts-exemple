import React from 'react'
import Post from '../Post'
import style from "./posts.module.css"

const Posts = ({ posts }) => {
  return (
    <div className={style.posts}>
    {posts.map((post) => (
      <Post post={post} key={post.id} />
    ))}
  </div>
  )
}

export default Posts
