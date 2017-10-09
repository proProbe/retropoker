import React from "react";
import FilterLink from "./components/common/navigation/filterLink";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as cardEpicActions from "./redux/epics/index";
import Desktop from "./components/Desktop";
import Mobile from "./mobile/Mobile";
import { Button } from "semantic-ui-react";

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
      <div style={{display: "flex", flexDirection: "column", flex: 1, justifyContent: "center"}}>
        <FilterLink filter="desktop">
          <Button
            size="massive"
            color="teal"
            style={{justifyContent: "center", flex: 1, display: "flex", margin: 0, padding: 0, borderRadius: 0}}
          >
              Desktop
          </Button>
        </FilterLink>
        <FilterLink filter="mobile">
          <Button
            size="massive"
            color="blue"
            style={{justifyContent: "center", flex: 1, display: "flex", margin: 0, padding: 0, borderRadius: 0}}
          >
              Mobile
          </Button>
        </FilterLink>
      </div>
    );
  }

  public render(): JSX.Element {
    return (
      <div
        style={{
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
