import React from "react";
import moment from "moment";
import { connect } from "react-redux";
import { RootState } from "../redux/store";
import { returntypeof, getColumnColor, getCardColor } from "../utils/utils";
import { Segment, Divider, Header } from "semantic-ui-react";

type TProps = typeof dispatchToProps & typeof mapStateProps & {};
type TState = {};
class ExportView extends React.Component<TProps, TState> {
  constructor(props: TProps) {
    super(props);
    this.state = {};
  }

  public render() {
    return (
      <div
        style={{
          display: "flex",
          flex: 1,
          flexDirection: "column",
          padding: 20,
        }}
      >
        <div>
          <Header as="h1">
            Retro {moment().format("MMMM Do, YYYY")}
          </Header>
        </div>
        <div>
          <Header as="h3">
            Participants
          </Header>
        </div>
        <Divider horizontal/>
        <div
          style={{
            display: "flex",
            flex: 1,
          }}
        >
          {
            this.props.columns.map((col) => {
              return (
                <div
                  key={col.id}
                  style={{
                    flex: 1,
                    display: "flex",
                    width: "25%",
                    flexDirection: "column",
                    padding: "0 10px",
                    overflowWrap: "break-word",
                  }}
                >
                  <Header
                    as="h3"
                    color={getColumnColor(col.id)}
                  >
                    {col.title}
                  </Header>
                  {
                    col.cards.map((card) => {
                      return (
                        <div
                          key={card.id}
                          style={{
                            paddingBottom: 20,
                          }}
                        >
                          <Segment color={getCardColor(card.status)}>
                            <Header as="h4">
                              {card.author}: {card.description}
                            </Header>
                            { card.status.type !== "resolved"
                              ? <div />
                              : <div>
                                  <Divider horizontal> Resolved with </Divider>
                                  <p>
                                    { !!card.status.message
                                      ? card.status.message
                                      : "NA"
                                    }
                                  </p>
                              </div>
                            }
                          </Segment>
                        </div>
                      );
                    })
                  }
                </div>
              );
            })
          }
        </div>
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
  // throwError: errorHandlerActions.actionCreators.throwError,
  // socketAddCardToColumn: addCardEpicActions.actionCreators.socketAddCardToColumn,
  // mobileSetCurrentCard: mobileActions.actionCreators.mobileShowCard,
};

export default connect(
  mapStateToProps,
  dispatchToProps,
)(ExportView);
