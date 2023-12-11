import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import api, { IDataRequest, IDataResponse } from '../../provider/api';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Navigation from '../../componentes/navigation';

function Index() {
  const [rows, setRows] = useState<any[]>([]);
  const navigate = useNavigate();

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 40 },
    {
        field: 'estoque',
        headerName: 'Estoque',
        width: 200,
    },    
    {
        field: 'quantidade',
        headerName: 'Quantidade',
        width: 200,
    },
    {
      field: 'tipoMovimentacaoEstoque',
      headerName: 'Tipo Movimentação',
      width: 200,
    }
  ];

  const buscarMovimentacoes = async () => {
    const request: IDataRequest = {
      url: `/estoques/movimentacoes/`,
    }

    const response: IDataResponse = await api.get(request);
    if (response.statusCode === 200) {
      const data = response.data;
      setRows(data);
    }
  }

  useEffect(() => {
    buscarMovimentacoes();
  }, [])

  return (
   
    <Container>
      <AppBar position="fixed" color="primary" >
        <Toolbar>
          <Typography variant="h6">
            Lista de Movimentações
          </Typography>
        </Toolbar>
      </AppBar>

      <Navigation></Navigation>

      <Box sx={{ width: '100%', marginTop: '1rem' }}>
        <DataGrid
          autoHeight={true}
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          pageSizeOptions={[5]}

        />
      </Box>
    </Container>
  );
}

export default Index;