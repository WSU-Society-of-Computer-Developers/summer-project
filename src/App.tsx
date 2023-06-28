import Footer from 'components/Footer'
import Nav from 'components/Nav'
import Home from 'pages/Home'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <>
      <BrowserRouter>
        <Nav />
        <div className="m-5 text-left ">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="*"
              element={<h1 className="text-lg">404 - Not Found</h1>}
            />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
