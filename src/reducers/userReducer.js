const user = (state = {}, action) => {
  switch (action.type) {
    case 'SIGN_UP_USER':
      return action.userInfo;
  
    case 'SIGN_IN_USER':
      return action.userInfo;

    case 'SIGN_OUT_USER':
      return {};

    default:
      return state;
  }
};

export default user;