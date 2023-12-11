import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import api, { IDataRequest, IDataResponse } from '../../provider/api';
import { useNavigate, useParams } from 'react-router-dom';
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Navigation from '../../componentes/navigation';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import IconButton from '@mui/material/IconButton'
import { Button } from '@mui/material';
import { ManageSearch, RemoveCircle } from '@mui/icons-material';

function VisualizarMovimentacoes() {
  const { id } = useParams();
  const [rows, setRows] = useState<any[]>([]);
  const navigate = useNavigate();

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 40 },
    {
      field: 'loja',
      headerName: 'Loja',
      width: 200,
      valueGetter: (params) => params.row.estoque.loja.nome,
    },
    {
      field: 'produto',
      headerName: 'Produto',
      width: 200,
      valueGetter: (params) => params.row.estoque.produto.nome,
    },
    {
      field: 'quantidade',
      headerName: 'Quantidade',
      width: 200,
    },
    {
      field: 'tipo',
      headerName: 'Tipo',
      width: 200,
    }
  ];

  const buscarMovimentacoes = async () => {
    const request: IDataRequest = {
      url: `/estoques/${id}/movimentacoes`,
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
            Lista de estoque
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

export default VisualizarMovimentacoes;