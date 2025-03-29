import Modal from "src/components/Modal";
import ModalNew from "./ModalNew";
import ModalView from "./ModalView";
import { useRecoilValue } from "recoil";
import { stateOpenModal } from "../../../store/atom";
import ModalEdit from "./ModalEdit";

export default function ModalsManutencaoCorretiva() {
  const openModal = useRecoilValue(stateOpenModal);

  return (
    <>
      <Modal title="Nova Manutenção" openModal={openModal === 'new'}>
        <ModalNew />
      </Modal>

      <Modal title="Detalhes da Manutenção" maxWidth={{ maxWidth: '460px' }} openModal={openModal === 'view'}>
        <ModalView />
      </Modal>

      <Modal title="Finalizar Manutenção" openModal={openModal === 'edit'}>
        <ModalEdit />
      </Modal>
    </>
  )
}
