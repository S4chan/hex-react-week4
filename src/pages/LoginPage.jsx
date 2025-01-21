import { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";

const url = import.meta.env.VITE_BASE_URL;

function LoginPage({ setIsAuth }) {
  const [account, setAccount] = useState({
    username: "example@test.com",
    password: "example",
  });

  const changeHandler = (e) => {
    const { value, name } = e.target;
    setAccount({
      ...account,
      [name]: value,
    });
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${url}/admin/signin`, account);
      const { token, expired } = res.data;
      document.cookie = `hexToken=${token}; expires=${new Date(expired)}`;
      axios.defaults.headers.common["Authorization"] = token;

      setIsAuth(true);
    } catch (error) {
      console.error(error);
      alert("登入錯誤");
    }
  };

  const checkLogin = async () => {
    try {
      await axios.post(`${url}/api/user/check`);
      setIsAuth(true);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    if (token) {
      axios.defaults.headers.common["Authorization"] = token;
      checkLogin();
    }
  }, []);

  return (
    <>
      <div className="d-flex flex-column justify-content-center align-items-center vh-100">
        <h1 className="mb-5">請先登入</h1>
        <form className="d-flex flex-column gap-3">
          <div className="form-floating mb-3">
            <input
              name="username"
              value={account.username}
              onChange={changeHandler}
              type="email"
              className="form-control"
              id="username"
              placeholder="name@example.com"
            />
            <label htmlFor="username">Email address</label>
          </div>
          <div className="form-floating">
            <input
              name="password"
              value={account.password}
              onChange={changeHandler}
              type="password"
              className="form-control"
              id="password"
              placeholder="Password"
            />
            <label htmlFor="password">Password</label>
          </div>
          <button
            type="button"
            className="btn btn-primary"
            onClick={loginHandler}
          >
            登入
          </button>
        </form>
        <p className="mt-5 mb-3 text-muted">&copy; 2024~∞ - 六角學院</p>
      </div>
    </>
  );
}

LoginPage.propTypes = {
  setIsAuth: PropTypes.func,
};

export default LoginPage;
