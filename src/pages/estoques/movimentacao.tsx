import { Button, TextField } from "@mui/material";
import { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import api, { IDataRequest, IDataResponse } from "../../provider/api";
import "./style.css";

const Movimentacao = () => {
  const { id } = useParams();
  const path = useLocation().pathname.includes("entrada") ? "entrada" : "saida";
  const [titulo] = useState(`Movimentação de ${path}`);
  const [quantidade, setQuantidade] = useState("");

  const navigate = useNavigate();
  const enviarEstoque = async () => {
    const request: IDataRequest = {
      url: `/estoques/${id}/${path}`,
      data: {
        quantidade
      }
    }

    const response: IDataResponse = await api.post(request);
    if (response.statusCode === 201) {
      alert("Registro criado com sucesso!");
      navigate('/estoques/');
    }
  }

  return (
    <div className="container">
      <div className="box">
        <div className="header-input">
          <h1>{titulo}</h1>
        </div>

        <div className="box-inputs">
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

          <div className="actions-buttons">
            <Button color="error" onClick={() => navigate('/estoques/')}>Cancelar</Button>

            <Button variant="contained" color="success" onClick={() => { enviarEstoque() }}>
              Salvar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Movimentacao;