import { findAllByText, render, screen } from '@testing-library/react'
import Nav from './Nav'
import { routes } from '../routes'

describe('<Nav />', () => {
  it('should render Navbar', () => {
    const { container } = render(<Nav />)

    // check if nav has proper class name
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

    // check if routes rendered correctly
    routes.forEach((route) => {
      expect(
        screen.getByRole('link', {
          name: route.name
        })
      ).toBeInTheDocument()
    })
  })
})
