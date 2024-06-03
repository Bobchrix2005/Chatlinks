import "./register.css";
import { useNavigate } from 'react-router-dom';

export default function Register() {

  const navigate = useNavigate();

  const handleClick = () => {

    navigate('/Login');
  };
  const handleGoHome = () => {
 
    navigate('/Home');
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Chatlink</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on Chatlink.
          </span>
        </div>
        <div className="loginRight"> 
          <div className="loginBox">
            <input placeholder="Username" className="loginInput" />
            <input placeholder="Email" className="loginInput" />
            <input placeholder="Password" className="loginInput" />
            <input placeholder="Password Again" className="loginInput" />
            <button onClick={handleGoHome}   className="loginButton">Sign Up</button>
            <button onClick={handleClick}  className="loginRegisterButton">
             Log In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
