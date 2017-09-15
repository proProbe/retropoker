import React from "react";
import { TCard } from "./card.types";

type TProps = TCard & {

};

type TState = {

};

class Card extends React.Component<TProps, TState> {
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
