import { findAllByText, render, screen } from '@testing-library/react'
import Nav from './Nav'

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
  })
})
