import React from 'react'

function Home() {
  return (
    <div data-testid="Home">
      <h1 className="text-4xl font-bold text-gray-800">SCD Summer Project</h1>
      <p className="my-4 text-lg text-gray-600">
        It&apos;s going to be awesome.
      </p>
      <a
        href="https://scd.cs.wayne.edu/#/project"
        target="_blank"
        rel="noreferrer"
        className="mt-5 rounded-lg bg-blue-700 p-2 text-lg font-semibold text-white hover:bg-blue-900"
      >
        Get Started
      </a>
    </div>
  )
}

export default Home
