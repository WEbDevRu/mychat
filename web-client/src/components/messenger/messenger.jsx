import React from "react";
import Navbar from "./navbar/navbar";
import Chat from "./chat/chat";
import SideBar from "./sidebar/sideBar";
import styled from "styled-components"
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";

const MessengerContainer = styled.div`
background: #fff;
  max-width: 1010px;
  min-width: 300px;
  margin: 0 auto;
  box-shadow: 0px 1px 0 #dfe5ec;
  border-radius: 0 0 3px 3px;
  border-left: 1px solid #dfe5ec;
  border-right: 1px solid #dfe5ec;
  border-bottom: 1px solid #d2dbe3;
  overflow: hidden;
  min-height: calc(100vh - 30px);
`

const MessengerBody = styled.div`
  width: 100%;
  height: calc(100vh - 78px);
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`

const Messenger = (props) =>{
    return (
            <MessengerContainer>
                <Navbar />
                <MessengerBody>
                    <SideBar />
                    <Chat />
                </MessengerBody>
            </MessengerContainer>
    )
}


let mapStateToProps = (state) =>{
    return{
        isAuth: state.auth.isAuth
    }
}



export default connect(mapStateToProps, {})(Messenger)
