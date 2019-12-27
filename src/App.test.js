import React from 'react'
import { render, waitForElement } from '@testing-library/react'
jest.mock('./services/blogs')
import App from './App'

describe('<App />', () => {
  test('if no user logged, notes are not rendered', async () => {
    const component = render(
      <App />
    )
    component.rerender(<App />)

    await waitForElement(
      () => component.getByText('login')
    )

    expect(component.container).toHaveTextContent('Log in to application')
    expect(component.container).not.toHaveTextContent('HTML is easy')
    expect(component.container).not.toHaveTextContent('logged in')
  })

  test('if user logged in, notes are rendered', async () => {

    const user = {
      username: 'tester',
      token: '1231231214',
      name: 'Donald Tester'
    }

    localStorage.setItem('loggedBlogappUser', JSON.stringify(user))

    const component = render(
      <App />
    )
    component.rerender(<App />)

    await waitForElement(
      () => component.getByText('logout')
    )

    expect(component.container).not.toHaveTextContent('Log in to application')
    expect(component.container).toHaveTextContent('HTML is easy')
    expect(component.container).toHaveTextContent('logged in')
  })


})



