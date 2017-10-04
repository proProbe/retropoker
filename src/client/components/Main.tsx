import React from "react";
import Board from "./board/board";
import ErrorModal from "./common/errorHandlers/modal/errorModal";
import { Server } from "mock-socket";
import { Observable } from "rxjs";
import * as cardEpicActions from "../redux/epics/index";
import { connect } from "react-redux";

type TProps = typeof dispatchToProps & { };
type TState = { };
class Main extends React.Component<TProps, TState> {
  constructor(props: TProps) {
    super(props);
    this.state = this.initState();
  }

  public componentDidMount() {
    this.props.socketCardSub();
  }

  private initState(): TState {
    return {};
  }

  public render(): JSX.Element {
    return (
      <div
        style={{
          backgroundColor: "blue",
          display: "flex",
          height: "100%",
          width: "100%",
        }}
      >
        <Board />
        <ErrorModal />
      </div>)
    ;
  }
}

const dispatchToProps = {
  socketCardSub: cardEpicActions.actionCreators.socketCardSub,
};
export default connect(
  (state: any) => ({}),
  dispatchToProps,
)(Main);
