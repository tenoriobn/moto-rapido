import { useSetRecoilState } from "recoil";
import { ToastContainer } from "react-toastify";
import { stateOpenModal } from "src/store/atom";
import { LinkItem, Main } from "src/styles/styledComponents/componentStyles";
import Header from "src/components/Header";
import Title from "src/components/Title";
import TableCadastrarModelo from "./TableCadastrarModelo";
import ModalsCadastrarModelo from "./ModalsCadastrarModelo";
import { useSearchModelo } from "src/hooks/modelo/useSearchModelo";

export default function CadastrarModelo() {
  const setOpenModal = useSetRecoilState(stateOpenModal);
  useSearchModelo();

  return (
    <section>
      <Header>
        <h2>
          <ion-icon name="accessibility-sharp" role="img" class="md hydrated"></ion-icon>
          Cadastrar Modelo
        </h2>
        
        <LinkItem className="button-new" onClick={() => setOpenModal('new')}>
          <i className="fas fa-plus"></i> Novo
        </LinkItem>
      </Header>

      <Main>
        <Title title="Tabela dos Modelos" />
        <TableCadastrarModelo />
      </Main>

      <ModalsCadastrarModelo />

      <ToastContainer />
    </section>
  )
}
