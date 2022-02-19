import React, { useState } from "react";
import "./auth.css";
import AuthBorder from "./authBorder";
import { Link, RouteComponentProps } from "react-router-dom";
// import auth from "../../auth";

interface Props {
  history: RouteComponentProps["history"];
  location: RouteComponentProps["location"];
  match: RouteComponentProps["match"];
}

const Login: React.FC<Props> = ({ history }) => {
  const [Email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();

  return (
    <AuthBorder>
      <h3 className="login-text">Login to your account</h3>

      <form className="form-inputs">
        <label className="label">Email Address</label>
        <div className="f-inputs">
          <input
            className="input-auth"
            type="email"
            name="email"
            placeholder="Email Address"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <label className="label">Password</label>
        <div className="f-inputs">
          <input
            className="input-auth"
            type="password"
            name="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="f-inputs">
          <button
            className="btn-auth"
            onClick={() => {
              //   auth.login(() => {
              //     props.history.push("/cp");
              //   });
              history.push("/projects");
            }}
          >
            Login
          </button>
        </div>
        <Link to="/ForgetPassword" className="f-inputs">
          <p>Forget password?</p>
        </Link>
      </form>
    </AuthBorder>
  );
};
export default Login;
