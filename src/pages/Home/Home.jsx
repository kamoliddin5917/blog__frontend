import "./Home.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

// components
import List from "../../components/List/List";
import port from "../../assets/config";

const Home = ({ setUserId, setBlogs, blogs }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    (async () => {
      const json = await fetch(`${port.url}/api/home`);
      const { data, message } = await json.json();

      if (data) {
        setBlogs(data.blogs);
        setUsers(data.users);
      } else {
        toast.error(message);
      }
    })();
  }, [setBlogs]);

  return (
    <div className="home">
      <div className="container">
        <h1 className="title">
          Blog
          <Link className="title__link" to="/article">
            <span className="title__link--text">Add Article</span>

            <span className="title__link--plus"></span>
          </Link>
        </h1>

        <ul className="card">
          {blogs.length ? (
            blogs.map((blog, i) =>
              users.map(
                (user) =>
                  user.id === blog.author_id && (
                    <List
                      key={i}
                      blog={blog}
                      user={user}
                      setUserId={setUserId}
                    />
                  )
              )
            )
          ) : (
            <div>Not found...</div>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Home;
