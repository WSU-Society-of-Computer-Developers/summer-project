function App() {
  return (
    <div>
      <div className="flex h-screen flex-col items-center justify-center bg-gray-100">
        <div className="w-40">
          <img src="https://scd.cs.wayne.edu/scd_logo.png" alt="SCD Logo" />
        </div>
        <h1 className="text-4xl font-bold text-gray-800">SCD Summer Project</h1>
        <p className="mt-4 text-lg text-gray-600">
          It&apos;s going to be awesome.
        </p>
        <a
          href="https://scd.cs.wayne.edu/#/project"
          target="_blank"
          rel="noreferrer"
          className="mt-6 rounded-lg bg-blue-700 px-4 py-2 text-lg font-semibold text-white hover:bg-blue-900"
        >
          Get Started
        </a>
      </div>
    </div>
  )
}

export default App
