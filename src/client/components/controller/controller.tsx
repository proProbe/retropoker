import React from "react";

interface IProps {
}

interface IState {
}

class Controller extends React.Component<IProps, IState> {
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
          backgroundColor: "green",
          display: "flex",
          marginRight: 5,
          flexDirection: "column",
        }}
      >
        <div>
          Hidden Mode
        </div>
        <div>
          Players
        </div>
      </div>)
    ;
  }
}

export default Controller;
