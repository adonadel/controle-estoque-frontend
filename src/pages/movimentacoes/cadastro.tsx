import { Button, TextField } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api, { IDataRequest, IDataResponse } from "../../provider/api";
import "./style.css";
interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

const MovimentacoesCadastro = () => {
  const { id } = useParams();  

  const [titulo, setTitulo] = useState("Cadastro de Movimentações");
  const [info, setInfo] = useState("Informe os dados da Movimentação");
  
  const [estoque, setEstoque] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [tipoMovimentacaoEstoque, setTipoMovimentacaoEstoque] = useState("");

  const navigate = useNavigate();
  const enviarMovimentacoes = async () => {
    const request: IDataRequest = {
      url: "/estoques/movimentacoes/",
      data: {
        estoque,
        quantidade,
        tipoMovimentacaoEstoque
      }
    }
  }

  const buscarMovimentacoes = async () => {    
    const request: IDataRequest = {
      url: `/estoques/${id}/movimentacoes`,
    }

    const response: IDataResponse = await api.get(request);
    if (response.statusCode === 200) {
      const data = response.data;

      setQuantidade(data.quantidade);
      setTipoMovimentacaoEstoque(data.tipoMovimentacaoEstoque);

    }else{
      navigate('/movimentacoes')
    }
  }

  useEffect(() => {
    if (id) {
      buscarMovimentacoes();
    }
  }, []);

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
              label="Estoque"
              fullWidth
              value={estoque}
              onChange={(t) => {
                setEstoque(t.target.value);
              }}
            />
          </div>

          <div className="box-input">
            <TextField
              id="outlined-basic"
              label="Quantidade"
              fullWidth
              value={quantidade}
              onChange={(t) => {
                setQuantidade(t.target.value);
              }}
            />
          </div>
 
          <div className="box-input">
            <TextField
              id="outlined-basic"
              label="Tipo Movimentação"
              fullWidth
              value={tipoMovimentacaoEstoque}
              onChange={(t) => {
                setTipoMovimentacaoEstoque(t.target.value);
              }}
            />
          </div>

          <div className="actions-buttons">
            <Button color="error" onClick={() => navigate('/estoques/movimentacoes/')}>Cancelar</Button>

            <Button variant="contained" color="success" onClick={() => { enviarMovimentacoes() }}>
              Salvar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovimentacoesCadastro;