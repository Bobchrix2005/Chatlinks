
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import Home from "./pages/home/Home";
import {Routes, Route} from 'react-router-dom';
import {BrowserRouter, HashRouter} from 'react-router-dom';


function App() {
  return (

    <BrowserRouter>
 
      <Routes>

        <Route exact path ="/" element = {<Profile/>}/>    
        <Route exact path ="/Home" element = {<Home/>}/>  
        <Route exact path ="/Register" element = {<Register/>}/> 
        <Route exact path ="/Login" element = {<Login/>}/>   

      </Routes>

    </BrowserRouter>
 
) 
}

export default App;
