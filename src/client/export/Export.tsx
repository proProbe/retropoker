import React from "react";
import moment from "moment";
import _ from "lodash";
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
                            <div>
                              <b>{card.author}:</b> {card.description}
                            </div>
                            { card.status.type !== "resolved"
                              ? <div />
                              : <div>
                                  <Divider
                                    horizontal
                                    style={{fontStyle: "italic", fontWeight: "300"}}
                                  >
                                    Resolved with
                                  </Divider>
                                    { !card.status.message
                                      ? <p>NA</p>
                                      : card.status.message.split("\n").map((text) => {
                                          return (
                                            <p
                                              key={_.uniqueId()}
                                              style={{overflowWrap: "break-word"}}
                                            >
                                              {text}
                                              <br/>
                                            </p>
                                          );
                                        })
                                    }
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

const dispatchToProps = { };

export default connect(
  mapStateToProps,
  dispatchToProps,
)(ExportView);
