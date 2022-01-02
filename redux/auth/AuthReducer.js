const INIT_STATE = {
    user: "TEST"
}
 
 const AuthReducer = (state =INIT_STATE ,action) => {
     console.log({type:action.type})
     switch(action.type){
                case 'Login':
                    return {
                        ...state,
                        user: action.result ,
                    }
                    case "TEST":{
                        return "TEST"
                    }      
                    default: 
                    return state;
            }
 }
 export default AuthReducer;