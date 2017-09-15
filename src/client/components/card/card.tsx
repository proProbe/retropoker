import React from "react";

export interface ICard {
  id: string;
  description: string;
}

interface IProps extends ICard {

}

interface IState {
}

class Card extends React.Component<IProps, IState> {
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
        {this.props.description}
      </div>
    );
  }
}

export default Card;
