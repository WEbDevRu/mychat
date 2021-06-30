import './App.css';
import  {Route, Switch} from "react-router-dom";
import Messenger from "./components/messenger/messenger";
import RegistrationContainer from "./components/registration/registrationContainer";
import {connect} from "react-redux";
import Loading from "./components/common/loading";
import {useEffect, useRef} from "react";
import socketIOClient from "socket.io-client";
import {toggleIsInitialized} from "./redux/app-reducer";
import {toggleIsAuth, setAuthInfo} from "./redux/auth-reducer";
const SOCKET_SERVER_URL = "http://localhost:8081";



const App  = (props) =>{

  return (

      <>

              <Route path='/chat' render={()=> <Messenger />}/>
              <Route path='/registration' render={()=><RegistrationContainer />}/>
      </>


  )
}

let mapStateToProps = (state) =>{
    return{
        isInitialized: state.app.isInitialized,
        isAuth: state.auth.isAuth
    }
}



export default connect(mapStateToProps, {toggleIsInitialized, toggleIsAuth, setAuthInfo})(App)

