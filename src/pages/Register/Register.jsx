import "./Register.css";
import { Link, useHistory } from "react-router-dom";
import { useRef } from "react";
import useAuth from "../../hooks/UseAuth";
import { toast } from "react-toastify";

// port
import port from "../../assets/config";

const Register = () => {
  const [setToken] = useAuth(true);
  const history = useHistory();

  const refFirstName = useRef();
  const refLastName = useRef();
  const refEmail = useRef();
  const refPassword = useRef();
  const refConPassword = useRef();

  const handleRegister = async (evt) => {
    evt.preventDefault();

    const info = {
      firstName: refFirstName.current.value,
      lastName: refLastName.current.value,
      email: refEmail.current.value,
      password: refPassword.current.value,
      conPassword: refConPassword.current.value,
    };

    const json = await fetch(`${port.url}/auth/register`, {
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
    <div className="register">
      <div className="container">
        <h1 className="title">Register</h1>

        <form className="form" onSubmit={handleRegister}>
          <h4 className="form__title">First Name</h4>
          <input ref={refFirstName} className="input" type="text" required />

          <h4 className="form__title">Last Name</h4>
          <input ref={refLastName} className="input" type="text" required />

          <h4 className="form__title">Email</h4>
          <input ref={refEmail} className="input" type="email" required />

          <h4 className="form__title">Password</h4>
          <input ref={refPassword} className="input" type="password" required />

          <h4 className="form__title">Confirm Password</h4>
          <input
            ref={refConPassword}
            className="input"
            type="password"
            required
          />

          <button className="btn" type="submit">
            submit
          </button>
        </form>

        <Link className="link_auth" to="/login">
          If you log in <span>login</span>
        </Link>
      </div>
    </div>
  );
};

export default Register;
