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
  CardActions,
  Avatar,
} from '@mui/material';
// components
import Label from '../../components/label';
import axiosClient from '../../axios-client';
import baseUrl from '../../baseUrl';




export default function UsersPage() {

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    getUsers();
  }, []);

  function getUsers() {
    axiosClient.get('users').then(({ data }) => {

      setUsers(data.data);
    })
      .catch((err) => {
        console.log(err)
      });
  }


  function searchCategory(nameQuery) {
    if (nameQuery === '') {
      //getCategories();
    } else {
      setLoading(true);
      axiosClient.get('categories/find_by_name/' + nameQuery).then(({ data }) => {
        setUsers(data.data);
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
        <title> Users </title>
      </Helmet>

      <Container maxWidth="xl">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            All Users
          </Typography>

          <Button to="/dashboard/new_category" size="large" variant="contained" component={Link}>
            New User
          </Button>

        </Stack>

        <Card sx={{ padding: 5 }}>
          <OutlinedInput
            onChange={(e) => searchCategory(e.target.value)}
            sx={{ mb: 3, flex: 1 }}
            placeholder="Search user"
            inputProps={{ 'aria-label': 'search Chat' }}
          />

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell align="left">Name</TableCell>
                  <TableCell align="left">Description</TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row"><Typography variant="subtitle1" noWrap>{row.id}</Typography></TableCell>
                    <TableCell align="left" scope="row">
                      <CardActions>
                        <Avatar src={baseUrl + '/media/' + row.image} sx={{ marginX: 1 }} />

                        <Stack direction={'column'}>
                          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>{row.fullName}</Typography>
                          <Typography variant="subtitle2" >{row.userName}</Typography>

                        </Stack>
                      </CardActions>
                    </TableCell>
                    <TableCell align="left">
                      {
                        row.roles.map((role)=>(
                          <Typography variant="subtitle2" >{role.name}</Typography>
                        ))
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
