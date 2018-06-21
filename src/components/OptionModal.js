import React from 'react';
import Modal from 'react-modal';

const OptionModal = (props) => {
  return (
    <Modal 
      isOpen={!!props.selectedOption}
      onRequestClose={props.closeModal}
      closeTimeoutMS={200}
      className="modal"
      ariaHideApp={false}
      contentLabel="Selected Option">
      <h3 className="modal__title">Selected Option</h3>
      {props.selectedOption && <p className="modal__body">{props.selectedOption}</p>}
      <button onClick={props.closeModal}>Okay</button>
    </Modal>
  );
};

export default OptionModal;