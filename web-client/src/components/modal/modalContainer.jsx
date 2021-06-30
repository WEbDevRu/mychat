import React from "react";
import Modal from "./modal";
import {connect} from "react-redux";
import {toggleModalState} from "../../redux/app-reducer";

const ModalContainer = (props) =>{
    return (

        <Modal {...props}/>

    )
}

let mapStateToProps = (state) =>{
    return{
        isOpen: state.app.modalIsOpen
    }
}



export default connect(mapStateToProps, {toggleModalState})(ModalContainer)

