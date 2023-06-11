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
  TableContainer,
  TableHead,
  OutlinedInput,
} from '@mui/material';
// components
import Label from '../../components/label';
import axiosClient from '../../axios-client';
import baseUrl from '../../baseUrl';




export default function CategoriesPage() {

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    getCategories();
  }, []);

  function getCategories(){
    axiosClient.get('categories').then(({ data }) => {
      setCategories(data.data);
    })
      .catch((err) => {
        console.log(err)
      });
  }


  function searchCategory(nameQuery) {
    if (nameQuery === '') {
      getCategories();
    } else {
      setLoading(true);
      axiosClient.get('categories/find_by_name/' + nameQuery).then(({ data }) => {
        setCategories(data.data);
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
        <title> Categories </title>
      </Helmet>

      <Container maxWidth="xl">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Categories
          </Typography>

          <Button to="/dashboard/new_category" size="large" variant="contained" component={Link}>
            New Category
          </Button>

        </Stack>

        <Card  sx={{padding: 5}}>
        <OutlinedInput
              onChange={(e) => searchCategory(e.target.value)}
              sx={{ mb: 3, flex: 1 }}
              placeholder="Search categories"
              inputProps={{ 'aria-label': 'search categories' }}
            />
          
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="left">Name</TableCell>
                <TableCell align="center">Image</TableCell>
                <TableCell align="left">Description</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categories.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row"><Typography variant="subtitle1" noWrap>{row.id}</Typography></TableCell>
                  <TableCell align="left" scope="row"><Typography variant="subtitle1" noWrap>{row.name}</Typography></TableCell>
                  <TableCell align="center"><img src={baseUrl + '/media/' + row.image} alt={row.name} style={{ width: 150, borderRadius: 1.5 }} /></TableCell>
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
                  <TableCell align="right">{row.protein}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        </Card>
      </Container>

    </>
  );
}
