import { useState } from "react";

/**
 * Post type describes the shape of a post object we work with.
 * Using a type helps TypeScript catch mistakes when accessing properties.
 */
type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

function PostList() {
  // posts: state that will hold posts fetched from the API.
  // Initially empty array so UI can update after fetch.
  const [posts, setPosts] = useState<Post[]>([]);

  /**
   * fetchPosts
   * - calls the JSONPlaceholder API to get posts
   * - response.json() parses the response body as JavaScript objects (JSON -> JS)
   * - setPosts updates React state, causing a re-render with fetched posts
   */
  const fetchPosts = async () => {
    let response = await fetch("https://jsonplaceholder.typicode.com/posts");
    let data = await response.json();
    setPosts(data); // JavaScript Object Notation -> converts JSON string to JS objects
  };

  return (
    <div className="container mb-4">
      <h2 className="text-danger my-4">Post List</h2>

      {/* Button triggers the API fetch when clicked */}
      <button className="btn btn-success" onClick={fetchPosts}>
        Fetch Posts
      </button>

      {/* 
        We render postsStatic here so the component shows content by default.
        If you want to render fetched posts instead, replace postsStatic with posts.
      */}
      <ul className="list-group">
        {posts.map((post) => (
          // key prop helps React identify list items for reconciliation
          <li key={post.id} className="list-group-item">
            <h4 className="text-primary mb-2">{post.title}</h4>
            <p className="text-secondary">{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default PostList;
