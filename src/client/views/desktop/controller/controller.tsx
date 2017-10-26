import React from "react";
import _ from "lodash";
import { TController } from "./controller.types";
import { connect } from "react-redux";
import { RootState } from "../../../redux/store";
import { returntypeof } from "../../../utils/utils";
import * as boardActions from "../../../redux/board/actions";
import * as socketActions from "../../../redux/epics/index";
import { Form, Radio, Segment, Button, Divider } from "semantic-ui-react";
import { Link } from "react-router-dom";

type TProps = TController & typeof dispatchToProps & typeof mapStateProps & {

};

type TState = { };

class Controller extends React.Component<TProps, TState> {
  constructor(props: TProps) {
    super(props);
    this.state = this.initState();
  }

  private initState(): TState {
    return {};
  }

  private changeBoardState = (e: any, { value }: any): void => {
    switch (value) {
      case "showing": {
        this.props.socketChangeBoardState("showing");
        return;
      }
      case "hidden": {
        this.props.socketChangeBoardState("hidden");
        return;
      }
      case "resolving": {
        this.props.socketChangeBoardState("resolving");
        return;
      }
      default:
        this.props.socketChangeBoardState("hidden");
        return;
    }
  }

  private exportToPDF = (): void => {
    return;
  }

  public render(): JSX.Element {
    return (
      <Segment
        style={{
          boxShadow: "rgba(0, 0, 0, 0.75) 1px 3px 20px -2px",
          display: "flex",
          flex: 1,
          margin: "0 5px",
          padding: 0,
          flexDirection: "column",
          backgroundColor: "#EDEEEE",
        }}
      >
        <Divider horizontal>Board</Divider>
        <Form style={{padding: 10}}>
          <Form.Field>
            <Radio
              label="Hidden"
              name="radioGroup"
              value="hidden"
              checked={this.props.boardState === "hidden"}
              onChange={this.changeBoardState}
            />
          </Form.Field>
          <Form.Field>
            <Radio
              label="Showing"
              name="radioGroup"
              value="showing"
              checked={this.props.boardState === "showing"}
              onChange={this.changeBoardState}
            />
          </Form.Field>
          <Form.Field>
            <Radio
              label="Resolving"
              name="radioGroup"
              value="resolving"
              checked={this.props.boardState === "resolving"}
              onChange={this.changeBoardState}
            />
          </Form.Field>
        </Form>
        <Divider horizontal>Players</Divider>
        <div style={{flex: 1, alignItems: "center", display: "flex", flexDirection: "column", paddingTop: 10}}>
          {this.props.players.map((player) => {
            return (
              <p
                key={_.uniqueId("Player-")}
                style={{fontSize: "1.2rem", fontWeight: 600, fontStyle: "italic"}}
              >
                {player.name}
              </p>
            );
          })}
        </div>
        <Link to="/export">
          <Button
            fluid
            style={{
              justifyContent: "center",
              margin: 0,
              borderRadius: 0,
            }}
            onClick={this.exportToPDF}
          >
            Export
          </Button>
        </Link>
      </Segment>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    boardState: state.board.state,
    players: state.board.users,
  };
};

const mapStateProps = returntypeof(mapStateToProps);
const dispatchToProps = {
  changeBoardState: boardActions.actionCreators.changeBoardState,
  socketChangeBoardState: socketActions.actionCreators.socketChangeBoardState,
};

export default connect(
  mapStateToProps,
  dispatchToProps,
)(Controller);
