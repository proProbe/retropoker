import React from "react";
import Card from "../card/card";
import { TCard } from "../card/card.types";
import _ from "lodash";
import { TColumn } from "./column.types";
import { connect } from "react-redux";
import { RootState } from "../../redux/store";
import { returntypeof } from "../../utils/utils";
import * as boardActions from "../../redux/board/actions";
import * as errorHandlerActions from "../../redux/errorHandler/actions";
import * as addCardEpicActions from "../../redux/epics/index";
import { SemanticCOLORS, Segment, Button, Header, Modal, Icon, Form } from "semantic-ui-react";
import TextArea from "../common/textarea/textArea";

type TProps = TColumn & typeof dispatchToProps & typeof mapStateProps;
type TState = {
  showModal: boolean;
  card?: TCard;
};

class Column extends React.Component<TProps, TState> {
  constructor(props: TProps) {
    super(props);
    this.state = this.initState();
  }

  private initState(): TState {
    return {
      showModal: false,
    };
  }

  private addCard = (): void => {
    if (!this.props.user) {
      this.props.throwError({message: "Error! No user", type: "error"});
      return;
    }
    const newCard: TCard = {
        id: _.uniqueId("card"),
        description: "",
        status: "add",
        author: this.props.user.name,
    };
    this.setState({card: newCard});
    return this.showModal(newCard);
  }

  private confirmModal = (): void => {
    if (!this.state.card) {
      this.props.throwError({ message: "Could not confirm with no card", type: "warning" });
      return;
    }
    switch (this.state.card.status) {
      case "add":
        this.props.socketAddCardToColumn(
        // this.props.addCardToColumn(
          this.props.id,
          {
            ...this.state.card,
            status: "unread",
          },
        );
        break;
      case "edit":
        this.props.socketChangeCard({
          ...this.state.card,
          status: "read",
        });
        break;
      default:
        break;
    }
    return this.closeModal();
  }

  private editCard = (cardId: string): void => {
    const cardToChange = this.props.cards.find((card): boolean => {
      return card.id === cardId;
    });
    if (!cardToChange) {
      this.props.throwError({ message: "No card with ID: " + cardId, type: "warning" });
      return;
    }
    const updatedCardToChange: TCard = {
      ...cardToChange,
      status: "edit",
    };
    return this.showModal(updatedCardToChange);
  }

  private showModal = (card: TCard): void => this.setState({showModal: true, card: card});
  private closeModal = (): void => this.setState({showModal: false, card: undefined});

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

  private renderCards(): JSX.Element[] {
    const sortedCards = _.sortBy(this.props.cards, (card) => {
      return card.status;
    }).reverse();
    return sortedCards.map((card) => <Card key={card.id} {...card} onClick={this.editCard}/>);
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
        open={this.state.showModal}
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

  private getHeaderColor = (columnId: string): SemanticCOLORS => {
    switch (columnId) {
      case "1":
        return "green";
      case "2":
        return "teal";
      case "3":
        return "blue";
      case "4":
        return "purple";
      default:
        return "black";
    }
  }

  public render(): JSX.Element {
    const headerColor = this.getHeaderColor(this.props.id);
    return (
      <Segment
        style={{
          boxShadow: "rgba(0, 0, 0, 0.75) 1px 3px 20px -2px",
          display: "flex",
          margin: "0 5px",
          padding: 0,
          flex: 1,
          flexDirection: "column",
          backgroundColor: "#EDEEEE",
          border: 0,
          maxWidth: "calc(25% - 10px)",
        }}
      >
        <Segment
          color={headerColor}
          onClick={this.addCard}
          inverted
          style={{
            cursor: "pointer",
          }}
        >
          <Header
            inverted
            as="h3"
            color="black"
            textAlign="center"
            style={{
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              overflow: "hidden",
            }}
          >
            {this.props.title}
          </Header>
        </Segment>
        <div
          style={{
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            margin: "0.1rem 3px 0",
            flex: 1,
          }}
        >
          {this.renderCards()}
        </div>
        <div>
          {this.renderModal()}
        </div>
      </Segment>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    user: state.user.user,
  };
};
const mapStateProps = returntypeof(mapStateToProps);

const dispatchToProps = {
  addCardToColumn: boardActions.actionCreators.addCardToColumn,
  changeCard: boardActions.actionCreators.changeCard,
  throwError: errorHandlerActions.actionCreators.throwError,
  socketAddCardToColumn: addCardEpicActions.actionCreators.socketAddCardToColumn,
  socketChangeCard: addCardEpicActions.actionCreators.socketChangeCard,
};

export default connect(
  mapStateToProps,
  dispatchToProps,
)(Column);
