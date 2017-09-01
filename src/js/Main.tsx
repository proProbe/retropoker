import React from "react";

interface IProps {
  compiler: string;
  framework: string;
}

class Main extends React.Component<IProps, {}> {

  constructor(props: any) {
    super(props);
    this.state = this.initState();
  }

  private initState(): any {
    return {};
  }

  public render(): JSX.Element {
    return <div>Hello2</div>;
  }
}

export default Main;
