import Modal from "src/components/Modal";
import ModalNew from "./ModalNew";
import ModalEdit from "./ModalEdit";
import { useRecoilValue } from "recoil";
import { stateOpenModal } from "src/store/atom";

export default function ModalsCadastrarModelo() {
  const openModal = useRecoilValue(stateOpenModal);

  return (
    <>
      <Modal title="Novo Modelo" openModal={openModal === 'new'}>
        <ModalNew />
      </Modal>

      <Modal title="Editar Modelo" openModal={openModal === 'edit'}>
        <ModalEdit />
      </Modal>
    </>
  )
}
