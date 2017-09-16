import React from "react";
import Column from "../column/column";
import Controller from "../controller/controller";
import { connect } from "react-redux";
import { RootState } from "../../redux/store";
import { actionCreators } from "../../redux/board/actions";
import { TBoard } from "./board.types";
import { returntypeof } from "../../utils/utils";

type TProps = typeof dispatchToProps & typeof mapStateProps & {

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
    return this.props.columns.map((col) => <Column key={col.id} {...col} />);
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

const mapStateToProps = (state: RootState) => {
  return {
    boardState: state.board.state,
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
