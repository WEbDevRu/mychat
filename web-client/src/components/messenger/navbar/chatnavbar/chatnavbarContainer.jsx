import React from "react";
import ChatNavbar from "./chatnavbar";
import {connect} from "react-redux";
import {toggleModalState} from "../../../../redux/app-reducer";

const ChatNavbarContainer = (props) => {
    return (

        <ChatNavbar {...props} />
    )
}

let mapStateToProps = (state) =>{
    return{

    }
}



export default connect(mapStateToProps, {toggleModalState})(ChatNavbarContainer)
