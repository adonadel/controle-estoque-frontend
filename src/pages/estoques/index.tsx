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
import AddCircleIcon from '@mui/icons-material/AddCircle';

import IconButton from '@mui/material/IconButton'
import { Button } from '@mui/material';
import { ManageSearch, RemoveCircle } from '@mui/icons-material';

function Index() {
  const [rows, setRows] = useState<any[]>([]);
  const navigate = useNavigate();

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 40 },
    {
      field: 'loja',
      headerName: 'Loja',
      width: 200,
      valueGetter: (params) => params.row.loja.nome,
    },
    {
      field: 'produto',
      headerName: 'Produto',
      width: 200,
      valueGetter: (params) => params.row.produto.nome,
    },
    {
      field: 'quantidade',
      headerName: 'Quantidade',
      width: 200,
    },    
    {
      field: 'edit',
      headerName: 'Editar',
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
              onClick={() => navigate(`/estoques/editar/${params.row.id}`)}
              >
              <EditIcon />
            </IconButton>
          </Box>
        )
      }
    },
    {
      field: 'delete',
      headerName: 'Excluir',
      flex: 1,
      sortable: false,
      align: 'right',
      renderCell: (params) => {
        return (
          <Box display="flex" alignItems="center">                
            <IconButton 
              aria-label="Exluir"              
              color='error'
              title='Excluir'
              onClick={() => deletarEstoque(params.row.id)}
              >
              <DeleteIcon />
            </IconButton>
          </Box>
        )
      }
    },
    {
      field: 'mov',
      headerName: 'Movimentações',
      flex: 1,
      sortable: false,
      align: 'center',
      renderCell: (params) => {
        return (
          <Box display="flex" alignItems="center"> 
            <IconButton 
              aria-label="Entrada"              
              color='success'
              title='Entrada'
              onClick={() => navigate(`/estoques/${params.row.id}/entrada`)}
              >
              <AddCircleIcon />
            </IconButton>    
            <IconButton 
              aria-label="Saída"              
              color='error'
              title='Saída'
              onClick={() => navigate(`/estoques/${params.row.id}/saida`)}
              >
              <RemoveCircle/>
            </IconButton>    
            <IconButton 
              aria-label="Consulta Movimentações"              
              color='default'
              title='Consulta Movimentações'
              onClick={() => navigate(`/estoques/${params.row.id}/movimentacoes`)}
              >
              <ManageSearch />
            </IconButton>             
          </Box>
        )
      }
    },
  ];

  const deletarEstoque = async (id: number) => {
    const request: IDataRequest = {
      url: `/estoques/${id}`,
    }

    const response: IDataResponse = await api.delete(request);
    if (response.statusCode === 200) {
      const data = response.data;
      buscarEstoque();
    }
  }

  const buscarEstoque = async () => {
    const request: IDataRequest = {
      url: `/estoques/`,
    }

    const response: IDataResponse = await api.get(request);
    if (response.statusCode === 200) {
      const data = response.data;
      setRows(data);
    }
  }

  useEffect(() => {
    buscarEstoque();
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

      <Box display={"flex"} alignItems={"center"} justifyContent={"flex-end"} sx={{ width: '100%', marginTop: '2rem' }}>
        <Button
          variant="contained"
          color="success"
          onClick={() => navigate('/estoques/cadastrar')}
          startIcon={<AddCircleIcon />}
        >
          Cadastrar Estoque
        </Button>

      </Box>

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