import React from 'react';
import Container from '@mui/material/Container'
import { AppBar, Toolbar, Typography } from '@mui/material';
import Navigation from '../componentes/navigation';

function App() {
  return (
    <Container maxWidth="lg">
      <AppBar position="fixed" color="primary" >
        <Toolbar>
          <Typography variant="h6">
            Painel de controle
          </Typography>
        </Toolbar>
      </AppBar>

      <Navigation></Navigation>

    </Container>
  );
}

export default App;