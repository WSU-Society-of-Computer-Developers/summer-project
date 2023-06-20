import { render, screen } from '@testing-library/react'
import App from './App'

describe('<App />', () => {
  it('should render the App', () => {
    const { container } = render(<App />)

    expect(
      screen.getByRole('heading', {
        name: /SCD Summer Project/i,
        level: 1
      })
    ).toBeInTheDocument()

    expect(screen.getByText(/It's going to be awesome./i)).toBeInTheDocument()

    expect(
      screen.getByRole('link', {
        name: /get started/i
      })
    ).toBeInTheDocument()

    expect(container.firstChild).toBeInTheDocument()
  })
})
