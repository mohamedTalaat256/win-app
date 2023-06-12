import { Box, Container } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import CategorySection from '../../components/CategorySection';
import BigDiscounts from './components/BigDiscounts';
import FlashDeals from './components/FlashDeals';
import Header from './components/Header';
import MoreForYou from './components/MoreForYou';
import NewArrival from './components/NewArrival';
import TopCategories from './components/TopCategories';


export default function HomePage() {
    return (
       <>
       <Helmet>
        <title> Home </title>
      </Helmet>
        <Header/>
        <Container sx={{marginBottom: 2}}>
            <FlashDeals/>
             <TopCategories/>
           <NewArrival/>
            <BigDiscounts/>
            <CategorySection/>

            <Box sx={{marginBottom: 2}}>
           {/*  <MoreForYou /> */}

            </Box>
          
        </Container>
       </>
    );
}