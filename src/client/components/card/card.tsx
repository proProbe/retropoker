import React from "react";
import { TCard } from "./card.types";
import { connect } from "react-redux";
import { RootState } from "../../redux/store";
import { returntypeof } from "../../utils/utils";
import { actionCreators } from "../../redux/board/actions";

type TProps = TCard & typeof dispatchToProps & typeof mapStateProps & {

};

type TState = {
  isEditing: boolean,
  value: string,
};

class Card extends React.Component<TProps, TState> {
  constructor(props: TProps) {
    super(props);
    this.state = this.initState();
  }

  private initState = (): TState => {
    return {
      isEditing: true,
      value: "",
    };
  }

  private onClick = (): void => {
    this.props.changeCardDescription(
      this.props.id,
      this.state.value,
    );
    return this.setState({
      isEditing: !this.state.isEditing,
    });
  }

  private handleChange = (event: React.SyntheticEvent<any>): void => {
    const target = event.target as HTMLInputElement;
    return this.setState({
      value: target.value,
    });
  }

  private getCardColor = (): string => {
    // if (this.props.boardState === "hidden") {
    //   return "gray";
    // }

    switch (this.props.status) {
      case "unread":
        return "pink";
      default:
        return "green";
    }
  }

  private renderNote = (): JSX.Element => {
    return (
      <div
        style={{
          backgroundColor: this.getCardColor(),
          minHeight: 30,
          display: "flex",
          alignItems: "center",
        }}
        onClick={this.onClick}
      >
        {this.props.description}
      </div>
    );
  }

  private renderForm = (): JSX.Element => {
    return (
      <form onSubmit={this.onClick}>
        <label>
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }

  public render(): JSX.Element {
    return this.state.isEditing
      ? this.renderForm()
      : this.renderNote();
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    // boardState: state.board.state,
  };
};

const mapStateProps = returntypeof(mapStateToProps);
const dispatchToProps = {
  changeCardDescription: actionCreators.changeCardDescription,
};

export default connect(
  (state: RootState) => ({}),
  dispatchToProps,
)(Card);
