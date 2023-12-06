import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "./style.css";

const ProdutosCadastro = () => {
  const { id } = useParams();
  var titulo = "Cadastro de produtos";
  var info = "Informe os dados do produto";

  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [codigoEan, setCodigoEan] = useState("");
  const [dimencoes, setDimencoes] = useState("");

  if (id) {
    titulo = "Edição de produtos";
    info = "Faça as alterações necessárias e clique em salvar";
  }

  return (
    <div className="container">
      <div className="box">
        <div className="header-input">
          <h1>{titulo}</h1>
          <p>{info}</p>
        </div>

        <div className="box-inputs">
          <div className="box-input">
            <TextField
              id="outlined-basic"
              label="Nome do Produto"
              fullWidth
              value={nome}
              onChange={(t) => {
                setNome(t.target.value);
              }}
            />
          </div>

          <div className="box-input">
            <TextField
              variant="outlined"
              label="Descrição"
              fullWidth
              value={descricao}
              onChange={(t) => {
                setDescricao(t.target.value);
              }}
            />
          </div>

          <div className="box-input">
            <TextField
              variant="outlined"
              label="Código EAN"
              fullWidth
              value={codigoEan}
              onChange={(t) => {
                setCodigoEan(t.target.value);
              }}
            />
          </div>

          <div className="box-input">
            <TextField
              variant="outlined"
              label="Dimenções"
              fullWidth
              value={dimencoes}
              onChange={(t) => {
                setDimencoes(t.target.value);
              }}
            />
          </div>
          <div />

          <div className="actions-buttons">
            <Button color="error">Cancelar</Button>

            <Button variant="contained" color="success">
              Salvar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProdutosCadastro;
