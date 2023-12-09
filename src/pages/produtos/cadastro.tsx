import { Button, TextField } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api, { IDataRequest, IDataResponse } from "../../provider/api";
import "./style.css";
interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

const ProdutosCadastro = () => {
  const { id } = useParams();  

  const [titulo, setTitulo] = useState("Cadastro de Produtos");
  const [info, setInfo] = useState("Informe os dados do produto"); 

  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [codigoEan, setCodigoEan] = useState("");
  const [dimensoes, setDimensoes] = useState("");

  const navigate = useNavigate();
  const enviarProdutos = async () => {
    const request: IDataRequest = {
      url: "/produtos/",
      data: {
        nome,
        descricao,
        codigoEan,
        dimensoes
      }
    }

    if (id) {      
      request.url = `/produtos/${id}`;

      const response: IDataResponse = await api.put(request);
      if (response.statusCode === 200) {
        alert("Registro atualizado com sucesso!");
        navigate('/');
      }

      return;
    }

    const response: IDataResponse = await api.post(request);
    if (response.statusCode === 201) {
      alert("Registro criado com sucesso!");
      navigate('/');
    }
  }

  const buscarProdutos = async () => {    
    const request: IDataRequest = {
      url: `/produtos/${id}`,
    }

    const response: IDataResponse = await api.get(request);
    if (response.statusCode === 200) {
      const data = response.data;

      setNome(data.nome);
      setDescricao(data.descricao);
      setCodigoEan(data.codigoEan);
      setDimensoes(data.dimensoes);

      setTitulo(`Edição de Produtos`);
      setInfo(`Informe os dados do produto ${data.nome} que você deseja alterar`);

    }else{
      navigate('/produtos')
    }
  }

  useEffect(() => {
    if (id) {
      buscarProdutos();
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
              id="outlined-basic"
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
              label="Código Ean"
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
              value={dimensoes}
              onChange={(t) => {
                setDimensoes(t.target.value);
              }}
            />
          </div>
          <div />

          <div className="actions-buttons">
            <Button color="error" onClick={() => navigate('/produtos/')}>Cancelar</Button>

            <Button variant="contained" color="success" onClick={() => { enviarProdutos() }}>
              Salvar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProdutosCadastro;