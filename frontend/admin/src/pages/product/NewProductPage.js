import { Helmet } from 'react-helmet-async';

// @mui
import {
  Card,
  Container,
  Typography,
  Grid, Stack, TextField, Divider, Button, MenuItem, Select, IconButton
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import axiosClient from '../../axios-client';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useEffect, useState } from 'react';
import { Box } from '@mui/system';
import ReactFileReader from "react-file-reader";
import { Camera, CameraAlt } from '@mui/icons-material';
import AddProductValidationSchema from '../../validation/AddProductValidationSchema';
import AlertSuccess from '../../components/alert/AlertSuccess';
import AlertError from '../../components/alert/AlertError';

export default function NewProductPage() {

  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [categories, setCategories] = useState([]);
  const [attributeGroups, setAattributeGroups] = useState([]);
  const [productSpecification, setProductSpecification] = useState([]);
  const [isActive, setIsActive] = useState(0);
  const [categoryId, setCategoryId] = useState(0);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState('../assets/images/Placeholder_view_vector.png');
  const [message, setMessage] = useState('');
  useEffect(() => {
    getCategories();
  }, []);

  function getCategories() {
    axiosClient.get('categories').then(({ data }) => {
      setCategories(data.data);
      setCategoryId(data.data[0].id);
      getAttributes(data.data[0].id);

    }).catch((err) => {
      console.log(err);
    })
  }

  function getAttributes(id) {
    setProductSpecification([]);
    setLoading(true);
    axiosClient.get('attribute_groups/' + id).then(({ data }) => {
      setAattributeGroups(data.data);
      setLoading(false);

    }).catch((err) => {
      console.log(err);
      setLoading(false);

    })
  }

  const [finalObject, setFinalObject] = useState([]);


  function clearSpecification(specification) {
    //take array of objects
    const keysArr = [];

    setProductSpecification([]);
    specification.map((item) => {

      if (!keysArr.includes(item.skey)) {
        keysArr.push(item.skey);

        var rowItem = {};
        rowItem.skey = item.skey;
        rowItem.svalue = item.svalue;
        finalObject.push(rowItem);
      }
      setFinalObject(finalObject);
    })
  }

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(AddProductValidationSchema)
  });
  const onSubmit = formData => {
    clearSpecification(productSpecification.reverse());




    setSaving(true);
    const payload = {
      product: {
        name: formData.name,
        description: formData.description,
        sku: formData.sku,
        price: formData.price,
        rating: 2.00,
        discount: formData.discount,
        stockQti: formData.stockQti,
        images: images,
        isActive: isActive,
        category: {
          id: Number(categoryId)
        }
      },
      specifications: finalObject
    }
    console.log(payload);


    axiosClient.post('/products/insert', payload)
      .then(({ data }) => {
        console.log(data);

        if (data.success) {
          setMessage(data.message);
          setOpenError(false);
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

  const handelIsActiveChange = (e) => {
    setIsActive(e.target.value);
  };
  const handelCategoryIdChange = (e) => {
    setCategoryId(e.target.value);
    var id = e.target.value;
    getAttributes(id);
  };



  const handelSpecificationChange = (skey, svalue) => {

    var item = {};
    item.skey = skey;
    item.svalue = svalue;


    const isObjectPresent = productSpecification.find((o) => o.skey === svalue);

    if (isObjectPresent) {
      const index = productSpecification.findIndex(el => el.skey === svalue);
      if (index >= 0) {
        productSpecification.splice(index, 1);
        productSpecification.push(item);

      }
    } else {
      productSpecification.push(item);
    }
    console.clear();
    console.log(productSpecification);

  }

  const GeneralCard = () => {
    return (<>
      <Card sx={{ padding: 2 }}>

        <Stack spacing={1} sx={{ padding: 2 }}>
          {openSuccess ? <AlertSuccess message={message} /> : <></>}
          {openError ? <AlertError message={message} /> : <></>}
          <Typography variant='h4'>General</Typography>

          <Grid container spacing={1} columns={12}>
            <Grid item xs={6}  >
              <TextField
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
            </Grid>


            <Grid item xs={6} >
              <TextField
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
            </Grid>


          </Grid>

          <Grid item container spacing={1} columns={12}>
            <Grid item xs={3} >
              <TextField
                id="sku"
                name="sku"
                label="sku"
                {...register('sku')}
                error={errors.sku}
              />
              <Typography variant="inherit" color="textSecondary">
                {errors.sku?.message}
              </Typography>
            </Grid>
            <Grid item xs={3} >
              <TextField
                id="price"
                name="price"
                label="price"
                {...register('price')}
                error={errors.price}
              />
              <Typography variant="inherit" color="textSecondary">
                {errors.price?.message}
              </Typography>
            </Grid>
            <Grid item xs={3} >
              <TextField
                id="discount"
                name="discount"
                label="discount"
                {...register('discount')}
                error={errors.discount}
              />
              <Typography variant="inherit" color="textSecondary">
                {errors.discount?.message}
              </Typography>
            </Grid>



            <Grid item xs={3}>
              <TextField
                required
                id="stockQti"
                name="stockQti"
                label="stockQti"
                {...register('stockQti')}
                error={errors.stockQti}
              />
              <Typography variant="inherit" color="textSecondary">
                {errors.stockQti?.message}
              </Typography>
            </Grid>
          </Grid>
        </Stack>

      </Card>
    </>)
  }

  const handleFiles = (files) => {
    setImages(files.base64);
  };

  const MediaCard = () => {
    var i = 0;
    return (
      <Card sx={{ mt: 2, padding: 2 }}>
        <Typography variant='h4'>Media</Typography>
       

        <Stack direction={'row'}  justifyContent="space-between" style={{ alignItems: 'center' }}>
          <Stack direction={'column'} style={{ alignItems: 'center' }}>
            <img src={images} height={'200px'} alt={"cat_photo".img} />
            <ReactFileReader fileTypes={[".png", ".jpg"]} base64 handleFiles={handleFiles} >
              <IconButton variant="contained" color="primary" sx={{ mt: -20 }}><CameraAlt /></IconButton>
            </ReactFileReader>
          </Stack>

          <FormControl sx={{padding:4}}>
            <FormLabel id="demo-radio-buttons-group-label" sx={{ marginY: '20px' }}>Active Status</FormLabel>
            <RadioGroup defaultValue="0" name="radio-buttons-group">
              <FormControlLabel onChange={handelIsActiveChange} value="0" control={<Radio />} label="Not visible" />
              <FormControlLabel onChange={handelIsActiveChange} value="1" control={<Radio />} label="Visible" />
            </RadioGroup>
          </FormControl>
        </Stack>




        <Divider sx={{ marginTop: '50px' }} />
        <Grid container spacing={2} columns={12} sx={{ margin: '20px' }} >
          <Grid item xs={6} ><Button variant="outlined" >cancel </Button> </Grid>

          {
            saving
              ? <Grid item xs={6} ><Button variant="contained" color="warning" >saving... </Button></Grid>
              : <Grid item xs={6} ><Button variant="contained" color="primary" onClick={handleSubmit(onSubmit)} >save </Button></Grid>
          }

        </Grid>

      </Card>
    )
  }

  const CategoriesCard = () => {
    return (<>
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
    </>);

  }

  const AttributeGroupCard = () => {

    return (<>
      <Card sx={{ m: 2, padding: '20px' }}>
        <Typography variant="subtitle1">Specification</Typography>
        {
          loading
            ?
            <Typography variant="subtitle2" noWrap>loading...</Typography>
            :
            <>
              {
                attributeGroups.map((attribute) => {
                  var values = attribute.attrValues.split(',');



                  return (
                    <Grid item key={attribute.id} container spacing={1} columns={12} sx={{ py: 1, width: '100%' }}>
                      <Grid item xs={4} >
                        <Typography variant="subtitle2" noWrap>{attribute.attrKey}</Typography>
                      </Grid>
                      <Grid item xs={8} >
                        <Select required fullWidth key={attribute.attrKey} onChange={(e) => handelSpecificationChange(attribute.attrKey, e.target.value)} sx={{ height: '40px' }}>
                          {
                            values.map((value) => {
                              return (<MenuItem key={value} value={value}>{value}</MenuItem>)
                            })
                          }
                        </Select>
                      </Grid>
                    </Grid>

                  )
                })
              }
            </>
        }
      </Card>
    </>);
  }

  return (
    <>
      <Helmet>
        <title> Create A New Product </title>
      </Helmet>
      <Container maxWidth="xl">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Create A New Product
          </Typography>
        </Stack>
        <Box >
          <Grid container spacing={3} columns={12}>

            <Grid item xs={8} >
              <GeneralCard />
              <MediaCard />
            </Grid>
            <Grid item xs={4} >
             
              <CategoriesCard />
              <AttributeGroupCard />
            </Grid>
          </Grid>
        </Box>
      </Container>

    </>
  );
}
