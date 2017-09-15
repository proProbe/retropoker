import React from "react";
import Card from "../card/card";

interface IProps {
}

interface IState {
}

class Main extends React.Component<IProps, IState> {
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
          padding: 10,
          backgroundColor: "yellow",
          display: "flex",
          margin: "0 5px",
          flexGrow: 1,
          flexDirection: "column",
        }}
      >
        <div
          style={{
            backgroundColor: "gray",
            minHeight: 40,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 20,
          }}
        >
          Add card
        </div>
        <Card />
      </div>
    );
  }
}

export default Main;
