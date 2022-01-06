const INIT_STATE = {
    conversation: []
}
 
 const ConversationReducer = (state =INIT_STATE ,action) => {
     console.log(state)
     switch(action.type){
                case 'Get-Conversation':
                    return {
                        ...state,
                        conversation: action.result ,
                    }
                      
                    default: 
                    return state;
            }
 }
 export default ConversationReducer;