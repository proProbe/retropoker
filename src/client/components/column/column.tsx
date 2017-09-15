import React from "react";
import Card from "../card/card";
import _ from "lodash";
import { connect } from "react-redux";
import { RootState } from "../../redux/store";
import { returntypeof } from "react-redux-typescript";
import { actionCreators } from "../../redux/card/actions";

const mapStateToProps = (state: RootState) => {
  return {
    cardState: state.cardState,
  };
};

const dispatchToProps = {
  addCard: actionCreators.addCard,
};

const stateProps = returntypeof(mapStateToProps);
type Props = typeof stateProps & typeof dispatchToProps;

type State = {};

class Column extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = this.initState();
  }

  private initState(): State {
    return {};
  }

  private renderCards(): JSX.Element[] {
    return this.props.cardState.cards.map((card) => {
      return (
        <Card key={card.id} id={card.id} description={card.description} />
      );
    });
  }

  private addCard = (): void => {
    this.props.addCard(
      {
        id: _.uniqueId("card"),
        description: "123",
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

export default connect(
  mapStateToProps,
  dispatchToProps,
)(Column);
