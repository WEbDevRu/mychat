import React from "react";
import ShortChat from "./shortchat/shortChat";
import styled  from "styled-components"

const SideBarBlock = styled.div`
    width: 31%;
    box-sizing: border-box;
    height: 100%;
    border-right: 2px solid #E9EBED;
    padding-top: 30px;
`
const SideBar = (props) =>{
    return (

        <SideBarBlock>
            <ShortChat active={true}/>
            <ShortChat />
        </SideBarBlock>

    )
}




export default SideBar