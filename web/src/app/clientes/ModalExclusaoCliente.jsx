import '../../components/css/ModalExclusao.css'
import PropTypes from 'prop-types';
import { api } from '../../lib/api';
import { toast } from 'react-toastify';
import { BsFillXCircleFill } from "react-icons/bs";

ModalExclusaoCliente.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    closeModal: PropTypes.func.isRequired,
    idDeleteCliente: PropTypes.number.isRequired,
    atualizaTabela: PropTypes.func.isRequired,
};

export default function ModalExclusaoCliente({ isOpen, closeModal, idDeleteCliente, atualizaTabela }) {
    
    async function deleteCliente() {
        try {
            await api.delete(
                `/excluiCliente/${idDeleteCliente}`
            );
            toast.success('Cliente excluído com sucesso!', {
                autoClose: 3000,
            });
            atualizaTabela(true);
            closeModal(false);
        } catch(error) {
            console.log(error)
            toast.error('Erro ao excluir o cliente.', {
                autoClose: 3000,
            });
        }
    }

    return (
        <div className="container-exclusao">
            <div className={`modal-exclusao-fade ${isOpen ? '' : 'hide'}`} onClick={closeModal}></div>
            <div className={`modal-exclusao ${isOpen ? '' : 'hide'}`}>
                <BsFillXCircleFill className="icon-alert"/>
                <p>Deseja mesmo excluir este registro?</p>
                <div className="action">
                    <button className="btn-nao" onClick={closeModal}>Não</button>
                    <button 
                        className="btn-sim" 
                        onClick={() => {
                            deleteCliente();
                            closeModal();
                        }}
                    >
                        Sim
                    </button>
                </div>
            </div>
        </div>
    )
}