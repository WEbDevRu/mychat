import React from "react";
import NavLogo from "./navbarlogo/navbarlogo";
import ChatNavbarContainer from "./chatnavbar/chatnavbarContainer";
import styled from "styled-components"

const NavbarPane = styled.nav`
  height: 48px;
  background: #5682a3;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Navbar = (props) =>{
    return (

        <NavbarPane>
            <NavLogo />
            <ChatNavbarContainer />
        </NavbarPane>


    )
}




export default Navbar