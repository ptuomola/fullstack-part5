import React from 'react'
import { useField, filterAttr } from '../hooks'
import PropTypes from 'prop-types'

const CreateBlog = ({ handleCreate }) =>
{
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')

  const submitNewNote = async (event) => {
    event.preventDefault()
    handleCreate(title.value, author.value, url.value)
    title.reset()
    author.reset()
    url.reset()
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={submitNewNote}>
        <div>
          title:
          <input {...filterAttr(title)} />
        </div>
        <div>
          author:
          <input {...filterAttr(author)} />
        </div>
        <div>
          url:
          <input {...filterAttr(url)} />
        </div>

        <button type="submit">create</button>
      </form>
    </div>
  )
}

CreateBlog.propTypes = {
  handleCreate: PropTypes.func.isRequired,
}


export default CreateBlog