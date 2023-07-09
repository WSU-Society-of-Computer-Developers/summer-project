import { findAllByText, render, screen } from '@testing-library/react'
import Nav from './Nav'
import { routes } from '../routes'
import { BrowserRouter } from 'react-router-dom'

describe('<Nav />', () => {
  it('should render Navbar', () => {
    const { container } = render(<Nav />, { wrapper: BrowserRouter })

    // check if nav has proper class name (i.e renders correctly)
    expect(
      container.querySelector(
        '.MuiPaper-root.MuiPaper-elevation.MuiPaper-elevation4.MuiAppBar-root'
      )
    ).toBeInTheDocument()

    expect(
      screen.getByRole('link', {
        name: /LOGO/i
      })
    ).toBeInTheDocument() // check if logo is rendered

    // check if route links rendered correctly
    routes
      .filter((route) => !route?.unlisted)
      .forEach((route) => {
        expect(
          screen.getByRole('link', {
            name: route.name
          })
        ).toBeInTheDocument()
      })
  })
})
