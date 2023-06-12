import { Helmet } from 'react-helmet-async';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Button, Typography, Container, Box, Stack, Card } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
// ----------------------------------------------------------------------

const StyledContent = styled('div')(({ theme }) => ({
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function PaymentSuccess() {
  return (
    <>
      <Helmet>
        <title> payment success </title>
      </Helmet>

      <Container>
        <StyledContent sx={{ textAlign: 'center', alignItems: 'center' }}>

          <Card sx={{ width: '60%', minWidth: '400px', padding: 3, borderRadius:3, marginBottom: 4 }}>
           
              <CheckCircleIcon color='success' sx={{ fontSize: '145px' }} />

              <Typography variant='h3' sx={{ color: 'text.success' }} color='success'>  Payment Success </Typography>
              <Button to="/" size="large" variant="contained" color='success' component={RouterLink} sx={{margin:4}}>
            Go to Home
          </Button>
          </Card>
          



          
        </StyledContent>
      </Container>
    </>
  );
}
