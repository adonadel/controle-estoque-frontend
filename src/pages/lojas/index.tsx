import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import api, { IDataRequest, IDataResponse } from '../../provider/api';
import { useNavigate } from 'react-router-dom';


function Index() {
  
  const [nome, setNome] = useState("");
  const [cnpj, setCnpj] = useState<string>("");
  const [razaoSocial, setRazaoSocial] = useState("");
  const [responsavel, setResponsavel] = useState("");
  const [endereco, setEndereco] = useState("");
  const [rows, setRows] = useState<any[]>([]);

  const navigate = useNavigate();

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'nome',
      headerName: 'Nome',
      width: 150,
    },
    {
      field: 'cnpj',
      headerName: 'CNPJ',
      width: 150,
    },
    {
      field: 'razaoSocial',
      headerName: 'Razão Social',
      width: 110,
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
      width: 250,
      sortable: false,
      renderCell: () => {
        return (
          <div >
            <Button
              variant="contained"
              color="warning"
              title='Editar'
              startIcon={<EditIcon />}
              onClick={() => navigate(`/lojas/editar/${'row.id'}}`)}
            >
            </Button>
            <Button
              variant="contained"
              color='error'
              title='Excluir'
              startIcon={<DeleteIcon />}>
            </Button>
          </div>
        )
      }
    },
  ];

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
    <Container maxWidth="xl">
      <Box sx={{ height: '100vh', width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 15,
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