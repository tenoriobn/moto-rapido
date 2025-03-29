import { useSetRecoilState } from "recoil";
import { ToastContainer } from "react-toastify";
import { stateOpenModal } from "src/store/atom";
import { LinkItem, Main } from "src/styles/styledComponents/componentStyles";
import Header from "src/components/Header";
import Title from "src/components/Title";
import SearchFilterManutencaoProgramada from "./SearchFilterManutencaoProgramada";
import TableManutencaoProgramada from "./TableManutencaoProgramada";
import ModalsManutencaoProgramada from "./ModalsManutencaoProgramada";

export default function ManutencaoProgramada() {
  const setOpenModal = useSetRecoilState(stateOpenModal);

  return (
    <section>
      <Header>
        <h2>
          <ion-icon name="accessibility-sharp" role="img" class="md hydrated"></ion-icon>
          Manutenção Programada
        </h2>
        
        <LinkItem className="button-new" onClick={() => setOpenModal('new')}>
          <i className="fas fa-plus"></i> Novo
        </LinkItem>
      </Header>

      <Main>
        <Title title="Filtros de Busca" />
        <SearchFilterManutencaoProgramada />
        <TableManutencaoProgramada />
      </Main>

      <ModalsManutencaoProgramada />

      <ToastContainer />
    </section>
  )
}
