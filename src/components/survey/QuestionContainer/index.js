import React from 'react';
import Icon from '../../basic/Icon';
import Panel from '../../basic/Panel';
import Modal from '../../basic/Modal';

class QuestionContainer extends React.Component {
  constructor(props) {
    super();

    this.state = {
      modalIsOpen: false,
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  render() {
    const explanationLink = !this.props.explanation
      ? null
      : <div className="dt-question-explanation">
          <a onClick={this.openModal}>What does this mean?</a>
        </div>;

    const modal = !this.props.explanation
      ? null
      : <div>
          <Modal open={this.state.modalIsOpen} onClose={this.closeModal}>
            <Icon name="fa-info-circle" />&nbsp;
            {this.props.explanation}
            {this.state.modalIsOpen}
          </Modal>
        </div>;

    return (
      <Panel className="dt-question-container">
        <div className="dt-question-header">
          {this.props.prompt}
        </div>
        {explanationLink}
        {this.props.children}
        {modal}
      </Panel>
    );
  }

  closeModal() {
    this.setState({
      modalIsOpen: false,
    });
  }

  openModal() {
    this.setState({
      modalIsOpen: true,
    });
  }
}

export default QuestionContainer;
