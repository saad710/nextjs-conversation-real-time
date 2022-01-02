const INIT_STATE = {
   test:[
    {
        "name" : "saad",
        "id" : "5"
    },
    {
        "name" : "ifrat",
        "id" : "6"
    },
    
],
pro: null,
  };

const TestReducer = (state =INIT_STATE ,action) => {
    console.log({type:action.type})
    switch(action.type){
        case 'test-data':
            return {
                ...state,
                test: action.result ,
            } ;
            case 'pro-data':
            return {
                ...state,
                pro:action.result ,
            } ;

            default: 
            return state;
    }
}
export default TestReducer;