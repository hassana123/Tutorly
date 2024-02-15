const AuthReducer = (state, action) => {
  console.log("Action received:", action);
  switch (action.type) {
    case "LOGIN":
      return {
        currentUser: action.payload,
      };
    case "UPDATE":
      return {
        currentUser: action.payload,
      };
    case "LOGOUT":
      return {
        currentUser: null,
      };

    default:
      return state;
  }
};

export default AuthReducer;
