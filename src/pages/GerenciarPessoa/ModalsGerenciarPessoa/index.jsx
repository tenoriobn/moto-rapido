import Modal from "src/components/Modal";
import ModalNew from "./ModalNew";
import ModalView from "./ModalView";
import ModalEdit from "./ModalEdit";
import { useRecoilValue } from "recoil";
import { stateOpenModal } from "src/store/atom";

export default function ModalsGerenciarPessoa() {
  const openModal = useRecoilValue(stateOpenModal);

  return (
    <>
      <Modal title="Adicionar Pessoa" openModal={openModal === 'new'}>
        <ModalNew />
      </Modal>

      <Modal title="Detalhes da Pessoa" maxWidth={{ maxWidth: '400px' }} openModal={openModal === 'view'}>
        <ModalView />
      </Modal>

      <Modal title="Editar Pessoa" openModal={openModal === 'edit'}>
        <ModalEdit />
      </Modal>
    </>
  )
}
