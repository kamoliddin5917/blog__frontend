import "./List.css";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import useAcount from "../../hooks/UseAcount";
import useAuth from "../../hooks/UseAuth";

// svg
import { Trash } from "../SVG/SVG";

// port
import port from "../../assets/config";

const List = ({ user, blog, acountt, setUserId, setBlogs, blogs }) => {
  const [acount] = useAcount();
  const [token, setToken] = useAuth();

  const month = [
    "Jan",
    "Feb",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
  ];

  const deleteBlog = async () => {
    const json = await fetch(`${port.url}/api/blog/${blog.id}`, {
      method: "DELETE",
      headers: { token },
    });
    const { data, message } = await json.json();

    if (data) {
      const deleteB = blogs.filter((b, i) => b.id !== blog.id);
      setBlogs(deleteB);
    } else {
      toast.error(message);
      setToken(false);
    }
  };

  return blog ? (
    <li className="list">
      {!acountt && (
        <Link
          className="link"
          to="/acount"
          onClick={() => {
            setUserId(user.id);
          }}
        >
          <img
            src={user.image ? user.image : "https://via.placeholder.com/100"}
            alt="user"
          />
          <h4>{user.first_name + " " + user.last_name}</h4>
        </Link>
      )}

      <h3 className="list__title">{blog.title}</h3>

      <div className="list__box">
        <span className="data">
          {`${new Date(blog.date).getDate()} ${
            month[new Date(blog.date).getMonth()]
          } ${new Date(blog.date).getFullYear()}`}
        </span>

        <ol className="list__card">
          {blog.tags.map((tag, i) => (
            <li className="card__list" key={i}>
              {`${tag} ${blog.tags.length - 1 !== i ? "," : ""} `}
            </li>
          ))}
        </ol>
      </div>

      <p className="list__text">{blog.content}</p>

      {acount && acountt && (
        <button className="blog_delete" onClick={deleteBlog}>
          <Trash />
        </button>
      )}
    </li>
  ) : (
    ""
  );
};

export default List;
