import React, { useState, useEffect } from 'react';
import PresencesList from './PresencesList';
import { Grid, Alert, Snackbar, Typography, Button } from '@mui/material';
import { getPresencesByUsername } from '../../services/PresenceService';

const AdminView = () => {
    const [presencesData, setPresencesData] = useState([]);
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');


    const getUserData = async () => {
        const response = await getPresencesByUsername('admin')
        if (response[0]?.username) {
            setPresencesData(response)
        }
        else if (response.length !== 0) {
            setOpen(true)
            setMessage(response)
        }
    }

    useEffect(() => {
        getUserData();
    }, []);

    return (
        <>
            <Snackbar open={open} autoHideDuration={6000} onClose={() => setOpen(false)}>
                <Alert
                    onClose={() => setOpen(false)}
                    severity={'error'}
                    sx={{ width: '100%' }}
                >
                    {message}
                </Alert>
            </Snackbar>
            <Grid container sx={{
                p: 2,
                borderRadius: 2,
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                paddingTop: '50px'
            }}>
                {
                    presencesData.map((user, index) =>
                    (
                        <Grid xs={10} item>
                            <PresencesList username={user.username} name={`${user.firstName} ${user.lastName}`} data={user.presences} editable={true} onSave={(data) => console.log(data)} />
                        </Grid>
                    ))
                }
            </Grid>
        </>
    )
}
export default AdminView;