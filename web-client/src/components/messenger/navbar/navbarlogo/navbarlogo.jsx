import React from "react";
import styled from "styled-components"
import Logo from "../../../../assets/logo.svg"

const LogoBlock = styled.div`
  width: 31%;
  height: 100%;
  box-sizing: border-box;
  padding: 18px 13px 15px 18px;
`

const LogoImg = styled.img`
    color: white;
    width: 62px;
`

const NavLogo = (props) =>{
    return (

        <LogoBlock>
            <LogoImg src={Logo} alt=""/>
        </LogoBlock>

    )
}




export default NavLogo