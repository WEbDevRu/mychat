import React from "react";
import styled from "styled-components"
import {toggleModalState} from "../../../../redux/app-reducer";

const ChatInfoBlock = styled.div`
  width: 69%;
  height: 100%;
  cursor: pointer;
  box-sizing: border-box;
  padding: 18px 13px 15px 18px;
  &:hover{
  background: #497799;
}
`

const ChatInfo = styled.div`
display: flex;
  justify-content: flex-start;
  height: 20px;
 
`

const ChatName = styled.h1`
font-size: 13px;
  color: white;
  line-height: 100%;
  margin-right: 13px;
  
`

const ChatMembersCount = styled.span`
font-size: 13px;
  color: #b9cfe3;
  line-height: 100%;
`
const ChatNavbar = (props) =>{

    return (

    <ChatInfoBlock onClick={()=>{props.toggleModalState(true)}}>
        <ChatInfo>
            <ChatName>Chat Name</ChatName>
            <ChatMembersCount>23 members</ChatMembersCount>
        </ChatInfo>
    </ChatInfoBlock>

    )
}




export default ChatNavbar