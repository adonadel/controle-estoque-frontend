import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "./style.css";

const EstoquesCadastro = () => {
  const { id } = useParams();
  var titulo = "Cadastro de estoques";
  var info = "Informe os dados do estoque";

  const [loja, setLoja] = useState("");
  const [produto, setProduto] = useState("");
  const [quantidade, setQuantidade] = useState("");

  if (id) {
    titulo = "Edição de estoques";
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
              label="Loja"
              fullWidth
              value={loja}
              onChange={(t) => {
                setLoja(t.target.value);
              }}
            />
          </div>

          <div className="box-input">
            <TextField
              variant="outlined"
              label="Produto"
              fullWidth
              value={produto}
              onChange={(t) => {
                setProduto(t.target.value);
              }}
            />
          </div>

          <div className="box-input">
            <TextField
              variant="outlined"
              label="Quantidade"
              fullWidth
              value={quantidade}
              onChange={(t) => {
                setQuantidade(t.target.value);
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

export default EstoquesCadastro;
