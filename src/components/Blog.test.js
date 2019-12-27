import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  test('renders by default only author and title', () => {
    const blog = {
      author: 'test author',
      title: 'test title',
      url: 'test url',
      likes: 123
    }

    const user = {
      username: 'username',
      name: 'fullname'
    }

    const mockHandler = jest.fn()

    const component = render(
      <Blog blog={blog} handleLike={mockHandler} handleRemove={mockHandler} user={user}/>
    )

    expect(component.container).toHaveTextContent('test author')
    expect(component.container).toHaveTextContent('test title')
  })

  test('clicking the row reveals the rest of the information', async () => {
    const blog = {
      author: 'test author',
      title: 'test title',
      url: 'test url',
      likes: 123,
      user: {
        username: 'blogusername',
        name: 'blogfullname'
      }
    }

    const user = {
      username: 'username',
      name: 'fullname'
    }

    const mockHandler = jest.fn()

    const component = render(
      <Blog blog={blog} handleLike={mockHandler} handleRemove={mockHandler} user={user}/>
    )

    const div = component.container.querySelector('.clickableRow')

    fireEvent.click(div)
    expect(component.container).toHaveTextContent('test author')
    expect(component.container).toHaveTextContent('test title')
    expect(component.container).toHaveTextContent('test url')
    expect(component.container).toHaveTextContent('123 likes')
  })

  test('clicking on like increases the like count', async () => {
    const blog = {
      author: 'test author',
      title: 'test title',
      url: 'test url',
      likes: 123,
      user: {
        username: 'blogusername',
        name: 'blogfullname'
      }
    }

    const user = {
      username: 'username',
      name: 'fullname'
    }

    const mockHandler = jest.fn()

    const component = render(
      <Blog blog={blog} handleLike={mockHandler} handleRemove={mockHandler} user={user}/>
    )

    const div = component.container.querySelector('.clickableRow')

    fireEvent.click(div)

    const button = component.getByText('like')

    fireEvent.click(button)

    expect(mockHandler.mock.calls.length).toBe(1)
  })
})
