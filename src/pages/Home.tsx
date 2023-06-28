import BasicTable from 'components/BasicTable'
import React from 'react'

function Home() {
  const [posts, setPosts] = React.useState<any[]>([])
  React.useEffect(() => {
    // get data from API
    async function getData() {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts')
      const posts = await response.json()
      setPosts(posts)
    }
    getData()
  }, [])

  return (
    <>
      <div>
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
      <div className="m-5">
        <h1 className="text-4xl font-bold text-gray-800">Posts</h1>
        {/* <ol>
          {posts.map((post) => (
            <li key={post.id}>{post.title}</li>
          ))}
        </ol> */}
        <BasicTable rows={posts} />
      </div>
    </>
  )
}

export default Home
