import BasicTable from 'components/BasicTable'
import React from 'react'

function Posts() {
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

export default Posts
