import axios from "axios";

let authTokens = localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null;

const params = {
    headers: {
        Authorization: "Bearer " + authTokens?.access
    },
};

export const getData = async (url) => {
    try {
        const {data} = await axios.get(
            "https://localhost:7099/" + url, 
        );
        return data;
    } catch (error) {
        console.log(error)
        return error;
    }
};

export const postData = async (url, requestData) => {
    try {
        const { data } = await axios.post(
            // axios.put(url, data, config) -> this is the order, change it may cause errors
            process.env.REACT_APP_DEV_URL + url,
            requestData,
        );
        return data;
    } catch (error) {
        console.log(error);
        return error;
    }
};

export const putData = async (url, requestData) => {
    try {
        const { data } = await axios.put(
            // axios.put(url, data, config) -> this is the order, change it may cause errors
            process.env.REACT_APP_DEV_URL + url,
            requestData,
        );
        return data;
    } catch (error) {
        console.log(error);
        return error;
    }
};

export const deleteData = async (url) => {
    try {
        const { data } = await axios.delete(
            process.env.REACT_APP_DEV_URL + url,
        );
        return data;
    } catch (error) {
        console.log(error);
        return error;
    }
};