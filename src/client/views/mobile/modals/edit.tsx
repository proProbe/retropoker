import React from "react";
import { TCard } from "../../desktop/card/card.types";
import { connect } from "react-redux";
import { RootState } from "../../../redux/store";
import { returntypeof } from "../../../utils/utils";
import { Icon, Form, Modal, Button } from "semantic-ui-react";
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
  cardsToView: TCard[],
  currentIndex: number,
  hasEdited: boolean,
};
class MobileModalEdit extends React.Component<TProps, TState> {
  constructor(props: TProps) {
    super(props);

    const maybeCard = this.getCard(props.cardId);
    const card = maybeCard ? maybeCard : unknownCard;

    this.state = {
      cardToEdit: card,
      cardsToView: this.getCards(),
      currentIndex: 0,
      hasEdited: false,
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
      status: {type: "read"},
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
      hasEdited: true,
      cardToEdit: newCard,
    });
  }

  private hasNextCard = (): boolean => {
    const nextCard = this.state.cardsToView[this.state.currentIndex + 1];
    return !!nextCard;
  }

  private hasPreviousCard = (): boolean => {
    const nextCard = this.state.cardsToView[this.state.currentIndex - 1];
    return !!nextCard;
  }

  private nextCard = (): void => {
    if (!this.hasNextCard()) {
      return;
    }
    this.props.socketEditCard({
      ...this.state.cardToEdit,
      status: {type: "read"},
    });
    const nextCard = this.state.cardsToView[this.state.currentIndex + 1];
    return this.setState({
      currentIndex: this.state.currentIndex + 1,
      cardToEdit: nextCard,
    });
  }

  private previousCard = (): void => {
    if (!this.hasPreviousCard()) {
      return;
    }
    this.props.socketEditCard({
      ...this.state.cardToEdit,
      status: {type: "read"},
    });
    const nextCard = this.state.cardsToView[this.state.currentIndex - 1];
    return this.setState({
      currentIndex: this.state.currentIndex - 1,
      cardToEdit: nextCard,
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
        <Modal.Header>{this.state.cardToEdit.author}</Modal.Header>
        <Modal.Content>
          {this.renderForm()}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              paddingTop: 40,
            }}
          >
            <Button
              attached="right"
              size="massive"
              color="green"
              inverted
              onClick={this.previousCard}
              style={{paddingRight: 0, borderRadius: 0}}
            >
              <Icon name="left chevron" />
            </Button>
            <Button
              size="massive"
              inverted
              color="green"
              onClick={this.confirmModal}
              style={{margin: 0, borderRadius: 0}}
            >
              Edit
            </Button>
            <Button
              attached="left"
              size="massive"
              color="green"
              inverted
              onClick={this.nextCard}
              style={{paddingLeft: 0, borderRadius: 0}}
            >
              <Icon name="right chevron" />
            </Button>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              paddingTop: 30,
            }}
          >
            <Button
              size="massive"
              color="red"
              inverted
              onClick={this.closeModal}
              style={{
                borderRadius: 0,
              }}
            >
              <Icon name="remove" /> Cancel
            </Button>
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
