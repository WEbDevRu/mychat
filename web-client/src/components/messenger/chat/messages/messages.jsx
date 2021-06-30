import React from "react";
import Message from "./message";
import styled from "styled-components";

const MessagesBlock = styled.div`
  width: 100%;
  height: calc(100% - 128px);
`

const MessagesWr = styled.div`
    max-width: 530px;
    padding-top: 40px;
    padding-left: 15px;
    padding-right: 15px;
    margin: auto;
`

const Messages = (props) =>{
    return (

        <MessagesBlock>
           <MessagesWr>
               <Message />
               <Message />
               <Message />
               <Message />
               <Message />
               <Message />
           </MessagesWr>
        </MessagesBlock>

    )
}




export default Messages