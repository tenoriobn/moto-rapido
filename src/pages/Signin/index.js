import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import Input from "../../components/Input";
import useAuth from "../../hooks/useAuth";
import * as C from "../../styles/signin";

const Signin = () => {
  const { signin } = useAuth();
  const navigate = useNavigate();

  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (!login || !senha) {
      setError("Preencha todos os campos");
      return;
    }

    const res = await signin(login, senha);

    if (res) {
      setError(res);
      return;
    }

    navigate("/home");
  };

  return (
    <C.Container>
      <C.Label data-testid="login-label">MOTORÁPIDO - LOGIN</C.Label>
      <C.Content>
        <Input
          type="text"
          placeholder="Digite seu CPF"
          value={login}
          onChange={(e) => [setLogin(e.target.value), setError("")]}
        />
        <Input
          type="password"
          placeholder="Digite sua Senha"
          value={senha}
          onChange={(e) => [setSenha(e.target.value), setError("")]}
        />
        <C.labelError data-testid="error-label">{error}</C.labelError>
        <Button Text="Entrar" onClick={handleLogin} />
      </C.Content>
    </C.Container>
  );
};

export default Signin;
