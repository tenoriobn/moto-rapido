import Modal from "src/components/Modal";
import ModalNew from "./ModalNew";
import ModalView from "./ModalView";
import ModalEdit from "./ModalEdit";
import { useRecoilValue } from "recoil";
import { stateOpenModal } from "src/store/atom";

export default function ModalsCadastrarVeiculo() {
  const openModal = useRecoilValue(stateOpenModal);

  return (
    <>
      <Modal title="Novo Veículo" openModal={openModal === 'new'}>
        <ModalNew />
      </Modal>

      <Modal title="Detalhes do Veículo" maxWidth={{ maxWidth: '460px' }} openModal={openModal === 'view'}>
        <ModalView />
      </Modal>

      <Modal title="Editar Veículo" openModal={openModal === 'edit'}>
        <ModalEdit />
      </Modal>
    </>
  )
}
