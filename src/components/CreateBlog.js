import React, { useState } from 'react'

const CreateBlog = ({handleCreate}) => 
{
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setURL] = useState('')

  const submitNewNote = async (event) => {
    event.preventDefault()
    
    handleCreate(title, author, url)
    setTitle('')
    setAuthor('')
    setURL('')
  }

  return (  
    <div>
      <h2>create new</h2>
      <form onSubmit={submitNewNote}>
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