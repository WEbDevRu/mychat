let initialState = {
    modalIsOpen:  false,
    isInitialized: false
}


const appReducer =(state =initialState, action) =>{
    switch (action.type){
        case "app/TOGGLE_MODAL":
            return{
                ...state,
                modalIsOpen: action.isOpen
            }
        case "app/TOGGLE_IS_INITIALIZED":
            return {
                ...state,
                isInitialized: true
            }
        default:
            return state
    }
}


export const toggleModalState = (isOpen) => ({
    type: "app/TOGGLE_MODAL",
    isOpen: isOpen
})

export const toggleIsInitialized = () =>({
    type: "app/TOGGLE_IS_INITIALIZED"
})


export  default appReducer
