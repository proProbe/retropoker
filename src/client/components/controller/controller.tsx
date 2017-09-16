import React from "react";
import { TController } from "./controller.types";
import { connect } from "react-redux";
import { RootState } from "../../redux/store";
import { returntypeof } from "../../utils/utils";
import { actionCreators } from "../../redux/board/actions";

type TProps = TController & typeof dispatchToProps & typeof mapStateProps & {

};

type TState = { };

class Controller extends React.Component<TProps, TState> {
  constructor(props: TProps) {
    super(props);
    this.state = this.initState();
  }

  private initState(): TState {
    return {};
  }

  private changeAllCardsStatus = (): void => {
    this.props.changeBoardState("showing");
  }

  public render(): JSX.Element {
    return (
      <div
        style={{
          backgroundColor: "green",
          display: "flex",
          marginRight: 5,
          flexDirection: "column",
        }}
      >
        <div onClick={this.changeAllCardsStatus}>
          Hidden Mode
        </div>
        <div>
          Players
        </div>
      </div>)
    ;
  }
}

const mapStateToProps = (state: RootState) => {
  return {
  };
};

const mapStateProps = returntypeof(mapStateToProps);
const dispatchToProps = {
  changeBoardState: actionCreators.changeBoardState,
};

export default connect(
  mapStateToProps,
  dispatchToProps,
)(Controller);
