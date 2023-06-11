import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import { ListItemIcon, ListItemButton, Box, Divider, List, ListItemText, Typography } from '@mui/material';
import { NavLink as RouterLink } from 'react-router-dom';

// ----------------------------------------------------------------------

NavSection.propTypes = {
  data: PropTypes.array,
  title: PropTypes.string
};

// ----------------------------------------------------------------------

const StyledNavItem = styled((props) => <ListItemButton disableGutters {...props} />)(({ theme }) => ({
  ...theme.typography.subtitle2,
  height: 38,
  position: 'relative',
  textTransform: 'capitalize',
  color: theme.palette.text.secondary,
  borderRadius: theme.shape.borderRadius,
}));

const StyledNavItemIcon = styled(ListItemIcon)({
  width: 16,
  height: 16,
  color: 'inherit',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});




export default function NavSection({ title, data = [], ...other }) {
  return (
    <Box {...other}>
      <Typography variant="subtitle2" sx={{ color: 'text.primary', mx:2, my:1 }}>
                {title}
      </Typography>
      <List disablePadding sx={{ p: 1 }}>
        {data.map((item) => (
          <NavItem key={item.title} item={item} />
        ))}
      </List>
    </Box>
  );
}

// ----------------------------------------------------------------------

NavItem.propTypes = {
  item: PropTypes.object,
};

function NavItem({ item }) {
  const { title, path, icon, info } = item;

  return (
    <StyledNavItem
      component={RouterLink}
      to={path}
      sx={{
        '&.active': {
          color: 'text.primary',
          bgcolor: 'action.selected',
          fontWeight: 'fontWeightBold',
        },
      }}
    >
      <StyledNavItemIcon>{icon && icon}</StyledNavItemIcon>

      <ListItemText disableTypography primary={title} sx={{fontSize: '14px'}} />

      {info && info}
    </StyledNavItem>
  );
}
