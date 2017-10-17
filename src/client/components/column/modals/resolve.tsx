import React from "react";
import _ from "lodash";
import { TCard, TCardStatus } from "../../card/card.types";
import { TColumn } from "../column.types";
import { connect } from "react-redux";
import { RootState } from "../../../redux/store";
import { returntypeof } from "../../../utils/utils";
import { Divider, Header, Segment, Icon, Form, Modal, Button } from "semantic-ui-react";
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
  columnId: string,
  onClose: () => void,
  onConfirm: () => void,
};
type TState = {
  cardToResolve: TCard,
  cardsToView: TCard[],
  currentIndex: number,
};
class ModalResolve extends React.Component<TProps, TState> {
  constructor(props: TProps) {
    super(props);

    const maybeCard = this.getCard(props.columnId, props.cardId);
    const card = maybeCard ? maybeCard : unknownCard;
    const resolveCard = card.status.type === "resolved"
      ? card
      : {
        ...card,
        status: {type: "resolved", message: ""} as TCardStatus,
      };

    const maybeColumn = this.getColumn(props.columnId);
    const cardsToView = maybeColumn ? maybeColumn.cards : [];

    props.socketMobileShowCard(card);
    this.state = {
      cardToResolve: {
        ...resolveCard,
      },
      cardsToView: cardsToView,
      currentIndex: 0,
    };
  }

  private getCard = (colId: string, cardId: string): TCard | undefined => {
    const maybeColumn = this.getColumn(colId);
    if (!maybeColumn) {
      return ;
    }
    const maybeCard = maybeColumn.cards.find((card: TCard) => {
      return card.id === cardId;
    });
    return maybeCard;
  }

  private getColumn = (colId: string): TColumn | undefined => {
    return this.props.columns.find((col) => {
      return col.id === colId;
    });
  }

  private confirmModal = (): void => {
    this.props.socketEditCard({
      ...this.state.cardToResolve,
    });
    return this.props.onConfirm();
  }

  private closeModal = (): void => {
    return this.props.onClose();
  }

  private handleCardChange = (event: React.SyntheticEvent<any>): void => {
    const target = event.target as HTMLInputElement;
    const newCard = {
      ...this.state.cardToResolve,
      status: {
        ...this.state.cardToResolve.status,
        message: target.value,
      },
    };
    this.props.socketLiveChangeCard(newCard);
    return this.setState({
      cardToResolve: newCard,
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
      ...this.state.cardToResolve,
    });
    const nextCard = this.state.cardsToView[this.state.currentIndex + 1];
    this.props.socketMobileShowCard(nextCard);
    return this.setState({
      currentIndex: this.state.currentIndex + 1,
      cardToResolve: nextCard,
    });
  }

  private previousCard = (): void => {
    if (!this.hasPreviousCard()) {
      return;
    }
    this.props.socketEditCard({
      ...this.state.cardToResolve,
    });
    const nextCard = this.state.cardsToView[this.state.currentIndex - 1];
    this.props.socketMobileShowCard(nextCard);
    return this.setState({
      currentIndex: this.state.currentIndex - 1,
      cardToResolve: nextCard,
    });
  }

  private renderForm = (): JSX.Element => {
    const getStatusMessage = (card: TCard) => {
      if (card.status.type !== "resolved") {
        return "ERROR: something incorrect here with card type:" + card.status.type + card.id + card.description;
      }
      return card.status.message;
    };
    return (
      <Form>
        <div style={{ display: "flex" }}>
          <TextArea
            value={getStatusMessage(this.state.cardToResolve)}
            style={{
              fontSize: "3vh",
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
        <Modal.Header>{this.state.cardToResolve.author}</Modal.Header>
        <Modal.Content>
          <Segment>
            <Header as="h1" style={{overflowWrap: "break-word"}}>
              {
                this.state.cardToResolve.description.split("\n").map((text) => {
                  return (
                    <p
                      key={_.uniqueId()}
                      style={{ overflowWrap: "break-word", fontSize: "1.5rem" }}
                    >
                      {text}
                      <br />
                    </p>
                  );
                })
              }
            </Header>
          </Segment>
          <Divider horizontal inverted/>
          <Divider horizontal inverted> Resolve With </Divider>
          <Divider horizontal inverted/>
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
              Resolve
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
)(ModalResolve);
