let initialState = {
    isAuth: false,
    name: '',
    avatarColor: '',
    chatsList: []
}


const authReducer =(state =initialState, action) =>{
    switch (action.type){
        case "auth/TOGGLE_IS_AUTH":
            return{
                ...state,
               isAuth: action.isAuth
            }
        case "auth/SET_AUTH_INFO":
            return {
                ...state,
                name: action.name,
                avatarColor: action.avatarColor,
                chatsList: action.chats
            }
        default:
            return state
    }
}


export const toggleIsAuth = (isAuth) => ({
    type: "auth/TOGGLE_IS_AUTH",
    isAuth: isAuth
})

export const setAuthInfo = (data) =>({
    type: "auth/SET_AUTH_INFO",
    name: data.name,
    avatarColor: data.avatarColor,
    chatsList: data.chats
})



export  default authReducer
