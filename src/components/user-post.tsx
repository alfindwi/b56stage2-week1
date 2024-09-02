import { useFetchData } from "../hooks/use-fetch-data";
import { Post } from "../types/user";


export function UserPost() {
  const { data: posts } = useFetchData<Post>({
    url: "https://jsonplaceholder.typicode.com/posts",
  });

  return (
    <ul>
      {posts.map((user, index) => {
        return (
          <div key={index}>
            <li>Title: {user.title}</li>
            <hr />
          </div>
        );
      })}
    </ul>
  );
}