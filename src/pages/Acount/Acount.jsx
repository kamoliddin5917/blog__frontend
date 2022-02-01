import "./Acount.css";
import List from "../../components/List/List";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import useAuth from "../../hooks/UseAuth";
import useAcount from "../../hooks/UseAcount";

// port
import port from "../../assets/config";

const Acount = ({ userId }) => {
  const [token, setToken] = useAuth();
  const [acount, setAcount] = useAcount();

  const [user, setUser] = useState({});
  const [blogs, setBlogs] = useState([]);

  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const refName = useRef();
  const refLastName = useRef();
  const refEmail = useRef();

  const handleChangeUser = (evt) => {
    evt.preventDefault();

    const info = {
      firstName: refName.current.value,
      lastName: refLastName.current.value,
      email: refEmail.current.value,
    };

    console.log(info);
  };

  useEffect(() => {
    const handleAcount = async () => {
      const json = await fetch(`${port.url}/api/user/${userId}`, {
        headers: { token },
      });
      const { data, message } = await json.json();

      if (data) {
        setUser(data.user);
        setBlogs(data.blogs);
        setName(data.user.first_name);
        setLastName(data.user.last_name);
        setEmail(data.user.email);
        if (data.acount === "ok") {
          setAcount(true);
        } else {
          setAcount(false);
        }
      } else {
        toast.error(message);
        setToken(false);
      }
    };

    handleAcount();
  }, [userId, setAcount, setToken, token]);

  return (
    <div className="acount">
      <div className="container">
        <h1 className="title title--acount">Acount</h1>

        <section className="section">
          <div className="section__left">
            {acount ? (
              <form onSubmit={handleChangeUser}>
                <label htmlFor="file">
                  <input className="input--file" type="file" id="file" />
                  <img
                    className="acount__image"
                    src="https://via.placeholder.com/100"
                    alt="profile"
                  />
                </label>

                <input
                  className="input--acount"
                  ref={refName}
                  type="text"
                  defaultValue={name}
                />
                <input
                  className="input--acount"
                  ref={refLastName}
                  type="text"
                  defaultValue={lastName}
                />
                <input
                  className="input--acount input--acount-email"
                  ref={refEmail}
                  type="email"
                  defaultValue={email}
                />
                <button className="btn--acount" type="submit">
                  Change profile
                </button>
              </form>
            ) : (
              <>
                <img
                  className="acount__image"
                  src="https://via.placeholder.com/100"
                  alt="profile"
                />

                <h4>{`${user.first_name ? user.first_name : "..."} ${
                  user.last_name ? user.last_name : "..."
                }`}</h4>
                <p>{user.email ? user.email : "..."}</p>
              </>
            )}
          </div>

          <div className="section__right">
            <ul className="card">
              {blogs.length ? (
                blogs.map((blog, i) => (
                  <List
                    key={i}
                    acountt={true}
                    blog={blog}
                    setBlogs={setBlogs}
                    blogs={blogs}
                  />
                ))
              ) : (
                <div>Not found...</div>
              )}
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Acount;
