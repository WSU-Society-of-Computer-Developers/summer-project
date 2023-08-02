function Footer() {
  return (
    <>
      <footer className="secondary mt-4">
        <h3 className="text-center text-2xl">ByteBound WSU</h3>
        <ul className="text-center mt-3 text-m font-medium sm:mt-0">
            <li>
              <a href="#" className="mr-4 hover:underline md:mr-6 ">
                About
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline md:mr-6">
                Contact
              </a>
            </li>
            <li>
              <a href="#" className="mr-4 hover:underline md:mr-6">
                Privacy Policy
              </a>
            </li>
          </ul>
          <div className="text-sm text-center pt-1 mt-1 tertiary">
            <span className="">
              © {new Date().getFullYear().toString() + ' '}
              <a
                href="https://scd.cs.wayne.edu"
                target="_blank"
                rel="noreferrer"
                className="hover:underline"
              >
                Society of Computer Developers
              </a>
            </span>
          </div>
      </footer>
    </>
  )
}

export default Footer
