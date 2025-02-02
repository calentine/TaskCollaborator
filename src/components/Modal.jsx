import React from 'react';
import ReactModal from 'react-modal';

// Set app element for accessibility
ReactModal.setAppElement('#root');  // Ensure this matches your root element

// Custom Modal Component
function Modal({ isOpen, closeModal, message, onConfirm }) {
    return (
        <ReactModal 
            isOpen={isOpen}
            onRequestClose={closeModal}
            className="custom-modal"
            overlayClassName="custom-overlay"
            contentLabel="Custom Modal"
        >
            <div className="modal-content">
                <h2 className="modal-title">Task Already Exists</h2>
                <p className="modal-message">{message}</p>
                <div className="modal-actions">
                    <button onClick={closeModal} className="modal-close-btn">Close</button>
                </div>
            </div>
        </ReactModal>
    );
}

export default Modal;
