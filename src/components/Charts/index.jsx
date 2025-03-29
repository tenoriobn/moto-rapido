import styled from 'styled-components';
import MaintenanceCharts from './MaintenanceCharts';

const DashboardItens = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 10px;
  margin: 30px 0 10px 0;
`;

export const ContainerCharts = styled.div`
  flex-grow: 1;
  flex-basis: calc(50% - 10px);
  height: 300px;
  background-color: #292727;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 0px;
  box-sizing: border-box;
  padding: 20px;

  @media (min-width: 992px) {
    margin-bottom: 0px;
  }
`;

export default function Charts() {
  return (
    <DashboardItens>
      <MaintenanceCharts />
      <MaintenanceCharts />
    </DashboardItens>
  )
}
