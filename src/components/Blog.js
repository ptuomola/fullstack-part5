import React, { useState } from 'react'

import PropTypes from 'prop-types'

const Blog = ({ blog, handleLike, handleRemove, user }) => {
  const [showDetail, setShowDetail] = useState(false)

  const toggleDetail = () => {
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
      <div className="clickableRow" onClick={() => toggleDetail()}>
        {blog.title} {blog.author}
        { showDetail ?
          <div>
            <a href={blog.url}>{blog.url}</a><br/>
            {blog.likes} likes <button onClick={(event) => handleLike(blog, event)}>like</button><br/>
            added by {blog.user.name}<br/>
            { user.username === blog.user.username ?
              <button onClick={(event) => handleRemove(blog, event)}>remove</button>
              : '' }
          </div>
          : <div></div>
        }
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleLike: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}

export default Blog