import React from "react";
import Card from "../card/card";
import _ from "lodash";
import { TColumn } from "./column.types";
import { connect } from "react-redux";
import { RootState } from "../../redux/store";
import { actionCreators } from "../../redux/board/actions";
import { Button, Header } from "semantic-ui-react";

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
          flex: 1,
          flexDirection: "column",
        }}
      >
        <Header as="h3">{this.props.title}</Header>
        <Button
          onClick={this.addCard}
        >
          Add card
        </Button>
        <div style={{paddingTop: 20}}>
          {this.renderCards()}
        </div>
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
