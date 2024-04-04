import React, { useEffect, useState, useRef } from 'react';
import { getCurrentDate } from '../../services/TimeService';
import { Typography,Grid } from '@mui/material'

const GermanyDateTime = () => {
    const [currentLocalDate, setLocalCurrentDate] = useState();
    const [currentLocalTime, setLocalCurrentTime] = useState();
    const timeRef = useRef();

    const updateTime = () => {
        let timeSecond = timeRef.current?.innerText;
        let hours, minutes, seconds;
        hours = Number(timeSecond.slice(0, 2));
        minutes = Number(timeSecond.slice(3, 5));
        seconds = Number(timeSecond.slice(6, 9));
        if (seconds === 59 && minutes === 59) {
            seconds = '00'
            minutes = '00'
            hours = hours >= 9 ? hours + 1 : `0${hours + 1}`
        }
        else
            if (seconds === 59) {
                seconds = '00'
                minutes = minutes >= 9 ? minutes + 1 : `0${minutes + 1}`
                hours = hours > 9 ? hours : `0${hours}`
            }
            else {
                seconds = seconds >= 9 ? seconds + 1 : `0${seconds + 1}`
                minutes = minutes > 9 ? minutes : `0${minutes}`
                hours = hours > 9 ? hours : `0${hours}`

            }
        // setLocalCurrentTime(`${hours}:${minutes}:${seconds}`);
        timeRef.current.innerText = `${hours}:${minutes}:${seconds}`
    }

    const getTimes = async () => {
        const berlinDate = await getCurrentDate();
        setLocalCurrentDate(berlinDate.date);
        setLocalCurrentTime(berlinDate.timeSecond);
        timeRef.current.innerText = berlinDate.timeSecond;
        setInterval(() => updateTime(), 1000);
    }

    useEffect(() => {
        getTimes();
    }, []);

    console.log(currentLocalTime)
    console.log(currentLocalDate)

    return (
        <Grid display="flex" mt={4}>
            <Typography mr={2}>{currentLocalDate}</Typography>
            <Typography ref={timeRef}>{'00:00:00'}</Typography>
        </Grid>
    )
}
export default GermanyDateTime;