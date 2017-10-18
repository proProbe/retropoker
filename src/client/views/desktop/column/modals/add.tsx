import React from "react";
import _ from "lodash";
import { TCard } from "../../card/card.types";
import { connect } from "react-redux";
import { RootState } from "../../../../redux/store";
import { returntypeof } from "../../../../utils/utils";
import { Icon, Form, Modal, Button } from "semantic-ui-react";
import TextArea from "../../../common/textarea/textArea";
import * as errorHandlerActions from "../../../../redux/errorHandler/actions";
import * as addCardEpicActions from "../../../../redux/epics/index";

type TProps = typeof dispatchToProps & typeof mapStateProps & {
  columnId: string,
  onClose: () => void,
  onConfirm: () => void,
};
type TState = {
  card: TCard,
};
class ModalAdd extends React.Component<TProps, TState> {
  constructor(props: TProps) {
    super(props);
    this.state = {
      card: {
        id: _.uniqueId("card"),
        description: "",
        status: {type: "unread"},
        author: "UNKNOWN",
      },
    };
  }

  private confirmModal = (): void => {
    this.props.socketAddCardToColumn(
      this.props.columnId,
      {
        ...this.state.card,
        author: this.props.user ? this.props.user.name : "UNKNOWN",
      },
    );
    return this.props.onConfirm();
  }

  private closeModal = (): void => {
    return this.props.onClose();
  }

  private handleCardChange = (event: React.SyntheticEvent<any>): void => {
    if (!this.state.card) {
      this.props.throwError({ message: "No card to add the description too", type: "warning" });
      return;
    }
    const target = event.target as HTMLInputElement;
    return this.setState({
      card: {
        ...this.state.card,
        description: target.value,
      },
    });
  }

  private renderForm = (): JSX.Element => {
    const description = this.state.card ? this.state.card.description : "";
    return (
      <Form>
        <div style={{ display: "flex" }}>
          <TextArea
            value={description}
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
        <Modal.Header>Add Card</Modal.Header>
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
  throwError: errorHandlerActions.actionCreators.throwError,
  socketAddCardToColumn: addCardEpicActions.actionCreators.socketAddCardToColumn,
};

export default connect(
  mapStateToProps,
  dispatchToProps,
)(ModalAdd);
