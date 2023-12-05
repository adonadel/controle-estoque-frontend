import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './pages/App';
import Lojas from './pages/lojas/index';
import LojasCadastro from './pages/lojas/cadastro';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Produtos from './pages/produtos/index';
import ProdutosCadastro from './pages/produtos/cadastro';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />

        <Route path="/lojas" element={<Lojas />} />
        <Route path="/lojas/cadastrar" element={<LojasCadastro />} />
        <Route path="/lojas/editar/:id" element={<LojasCadastro />} />

        <Route path="/produtos" element={<Produtos />}/>
        <Route path="/produtos/cadastrar" element={<ProdutosCadastro />} />
        <Route path="/produtos/editar/:id" element={<ProdutosCadastro />} />

      </Routes>
    </Router>
  </React.StrictMode>
);

reportWebVitals();