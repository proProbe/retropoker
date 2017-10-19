import React from "react";
import { TCard } from "../../card/card.types";
import { TColumn } from "../column.types";
import { connect } from "react-redux";
import { RootState } from "../../../../redux/store";
import { returntypeof, getCardColor } from "../../../../utils/utils";
import { Icon, Form, Modal, Button, Label } from "semantic-ui-react";
import TextArea from "../../../common/textarea/textArea";
import * as addCardEpicActions from "../../../../redux/epics/index";

const unknownCard: TCard = {
  id: "",
  author: "UNKNOWN",
  description: "SOME IS WRONG HERE",
  status: {type: "error", error: new Error("Unkown card in edit modal")},
};

type TProps = typeof dispatchToProps & typeof mapStateProps & {
  cardId: string,
  columnId: string,
  onClose: () => void,
  onConfirm: () => void,
};
type TState = {
  cardToEdit: TCard,
  currentIndex: number,
  hasEdited: boolean,
};
class ModalEdit extends React.Component<TProps, TState> {
  constructor(props: TProps) {
    super(props);

    const maybeCard = this.getCard(props.columnId, props.cardId);
    const card = maybeCard ? maybeCard : unknownCard;

    props.socketMobileShowCard(card);
    this.state = {
      cardToEdit: card,
      currentIndex: 0,
      hasEdited: false,
    };
  }

  private getCard = (colId: string, cardId: string): TCard | undefined => {
    const cards = this.getCards(colId);
    const maybeCard = cards.find((card: TCard) => {
      return card.id === cardId;
    });
    return maybeCard;
  }

  private getCards = (colId: string): TCard[] => {
    const maybeColumn = this.props.columns.find((col: TColumn) => {
      return col.id === colId;
    });
    return maybeColumn ? maybeColumn.cards : [];
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
    this.props.socketLiveChangeCard(newCard);
    return this.setState({
      hasEdited: true,
      cardToEdit: newCard,
    });
  }

  private hasNextCard = (): boolean => {
    const nextCard = this.getCards(this.props.columnId)[this.state.currentIndex + 1];
    return !!nextCard;
  }

  private hasPreviousCard = (): boolean => {
    const nextCard = this.getCards(this.props.columnId)[this.state.currentIndex - 1];
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
    const nextCard = this.getCards(this.props.columnId)[this.state.currentIndex + 1];
    this.props.socketMobileShowCard(nextCard);
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
    const nextCard = this.getCards(this.props.columnId)[this.state.currentIndex - 1];
    this.props.socketMobileShowCard(nextCard);
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
    const maybeOriginalCard = this.getCard(this.props.columnId, this.state.cardToEdit.id);
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
              {this.state.hasEdited ? "Edit" : "Read"}
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
  socketMobileShowCard: addCardEpicActions.actionCreators.socketMobileShowCard,
  socketLiveChangeCard: addCardEpicActions.actionCreators.socketLiveChangeCard,
};

export default connect(
  mapStateToProps,
  dispatchToProps,
)(ModalEdit);
