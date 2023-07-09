import React from 'react'
import Footer from 'components/Footer'
import Nav from 'components/Nav'
import Home from 'pages/Home'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import { routes } from 'routes'
import Spinner from 'components/Spinner'

function App() {
  return (
    <>
      <Nav />
      <div className="m-5 text-left ">
        <React.Suspense fallback={<Spinner />}>
          <Routes>
            {routes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={<route.component />}
              />
            ))}
          </Routes>
        </React.Suspense>
      </div>
      <Footer />
    </>
  )
}

export default App
