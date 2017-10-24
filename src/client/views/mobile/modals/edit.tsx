import React from "react";
import { TCard } from "../../desktop/card/card.types";
import { connect } from "react-redux";
import { RootState } from "../../../redux/store";
import { returntypeof, getCardColor } from "../../../utils/utils";
import { Label, Icon, Form, Modal, Button } from "semantic-ui-react";
import TextArea from "../../common/textarea/textArea";
import * as addCardEpicActions from "../../../redux/epics/index";

const unknownCard: TCard = {
  id: "",
  author: "UNKNOWN",
  description: "SOME IS WRONG HERE",
  status: {type: "error", error: new Error("Unkown card in edit modal")},
};

type TProps = typeof dispatchToProps & typeof mapStateProps & {
  cardId: string,
  onClose: () => void,
  onConfirm: () => void,
};
type TState = {
  cardToEdit: TCard,
  currentIndex: number,
};
class MobileModalEdit extends React.Component<TProps, TState> {
  constructor(props: TProps) {
    super(props);

    const maybeCard = this.getCard(props.cardId);
    const card = maybeCard ? maybeCard : unknownCard;

    this.state = {
      cardToEdit: card,
      currentIndex: 0,
    };
  }

  private getCard = (cardId: string): TCard | undefined => {
    const maybeCard = this.getCards().find((card: TCard) => {
      return card.id === cardId;
    });
    return maybeCard;
  }

  private getCards = (): TCard[] => {
    return this.props.columns.reduce(
      (acc, col) => {
        return [
          ...acc,
          ...col.cards,
        ] ;
      },
      [],
    ).filter((card) => {
      return this.props.user && card.author === this.props.user.name;
    });
  }

  private confirmModal = (): void => {
    this.props.socketEditCard({
      ...this.state.cardToEdit,
      status: {type: "unread"},
    });
    return this.props.onConfirm();
  }

  private closeModal = (): void => {
    return this.props.onClose();
  }

  private handleCardChange = (event: React.SyntheticEvent<any>): void => {
    const target = event.target as HTMLInputElement;
    const newCard = {
      ...this.state.cardToEdit,
      description: target.value,
    };
    return this.setState({
      cardToEdit: newCard,
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
    const maybeOriginalCard = this.getCard(this.state.cardToEdit.id);

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
        <Modal.Header>
        <div style={{display: "flex"}}>
            <div style={{padding: "0 10px 0 0"}}>
              {this.state.cardToEdit.author}
            </div>
            { !maybeOriginalCard
                ? <div/>
                : <Label color={getCardColor(maybeOriginalCard.status)}>
                    {maybeOriginalCard.status.type}
                  </Label>
            }
          </div>
        </Modal.Header>
        <Modal.Content>
          {this.renderForm()}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              paddingTop: 20,
            }}
          >
            <Button.Group
              style={{
                display: "flex",
                alignItems: "center",
                flex: 1,
              }}
            >
              <Button size="big" color="red" inverted onClick={this.closeModal} style={{flex: 1}}>
                <Icon name="remove" /> Cancel
              </Button>
              <Button.Or/>
              <Button size="big" color="green" inverted onClick={this.confirmModal} style={{flex: 1}}>
                <Icon name="checkmark" /> Edit
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
    columns: state.board.columns,
  };
};

const mapStateProps = returntypeof(mapStateToProps);
const dispatchToProps = {
  socketEditCard: addCardEpicActions.actionCreators.socketChangeCard,
};

export default connect(
  mapStateToProps,
  dispatchToProps,
)(MobileModalEdit);
