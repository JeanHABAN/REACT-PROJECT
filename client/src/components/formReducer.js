const formReducer = (state, action) =>{
  switch(action.type){
    case "handle input text":
        return{
            ...state,
            [action.field] : action.payload,
        };
    default:
        return state;

  }
}

export default formReducer;