import React from "react";
import { TCard } from "./card.types";
import { connect } from "react-redux";
import { RootState } from "../../redux/store";
import { returntypeof } from "../../utils/utils";
import { Segment, Header } from "semantic-ui-react";

type TProps = TCard & typeof mapStateProps & {
  onClick: (cardId: string) => void,
};

type TState = {
};

class Card extends React.Component<TProps, TState> {
  constructor(props: TProps) {
    super(props);
    this.state = this.initState();
  }

  private initState = (): TState => {
    return {};
  }

  private onClick = (): void => {
    if (this.props.boardState === "hidden") {
      return;
    }
    return this.props.onClick(this.props.id);
  }

  // private getCardColor = (): string => {
  //   switch (this.props.status) {
  //     case "unread":
  //       return "pink";
  //     default:
  //       return "#C4C5C7";
  //   }
  // }

  private renderNote = (): JSX.Element => {
    // const color = this.getCardColor();
    return (
      <Segment
        style={{
          minHeight: 30,
          display: "flex",
          alignItems: "center",
          borderRadius: 0,
          marginBottom: "10px",
          marginTop: 0,
        }}
        onClick={this.onClick}
        disabled={this.props.boardState === "hidden"}
        color="yellow"
      >
        <Header as="h4" color="black">
          {this.props.boardState === "hidden" ? `${this.props.author} ...` : this.props.description}
        </Header>
      </Segment>
    );
  }

  public render(): JSX.Element {
    return this.renderNote();
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    boardState: state.board.state,
  };
};

const mapStateProps = returntypeof(mapStateToProps);

export default connect(
  mapStateToProps,
)(Card);
