import React from "react";
import Column from "../column/column";
import Controller from "../controller/controller";
import { connect } from "react-redux";
import { RootState } from "../../redux/store";
import { actionCreators } from "../../redux/board/actions";
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
          padding: 20,
          display: "flex",
          flex: 1,
          justifyContent: "space-between",
          maxWidth: "100vw",
        }}
      >
        <div
          style={{
            display: "flex",
            flex: 1,
            maxWidth: 150,
          }}
        >
          <Controller />
        </div>
        <div
          style={{
            flex: 10,
            display: "flex",
            maxWidth: "calc(100% - 150px)",
          }}
        >
          {this.renderColumns()}
        </div>
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
