import axios from "axios";
import { basicurl } from "./config";

export const signInUser = async (username, password) => {
    const body = { username, password }
    try {
        let res = await axios.post(`${basicurl}/user/signin`, body);
        if (res.status===200) {
            return res.data;
        }
    }
    catch (err) {
        return err.response.data;
    }
}

export const signUpUser = async (firstName, lastName, username, password) => {
    const body = { firstName, lastName, username, password }
    try {
        let res = await axios.post(`${basicurl}/user/signup`, body);
        if (res.status===200) {
            return res.data;
        }
    }
    catch (err) {
        return err.response.data;
    }
}