import React from "react";
import styled from "styled-components";
import {Avatar} from "../../../common/commonUI";

const MessageBlock = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 15px;
`

const ProfileImgWr = styled.div`
width: 57px;
`

const MessageBody = styled.div`
  width: calc(100% - 124px);
  box-sizing: border-box;
  padding-left: 9px;
  padding-top: 3px;
`
const MessageTime = styled.div`
width: 67px;
  -ms-user-select: none;
  -moz-user-select: none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  span{
    color: #adadad;
  }
  
`
const MessageAuthor = styled.span`
font-weight: 700;
  line-height: 100%;
  margin-bottom: 7px;
  display: block;
`
const MessageText = styled.p`

`
const Message = (props) =>{
    return (

        <MessageBlock>
            <ProfileImgWr>
                <Avatar name="НК" width="42px"/>

            </ProfileImgWr>
            <MessageBody>
                <MessageAuthor>Alexey</MessageAuthor>
                <MessageText>Lorem ipsum dorem</MessageText>
            </MessageBody>
            <MessageTime>
                <span>2:53:05 PM</span>
            </MessageTime>
        </MessageBlock>

    )
}




export default Message