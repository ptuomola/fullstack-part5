import React, { useState } from 'react'

import blogService from '../services/blogs'

const CreateBlog = ({blogs, setBlogs}) => 
{
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setURL] = useState('')

  const handleCreate = async (event) => {
    event.preventDefault()
    try {
      const newBlog = await blogService.create({
        title, author, url,
      })

      setTitle('')
      setAuthor('')
      setURL('')
      setBlogs(blogs.concat(newBlog))
    } catch (exception) {
//      setErrorMessage('create failed')
      console.log(exception)
//      setTimeout(() => {
//        setErrorMessage(null)
//      }, 5000)
    }
  }

  return (  
    <div>
      <h2>create new</h2>
      <form onSubmit={handleCreate}>
        <div>
          title:
            <input
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
            <input
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
            <input
            type="text"
            value={url}
            name="Url"
            onChange={({ target }) => setURL(target.value)}
          />
        </div>

        <button type="submit">create</button>
      </form>
    </div>      
  )
}

export default CreateBlog