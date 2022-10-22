const defaultSate = {
  myKey:1
}

export default (state=defaultSate,action) =>{
  let newState = JSON.parse(JSON.stringify(state))
  switch(action.type){
    case "AddKeyFn":
      newState.myKey++
    default:
      break
  }
}