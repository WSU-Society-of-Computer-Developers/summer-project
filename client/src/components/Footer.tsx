function Footer() {
  /*return (
    // TODO: fix footer going over other elements
    <div>
      <div className="sticky m-24"></div>
      <footer className="bottom-0 m-4 rounded-lg bg-white text-black shadow dark:bg-gray-200">
        <div className="mx-auto w-full max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
          <span className="text-sm sm:text-center">
            © {new Date().getFullYear().toString() + ' '}
            <a
              href="https://scd.cs.wayne.edu"
              target="_blank"
              rel="noreferrer"
              className="hover:underline"
            >
              SCD
            </a>
          </span>
          <ul className="mt-3 flex flex-wrap items-center text-sm font-medium sm:mt-0">
            <li>
              <a href="#" className="mr-4 hover:underline md:mr-6 ">
                About
              </a>
            </li>
            <li>
              <a href="#" className="mr-4 hover:underline md:mr-6">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="mr-4 hover:underline md:mr-6">
                Licensing
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  )*/
  return (
    <>
      <footer className="secondary">
        <h3 className="text-center text-xl">ByteBound WSU</h3>
        <ul className="flex flex-col mt-3 items-center text-sm font-medium sm:mt-0">
            <li>
              <a href="#" className="mr-4 hover:underline md:mr-6 ">
                About
              </a>
            </li>
            <li>
              <a href="#" className="mr-4 hover:underline md:mr-6">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="mr-4 hover:underline md:mr-6">
                Licensing
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline md:mr-6">
                Contact
              </a>
            </li>
          </ul>
          <span className="text-sm sm:text-center">
            © {new Date().getFullYear().toString() + ' '}
            <a
              href="https://scd.cs.wayne.edu"
              target="_blank"
              rel="noreferrer"
              className="hover:underline"
            >
              SCD
            </a>
          </span>
      </footer>
    </>
  )
}

export default Footer
