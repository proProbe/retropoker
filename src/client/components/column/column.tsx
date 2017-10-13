import React from "react";
import Card from "../card/card";
import { TCard } from "../card/card.types";
import { TColumn } from "./column.types";
import { connect } from "react-redux";
import { RootState } from "../../redux/store";
import { returntypeof } from "../../utils/utils";
import { Divider, SemanticCOLORS, Segment, Header } from "semantic-ui-react";
import * as errorHandlerActions from "../../redux/errorHandler/actions";
import ModalAdd from "./modals/add";
import ModalEdit from "./modals/edit";

type TProps = TColumn & typeof dispatchToProps & typeof mapStateProps;
type TState = {
  modal: {type: "none"} | {type: "add"} | {type: "edit", card: TCard},
};

class Column extends React.Component<TProps, TState> {
  constructor(props: TProps) {
    super(props);
    this.state = this.initState();
  }

  private initState(): TState {
    return {
      modal: {type: "none"},
    };
  }

  private renderCards(columnType: "read" | "unread"): JSX.Element[] {
    const filteredCards = this.props.cards.filter((card) => {
      return card.status === columnType;
    });
    return filteredCards.map((card) => (
      <Card
        key={card.id}
        {...card}
        onClick={this.editCard}
      />
    ));
  }

  private editCard = (card: TCard): void => {
    return this.setState({
      modal: {type: "edit", card: card},
    });
  }

  private closeModal = (): void => {
    return this.setState({
      modal: {type: "none"},
    });
  }

  private showAddModal = (): void => {
    return this.setState({
      modal: {type: "add"},
    });
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

  private renderModal = (): JSX.Element => {
    if (this.state.modal.type !== "none" && !this.props.user) {
      this.props.throwError({message: "There is no user!", type: "error"});
      return <div/>;
    }
    switch (this.state.modal.type) {
      case "add": {
        return (
          <ModalAdd
            columnId={this.props.id}
            onClose={this.closeModal}
            onConfirm={this.closeModal}
          />
        );
      }
      case "edit": {
        return (
          <ModalEdit
            onClose={this.closeModal}
            onConfirm={this.closeModal}
            card={this.state.modal.card}
          />
        );
      }
      default:
        return <div />;
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
          onClick={this.showAddModal}
          inverted
          style={{
            cursor: "pointer",
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
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
            display: "flex",
            flexDirection: "column",
            margin: "0.1rem 3px 0",
            flex: 1,
          }}
        >
          <div
            style={{
              height: "49%",
              overflowY: "auto",
              paddingBottom: 10,
            }}
          >
            {this.renderCards("unread")}
          </div>
          <Divider horizontal>Read</Divider>
          <div
            style={{
              height: "49%",
              overflowY: "auto",
              paddingBottom: 10,
            }}
          >
            {this.renderCards("read")}
          </div>
        </div>
        {this.renderModal()}
      </Segment>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    user: state.user.user,
    boardState: state.board.state,
  };
};
const mapStateProps = returntypeof(mapStateToProps);

const dispatchToProps = {
  throwError: errorHandlerActions.actionCreators.throwError,
};

export default connect(
  mapStateToProps,
  dispatchToProps,
)(Column);
