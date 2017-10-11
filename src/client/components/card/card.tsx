import React from "react";
import { TCard } from "./card.types";
import { connect } from "react-redux";
import { RootState } from "../../redux/store";
import { returntypeof } from "../../utils/utils";
import { SemanticCOLORS, Segment } from "semantic-ui-react";

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

  private getCardColor = (): SemanticCOLORS => {
    if (this.props.boardState === "hidden") {
      return "grey";
    }

    switch (this.props.status) {
      case "unread":
        return "pink";
      default:
        return "green";
    }
  }

  private renderNote = (): JSX.Element => {
    const color = this.getCardColor();
    return (
      <Segment
        style={{
          minHeight: 30,
          display: "flex",
          alignItems: "center",
        }}
        onClick={this.onClick}
        inverted
        color={color}
      >
        {this.props.boardState === "hidden" ? `${this.props.author} ...` : this.props.description}
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
