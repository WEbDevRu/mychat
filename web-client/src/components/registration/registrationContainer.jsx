import Registration from "./registration";
import {connect} from "react-redux";


const RegistrationContainer = (props) =>{

    return (
        <Registration/>
    )
}


let mapStateToProps = (state) =>{
    return{
            isAuth: state.auth.isAuth
    }
}



export default connect(mapStateToProps, {})(RegistrationContainer)
