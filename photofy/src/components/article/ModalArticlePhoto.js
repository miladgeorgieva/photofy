import React from 'react';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';

class ModalArticlePhoto extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {
    return (
      <div>
        <Button onClick={this.toggle}>View Photo</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>{this.props.title}</ModalHeader>
          <ModalBody>
            <img src={this.props.photoUrl} alt="some-alt" className="modal-photo"/>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default ModalArticlePhoto;