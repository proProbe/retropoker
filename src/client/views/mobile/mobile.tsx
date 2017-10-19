import React from "react";
import _ from "lodash";
import { connect } from "react-redux";
import { RootState } from "../../redux/store";
import { returntypeof, getColumnColor, getCardColor } from "../../utils/utils";
import * as addCardEpicActions from "../../redux/epics/index";
import * as errorHandlerActions from "../../redux/errorHandler/actions";
import * as mobileActions from "../../redux/mobile/actions";
import { TCard } from "../desktop/card/card.types";
import EditModal from "./modals/edit";
import AddModal from "./modals/add";
import {
  Label,
  Sidebar,
  Divider,
  Header,
  Dimmer,
  SemanticCOLORS,
  Icon,
  Modal,
  Button,
  Segment,
} from "semantic-ui-react";

type TProps = typeof dispatchToProps & typeof mapStateProps & {};
type TState = {
  cardToAdd?: {
    columnId: string,
    card: TCard,
  },
  showSidebar: boolean,
  modal: {type: "none"}
    | {type: "add", columnId: string}
    | {type: "edit", cardId: string},
};
class Mobile extends React.Component<TProps, TState> {
  constructor(props: TProps) {
    super(props);
    this.state = {
      showSidebar: false,
      modal: {type: "none"},
    };
  }

  private showAddModal = (columnId: string): void => this.setState({modal: {type: "add", columnId: columnId}});
  private showEditModal = (cardId: string): void => this.setState({modal: {type: "edit", cardId: cardId}});
  private closeModal = (): void => this.setState({cardToAdd: undefined, modal: {type: "none"}});

  private renderShowingCardModal = (card: TCard): JSX.Element => {
    const formattedDescription = card.description.split("\n");
    return (
      <Modal
        open={true}
        size="fullscreen"
      >
        <Icon
          fitted
          name="close"
          onClick={() => this.props.mobileSetCurrentCard(undefined)}
          style={{
            paddingTop: "0.4rem",
          }}
        />
        <Header>{card.author}
        <div style={{display: "flex"}}>
            <div style={{padding: "0 10px 0 0"}}>
              {card.author}
            </div>
            <Label color={getCardColor(card.status)}>
              {card.status.type}
            </Label>
          </div>
        </Header>
        <Modal.Content>
          <Modal.Description style={{overflowWrap: "break-word"}}>
            {card.status.type !== "resolved"
              ? formattedDescription.map((text) => {
                  return (
                    <p
                      key={_.uniqueId()}
                      style={{overflowWrap: "break-word", fontSize: "1.5rem"}}
                    >
                      {text}
                      <br/>
                    </p>
                  );
                })
              : <div>
                  <p style={{overflowWrap: "break-word", fontSize: "1.5rem"}}>{formattedDescription}</p>
                  <Divider horizontal>Resolved with</Divider>
                  {
                    card.status.message.split("\n").map((text) => {
                      return (
                        <div
                          key={_.uniqueId()}
                          style={{overflowWrap: "break-word", fontSize: "1.5rem"}}
                        >
                          {text}
                          <br/>
                        </div>
                      );
                    })
                  }
                </div>
            }
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  }

  private renderModal = (): JSX.Element => {
    if (this.state.modal.type !== "none" && !this.props.user) {
      this.props.throwError({message: "There is no user!", type: "error"});
      return <div/>;
    }
    switch (this.state.modal.type) {
      case "add": {
        return (
          <AddModal
            columnId={this.state.modal.columnId}
            onClose={this.closeModal}
            onConfirm={this.closeModal}
          />
        );
      }
      case "edit": {
        return (
          <EditModal
            onClose={this.closeModal}
            onConfirm={this.closeModal}
            cardId={this.state.modal.cardId}
          />
        );
      }
      default:
        return <div />;
    }
  }

  public renderButtons = (): JSX.Element => {
    const buttonStyle = {
      flex: 1,
      margin: 0,
      borderRadius: 0,
    };
    const colors: SemanticCOLORS[] = ["green", "teal", "blue", "purple"];
    const columnButtons = this.props.columns.map((col: any, index: number) => {
      return (
        <Button
          key={"button-col-" + col.id}
          size="massive"
          color={colors[index]}
          style={buttonStyle}
          onClick={() => this.showAddModal(col.id)}
          fluid
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
        <Sidebar.Pushable as={Segment} style={{flex: 10, display: "flex", margin: 0, borderWidth: 0, borderRadius: 0}}>
          <Sidebar
            as={Segment}
            animation="overlay"
            direction="top"
            visible={this.state.showSidebar}
            vertical
            inverted
            style={{
              boxShadow: "0px 2px 5px 0px rgba(0,0,0,0.75)",
              minHeight: "100%",
            }}
          >
            <div
              style={{
                padding: 10,
              }}
            >
              {
                this.props.columns.map((col) => {
                  return col.cards
                    .filter((card) => {
                      return !!this.props.user && card.author === this.props.user.name;
                    }).map((card) => {
                      return (
                        <Segment
                          key={_.uniqueId("mobile-card-")}
                          color={getColumnColor(col.id)}
                          inverted
                          style={{
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                          }}
                          onClick={() => this.showEditModal(card.id)}
                        >
                          {card.description}
                        </Segment>
                      );
                    });
                })
              }
            </div>
          </Sidebar>
          <Sidebar.Pusher
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
            }}
          >
            {columnButtons}
          </Sidebar.Pusher>
        </Sidebar.Pushable>
        <Button
          size="massive"
          color="black"
          style={buttonStyle}
          onClick={() => this.setState({showSidebar: !this.state.showSidebar})}
        >
          {this.state.showSidebar ? "Add cards" : "Edit cards"}
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
          height: "100%",
          width: "100%",
          position: "fixed",
        }}
      >
        <Dimmer.Dimmable
          dimmed={this.props.boardState !== "hidden"}
          blurring={true}
          style={{
            display: "flex",
            flex: 1,
            flexDirection: "column",
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
  throwError: errorHandlerActions.actionCreators.throwError,
  socketAddCardToColumn: addCardEpicActions.actionCreators.socketAddCardToColumn,
  mobileSetCurrentCard: mobileActions.actionCreators.mobileShowCard,
};

export default connect(
  mapStateToProps,
  dispatchToProps,
)(Mobile);
