import React from 'react';
import Container from '@mui/material/Container'
import { AppBar, Box, Grid, Toolbar, Typography, Button } from '@mui/material';
import StorefrontIcon from '@mui/icons-material/Storefront';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import WidgetsIcon from '@mui/icons-material/Widgets';
import { useNavigate } from 'react-router-dom';


function App() {
  const navigate = useNavigate();

  return (
    <Container maxWidth="lg">
      <AppBar position="fixed" color="primary" >
        <Toolbar>
          <Typography variant="h6">
            Painel de controle
          </Typography>
        </Toolbar>
      </AppBar>


      <Grid container gap={4} spacing={2} sx={{ marginTop: '6rem' }}>
        <Grid xs={3}>
          <Box padding={2} bgcolor="primary.main" boxShadow={3} borderRadius={2} flex={4} alignContent={'center'} alignItems={'center'}>
            <Button
              onClick={() => navigate('/lojas')}
              variant="outlined"
              fullWidth
              sx={{ color: 'white' }}
              startIcon={<StorefrontIcon />}
            >
              Acessar Lojas
            </Button>
          </Box>
        </Grid>
        <Grid xs={3}>
          <Box padding={2} bgcolor="primary.main" boxShadow={3} borderRadius={2} flex={4} alignContent={'center'} alignItems={'center'}>
            <Button
              onClick={() => navigate('/produtos')}
              variant="outlined"
              fullWidth
              sx={{ color: 'white' }}
              startIcon={<WidgetsIcon />}
            >
              Acessar Produtos
            </Button>
          </Box>
        </Grid>
        <Grid xs={3}>
          <Box padding={2} bgcolor="primary.main" boxShadow={3} borderRadius={2} flex={4} alignContent={'center'} alignItems={'center'}>
            <Button
              onClick={() => navigate('/estoques')}
              variant="outlined"
              fullWidth
              sx={{ color: 'white' }}
              startIcon={<WarehouseIcon />}
            >
              Acessar Estoque
            </Button>
          </Box>
        </Grid>
      </Grid>

    </Container>
  );
}

export default App;