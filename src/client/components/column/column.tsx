import React from "react";
import Card from "../card/card";
import _ from "lodash";
import { TColumn } from "./column.types";
import { connect } from "react-redux";
import { RootState } from "../../redux/store";
import { actionCreators } from "../../redux/board/actions";

type TProps = TColumn & typeof dispatchToProps;
type TState = {};

class Column extends React.Component<TProps, TState> {
  constructor(props: TProps) {
    super(props);
    this.state = this.initState();
  }

  private initState(): TState {
    return {};
  }

  private renderCards(): JSX.Element[] {
    return this.props.cards.map((card) => <Card key={card.id} {...card} />);
  }

  private addCard = (): void => {
    this.props.addCardToColumn(
      this.props.id,
      {
        id: _.uniqueId("card"),
        description: "",
        status: "hidden",
      },
    );
  }

  public render(): JSX.Element {
    return (
      <div
        style={{
          padding: 10,
          backgroundColor: "yellow",
          display: "flex",
          margin: "0 5px",
          flexGrow: 1,
          flexDirection: "column",
        }}
      >
        {this.props.title}
        <div
          style={{
            backgroundColor: "gray",
            minHeight: 40,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 20,
          }}
          onClick={this.addCard}
        >
          Add card
        </div>
        {this.renderCards()}
      </div>
    );
  }
}

const dispatchToProps = {
  addCardToColumn: actionCreators.addCardToColumn,
};

export default connect(
  (state: RootState) => ({}),
  dispatchToProps,
)(Column);
