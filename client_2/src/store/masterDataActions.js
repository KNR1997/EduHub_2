// masterDataActions.js
export const setMasterData = (data) => ({
  type: "SET_MASTER_DATA",
  payload: data,
});

export const fetchMasterData = () => {
  // Implement your async logic here to fetch master data from the backend
  return async (dispatch) => {
    try {
      const response = await fetch("your-backend-api-endpoint");
      const data = await response.json();
      dispatch(setMasterData(data));
    } catch (error) {
      console.error("Error fetching master data:", error);
    }
  };
};
