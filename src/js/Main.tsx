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
    return <div>Hello</div>;
  }
}

export default Main;
