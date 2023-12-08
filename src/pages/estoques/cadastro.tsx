import { Autocomplete, Button, TextField } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api, { IDataRequest, IDataResponse } from "../../provider/api";


const EstoquesCadastro = () => {
  const { id } = useParams();

  const [titulo, setTitulo] = useState("Cadastro de estoque");
  const [info, setInfo] = useState("Informe os dados abaixo para cadastrar um novo estoque");

  const [quantidade, setQuantidade] = useState("");
  const [loja, setLoja] = useState("");
  const [lojas, setLojas] = useState<any[]>([]); // TODO: Verificar se é o tipo correto
  const [produto, setProduto] = useState("");
  const [produtos, setProdutos] = useState<any[]>([]); // TODO: Verificar se é o tipo correto

  const navigate = useNavigate();
  const enviarEstoque = async () => {
    const request: IDataRequest = {
      url: "/estoques/",
      data: {
        quantidade,
        loja,
        produto,
      }
    }

    if (id) {
      request.url = `/estoques/${id}`;

      const response: IDataResponse = await api.put(request);
      if (response.statusCode === 200) {
        alert("Registro atualizado com sucesso!");
        navigate('/estoques/');
      }

      return;
    }

    const response: IDataResponse = await api.post(request);
    if (response.statusCode === 201) {
      alert("Registro criado com sucesso!");
      navigate('/estoques/');
    }
  }

  const buscarProdutosPorNome = async (nome: string) => {
    const request: IDataRequest = {
      url: `/produtos/?nome=${nome}`,
    }

    const response: IDataResponse = await api.get(request);
    if (response.statusCode === 200) {
      const data = response.data;
      setProdutos([]);
      setProdutos(data);
    }
  }

  const buscarLojasPorNome = async (nome: string) => {
    const request: IDataRequest = {
      url: `/lojas/?nome=${nome}`,
    }

    const response: IDataResponse = await api.get(request);
    if (response.statusCode === 200) {
      const data = response.data;
      setLojas([]);
      setLojas(data);
    }
  }

  const buscarEstoque = async () => {
    const request: IDataRequest = {
      url: `/estoques/${id}`,
    }

    const response: IDataResponse = await api.get(request);
    if (response.statusCode === 200) {
      const data = response.data;

      setQuantidade(data.quantidade);
      setLoja(data.loja);
      setProduto(data.produto);


      setTitulo(`Edição de estoque`);
      setInfo(`Você só poderá alterar a quantidade do produto`);

    }else{
      navigate('/estoques/');
    }
  }

  useEffect(() => {
    if (id) {
      buscarEstoque();
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
          <Autocomplete
            disablePortal
            disabled={id ? true : false}
            id="combo-box-demo"
            options={produtos}
            fullWidth
            value={produto}
            onChange={(event, newValue) => {
              setProduto(newValue || null);
            }}
            onInputChange={(event, newInputValue) => {
              buscarProdutosPorNome(newInputValue);
            }}
            getOptionLabel={(option) => option ? `${option.id} - ${option.nome}` : ''}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            renderInput={(produtos) => <TextField {...produtos} label="Digite o nome do Produto" />}
          />

          <Autocomplete
            disablePortal
            disabled={id ? true : false}
            id="combo-box-demo"
            options={lojas}
            fullWidth
            value={loja}
            onChange={(event, newValue) => {
              setLoja(newValue || null);
            }}
            onInputChange={(event, newInputValue) => {
              buscarLojasPorNome(newInputValue);
            }}
            getOptionLabel={(option) => option ? `${option.id} - ${option.nome}` : ''}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            renderInput={(lojas) => <TextField {...lojas} label="Digite o nome da Loja" />}
          />

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

export default EstoquesCadastro;
