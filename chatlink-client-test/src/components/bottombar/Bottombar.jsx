import "./bottombar.css";
import { Search, Person, Chat, Notifications } from "@material-ui/icons";
import { IoHomeOutline } from "react-icons/io5";
import { MdOutlineOndemandVideo , MdPostAdd} from "react-icons/md";
import { GoBriefcase } from "react-icons/go";
import { CiShop } from "react-icons/ci";
export default function Bottombar() {
  return (
    <div className="bottombarContainer">
    
    
      <div className="bottombarIcons">
        <div className="bottombarIconsContainer">
          <IoHomeOutline size={20} />
          <p>Home</p>
        </div> 
        <div className="bottombarIconsContainer">
          <MdOutlineOndemandVideo  size={20}  />
          <p>Stream</p>
        </div> 
        <div className="bottombarIconsContainer">
          <MdPostAdd  size={20} />
          <p>Post</p>
        </div> 
        <div className="bottombarIconsContainer">
          <CiShop  size={20} />
          <p>Market</p>
        </div>
        <div className="bottombarIconsContainer">
          <GoBriefcase  size={20} />
          <p>Jobs</p>
        </div>  
      </div>
    </div>
  );
}
