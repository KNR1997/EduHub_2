// masterDataReducer.js
const initialState = {
  // Define initial state for your master data here
  // Example: masterData: null,
};

const masterDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_MASTER_DATA":
      return {
        ...state,
        masterData: action.payload,
      };
    default:
      return state;
  }
};

export default masterDataReducer;
