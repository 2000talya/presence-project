
import React, { useState, useEffect } from 'react';
import {
    TableContainer,
    Paper,
    Box,
    Button,
    Grid,
    Typography,
    Snackbar,
    Alert
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker, TimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { setPresencesListByUsername } from '../../services/PresenceService';
import { Delete } from '@mui/icons-material';

const PresencesList = ({ editable, data, name, username }) => {
    const [rows, setRows] = useState([]);
    const [pureData, setPureData] = useState([]);
    const [rowsUpdated, setRowsUpdated] = useState([]);
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');

    const handleSave = async () => {
        const response = await setPresencesListByUsername(username, rowsUpdated)
        if (response.username) {
            setMessage('Updated');
            setOpen(true);
        }
        else {
            setMessage(response);
            setOpen(true);
        }
        setOpen(true);
    }

    const handleChange = (field, id, value) => {

        let arr = [];
        debugger
        if (field === 'date')
            arr = rowsUpdated.map(r => r.id === id ? { ...r, date: value } : r);
        if (field === 'start')
            arr = rowsUpdated.map(r => r.id === id ? { ...r, start: dayjs(value).format('HH:mm') } : r);
        if (field === 'end')
            arr = rowsUpdated.map(r => r.id === id ? { ...r, end: dayjs(value).format('HH:mm') } : r);
        if (field === 'delete') {
            arr = rowsUpdated.filter(r => r.id !== id);
            let arr1 = rows.filter(r => r.id !== id);
            setRows(arr1)
        }
        if (field === 'add') {
            arr = [...rowsUpdated, { id: rowsUpdated.length + 1, date: dayjs(), start: '', end: '' }];
            let arr1 = [...rows, { id: rows.length + 1, date: dayjs(), start: '', end: '' }];
            setRows(arr1)
        }
        if (field === 'cancel') {
            setRowsUpdated(pureData);
            setRows([...pureData]);
        }
        console.log('update', arr)
        setRowsUpdated(arr);
    }

    useEffect(() => {
        const arr = data.map((item, index) => (
            {
                id: index + 1,
                date: item.date,
                start: item.start,
                end: item.end,
            }));

        setRows(arr);
        setRowsUpdated(arr);
        setPureData(arr);
    }, [data]);

    const columns = [
        {
            field: 'date1',
            headerName: 'Date',
            width: 250,
            renderCell: (params) => {
                console.log('params', params)
                return (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DatePicker']}>
                            <DemoItem>
                                <DatePicker
                                    disabled={!editable}
                                    inputFormat="DD/MM/YYYY"
                                    format="DD/MM/YYYY"
                                    value={dayjs(params.row.date)}
                                    views={['day', 'month', 'year']}
                                    slotProps={{ typography: { textAlign: 'right' } }}
                                    onChange={(newValue) => handleChange('date', params.row.id, dayjs(newValue))}
                                />
                            </DemoItem>
                        </DemoContainer>
                    </LocalizationProvider>
                )
            }
        },
        {
            field: 'start',
            headerName: 'Start',
            width: 250,
            renderCell: (params) => {
                return (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['TimePicker']}>
                            <DemoItem>
                                <TimePicker disabled={!editable} value={dayjs(params.row.start, "HH:mm")} onChange={(newValue) => handleChange('start', params.row.id, newValue)} />
                            </DemoItem>
                        </DemoContainer>
                    </LocalizationProvider>
                )
            }
        },
        {
            field: 'end',
            headerName: 'End',
            width: 250,
            renderCell: (params) => {
                return (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['TimePicker']}>
                            <DemoItem>
                                <TimePicker minTime={dayjs(params.row.start)} disabled={!editable} value={dayjs(params.row.end, "HH:mm")} onChange={(newValue) => handleChange('end', params.row.id, newValue)} />
                            </DemoItem>
                        </DemoContainer>
                    </LocalizationProvider>
                )
            }
        },
        editable && {
            field: 'dateee',
            headerName: 'Action',
            width: 160,
            renderCell: (params) => {
                return (
                    <Button onClick={() => handleChange('delete', params.row.id, true)} color="error" variant="outlined" startIcon={<Delete />}>
                        Delete
                    </Button>
                )
            }
        }

    ];


    return (
        <Box>
            <Snackbar open={open} autoHideDuration={6000} onClose={() => setOpen(false)}>
                <Alert
                    onClose={() => setOpen(false)}
                    severity={message !== 'Updated' ? 'error' : 'success'}
                    sx={{ width: '100%' }}
                >
                    {message}
                </Alert>
            </Snackbar>
            {
                editable && <Box pb={1} mt={4} xs={7} display={'flex'} justifyContent={'space-between'}>
                    <Grid>
                        <Typography variant="h6" gutterBottom>
                            {name}
                        </Typography>
                    </Grid>
                    <Grid>
                        <Button m={2} variant="contained" gutterBottom onClick={handleSave}>
                            Save
                        </Button>
                        <Button ml={2} variant="contained" gutterBottom onClick={() => handleChange('add', 0, true)}>
                            Add
                        </Button>
                        <Button ml={2} variant="contained" gutterBottom onClick={() => handleChange('cancel', 0, true)}>
                            Cancel
                        </Button>
                    </Grid>
                </Box>
            }
            <TableContainer component={Paper} sx={{ marginTop: '5px' }}>
                <Box sx={{ height: 400, width: '100%' }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: {
                                    pageSize: 5,
                                },
                            },
                        }}
                        pageSizeOptions={[5]}
                        disableRowSelectionOnClick
                        rowHeight={70}
                    />
                </Box>
            </TableContainer>
        </Box>
    )
}

export default PresencesList;