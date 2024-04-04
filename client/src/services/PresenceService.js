import axios from "axios";
import { basicurl } from "./config";

export const getPresencesByUsername = async (username) => {
    try {
        let res = await axios.get(`${basicurl}/presence/${username}`);
        if (res.status === 200) {
            return res.data;
        }
    }
    catch (err) {
        return err.response.data;
    }
}

export const setPresencesByUsername = async (username, date, start, end) => {
    try {
        const body = { date, start, end };
        let res = await axios.post(`${basicurl}/presence/${username}`, body);
        if (res.status === 200) {
            return res.data;
        }
    }
    catch (err) {
        return err.response?.data;
    }
}

export const setPresencesListByUsername = async (username,presences) => {
    try {
        const body = { presences };
        let res = await axios.post(`${basicurl}/presence/${username}/all`, body);
        if (res.status === 200) {
            return res.data;
        }
    }
    catch (err) {
        return err.response?.data;
    }
}