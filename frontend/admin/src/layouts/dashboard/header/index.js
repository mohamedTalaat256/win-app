import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Stack, AppBar, Toolbar, IconButton } from '@mui/material';
// utils
import { bgBlur } from '../../../utils/cssStyles';
import Searchbar from './Searchbar';
import AccountPopover from './AccountPopover';
import ModeNightIcon from '@mui/icons-material/ModeNight';
import LightModeIcon from '@mui/icons-material/LightMode';
import { ContextProvider, useStateContext } from '../../../context/ContextProvider';
// ----------------------------------------------------------------------

const NAV_WIDTH = 280;

const HEADER_MOBILE = 64;

const HEADER_DESKTOP = 92;

const StyledRoot = styled(AppBar)(({ theme }) => ({
  ...bgBlur({ color: theme.palette.background.default }),
  boxShadow: 'none',
  [theme.breakpoints.up('lg')]: {
    width: `calc(100% - ${NAV_WIDTH + 1}px)`,
  },
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  minHeight: HEADER_MOBILE,
  [theme.breakpoints.up('lg')]: {
    minHeight: HEADER_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));

// ----------------------------------------------------------------------

Header.propTypes = {
  onOpenNav: PropTypes.func,
};

export default function Header({ onOpenNav }) {

  const {  appTheme, setAppTheme } = useStateContext(ContextProvider);

  return (
    <StyledRoot>
      <StyledToolbar>
        <IconButton
          onClick={onOpenNav}
          sx={{
            mr: 1,
            color: 'text.primary',
            display: { lg: 'none' },
          }}
        >
       
        </IconButton>

        <Searchbar />
        <Box sx={{ flexGrow: 1 }} />

        <Stack
          direction="row"
          alignItems="center"
          spacing={{
            xs: 0.5,
            sm: 1,
          }}
        >
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

          <AccountPopover />
        </Stack>
      </StyledToolbar>
    </StyledRoot>
  );
}
