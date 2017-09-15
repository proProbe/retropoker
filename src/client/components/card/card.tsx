import React from "react";

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
          backgroundColor: "pink",
          minHeight: 30,
          display: "flex",
          alignItems: "center",
        }}
      >
        Card
      </div>
    );
  }
}

export default Main;
