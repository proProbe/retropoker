import React from "react";
import FilterLink from "./common/navigation/filterLink";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as cardEpicActions from "../redux/epics/index";
import Desktop from "./Desktop";
import Mobile from "./Mobile";

type TProps = typeof dispatchToProps & { };
type TState = { };
class Main extends React.Component<TProps, TState> {
  constructor(props: TProps) {
    super(props);
    this.state = this.initState();
  }

  public componentDidMount() {
    this.props.socketCardSub();
  }

  private initState(): TState {
    return {};
  }

  public renderPlatformChoice = () => {
    return (
      <div>
        <FilterLink filter="desktop">
          desktop
        </FilterLink>
        <FilterLink filter="mobile">
          mobile
        </FilterLink>
      </div>
    );
  }

  public render(): JSX.Element {
    return (
      <div
        style={{
          backgroundColor: "blue",
          display: "flex",
          height: "100%",
          width: "100%",
        }}
      >
        <Switch>
          <Route
            exact
            path="/"
            render={this.renderPlatformChoice}
          />
          <Route path="/desktop" component={Desktop}/>
          <Route path="/mobile" component={Mobile}/>
        </Switch>
      </div>
    );
  }
}

const dispatchToProps = {
  socketCardSub: cardEpicActions.actionCreators.socketCardSub,
};
export default connect(
  (state: any) => ({}),
  dispatchToProps,
)(Main);
