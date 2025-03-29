import styled from "styled-components"


const DashboardItens = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: .625rem;
  box-sizing: border-box;
  margin-top: 3.125rem;

  .dashboard-item {
    box-sizing: border-box;
    border-radius: .625rem;
    cursor: pointer;
    position: relative;
    width: 100%;
    height: 100px;
    border: .0625rem solid;
  }

  .dashboard-item.ticket-medio {
    background-color: #34a0a4;
    border-color: #34a0a4;
  }

  .dashboard-item.pending_request {
    background-color: #2e3b46;
    border-color: #2e3b46;
  }

  .dashboard-item.pending_entry {
    background-color: #1f3349;
    border-color: #1f3349;
  }

  .dashboard-item-body {
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-size: 1.5rem;
    height: 100%;
    padding: .625rem;
    box-sizing: border-box;
    line-height: 1.25rem;
  }

  .dashboard-item-body p:first-child {
    font-size: 1.1rem;
    margin-bottom: 5px;
  }

  .dashboard-item-body p:nth-child(2) {
    font-weight: 600;
  }

  .dashboard-item-body i {
    position: absolute;
    font-size: 4rem;
    right: 10px;
    opacity: .2;
  }

  @media (min-width: 992px) {
    flex-wrap: nowrap;
  }
`;

export default function MaintenanceCardInfo() {

  return (
    <DashboardItens>
      <div className="dashboard-item ticket-medio block-copy">
        <div className="dashboard-item-body">
          <p>Manutenção</p>
          <p>2</p>
          <i className="fa-solid fa-ticket"></i>
        </div>
      </div>

      <div className="dashboard-item pending_request block-copy">
        <div className="dashboard-item-body">
          <p>Disponível</p>
          <p>4</p>
          <i className="fa-solid fa-hourglass"></i>
        </div>
      </div>

      <div className="dashboard-item pending_entry block-copy">
        <div className="dashboard-item-body">
          <p>Em Rota</p>
          <p>10</p>
          <i className="fa-solid fa-dollar-sign"></i>
        </div>
      </div>
    </DashboardItens>
  )
}
