import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';

class Header extends React.Component{
  render() {
    return (
      <AppBar>
        <Toolbar variant="dense">
          <Typography variant="h6" color="inherit">
            Аналитическая система
          </Typography>
        </Toolbar>
      </AppBar>
    )
  }
}

export default Header;