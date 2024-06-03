import "./login.css";
import { useNavigate } from 'react-router-dom';

export default function Login() {

  const navigate = useNavigate();

  const handleClick = () => {
    // Navigate to the desired route when the button is clicked
    navigate('/Register');
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
            <input placeholder="Email" className="loginInput" />
            <input placeholder="Password" className="loginInput" />
            <button onClick={handleGoHome} className="loginButton">Log In</button>
            <span className="loginForgot">Forgot Password?</span>
            <button onClick={handleClick} className="loginRegisterButton">
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
