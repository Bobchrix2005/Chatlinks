import "./topbar.css";
import { Search, Person, Chat, Notifications } from "@material-ui/icons";
import { useNavigate } from 'react-router-dom';

export default function Topbar() {

  const navigate = useNavigate();

  const handleClick = () => {
    // Navigate to the desired route when the button is clicked
    navigate('/');
  };

  const handleGoHome = () => {
    // Navigate to the desired route when the button is clicked
    navigate('/Home');
  };
  const logout = () => {
    // Navigate to the desired route when the button is clicked
    navigate('/Login');
  };
 


  return (
    <div className="topbarContainer">
      <div onClick={handleGoHome}  className="topbarLeft">
        <span className="logo">Chatlink</span>
      </div>
      <div className="topbarCenter"> 
        <div className="searchbar">
          <Search className="searchIcon" />
          <input
            placeholder="Search chatlinks"
            className="searchInput"
          />
        </div>
      </div>
      <div className="topbarEnd">

       
       
          <div className="topbarIconItem">
            <Person />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <Chat />
            <span className="topbarIconBadge">2</span>
          </div>
          <div className="topbarIconItem">
            <Notifications />
            <span className="topbarIconBadge">1</span>
          </div>
          <div onClick = {logout} className="topbarLinks">
          <span className="topbarLink">Logout</span>         
        </div>
   
      
       
      </div>
      <div onClick={handleClick} className="topbarIconItem">
      <img src="/assets/person/1.jpeg" alt="" className="topbarImg"/>
      </div>
    </div>
  );
}
