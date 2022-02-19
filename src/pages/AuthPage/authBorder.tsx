import "./auth.css";
import Ttp from "../../assets/img/ttp_logo.png";
import Person from "../../assets/img/person.png";

type Props = {
  children: object;
};

const AuthBorder: React.FC<Props> = ({ children }) => {
  return (
    <div className="content">
      <div className="main-form">
        <div className="white-side">
          <img src={Ttp} alt="ttp" width="148" height="147" />
          {children}
        </div>
        <div className="black">
          <img
            src={Person}
            alt="ttp"
            width="276"
            height="276"
            className="person-img"
          />
          <h3>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy.
          </h3>
          <h6>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore.
          </h6>
        </div>
      </div>
    </div>
  );
};

export default AuthBorder;
