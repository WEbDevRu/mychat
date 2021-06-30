import React, {useEffect, useState, useRef} from "react";
import styled from "styled-components"

const RegistrationWr = styled.div`
width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

const RegistrationBlock = styled.div`
  width: 300px;
  height: 300px;
  background: white;
  box-shadow: 0px 1px 0 #dfe5ec;
  border-radius: 3px;
  border-left: 1px solid #dfe5ec;
  border-right: 1px solid #dfe5ec;
  border-bottom: 1px solid #d2dbe3;
`

const Header = styled.div`
background: #5682a3;
  width: 100%;
  height: 48px;
  h1{
    color: white;
    text-align: center;
    font-size: 15px;
    font-weight: 400;
    line-height: 48px;
  }
`

const Form = styled.div`
  width: 250px;
  margin: auto;
  margin-top: 50px;
`

const Input = styled.input`
  width: 100%;
  font-family: inherit;
  border-left: 0px;
  border-right: 0px;
  border-top: 0px;
  border-bottom: 1px solid #d2dbe3;
  outline: none;
  border-radius: 0px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  transition: .25s all;
  padding: 10px 10px 8px 0px;
  box-sizing: border-box;
  ::-webkit-input-placeholder {color: #b6bcc2; font-size: 12px;}
  ::-moz-placeholder          {color: #b6bcc2; font-size: 12px;}/* Firefox 19+ */
  :-moz-placeholder           {color: #b6bcc2; font-size: 12px;}/* Firefox 18- */
  :-ms-input-placeholder       {color: #b6bcc2; font-size: 12px;}
  &:focus{
    box-shadow: 0 1px 0 0 #77b7e4;
    border-bottom: 1px solid #77b7e4;
  }
`

const SendButton = styled.button`
  color: #499dd9;
  font-size: 13px;
  line-height: 18px;
  height: 18px;
  border-radius: 0;
  float: right;
  min-width: 0;
  margin-top: 5px;
  width: auto;
  padding: 5px;
  font-weight: bold;
  background: transparent;
  border: none;
  text-transform: uppercase;
  cursor: pointer;
  &:hover{
    color: #4693ca;
  }
`


const Registration = (props) =>{

    return (

        <RegistrationWr>

            <RegistrationBlock>
                <Header>
                    <h1>Registration</h1>
                </Header>
                <Form>
                    <Input  placeholder="Enter your name" />
                    <SendButton>Submit</SendButton>
                </Form>

            </RegistrationBlock>
        </RegistrationWr>

    )
}




export default Registration