const blogs = [
  {
    id: '5a451df7571c224a31b5c8ce',
    title: 'HTML is easy',
    author: 'Test author',
    likes: 123,
    url: 'http://www.cnn.com',
    user: {
      _id: '5a437a9e514ab7f168ddf138',
      username: 'ptuomola',
      name: 'Petri Tuomola'
    }
  },
  {
    id: '5a451e21e0b8b04a45638211',
    content: 'Browser can execute only javascript',
    author: 'John Doe',
    url: 'http://www.helsinki.fi',
    user: {
      _id: '5a437a9e51dfd7f168ddf138',
      username: 'testuser',
      name: 'Test user'
    }
  },
]

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}
const getAll = () => {
  return Promise.resolve(blogs)
}

export default { getAll, setToken }