import { Helmet } from 'react-helmet-async';

import {
    Card,
    Container,
    Typography,
    Grid, Stack, TextField, Button, IconButton
} from '@mui/material';
import axiosClient from '../axios-client';

import { useState } from 'react';
import { Box } from '@mui/system';
import ReactFileReader from "react-file-reader";
import AlertSuccess from '../components/alert/AlertSuccess';
import AlertError from '../components/alert/AlertError';
import baseUrl from './../baseUrl';
import { ContextProvider, useStateContext } from '../context/ContextProvider';
import CameraAltIcon from '@mui/icons-material/CameraAlt';


export default function ProfilePage(props) {

    const { user, setUser } = useStateContext(ContextProvider);

    const [openSuccess, setOpenSuccess] = useState(false);
    const [openError, setOpenError] = useState(false);
    const [saving, setSaving] = useState(false);
    const [images, setImages] = useState(baseUrl+'/media/'+user.image);


    const [formData, setFormData] = useState({});


    const handelChange = (attr, value) => {

        formData[attr] = value;

        setFormData(formData);

        console.log(formData);
    }


    const onSubmit = () => {


        setSaving(true);
        const payload = {
            id: Number(user.id),
            fullName: formData.fullName,
            userName: formData.userName,
            image: images
        }
        console.log(payload);


        axiosClient.put('/users/update', payload)
            .then(({ data }) => {
                console.log(data);

                if (data.success) {
                    setOpenError(false);
                    setOpenSuccess(true);
                    setSaving(false);
                    setUser(data.data);

                }
            })
            .catch((err) => {
                setOpenError(true);
                setSaving(false);
            })
    };




    const handleFiles = (files) => {
        setImages(files.base64);
    };




    return (
        <>
            <Helmet>
                <title> Profile </title>
            </Helmet>
            <Container maxWidth="xl">
                <Typography variant="h4" gutterBottom>Update Profile</Typography>
                <Card sx={{ mt: 2, padding: 5 }}>
                {openSuccess ? <AlertSuccess /> : <></>}
          {openError ? <AlertError /> : <></>}


                    <Box sx={{ width: 300, margin: 'auto' }}>
                        <Stack direction={'column'} spacing={2} sx={{mb:5}}>
                            <Stack direction={'column'} alignItems={'center'}>
                                <img src={images} height={'200px'} width={'200px'} alt={"cat_photo".img} style={{ borderRadius: '50%' }} />
                                <ReactFileReader fileTypes={[".png", ".jpg"]} base64 handleFiles={handleFiles} >
                                    <IconButton color="primary" sx={{ mt: -10 }}><CameraAltIcon /></IconButton>
                                </ReactFileReader>
                            </Stack>

                            <Typography variant='h5'>Full name</Typography>
                            <TextField
                                onChange={(e) => handelChange('fullName', e.target.value)}
                                defaultValue={user.fullName}
                                id="fullName"
                                name="fullName"
                            />


                            <Typography variant='h5'>Username</Typography>
                            <TextField
                                onChange={(e) => handelChange('userName', e.target.value)}
                                defaultValue={user.userName}
                                id="userName"
                                name="userName"

                            />



                        </Stack>
                     


                        {
                            saving
                                ? <Grid item xs={6} ><Button variant="contained" fullWidth color="warning" >saving... </Button></Grid>
                                : <Grid item xs={6} ><Button variant="contained" fullWidth color="primary" onClick={() => onSubmit()} >save </Button></Grid>
                        }

                    </Box>
                </Card>
            </Container>

        </>
    );
}
