import React from "react";
import Column from "../column/column";
import Controller from "../controller/controller";

interface IProps {
}

interface IState {
}

class Board extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = this.initState();
  }

  private initState(): IState {
    return {};
  }

  public render(): JSX.Element {
    return (
      <div
        style={{
          margin: 10,
          padding: 10,
          backgroundColor: "red",
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <Controller />
        <Column />
        <Column />
        <Column />
        <Column />
      </div>
    );
  }
}

export default Board;
