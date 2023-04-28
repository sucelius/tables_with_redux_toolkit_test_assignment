import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const pages = [
  {
    link: 'user',
    name: 'Сотрудник',
  },
  {
    link: 'education',
    name: 'Уровень образования',
  },
];

export const NavigationBar = () => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position='static'>
      <Toolbar variant='dense'>
        <Box sx={{ display: { xs: 'flex', md: 'flex' }, mr: 1 }}>
          {pages.map((page) => (
            <Button
              key={page.link}
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              <Link
                style={{ textDecoration: 'none', color: 'white' }}
                to={`/${page.link.toLowerCase()}`}
              >
                {page.name}
              </Link>
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
};
