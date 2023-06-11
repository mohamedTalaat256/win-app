import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import ReactFileReader from "react-file-reader";
import { Camera } from '@mui/icons-material';

// @mui
import {
  Card,
  Container,
  Typography,
  Grid, Stack, TextField, Divider, Button
} from '@mui/material';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useState } from 'react';
import { Box } from '@mui/system';
import AddCategoryValidationSchema from '../../validation/AddCategoryValidationSchema';
import axiosClient from '../../axios-client';
import AlertSuccess from '../../components/alert/AlertSuccess';
import AlertError from '../../components/alert/AlertError';


export default function NewCategoryPage() {

  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [status, setStatus] = useState(0);
  const [saving, setSaving] = useState(false);

  const [image, setImage] = useState('../assets/images/Placeholder_view_vector.png');

  const handelStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(AddCategoryValidationSchema)
  });

  const onSubmit = formData => {

    setSaving(true);
    formData.isActive = status;
    formData.image = image;

      axiosClient.post('/categories/insert', formData)
      .then(({ data }) => {
        
        if (data.success) {
          setOpenSuccess(true);
          reset();
          setSaving(false);
        }
      })
      .catch((err) => {
        setOpenError(true);
        setSaving(false);
      }) 
  };



  const GeneralCard = () => {
    return (<>
      <Card sx={{ m: 2, padding: '20px' }}>
        {openSuccess ? <AlertSuccess /> : <></>}
        {openError ? <AlertError /> : <></>}
        <Stack spacing={3}>
          <Typography>General</Typography>
          <TextField
            required
            id="name"
            name="name"
            label="Name"
            fullWidth
            margin="dense"
            {...register('name')}
            error={errors.name}
          />
          <Typography variant="inherit" color="textSecondary">
            {errors.name?.message}
          </Typography>

          <TextField
            required
            id="description"
            name="description"
            label="description"
            fullWidth
            margin="dense"
            {...register('description')}
            error={errors.description}
          />
          <Typography variant="inherit" color="textSecondary">
            {errors.description?.message}
          </Typography>
        </Stack>
      </Card>
    </>)
  }



  const handleFiles = (files) => {
    setImage(files.base64);
   
  };


  const MediaCard = () => {
    return (<>
      <Card sx={{ m: 2, padding: '20px' }}>
        <Typography>Media</Typography>

        <img src={image} height={'200px'} alt="cat_photo" />
        <ReactFileReader  fileTypes={[".png", ".jpg"]} base64 handleFiles={handleFiles} >
         <Button variant="contained" color="primary" sx={{margin: 2}}><Camera/> upload image</Button>
        </ReactFileReader>

        <Divider sx={{ marginTop: '50px' }} />
        <Grid item container spacing={2} columns={12} sx={{ margin: '20px' }} >
          <Grid item xs={6} ><Button variant="outlined" >cancel </Button> </Grid>
          {
            saving
            ? <Grid item xs={6} ><Button variant="contained" color="warning" >saving... </Button></Grid>
            : <Grid item xs={6} ><Button variant="contained" color="primary" onClick={handleSubmit(onSubmit)} >save </Button></Grid>
          }
        </Grid>

      </Card>
    </>)
  }


  return (
    <>
      <Helmet>
        <title> Create A New Category </title>
      </Helmet>

      <Container  maxWidth="xl">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Create A New Category
          </Typography>
        </Stack>

        <Box >
          <Grid item container spacing={3} columns={12} >

            <Grid item xs={8} >
              <GeneralCard />
              <MediaCard />
            </Grid>


            <Grid item xs={4} >
              <Card sx={{ m: 2, padding: '20px' }}>
                <Typography variant='h5' >
                  Category status
                </Typography>
                <FormControl>
                  <FormLabel id="demo-radio-buttons-group-label" sx={{ marginY: '20px' }}>status</FormLabel>
                  <RadioGroup
                    defaultValue="0"
                    name="radio-buttons-group">

                    <FormControlLabel onChange={handelStatusChange} value="0" control={<Radio />} label="Not Active" />
                    <FormControlLabel onChange={handelStatusChange} value="1" control={<Radio />} label="Active" />
                  </RadioGroup>
                </FormControl>
                <Divider sx={{ height: '20px' }} />
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
}
