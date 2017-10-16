import React from "react";
import _ from "lodash";
import { connect } from "react-redux";
import { RootState } from "../redux/store";
import { returntypeof } from "../utils/utils";
import * as addCardEpicActions from "../redux/epics/index";
import * as errorHandlerActions from "../redux/errorHandler/actions";
import * as mobileActions from "../redux/mobile/actions";
import { TCard } from "../components/card/card.types";
import { Header, Dimmer, SemanticCOLORS, Icon, TextArea, Form, Modal, Button } from "semantic-ui-react";

type TProps = typeof dispatchToProps & typeof mapStateProps & {};
type TState = {
  showModal: boolean,
  cardToAdd?: {
    columnId: string,
    card: TCard,
  },
};
class Mobile extends React.Component<TProps, TState> {
  constructor(props: TProps) {
    super(props);
    this.state = {
      showModal: false,
    };
  }

  private addCard = (columnId: string): void => {
    if (!this.props.user) {
      this.props.throwError({message: "Error! you have no user", type: "error"});
      return;
    }
    const newCard: TCard = {
        id: _.uniqueId("card"),
        description: "",
        status: {type: "unread"},
        author: this.props.user.name,
    };
    this.setState({cardToAdd: {columnId: columnId, card: newCard}});
    return this.showModal();
  }

  private confirmModal = (): void => {
    if (!this.state.cardToAdd) {
      this.props.throwError({ message: "Could not confirm with no card", type: "warning" });
      return;
    }
    switch (this.state.cardToAdd.card.status.type) {
      case "unread":
        this.props.socketAddCardToColumn(
          this.state.cardToAdd.columnId,
          {
            ...this.state.cardToAdd.card,
          },
        );
        break;
      // case "edit":
      //   this.props.changeCard({
      //     ...this.state.card,
      //     status: "hidden",
      //   });
      //   break;
      default:
        break;
    }
    return this.closeModal();
  }
  private showModal = (): void => this.setState({showModal: true});
  private closeModal = (): void => this.setState({showModal: false, cardToAdd: undefined});

  private handleCardChange = (event: React.SyntheticEvent<any>): void => {
    if (!this.state.cardToAdd) {
      this.props.throwError({ message: "No card to add the description too", type: "warning" });
      return;
    }
    const target = event.target as HTMLInputElement;
    return this.setState({
      cardToAdd: {
        ...this.state.cardToAdd,
        card: {
          ...this.state.cardToAdd.card,
          description: target.value,
        },
      },
    });
  }

  private renderForm = (): JSX.Element => {
    const description = this.state.cardToAdd ? this.state.cardToAdd.card.description : "";
    return (
      <Form>
        <div style={{ display: "flex" }}>
          <TextArea
            value={description}
            rows={5}
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
        size="fullscreen"
      >
        <Modal.Content>
          {this.renderForm()}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
          <Button.Group>
            <Button
              style={{fontSize: "1.4rem"}}
              basic
              color="red"
              inverted
              onClick={this.closeModal}
            >
              <Icon name="remove" /> Cancel
            </Button>
            <Button
              style={{fontSize: "1.4rem"}}
              color="green"
              inverted
              onClick={this.confirmModal}
            >
              <Icon name="checkmark" /> Confirm
            </Button>
          </Button.Group>
          </div>
        </Modal.Content>
      </Modal>
    );
  }

  private renderShowingCardModal = (card: TCard): JSX.Element => {
    return (
      <Modal
        open={true}
        size="fullscreen"
      >
        <Modal.Header>{card.author}</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <p style={{overflowWrap: "break-word", fontSize: "1.5rem"}}>{card.description}</p>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  }

  public renderButtons = () => {
    const buttonStyle = {
      justifyContent: "center",
      flex: 1,
      display: "flex",
      margin: 0,
      borderRadius: 0,
    };
    const colors: SemanticCOLORS[] = ["green", "teal", "blue", "purple"];
    const columnButtons = this.props.columns.map((col: any, index: number) => {
      const addCardFunc = () => this.addCard(col.id);
      return (
        <Button
          key={"button-col-" + col.id}
          size="massive"
          color={colors[index]}
          style={buttonStyle}
          onClick={addCardFunc}
        >
          {col.title}
        </Button>
      );
    });
    return (
      <div
        style={{
          display: "flex",
          flex: 1,
          flexDirection: "column",
        }}
      >
        {columnButtons}
        <Button
          size="massive"
          color="black"
          style={buttonStyle}
          onClick={this.showModal}
        >
          Edit added cards
        </Button>
      </div>
    );
  }
  public render() {
    return (
      <div
        style={{
          display: "flex",
          flex: 1,
        }}
      >
        <Dimmer.Dimmable
          dimmed={this.props.boardState !== "hidden"}
          blurring={true}
          style={{
            display: "flex",
            flex: 1,
          }}
        >
          <Dimmer active={this.props.boardState !== "hidden"}>
            <Header as="h2" icon inverted>
              <Icon name="tv" />
              Currently showing on board
            </Header>
          </Dimmer>
          {this.props.boardState !== "hidden" ? <div/> : this.renderModal()}
          {this.renderButtons()}
        </Dimmer.Dimmable>
        {!!this.props.cardToShow ? this.renderShowingCardModal(this.props.cardToShow) : <div/>}
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    columns: state.board.columns,
    boardState: state.board.state,
    user: state.user.user,
    cardToShow: state.mobile.card,
  };
};
const mapStateProps = returntypeof(mapStateToProps);

const dispatchToProps = {
  // addCardToColumn: boardActions.actionCreators.addCardToColumn,
  // changeCard: boardActions.actionCreators.changeCard,
  throwError: errorHandlerActions.actionCreators.throwError,
  socketAddCardToColumn: addCardEpicActions.actionCreators.socketAddCardToColumn,
  mobileSetCurrentCard: mobileActions.actionCreators.mobileShowCard,
};

export default connect(
  mapStateToProps,
  dispatchToProps,
)(Mobile);
