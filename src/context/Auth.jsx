const { createContext, useState, useEffect } = require("react");

const ctx = createContext();

const Auth = ({ children }) => {
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [acount, setAcount] = useState(window.localStorage.getItem("acount"));

  useEffect(() => {
    if (token) {
      window.localStorage.setItem("token", token);
    } else {
      window.localStorage.removeItem("token");
    }
  }, [token]);

  useEffect(() => {
    if (acount) {
      window.localStorage.setItem("acount", acount);
    } else {
      window.localStorage.removeItem("acount");
    }
  }, [acount]);

  return (
    <ctx.Provider value={{ token, setToken, acount, setAcount }}>
      {children}
    </ctx.Provider>
  );
};

export { Auth, ctx };
