import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Button,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TableHead,
  CircularProgress,
  OutlinedInput,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
} from '@mui/material';
// components
import Label from '../../components/label';

import axiosClient from '../../axios-client';
import baseUrl from './../../baseUrl';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import AlertSuccess from '../../components/alert/AlertSuccess';
import AlertError from '../../components/alert/AlertError';
import { FirstPageRounded, LastPageRounded } from '@mui/icons-material';
import Select from '@mui/material/Select';
export default function ProductsPage() {

  const [products, setProducts] = useState([]);

  const [pageNum, setPageNum] = useState(0);
  const [pageNumpers, setPageNumpers] = useState([]);
  const [pageSize, setPageSize] = useState(5);
  const [totalPages, setTotalPages] = useState(0);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);




  const hangePageNum = (pNum) => {
    setPageNum(pNum);
    getProducts(pNum, pageSize);
  }
  useEffect(() => {
    getProducts(pageNum, pageSize);
  }, []);

  function getProducts(pNum, pSize) {
    axiosClient.get('products?pageNum=' + pNum + '&pageSize=' + pSize).then(({ data }) => {
      setLoading(true);

      setProducts(data.data.content);
      setTotalPages(data.data.totalPages);
      setPageNumpers(getPageNumbersArray(data.data.totalPages));

      console.log(pageNumpers);
      setLoading(false);

    })
      .catch((err) => {
        console.log(err);
        setLoading(false);

      });
  }


  function getPageNumbersArray(n) {
    const arr = [];

    for (var i = 0; i < n; i++) {
      arr.push(i);
    }

    return arr;
  }


  const handlePageSizeChange = (event) => {
    setPageSize(event.target.value);
    getProducts(pageNum, event.target.value);
  }


  function deleteProduct(id) {
    axiosClient.delete('products/delete/' + id).then(({ data }) => {
      if (data.success) {
        setMessage(data.message);
        const newList = products.filter((item) => item.id !== id);
        setProducts(newList);
        setOpenSuccess(true);

      }
    }).catch((err) => {
      console.log(err);
      setOpenError(true)
    })
  }


  function searchProduct(nameQuery) {
    if (nameQuery === '') {
      getProducts();
    } else {
      setLoading(true);
      axiosClient.get('products/find_by_name/' + nameQuery).then(({ data }) => {
        setProducts(data.data);
        setLoading(false);
      })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        })
    }
  }

  return (
    <>
      <Helmet>
        <title> Products </title>
      </Helmet>

      <Container maxWidth="xl">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Products
          </Typography>
          <Button to="/dashboard/new_product" size="large" variant="contained" component={Link}>
            New Product
          </Button>

        </Stack>

        <Card sx={{ padding: 5 }}>
          <OutlinedInput
            onChange={(e) => searchProduct(e.target.value)}
            sx={{ mb: 3, flex: 1 }}
            placeholder="Search Product"
            inputProps={{ 'aria-label': 'search Product' }}
          />

          {openSuccess ? <AlertSuccess message={message} /> : <></>}
          {openError ? <AlertError message={message} /> : <></>}

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell align="left">Name</TableCell>
                  <TableCell align="center">Image</TableCell>
                  <TableCell align="center">Category</TableCell>
                  <TableCell align="left">Description</TableCell>
                  <TableCell align="center">Status</TableCell>
                  <TableCell align="left">Specifications</TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
              </TableHead>

              {
                loading
                  ?
                  <>
                    <CircularProgress />
                  </>
                  :
                  <TableBody>
                    {products.map((row) => (
                      <TableRow
                        key={row.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row"><Typography variant="subtitle1" noWrap>{row.id}</Typography></TableCell>
                        <TableCell align="left" scope="row"><Typography variant="subtitle1" noWrap>{row.name}</Typography></TableCell>
                        <TableCell align="center"><img src={baseUrl + '/media/' + row.images} alt={row.name} style={{ width: 150, borderRadius: 1.5 }} /></TableCell>
                        <TableCell align="left"><Typography variant="subtitle1" noWrap>{row.category.name}</Typography></TableCell>
                        <TableCell align="left"><Typography variant="subtitle1" noWrap>{row.description}</Typography></TableCell>

                        <TableCell align="center">
                          {
                            row.isActive === 1
                              ?
                              <Label color={'success'}> Active </Label>
                              :
                              <Label color={'error'}>Not Active</Label>
                          }
                        </TableCell>

                        <TableCell align="left">
                          {
                            row.specifications.map((atrribute) => {
                              return (
                                <Typography key={atrribute.skey} variant="subtitle2" noWrap>{atrribute.skey}: {atrribute.svalue}</Typography>

                              )
                            })
                          }
                        </TableCell>
                        <TableCell>
                          <Link to={'/dashboard/edit_product/' + row.id}>
                            <IconButton size="large" color="secondary" >
                              <EditIcon />
                            </IconButton>
                          </Link>

                          <IconButton size="large" color="error" onClick={() => deleteProduct(row.id)} value={row.id}>
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
              }

            </Table>
            <Stack justifyContent={'space-between'} direction={'row'}>
            <Box>
              <IconButton color='inherit' variant='contained' onClick={() => hangePageNum(0)}>
                <FirstPageRounded />
              </IconButton>

              {

                pageNumpers.map((i) => {
                  return (
                    <Button key={i} sx={{widows: '20px'}} size='small' color={i === pageNum ? 'primary' : 'inherit'} variant='contained' onClick={() => hangePageNum(i)}>{i + 1}</Button>
                  )
                })
              }

              <IconButton color='inherit' variant='contained'  onClick={() => hangePageNum(totalPages - 1)}>
                <LastPageRounded />
              </IconButton>
            </Box>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <InputLabel id="demo-select-small-label">Size</InputLabel>
                <Select
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  value={pageSize}
                  label="Size"
                  onChange={(e)=>handlePageSizeChange(e)}
                >
                  <MenuItem value={5}>5</MenuItem>
                  <MenuItem value={25}>25</MenuItem>
                  <MenuItem value={50}>50</MenuItem>
                </Select>
              </FormControl>
            </Stack>
            

            <Box>
             
            </Box>
          </TableContainer>
        </Card>
      </Container>
    </>
  );
}
