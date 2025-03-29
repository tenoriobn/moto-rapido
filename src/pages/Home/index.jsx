import Header from "src/components/Header";
import { Main } from "src/styles/styledComponents/componentStyles";
import Charts from "../../components/Charts";
import Title from "src/components/Title";
import MaintenanceCardInfo from "src/components/MaintenanceCardInfo";

export default function Vendas() {
  return (
    <div>
      <Header>
        <h2><i className="fa-solid fa-gauge"></i> Home</h2>
      </Header>

      <Main>
        <Title title="MotoRápido - Dashboard" />
        {/* <VendasForm rotaObterDados="/admin/dashboard/vendas/filtro" /> */}
        <MaintenanceCardInfo />
        <Charts />
      </Main>
    </div>
  )
}