import styled from "styled-components";

interface ModalProps {
    width: number;
    height: number;
}

const Modal = styled.div<ModalProps>`
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.33);
    position: fixed;
    display: flex;
    top: 0;

    & > div {
        margin: auto;
        width: ${props => props.width}px;
        height: ${props => props.height}px;
        background-color: white;
    }
`;

export default Modal;