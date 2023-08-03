import React from 'react'
import Footer from 'components/Footer'
import Nav from 'components/Nav'
import { Route, Routes } from 'react-router-dom'
import { routes } from 'routes'
import Spinner from 'components/Spinner'

function App() {
  return (
    <>
      <div>
        <Nav />
        <div className="m-5 mb-[-150px] min-h-screen text-left">
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
          {/* this if for footer to have space to fit in viewport */}
          <div className="h-[150px]"></div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default App
