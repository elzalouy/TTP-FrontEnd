import AuthBorder from "./authBorder";

type Props = {};

const RestPassword: React.FC<Props> = () => {
  return (
    <AuthBorder>
      <h3 className="login-text">Rest password</h3>
      <form className="form-inputs">
        <label className="label">Password</label>
        <div className="f-inputs">
          <input
            className="input-auth"
            type="password"
            name="password"
            placeholder="password"
          />
        </div>

        <label className="label">Confirm Password</label>
        <div className="f-inputs">
          <input
            className="input-auth"
            type="password"
            name="password"
            placeholder="Confirm password"
          />
        </div>

        <div className="f-inputs">
          <button className="btn-auth">Send</button>
        </div>
      </form>
    </AuthBorder>
  );
};
export default RestPassword;
