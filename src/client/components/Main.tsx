import React from "react";
import Board from "./board/board";
import ErrorModal from "./common/errorHandlers/modal/errorModal";

type TProps = { };

type TState = { };

class Main extends React.Component<TProps, TState> {
  constructor(props: TProps) {
    super(props);
    this.state = this.initState();
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

export default Main;
