import '../components/css/ModalExclusao.css'
import { BsFillXCircleFill } from "react-icons/bs";

export function ModalExclusao() {
    return (
        <div className="container-exclusao">
            <div className="modal-fade"></div>
            <div className="modal-exclusao">
                <BsFillXCircleFill className="icon-alert"/>
                <p>Deseja mesmo excluir este registro?</p>
                <div className="action">
                    <button className="btn-nao">Não</button>
                    <button className="btn-sim">Sim</button>
                </div>
            </div>
        </div>
    )
}