import React from "react";
import { TCard } from "./card.types";
import { connect } from "react-redux";
import { RootState } from "../../redux/store";
import { returntypeof } from "../../utils/utils";
import { actionCreators } from "../../redux/board/actions";
import { SemanticCOLORS, Form, TextArea, Button, Segment } from "semantic-ui-react";

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
      isEditing: false,
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
        {this.props.description}
      </Segment>
    );
  }

  private renderForm = (): JSX.Element => {
    return (
      <Form onSubmit={this.onClick}>
        <div style={{display: "flex"}}>
          <TextArea
            rows={2}
            autoHeight={true}
            placeholder="..."
            value={this.state.value}
            onChange={this.handleChange}
          />
          <Button type="submit">Add</ Button>
        </div>
      </Form>
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
    boardState: state.board.state,
  };
};

const mapStateProps = returntypeof(mapStateToProps);
const dispatchToProps = {
  changeCardDescription: actionCreators.changeCardDescription,
};

export default connect(
  mapStateToProps,
  dispatchToProps,
)(Card);
