import React from "react";
import styled from "styled-components"

const ModalBg = styled.div`
width: 100%;
height: 100%;
  background: rgba(0,0,0,0.6);
  
`

const ModalBlock = styled.div`
width: 100%;
height: 100%;
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  z-index: 9999;
`

const ModalBody = styled.div`
background: white;
  display: block;
  margin-left: -240px;
  width: 480px;
  position: absolute;
  top: 14px;
  left: 50%;
 
`

const ModalNavbar = styled.nav`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #5580a3;
  box-sizing: border-box;
  padding: 17px 22px 17px 26px;
`

const ModalName = styled.p`
  font-weight: 700;
  color: white;
`
const CloseModal = styled.button`
  color: #dde8f1;
  font-size: 13px;
  line-height: 13px;
  height: 13px;
  border-radius: 0;
  min-width: 0;
  font-weight: bold;
  background: transparent;
  border: none;
  cursor: pointer;
  &:hover{
    color: white;
  }
`
const Modal = (props) =>{
    return (

        <>
            {
                props.isOpen
                    ?
                    <ModalBlock>
                        <ModalBg onClick={()=>{props.toggleModalState(false)}}/>
                        <ModalBody>
                            <ModalNavbar>
                              <ModalName>Group info</ModalName>
                             <CloseModal onClick={()=>{props.toggleModalState(false)}}>Close</CloseModal>
                            </ModalNavbar>
                            {props.children}
                        </ModalBody>
                        <p>Modal</p>
                    </ModalBlock>
                    :
                    ""}


        </>


    )
}




export default Modal