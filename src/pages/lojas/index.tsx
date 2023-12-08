import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import api, { IDataRequest, IDataResponse } from '../../provider/api';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import ButtonGroup from '@mui/material/ButtonGroup'
import BottomNavigation from '@mui/material/BottomNavigation'
import IconButton from '@mui/material/IconButton'


function Index() {
  const [rows, setRows] = useState<any[]>([]);
  const navigate = useNavigate();

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 40 },
    {
      field: 'nome',
      headerName: 'Nome',
      width: 200,
    },
    {
      field: 'cnpj',
      headerName: 'CNPJ',
      width: 200,
    },
    {
      field: 'razaoSocial',
      headerName: 'Razão Social',
      width: 200,
    },
    {
      field: 'responsavel',
      headerName: 'Responsável',
      width: 110,
    },
    {
      field: 'endereco',
      headerName: 'Endereço',
      width: 110,
    },
    {
      field: 'actions',
      headerName: 'Ações',
      flex: 1,
      sortable: false,
      align: 'right',
      renderCell: (params) => {
        return (
          <Box display="flex" alignItems="center">                   
            <IconButton 
              aria-label="Editar"              
              color='warning'
              title='Editar'
              onClick={() => navigate(`/lojas/editar/${params.row.id}`)}
              >
              <EditIcon />
            </IconButton>
            <IconButton 
              aria-label="Exluir"              
              color='error'
              title='Excluir'
              onClick={() => deletarLoja(params.row.id)}
              >
              <DeleteIcon />
            </IconButton>
          </Box>
        )
      }
    },
  ];

  const deletarLoja = async (id: number) => {
    const request: IDataRequest = {
      url: `/lojas/${id}`,
    }

    const response: IDataResponse = await api.delete(request);
    if (response.statusCode === 200) {
      const data = response.data;
      buscarLoja();
    }
  }

  const buscarLoja = async () => {
    const request: IDataRequest = {
      url: `/lojas/`,
    }

    const response: IDataResponse = await api.get(request);
    if (response.statusCode === 200) {
      const data = response.data;
      setRows(data);
    }
  }

  useEffect(() => {
    buscarLoja();
  }, [])

  return (
    <Container>
      <AppBar position="fixed" color="primary" >
        <Toolbar>
          <Typography variant="h6">
            Lista de Lojas
          </Typography>
        </Toolbar>
      </AppBar>



      <Box sx={{ width: '100%', marginTop: '6rem' }}>
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