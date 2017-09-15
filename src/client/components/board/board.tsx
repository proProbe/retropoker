import React from "react";
import Column from "../column/column";
import Controller from "../controller/controller";
import { connect } from "react-redux";
import { RootState } from "../../redux/store";
import { returntypeof } from "react-redux-typescript";
import { actionCreators } from "../../redux/board/actions";
import { TBoard } from "./board.types";

type TProps = TBoard & typeof dispatchToProps & typeof mapStateProps & {

};

type TState = {
};

class Board extends React.Component<TProps, TState> {
  constructor(props: TProps) {
    super(props);
    this.state = this.initState();
  }

  private initState(): TState {
    return {};
  }

  private renderColumns(): JSX.Element[] {
    return this.props.columns.map((c) => {
      const {id, title, cards} = c;
      return <Column key={id} id={id} title={title} cards={cards} />;
    });
  }

  public render(): JSX.Element {
    return (
      <div
        style={{
          margin: 10,
          padding: 10,
          backgroundColor: "red",
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <Controller />
        {this.renderColumns()}
      </div>
    );
  }
}

// export default Board;

const mapStateToProps = (state: RootState) => {
  return {
    columns: state.board.columns,
  };
};

const mapStateProps = returntypeof(mapStateToProps);
const dispatchToProps = {
  addCardToColumn: actionCreators.addCardToColumn,
};

export default connect(
  mapStateToProps,
  dispatchToProps,
)(Board);
