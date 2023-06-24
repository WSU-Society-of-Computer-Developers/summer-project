import { render, screen } from '@testing-library/react'
import Footer from './Footer'

describe('<Footer />', () => {
  it('should render Footer', () => {
    const { container } = render(<Footer />)

    // test copyright
    expect(container.innerText).toContain(`© ${new Date().getFullYear()} SCD`)

    // test if all links are rendered
    const footerLinks = [/About/i, /Privacy Policy/i, /Licensing/i, /Contact/i]
    footerLinks.forEach((link) =>
      expect(screen.getByRole('link', { name: link })).toBeInTheDocument()
    )
  })
})
