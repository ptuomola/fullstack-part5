import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import SimpleBlog from './SimpleBlog'

describe('<SimpleBlog />', () => {
  test('renders content', () => {
    const blog = {
      author: 'test author',
      title: 'test title',
      url: 'test url',
      likes: 123
    }

    const component = render(
      <SimpleBlog blog={blog} />
    )

    expect(component.container).toHaveTextContent('test author')
    expect(component.container).toHaveTextContent('test title')
    expect(component.container).toHaveTextContent('blog has 123 likes')
  })

  test('clicking the button twice calls event handler twice', async () => {
    const blog = {
      author: 'test author',
      title: 'test title',
      url: 'test url',
      likes: 123
    }

    const mockHandler = jest.fn()

    const { getByText } = render(
      <SimpleBlog blog={blog} onClick={mockHandler} />
    )

    const button = getByText('like')
    fireEvent.click(button)
    fireEvent.click(button)

    expect(mockHandler.mock.calls.length).toBe(2)
  })
})