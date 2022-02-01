import "./Login.css";
import { Link, useHistory } from "react-router-dom";
import { useRef } from "react";
import useAuth from "../../hooks/UseAuth";
import { toast } from "react-toastify";

// port
import port from "../../assets/config";

const Login = () => {
  const [setToken] = useAuth(true);
  const history = useHistory();

  const refEmail = useRef();
  const refPassword = useRef();

  const handleLogin = async (evt) => {
    evt.preventDefault();

    const info = {
      email: refEmail.current.value,
      password: refPassword.current.value,
    };

    const json = await fetch(`${port.url}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "Application/json" },
      body: JSON.stringify(info),
    });
    const data = await json.json();

    if (data.data && data.data.token) {
      setToken(data.data.token);
      toast.success(data.message);
      history.push("/");
    } else {
      toast.error(data.message);
    }
  };

  return (
    <div className="login">
      <div className="container">
        <h1 className="title">Login</h1>

        <form className="form" onSubmit={handleLogin}>
          <h4 className="form__title">Email</h4>
          <input ref={refEmail} className="input" type="email" required />

          <h4 className="form__title">Password</h4>
          <input ref={refPassword} className="input" type="password" required />

          <button className="btn" type="submit">
            submit
          </button>
        </form>

        <Link className="link_auth" to="/register">
          If you are not registered <span>register</span>
        </Link>
      </div>
    </div>
  );
};

export default Login;
