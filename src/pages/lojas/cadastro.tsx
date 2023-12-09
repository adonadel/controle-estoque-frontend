import { Button, TextField } from "@mui/material";
import React, { useState, useEffect } from "react";
import { IMaskInput } from "react-imask";
import { useNavigate, useParams } from "react-router-dom";
import api, { IDataRequest, IDataResponse } from "../../provider/api";
import "./style.css";

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

const TextMaskCustom = React.forwardRef<HTMLInputElement, CustomProps>(
  function TextMaskCustom(props, ref) {
    const { onChange, ...other } = props;
    return (
      <IMaskInput
        {...other}
        mask="00.000.000/0000-00"
        definitions={{
          '#': /[1-9]/,
        }}
        inputRef={ref}
        onAccept={(value: any) => onChange({ target: { name: props.name, value } })}
        overwrite
      />
    );
  },
);

const LojasCadastro = () => {
  const { id } = useParams();  

  const [titulo, setTitulo] = useState("Cadastro de lojas");
  const [info, setInfo] = useState("Informe os dados da loja"); 

  const [nome, setNome] = useState("");
  const [cnpj, setCnpj] = useState<string>("");
  const [razaoSocial, setRazaoSocial] = useState("");
  const [responsavel, setResponsavel] = useState("");
  const [endereco, setEndereco] = useState("");

  const navigate = useNavigate();
  const enviarLoja = async () => {
    const request: IDataRequest = {
      url: "/lojas/",
      data: {
        nome,
        cnpj,
        razaoSocial,
        responsavel,
        endereco
      }
    }

    if (id) {      
      request.url = `/lojas/${id}`;

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

  const buscarLoja = async () => {    
    const request: IDataRequest = {
      url: `/lojas/${id}`,
    }

    const response: IDataResponse = await api.get(request);
    if (response.statusCode === 200) {
      const data = response.data;

      setNome(data.nome);
      setCnpj(data.cnpj);
      setRazaoSocial(data.razaoSocial);
      setResponsavel(data.responsavel);
      setEndereco(data.endereco);

      setTitulo(`Edição de loja`);
      setInfo(`Informe os dados da loja ${data.nome} que você deseja alterar`);

    }else{
      navigate("/lojas")
    }
  }

  useEffect(() => {
    if (id) {
      buscarLoja();
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
              label="Nome da loja"
              fullWidth
              value={nome}
              onChange={(t) => {
                setNome(t.target.value);
              }}
            />
          </div>

          <div className="box-input">
            <TextField
              label="CNPJ"
              fullWidth
              value={cnpj}
              onChange={(value) => {
                setCnpj(value.target.value)
              }}
              name="input-cnpj"
              id="input-cnpj"
              InputProps={{
                inputComponent: TextMaskCustom as any,
              }}
              variant="outlined"
              margin='dense'
            />
          </div>

          <div className="box-input">
            <TextField
              variant="outlined"
              label="Razão social"
              fullWidth
              value={razaoSocial}
              onChange={(t) => {
                setRazaoSocial(t.target.value);
              }}
            />
          </div>

          <div className="box-input">
            <TextField
              variant="outlined"
              label="responsavel"
              fullWidth
              value={responsavel}
              onChange={(t) => {
                setResponsavel(t.target.value);
              }}
            />
          </div>

          <div className="box-input">
            <TextField
              variant="outlined"
              label="Endereço"
              fullWidth
              value={endereco}
              onChange={(t) => {
                setEndereco(t.target.value);
              }}
            />
          </div>
          <div />

          <div className="actions-buttons">
            <Button color="error" onClick={() => navigate('/lojas/')}>Cancelar</Button>

            <Button variant="contained" color="success" onClick={() => { enviarLoja() }}>
              Salvar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LojasCadastro;
