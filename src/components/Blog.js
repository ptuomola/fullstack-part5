import React, { useState } from 'react'

const Blog = ({ blog, handleLike}) => {
  const [showDetail, setShowDetail] = useState(false)

  const toggleDetail = (event) => {
      setShowDetail(!showDetail)
  }


  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      <div onClick={(event) => toggleDetail(event)}>
        {blog.title} {blog.author}
        { showDetail ? 
        <div>
          <a href={blog.url}>{blog.url}</a><br/>
          {blog.likes} likes <button onClick={(event) => handleLike(blog, event)}>like</button><br/>
          added by {blog.user.name}
        </div>
        : <div></div>
        }
      </div>
    </div>
  )
}  

export default Blog