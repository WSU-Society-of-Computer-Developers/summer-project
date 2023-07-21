import { render, screen } from '@testing-library/react'
import Home from './Home'

describe('<Home />', () => {
  it('should render the home page', () => {
    render(<Home />)
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
  })
})
