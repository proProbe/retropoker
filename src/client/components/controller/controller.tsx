import React from "react";
import { TController } from "./controller.types";
import { connect } from "react-redux";
import { RootState } from "../../redux/store";
import { returntypeof } from "../../utils/utils";
import * as boardActions from "../../redux/board/actions";
import * as socketActions from "../../redux/epics/index";
import { Button, Divider } from "semantic-ui-react";

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
      <div
        style={{
          backgroundColor: "green",
          display: "flex",
          marginRight: 5,
          flexDirection: "column",
          maxWidth: 100,
        }}
      >
        <Button onClick={this.changeBoardState}>
          { this.props.boardState === "hidden"
            ? "Hidden Mode"
            : "Showing Mode"
          }
        </Button>
        <Button onClick={this.changeBoardState}>
          Join
        </Button>
        <Divider horizontal>Players</Divider>
        <div>
          Players
        </div>
      </div>)
    ;
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
