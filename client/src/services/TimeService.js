import { timeurl } from './config';
import axios from 'axios';
import moment from 'moment';

export const getCurrentDate = async () => {
    try {
        let res = await axios.get(`${timeurl}`);
        if (res.status === 200) {
            const date = moment(res.data.datetime).format('DD/MM/YYYY');
            const time = res.data.datetime.slice(11, 16);
            const timeSecond = res.data.datetime.slice(11, 19);
            return { date, time ,timeSecond};
        }
    }
    catch (err) {
        return err.response.data;
    }
}