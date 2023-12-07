import { Button, TextField } from "@mui/material";
import React from "react";
import { ChangeEvent, useState } from "react";
import { IMaskInput } from "react-imask";
import { useParams } from "react-router-dom";

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
  var titulo = "Cadastro de lojas";
  var info = "Informe os dados da loja";

  const [nomeLoja, setNomeLoja] = useState("");
  const [cnpj, setCnpj] = useState<string>("");
  const [razaoSocial, setRazaoSocial] = useState("");
  const [gerente, setGerente] = useState("");
  const [endereco, setEndereco] = useState("");

  if (id) {
    // adicionar regras para edição de uma loja
    titulo = "Edição de lojas";
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
              label="Nome da loja"
              fullWidth
              value={nomeLoja}
              onChange={(t) => {
                setNomeLoja(t.target.value);
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
              label="Gerente"
              fullWidth
              value={gerente}
              onChange={(t) => {
                setGerente(t.target.value);
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

export default LojasCadastro;
