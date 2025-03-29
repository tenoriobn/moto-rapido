import { atom } from "recoil";

// Estado para receber as informações de login
export const stateUserLogin = atom({
  key: 'stateUserLogin',
  default: null
});

// Estado para guardar os dados/token do usuário
export const stateUserDate = atom({
  key: 'stateUserDate',
  default: {}
});

// Estado para controlar Menu Mobile
export const stateMenuActive = atom({
  key: 'stateMenuActive',
  default: false,
});

// Estado para tabela de Pessoas
export const statePersonsTableInfo = atom({
  key: 'statePersonsTableInfo',
  default: []
});

// Estado para tabela de Usuários
export const stateUsersTableInfo = atom({
  key: 'stateUsersTableInfo',
  default: []
});

// Estado para tabela de Manutenção Corretiva
export const stateCorrectiveMaintenanceInfoTable = atom({
  key: 'stateAllCorrectiveMaintenances',
  default: []
});

// Estado para tabela de Manutenção Porgramada
export const stateScheduledMaintenanceInfoTable = atom({
  key: 'stateAllScheduledMaintenances',
  default: []
});

// Estado para Tabela de Veículos
export const stateVehicleInfoTable = atom({
  key: 'stateVehicleInfoTable',
  default: []
});

// Estado para Tabela de Modelos
export const stateModelInfoTable = atom({
  key: 'stateModelInfoTable',
  default: []
});

// Estados envolvendo modal
export const stateOpenModal = atom({
  key: 'stateOpenModal',
  default: null
});

export const stateModalInfo = atom({
  key: 'stateModalInfo',
  default: null
});