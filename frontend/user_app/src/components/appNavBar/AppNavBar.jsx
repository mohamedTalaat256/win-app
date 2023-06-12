import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { ChatBubble, Logout, PersonAdd, Settings, ShoppingBag } from '@mui/icons-material';
import { Link } from "react-router-dom";

import { Avatar, Container, Divider, Stack, Tooltip } from '@mui/material';
import { ContextProvider, useStateContext } from '../../context/ContextProvider';
import axiosClient from '../../axios-client';
import appUrl from '../../appUrl';
import ModeNightIcon from '@mui/icons-material/ModeNight';
import LightModeIcon from '@mui/icons-material/LightMode';
import ListItemIcon from '@mui/material/ListItemIcon';
import ViewListIcon from '@mui/icons-material/ViewList';
import ChatBubbleRoundedIcon from '@mui/icons-material/ChatBubbleRounded';
import PopupMenu from './components/PopupMenu';
import imagesUrl from '../../imagesUrl';
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.08),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.black, 0.12),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function AppNavBar() {
  const { user, refreshToken, setUser, setToken, setCartTotal, cartCount,setCartCount, appTheme, setAppTheme } = useStateContext(ContextProvider);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  const onLogout = ev => {
    ev.preventDefault()

    axiosClient.post('/auth/logout?refreshToken='+refreshToken)
      .then(() => {
        setUser(null);
        setToken(null);
        setCartCount(0);
        setCartTotal(0);
      })
  }

  return (
    
      <AppBar position="fixed" sx={{ color: 'text.primary', backgroundColor: 'background.paper', boxShadow:appTheme === 'dark'? 'none' : ''}} >
        <Container>
          <Toolbar>
            <Typography color={'info'}  variant="h6"sx={{ display: { xs: 'none', sm: 'block' } }} >
              <Link className='text-link' to={'/'}>Win App</Link>
            </Typography>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
              />
            </Search>
            <Box sx={{ flexGrow: 1 }} />
            <Stack direction={'row'}>
              <IconButton sx={{ display: { xs: '', md: 'flex' } }}  size="large" >
                <Badge badgeContent={cartCount} color="error">
                  <Link className='text-link' to="/cart"><ShoppingBag /></Link>

                </Badge>
              </IconButton>

              <IconButton sx={{ display: { xs: '', md: 'flex' } }}  size="large" >
              
                  <Link className='text-link' to="/chats"><ChatBubbleRoundedIcon /></Link>

                
              </IconButton>

              <Box sx={{ display: { xs: 'none', md: 'flex' } }} >
                {
                  appTheme === 'dark'
                    ?
                    <IconButton size="large" aria-label="light mode" color='secandry' onClick={() => { setAppTheme('light') }} >
                      <LightModeIcon />
                    </IconButton>
                    :
                    <IconButton size="large" aria-label="dark mode" color='secandry' onClick={() => { setAppTheme('dark') }}  >
                      <ModeNightIcon />
                    </IconButton>
                }

              </Box>



              <Tooltip title="">
                <IconButton
                  onClick={handleClick}
                  size="small"
                  sx={{ ml: 2 }}
                  aria-controls={open ? 'account-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                >
                  <Avatar src={imagesUrl+ user.image} sx={{ width: 32, height: 32 }}>M</Avatar>
                </IconButton>
              </Tooltip>
            </Stack>
           {/*  <PopupMenu anchorEl={anchorEl} handleClose={handleClose} onLogout={onLogout}/> */}
             <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: 'visible',
                  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                  mt: 1.5,
                  '& .MuiAvatar-root': {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  '&:before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: 'background.paper',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              <MenuItem onClick={handleClose}>
                <Avatar src={imagesUrl + user.image} /> Profile
              </MenuItem>

              <Divider />
              <Box sx={{ display: { xs: '', md: 'none', lg: 'none' } }} >
                {
                  appTheme === 'dark'
                    ?
                    <MenuItem onClick={() => { setAppTheme('light') }} >
                      <ListItemIcon>
                        <LightModeIcon fontSize="small" />
                      </ListItemIcon>
                      light mode
                    </MenuItem>



                    :
                    <MenuItem onClick={() => { setAppTheme('dark') }} >
                      <ListItemIcon>
                        <ModeNightIcon fontSize="small" />
                      </ListItemIcon>
                      dark mode
                    </MenuItem>

                }

              </Box>
              <MenuItem to="/orders" component={Link}>
                <ListItemIcon>
                  <ViewListIcon fontSize="small" />
                </ListItemIcon>
                my orders
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <Settings fontSize="small" />
                </ListItemIcon>
                Settings
              </MenuItem>
              <MenuItem onClick={onLogout}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu> 
          </Toolbar>
        </Container>
      </AppBar>
  );
}