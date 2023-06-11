import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import CategoryIcon from '@mui/icons-material/Category';
import TagIcon from '@mui/icons-material/Tag';
import ViewInArIcon from '@mui/icons-material/ViewInAr';
import PeopleIcon from '@mui/icons-material/People';
import { styled, alpha } from '@mui/material/styles';
import { Box, Link, Button, Drawer, Typography, Avatar } from '@mui/material';
import useResponsive from '../../hooks/useResponsive';
import Logo from '../../components/logo';
import NavSection from '../../components/NavSection';
import { ContextProvider, useStateContext } from '../../context/ContextProvider';
import axiosClient from '../../axios-client';
import { AccountCircleRounded } from '@mui/icons-material';
import baseUrl from '../../baseUrl';

// ----------------------------------------------------------------------

const quickLinks = [
  {
    title: 'Dashboard',
    path: '/dashboard/app',
    icon: <HomeIcon/>
  },
  {
    title: 'New Product',
    path: '/dashboard/new_product',
    icon: <Inventory2Icon/>
  },
  {
    title: 'Profile',
    path: '/dashboard/profile',
    icon: <AccountCircleRounded/>
  }
];

const catalog = [
  {
    title: 'Prodducts',
    path: '/dashboard/products',
    icon: <Inventory2Icon/>
  },
  {
    title: 'Categories',
    path: '/dashboard/categories',
    icon: <CategoryIcon/>
  },
  {
    title: 'Attributes',
    path: '/dashboard/new_attribute_groups',
    icon: <TagIcon/>
  }
];

const sales = [
  {
    title: 'Orders',
    path: '/ss',
    icon: <ViewInArIcon/>
  }
];

const customer = [
  {
    title: 'Users',
    path: '/dashboard/users',
    icon: <PeopleIcon/>
  }
];


const NAV_WIDTH = 280;

const StyledAccount = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: alpha(theme.palette.grey[500], 0.12),
}));

// ----------------------------------------------------------------------

SideBar.propTypes = {
  openNav: PropTypes.bool,
  onCloseNav: PropTypes.func,
};

export default function SideBar({ openNav, onCloseNav }) {

  const { user, setUser, setToken } = useStateContext(ContextProvider);
  const { pathname } = useLocation();

  const isDesktop = useResponsive('up', 'lg');

  const onLogout = ev => {
    ev.preventDefault()

        setUser(null)
        setToken(null)
      
  }
  useEffect(() => {
   
    if (openNav) {
      onCloseNav();
    }
  }, [pathname]);

  const renderContent = (
    <Box
    
      sx={{
        height: 1,
        '& .simplebar-content': { height: 1, display: 'flex', flexDirection: 'column' },
      }}
    >
      <Box sx={{ px: 2.5, py: 3, display: 'inline-flex' }}>
        <Logo />
      </Box>

      <Box sx={{ mb: 2, mx: 2.5 }}>
        <Link underline="none">
          <StyledAccount>
            <Avatar src={ baseUrl+'/media/'+user.image} alt="photoURL" />

            <Box sx={{ ml: 2 }}>
              <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
               {user.fullName}
              </Typography>
            </Box>
          </StyledAccount>
        </Link>
      </Box>


      <NavSection data={quickLinks} title='QUICK LINKS'/>
      <NavSection data={catalog} title='CATALOG'/>
      <NavSection data={sales} title='SALES' />
      <NavSection data={customer} title='CUSTOMER'/>
      <Button sx={{ mt:5, m:2, width: '80%'}} onClick={onLogout}  variant="contained">Logout</Button>

      
    </Box>
  );

  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 70 },
        width: { lg: NAV_WIDTH },
      }}
    >
      {isDesktop ? (
        <Drawer


          open
          variant="permanent"
          PaperProps={{
            sx: {
              width: NAV_WIDTH,
              bgcolor: 'background.default',
              borderRightStyle: 'dashed',
            },
          }}
        >
          {renderContent}
        </Drawer>
      ) : (
        <Drawer

          open={openNav}
          onClose={onCloseNav}
          ModalProps={{
            keepMounted: true,
          }}
          PaperProps={{
            sx: { width: NAV_WIDTH },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}
