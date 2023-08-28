import React from 'react'
import { Button } from '@mui/material'
import { usePocket } from '../contexts/PocketContext'

function Home() {
  const { api } = usePocket()
  return (
    <div
      data-testid="Home"
      className="flex max-h-[20] flex-col items-center justify-center text-center sm:-m-12 md:-m-4 lg:-m-5 "
    >
      <h1 className="text-[4rem] font-bold text-white">ByteBound</h1>
      <p className="my-4 text-lg text-white">It&apos;s going to be awesome.</p>
      <a
        href="https://scd.cs.wayne.edu/#/project"
        target="_blank"
        rel="noreferrer"
        className="my-3 rounded-lg bg-blue-700 p-2 text-lg font-semibold text-white hover:bg-blue-900"
      >
        Get Started
      </a>
    </div>
  )
}

export default Home
