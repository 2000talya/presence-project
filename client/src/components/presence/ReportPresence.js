import React, { useState, useEffect } from 'react';
import {
    Grid,
    Paper,
    Alert,
    Box,
    Snackbar,
    Button,
    Typography
} from '@mui/material'
import { styled, } from '@mui/material/styles';
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker, TimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import PresencesList from './PresencesList';
import { useParams } from 'react-router-dom';
import { getPresencesByUsername, setPresencesByUsername } from '../../services/PresenceService';
import { getCurrentDate } from '../../services/TimeService';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    lineHeight: '60px',
    padding: '40px',
}));

const ReportPresence = () => {
    const [presencesData, setPresencesData] = useState([]);
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [currentLocalDate, setLocalCurrentDate] = useState();
    const [currentLocalTime, setLocalCurrentTime] = useState();
    const [startTime, setStartTime] = useState();
    const [endTime, setEndTime] = useState();
    const [dateTime, setDateTime] = useState();

    const params = useParams();
    const username = params.username;

    const getUserData = async () => {
        const response = await getPresencesByUsername(username)
        if (response[0]?.date) {
            setPresencesData(response)
        }
        else if (response.length !== 0) {
            setOpen(true)
            setMessage(response)
        }
    }

    const getTimes = async () => {
        const berlinDate = await getCurrentDate();

        setLocalCurrentDate(dayjs(berlinDate.date, 'DD/MM/YYYY'));
        setLocalCurrentTime(dayjs(berlinDate.time, "HH:mm"));
        setDateTime(dayjs(berlinDate.date, 'DD/MM/YYYY'));

    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const start = dayjs(startTime).format('HH:mm');
        const end = dayjs(endTime).format('HH:mm');

        const response = await setPresencesByUsername(username, dateTime, start, end)
        if (response.username) {
            setMessage('Updated');
            setOpen(true);
            getUserData();
        }
        else {
            setMessage(response);
            setOpen(true);
        }
        setOpen(true);
    };

    useEffect(() => {
        getUserData();
        getTimes();
    }, []);

    return (
        <>
            <Snackbar open={open} autoHideDuration={6000} onClose={() => setOpen(false)}>
                <Alert
                    onClose={() => setOpen(false)}
                    severity={message !== 'Updated' ? 'error' : 'success'}
                    sx={{ width: '100%' }}
                >
                    {message}
                </Alert>
            </Snackbar>
            <Grid container sx={{
                pt: 2,
                pb: 2,
                borderRadius: 2,
                height: '100%',
                display: 'flex',
                alignItems: 'center',
            }}>
                <Grid item xs={12}>
                    <Typography variant="h6" gutterBottom>
                        Hello {username}
                    </Typography>
                </Grid>
                <Grid item sm={10}>
                    <Item elevation={3}>
                        <Box component="form" onSubmit={handleSubmit}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['TimePicker']}>
                                    <DemoItem>
                                        <DatePicker
                                            inputFormat="DD/MM/YYYY"
                                            format="DD/MM/YYYY"

                                            label="Day"
                                            value={currentLocalDate || null}
                                            views={['day', 'month', 'year']}
                                            slotProps={{ typography: { textAlign: 'right' } }}
                                            onChange={(newValue) => setDateTime(dayjs(newValue))}
                                        />
                                    </DemoItem>
                                    <DemoItem>
                                        <TimePicker label="Start" value={currentLocalTime} onChange={(newValue) => setStartTime(dayjs(newValue))} />
                                    </DemoItem>
                                    <DemoItem>
                                        <TimePicker label="End" value={currentLocalTime} minTime={startTime} onChange={(newValue) => setEndTime(dayjs(newValue))} />
                                    </DemoItem>
                                    <Button type='submit' variant="contained">Update</Button>
                                </DemoContainer>
                            </LocalizationProvider>
                        </Box>
                    </Item>
                </Grid>
                <Grid item sm={8} mt={4}>
                    <PresencesList data={presencesData} editable={false} />
                </Grid>
            </Grid>
        </>

    )
}
export default ReportPresence;