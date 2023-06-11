import { Navigate, Outlet } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { useStateContext } from '../context/ContextProvider';
import Logo from '../components/logo';

// ----------------------------------------------------------------------

const StyledHeader = styled('header')(({ theme }) => ({
  top: 0,
  left: 0,
  lineHeight: 0,
  width: '100%',
  position: 'absolute',
  padding: theme.spacing(3, 3, 0),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(5, 5, 0),
  },
}));

// ----------------------------------------------------------------------

export default function GuestLayout() {
  const { token } = useStateContext();

  if (token) {
    return <Navigate to="/dashboard" />;
  }
  return (
      <Outlet />
  );
}
