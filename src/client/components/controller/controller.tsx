import React from "react";
import { TController } from "./controller.types";
import { connect } from "react-redux";
import { RootState } from "../../redux/store";
import { returntypeof } from "../../utils/utils";
import * as boardActions from "../../redux/board/actions";
import * as socketActions from "../../redux/epics/index";
import { Segment, Button, Divider } from "semantic-ui-react";

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

  private changeBoardState = (): void => {
    switch (this.props.boardState) {
      case "showing": {
        this.props.socketChangeBoardState("hidden");
        // this.props.changeBoardState("hidden");
        return;
      }
      default:
        this.props.socketChangeBoardState("showing");
        // this.props.changeBoardState("showing");
        return;
    }
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
        <Button
          style={{
            justifyContent: "center",
            margin: 0,
            borderRadius: 0,
          }}
          onClick={this.changeBoardState}
        >
          { this.props.boardState === "hidden"
            ? "Hidden Mode"
            : "Showing Mode"
          }
        </Button>
        <Divider horizontal>Players</Divider>
        <div style={{flex: 1, justifyContent: "center", display: "flex"}}>
          Players
        </div>
        <Button
          style={{
            justifyContent: "center",
            margin: 0,
            borderRadius: 0,
          }}
        >
          Export
        </Button>
      </Segment>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    boardState: state.board.state,
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
