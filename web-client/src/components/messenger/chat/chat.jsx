import React from "react";
import MessagesContainer from "./messages/messagesContainer";
import InputPanelContainer from "./inputpanel/inputPanelContainer";
import styled from "styled-components";
import ModalContainer from "../../modal/modalContainer";
import ChatInfoContainer from "./chatinfo/chatInfoContainer";

const ChatBlock = styled.div`
width: 69%;
  height: 100%;
`
const Chat = (props) =>{
    return (

        <ChatBlock>
            <MessagesContainer />
            <InputPanelContainer />
            <ModalContainer>
                <ChatInfoContainer />
            </ModalContainer>
        </ChatBlock>

    )
}




export default Chat