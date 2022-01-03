const INIT_STATE = {
    user: null
}
 
 const AuthReducer = (state =INIT_STATE ,action) => {
     console.log({type:action.type})
     switch(action.type){
                case 'Login':
                    return {
                        ...state,
                        user: action.result ,
                    }
                      
                    default: 
                    return state;
            }
 }
 export default AuthReducer;