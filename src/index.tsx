import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './index.css';
import App from './pages/App';
import Estoques from './pages/estoques';
import EstoquesCadastro from './pages/estoques/cadastro';
import Lojas from './pages/lojas';
import LojasCadastro from './pages/lojas/cadastro';
import Produtos from './pages/produtos';
import ProdutosCadastro from './pages/produtos/cadastro';
import reportWebVitals from './reportWebVitals';
import MovimentacoesCadastro from './pages/movimentacoes/cadastro';
import Movimentacoes from './pages/movimentacoes';
import Movimentacao from './pages/estoques/movimentacao';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/lojas",
    element: <Lojas />
  },
  {
    path: "/lojas/cadastrar",
    element: <LojasCadastro />
  },
  {
    path: "/lojas/editar/:id",
    element: <LojasCadastro />
  },
  {
    path: "/produtos",
    element: <Produtos />
  },
  {
    path: "/produtos/cadastrar",
    element: <ProdutosCadastro />
  },
  {
    path: "/produtos/editar/:id",
    element: <ProdutosCadastro />
  },
  {
    path: "/estoques",
    element: <Estoques />
  },
  {
    path: "/estoques/cadastrar",
    element: <EstoquesCadastro />
  },
  {
    path: "/estoques/editar/:id",
    element: <EstoquesCadastro />
  },
  {
    path: "/estoques/:id/entrada",
    element: <Movimentacao />
  },
  {
    path: "/estoques/:id/saida",
    element: <Movimentacao />
  },    
  { 
    path: "/estoques/movimentacoes",
  element: <Movimentacoes />
  },
  {
    path: "/estoques/:id/movimentacoes",
    element: <MovimentacoesCadastro />
  },
])
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();