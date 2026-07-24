const AuthReducer = (state, action) => {
    switch(action.type){
        case "LOGIN_USER":
            return {
                ...state,
                ...action.payload,
                loading:false,
            }
        case "LOGOUT_USER":
            return {
                ...state,
                ...action.payload,
                loading:false,
            }
        case "REGISTER_USER":
            return {
                ...state,
                ...action.payload,
                loading:false,
            }
        default:
            return {...state}
    }
}

export default AuthReducer