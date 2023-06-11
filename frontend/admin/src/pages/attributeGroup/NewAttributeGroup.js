import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

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
import { useEffect, useState } from 'react';
import AddAttributeGroupValidationSchema from '../../validation/AddAttributeGroupValidationSchema';
import axiosClient from '../../axios-client';
import AlertSuccess from '../../components/alert/AlertSuccess';
import AlertError from '../../components/alert/AlertError';


export default function NewAttributeGroupPage() {

  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [categoryId, setCategoryId] = useState(0);
  const [categories, setCategories] = useState([]);
  
  const [saving, setSaving] = useState(false);


  useEffect(() => {
    axiosClient.get('categories').then(({ data }) => {
      setCategories(data.data);
      setCategoryId(data.data[0].id);
      console.log(data);
    })
      .catch((err) => {
        console.log(err);
      })
  }, []);


  const handelCategoryIdChange = (e) => {
    setCategoryId(e.target.value);
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(AddAttributeGroupValidationSchema)
  });

  const onSubmit = formData => {
    setSaving(true);

    const payload = {
      attrKey: formData.attrKey,
      attrValues: formData.attrValues,
      category:{
        id:categoryId
      }
    }
  
    axiosClient.post('/attribute_groups/insert', payload)
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



  const CategoriesCard = () => {
    return (
      <>
        <Card sx={{ m: 2, padding: '20px' }}>
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label" sx={{ marginY: '20px' }}>Category</FormLabel>
            <RadioGroup defaultValue={categoryId} name="radio-buttons-group" >
              {
                categories.map((category) => {
                  return (
                    <FormControlLabel key={category.id} onChange={handelCategoryIdChange} value={category.id} control={<Radio />} label={category.name} />
                  )
                })
              }

            </RadioGroup>
          </FormControl>
        </Card>
      </>
    )
  }


  const FormCard = () => {
    return (
      <>
        <Card sx={{ m: 2, padding: '20px' }}>
          <TextField
            id="attrKey"
            name="attrKey"
            label="attrKey"
            fullWidth
            margin="dense"
            {...register('attrKey')}
            error={errors.attrKey}
          />
          <Typography variant="inherit" color="textSecondary">
            {errors.attrKey?.message}
          </Typography>

          <TextField
            id="attrValues"
            name="attrValues"
            label="attrValues"
            fullWidth
            margin="dense"
            {...register('attrValues')}
            error={errors.attrValues}
          />
          <Typography variant="inherit" color="textSecondary">
            {errors.attrValues?.message}
          </Typography>

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
      </>
    )
  }

  return (
    <>
      <Helmet>
        <title> Create Attribute Group </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Create Attribute Group
          </Typography>
        </Stack>
          {openSuccess ? <AlertSuccess /> : <></>}
          {openError ? <AlertError /> : <></>}
        <CategoriesCard />
        <FormCard />
      </Container>
    </>
  );
}
