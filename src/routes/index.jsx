import { RecoilRoot } from 'recoil';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from 'src/pages/Login';
import ProtectedRoute from 'src/components/ProtectedRoute';
import AppLayout from 'src/components/AppLayout';
import Home from 'src/pages/Home';
import GerenciarPessoa from 'src/pages/GerenciarPessoa';
import GerenciarUsuario from 'src/pages/GerenciarUsuario';
import ManutencaoCorretiva from 'src/pages/ManutencaoCorretiva';
import ManutencaoProgramada from 'src/pages/ManutencaoProgramada';
import CadastrarVeiculo from 'src/pages/CadastrarVeiculo';
import CadastrarModelo from 'src/pages/CadastrarModelo';

const RoutesComponent = () => {
  return (
    <RecoilRoot>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard/*" element={<ProtectedRoute element={<AppLayout />} />}>
            <Route index element={<Home />} />
            <Route path="gerenciar-pessoa" element={<GerenciarPessoa />} />
            <Route path="gerenciar-usuario" element={<GerenciarUsuario />} />
            <Route path="manutencao-corretiva" element={<ManutencaoCorretiva />} />
            <Route path="manutencao-programada" element={<ManutencaoProgramada />} />
            <Route path="cadastrar-veiculo" element={<CadastrarVeiculo />} />
            <Route path="cadastrar-modelo" element={<CadastrarModelo />} />
          </Route>
        </Routes>
      </Router>
    </RecoilRoot>
  );
};

export default RoutesComponent;
