import React from "react";
import { TCard } from "../../card/card.types";
import { connect } from "react-redux";
import { RootState } from "../../../redux/store";
import { returntypeof } from "../../../utils/utils";
import { Icon, Form, Modal, Button } from "semantic-ui-react";
import TextArea from "../../common/textarea/textArea";
import * as addCardEpicActions from "../../../redux/epics/index";

type TProps = typeof dispatchToProps & typeof mapStateProps & {
  card: TCard,
  onClose: () => void,
  onConfirm: () => void,
};
type TState = {
  cardToEdit: TCard,
};
class ModalEdit extends React.Component<TProps, TState> {
  constructor(props: TProps) {
    super(props);
    this.state = {
      cardToEdit: props.card,
    };
  }

  private confirmModal = (): void => {
    this.props.socketEditCard({
      ...this.state.cardToEdit,
    });
    return this.props.onConfirm();
  }

  private closeModal = (): void => {
    return this.props.onClose();
  }

  private handleCardChange = (event: React.SyntheticEvent<any>): void => {
    const target = event.target as HTMLInputElement;
    return this.setState({
      cardToEdit: {
        ...this.state.cardToEdit,
        description: target.value,
      },
    });
  }

  private renderForm = (): JSX.Element => {
    return (
      <Form>
        <div style={{ display: "flex" }}>
          <TextArea
            value={this.state.cardToEdit.description}
            style={{
              fontSize: "4vh",
              padding: "0.25em 0.5em",
            }}
            onChange={this.handleCardChange}
          />
        </div>
      </Form>
    );
  }

  private renderModal = (): JSX.Element => {
    return (
      <Modal
        open={true}
        basic
        size="large"
        style={{
          top: 40,
          marginTop: 0,
        }}
      >
        <Modal.Header>{this.props.card.author}</Modal.Header>
        <Modal.Content>
          {this.renderForm()}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              paddingTop: 40,
            }}
          >
            <Button.Group
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Button size="massive" basic color="red" inverted onClick={this.closeModal}>
                <Icon name="remove" /> Cancel
              </Button>
              <Button.Or/>
              <Button size="massive" color="green" inverted onClick={this.confirmModal}>
                <Icon name="checkmark" /> Confirm
              </Button>
            </Button.Group>
          </div>
        </Modal.Content>
      </Modal>
    );
  }

  public render(): JSX.Element {
    return this.renderModal();
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    user: state.user.user,
  };
};

const mapStateProps = returntypeof(mapStateToProps);
const dispatchToProps = {
  socketEditCard: addCardEpicActions.actionCreators.socketChangeCard,
};

export default connect(
  mapStateToProps,
  dispatchToProps,
)(ModalEdit);
