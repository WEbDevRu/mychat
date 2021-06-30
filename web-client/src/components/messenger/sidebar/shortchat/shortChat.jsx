import React from "react";
import styled  from "styled-components"
import {Avatar} from "../../../common/commonUI";

const ChatBlock = styled.div`
  width: 100%;
  height: 62px;
  cursor: pointer;
  background: ${props=> props.active ? '#6490b1' : 'white'};
  display: flex;
  justify-content: flex-start;
  -ms-user-select: none;
  -moz-user-select: none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  box-sizing: border-box;
  padding-top: 7px;
  padding-bottom: 7px;
  &:hover{
    background: ${props=> props.active ? '#6490b1' : '#f2f6fa'};
  }
`

const ProfileImageWr = styled.div`
    width: 78px;
    height: 100%;
`



const TextWr = styled.div`
  width: calc(100% - 144px);
  overflow: hidden;
  padding-top: 4px;
`

const ChatName = styled.p`
  font-weight: 700;
  text-overflow: ellipsis;
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  margin-bottom: 7px;
  color: ${props=> props.active ? 'white' : 'black'}
`

const TimeWr = styled.div`
  width: 66px;
  padding-right: 18px;
  box-sizing: border-box;
  p{
    font-size: 11px;
    line-height: 18px;
    text-align: right;
    color: ${props=> props.active ? 'white' : '#b3b3b3'};
   
  }
`

const LastMessage = styled.div`
display: flex;
justify-content: flex-start;
  width: 100%;
  overflow: hidden;
`

const MessageAuthor = styled.p`
  margin-right: 4px;
  color: ${props=> props.active ? 'white' : '#517ea5'};
  &:after{
    content: ':'
  }
`

const Message = styled.p`
  
  color: ${props=> props.active ? 'white' : '#808080'};
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  
`



const ShortChat = (props) =>{
    return (

        <ChatBlock active={props.active}>
            <ProfileImageWr>

                <Avatar name="НК" width="48px"/>
            </ProfileImageWr>
            <TextWr>
                <ChatName active={props.active}>User 1</ChatName>
                <LastMessage>
                    <MessageAuthor active={props.active}>designer</MessageAuthor>
                    <Message active={props.active}>Lorem ipsum dorem</Message>
                </LastMessage>
            </TextWr>

            <TimeWr active={props.active}>
                <p>4:36 PM</p>
            </TimeWr>
        </ChatBlock>

    )
}




export default ShortChat