import { Fragment } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import CadastrarUsuario from "../pages/CadastrarUsuario";
import ConsultarPessoa from "../pages/ConsultarPessoa";
import GerenciarUsuario from "../pages/GerenciarUsuario";
import Home from "../pages/Home";
import Signin from "../pages/Signin";

const Private = ({ Item }) => {
  const { signed } = useAuth();
  return signed ? <Item /> : <Signin />;
};

const RoutesApp = () => {
  return (
    <BrowserRouter>
      <Fragment>
        <Routes>
          <Route exact path="/home" element={<Private Item={Home} />} />
          <Route
            exact
            path="/cadastrar"
            element={<Private Item={CadastrarUsuario} />}
          />
          <Route
            exact
            path="/consultar-Pessoa"
            element={<Private Item={ConsultarPessoa} />}
          />
          <Route
            exact
            path="/gerenciar-usuario"
            element={<Private Item={GerenciarUsuario} />}
          />

          <Route path="/" element={<Signin />} />
          <Route path="*" element={<Signin />} />
        </Routes>
      </Fragment>
    </BrowserRouter>
  );
};

export default RoutesApp;
