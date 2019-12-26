import React, { useState, useEffect } from 'react';
import Blog from './components/Blog'
import CreateBlog from './components/CreateBlog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import loginService from './services/login'
import blogService from './services/blogs'

const App = (props) => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [isError, setIsError] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    blogService
      .getAll()
      .then(initialBlogs => {
        setBlogs(initialBlogs)
      })
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      ) 

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setIsError(false)
      setErrorMessage('login successful')
    } catch (exception) {
      setIsError(true)
      setErrorMessage('wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const newNoteRef = React.createRef()

  const handleCreate = async (title, author, url) => {
    try
    {
      const newBlog = await blogService.create({
        title, author, url,
      })

      newNoteRef.current.toggleVisibility()

      setBlogs(blogs.concat(newBlog))

      setIsError(false)
      setErrorMessage(`a new blog ${title} by ${author} added`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
     
    } catch (exception) {
      setIsError(true)
      setErrorMessage('create failed')
      console.log(exception)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async(event) =>
  {
    event.preventDefault()
    setUser(null)
    blogService.setToken(null)
    window.localStorage.removeItem('loggedBlogappUser')
    setIsError(false)
    setErrorMessage('logged out')
  }

  const loginForm = () => (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
            <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
            <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>      
  )

  const handleLike = async(blog, event) => {
    event.stopPropagation()
    blog.likes++
    await blogService.update(blog)
    setBlogs(blogs.map(i => i.id === blog.id ? blog : i))
  }

  const handleRemove = async(blog, event) => {
    event.stopPropagation()

    if(!window.confirm("remove blog " + blog.title + " by " + blog.author))
      return

    try 
    {
      await blogService.remove(blog)
      setBlogs(blogs.filter(i => i.id !== blog.id))

      setIsError(false)
      setErrorMessage(`blog ${blog.title} by ${blog.author} removed`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
   
    } catch (exception) {
      setIsError(true)
      setErrorMessage('remove failed')
      console.log(exception)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  return (
    <div>
      <Notification message={errorMessage} isError={isError}/>
      {user === null ? 
        loginForm() : 
        <div>
          <h2>blogs</h2>
          <p>{ user.name } logged in <button onClick={handleLogout}>logout</button></p>
          <Togglable buttonLabel="new note" ref={newNoteRef}>
            <CreateBlog handleCreate={handleCreate}/>
          </Togglable>
          {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
            <Blog key={blog.id} blog={blog} handleLike={handleLike} handleRemove={handleRemove} user={user}/>
          )}
        </div>
      }    
    </div>
  );
}

export default App;
