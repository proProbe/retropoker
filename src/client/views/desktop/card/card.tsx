import React from "react";
import { TCard } from "./card.types";
import { connect } from "react-redux";
import { RootState } from "../../../redux/store";
import { returntypeof, getCardColor } from "../../../utils/utils";
import { SemanticCOLORS, Segment, Header } from "semantic-ui-react";

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
    return getCardColor(this.props.status);
  }

  private renderNote = (): JSX.Element => {
    const color = this.getCardColor();
    return (
      <Segment
        style={{
          display: "flex",
          alignItems: "center",
          borderRadius: 0,
          marginTop: 0,
          minHeight: "3rem",
          maxHeight: "3rem",
          cursor: this.props.boardState === "hidden" ? undefined : "pointer",
          marginLeft: 3,
          marginRight: 3,
        }}
        onClick={this.onClick}
        disabled={this.props.boardState === "hidden"}
        color={color}
        raised
      >
        <Header
          style={{
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            overflow: "hidden",
          }}
          as="h4"
          color="black"
        >
          {this.props.author}: {this.props.boardState === "hidden" ? "..." : this.props.description}
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
