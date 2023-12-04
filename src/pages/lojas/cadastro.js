import React from "react";
import { useParams } from "react-router-dom";
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'

const LojasCadastro = () => {
  const { id } = useParams();
  var titulo = "Cadastro de lojas";
  var info = "Você está criando uma nova loja";

  if (id) {
    // adicionar regras para edição de uma loja
    titulo = "Edição de lojas";
    info = "Você está editando uma loja";    
  }

  return (
    <Container maxWidth="lg">
        <Grid container spacing={12}>
            <Grid item>
                <h1>{titulo}</h1>
                <p>{info}</p>
                <h1>{titulo}</h1>
                <p>{info}</p>
                <h1>{titulo}</h1>
                <p>{info}</p>
                <h1>{titulo}</h1>
                <p>{info}</p>
            </Grid>               
        </Grid>
    </Container>
  );
};

export default LojasCadastro;
