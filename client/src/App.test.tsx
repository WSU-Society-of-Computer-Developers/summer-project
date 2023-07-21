import { render, screen, waitFor, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter, MemoryRouter } from 'react-router-dom'
import App from './App'
import React from 'react'
import { routes } from 'routes'

afterEach(cleanup)

describe('<App />', () => {
  it('should render <Home/>', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    )
    // TODO: maybe find a better way to test if the home page renders fine
    await waitFor(() =>
      expect(screen.getByText(/SCD Summer Project/i)).toBeInTheDocument()
    )
  })
  it("should render <NotFound/> if the page doesn't exist", async () => {
    render(
      <MemoryRouter initialEntries={['/this-page-does-not-exist']}>
        <App />
      </MemoryRouter>
    )
    await waitFor(() =>
      expect(
        screen.getByRole('heading', { name: /404 - Not Found/i, level: 1 })
      ).toBeInTheDocument()
    )
  })

  it('should render <Posts/>', async () => {
    render(
      <MemoryRouter initialEntries={['/posts']}>
        <App />
      </MemoryRouter>
    )
    await waitFor(() =>
      expect(
        screen.getByRole('heading', { name: /Posts/i, level: 1 })
      ).toBeInTheDocument()
    )
  })

  it('should navigate and render all routes', async () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    )

    const user = userEvent.setup()
    // click all nav links
    for (const route of routes.filter((route) => !route?.unlisted)) {
      await user.click(
        screen.getByRole('button', {
          name: route.name
        })
      )
      expect(
        container.querySelector(`div[data-testid=${route.name}]`)
      ).toBeTruthy()
    }
  })
})
