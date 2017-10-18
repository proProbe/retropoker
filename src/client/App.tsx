import React from "react";
import FilterLink from "./views/common/navigation/filterLink";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as cardEpicActions from "./redux/epics/index";
import * as userActions from "./redux/user/actions";
import Desktop from "./views/desktop/desktop";
import Mobile from "./views/mobile/mobile";
import ExportView from "./views/export/export";
import { Button } from "semantic-ui-react";
import { RootState } from "./redux/store";
import { returntypeof } from "./utils/utils";
import LoginModal from "./views/common/login/loginModal";

type TProps = typeof dispatchToProps & typeof mapStateProps & { };
type TState = { };
class Main extends React.Component<TProps, TState> {
  constructor(props: TProps) {
    super(props);
    this.state = this.initState();
  }

  public componentWillReceiveProps(nextProps: TProps) {
    if (nextProps.user !== this.props.user) {
      this.props.socketCardSub();
    }
  }

  private initState(): TState {
    return {};
  }

  public renderPlatformChoice = () => {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          height: "100%",
          width: "100%",
          justifyContent: "center",
        }}
      >
        <FilterLink filter="desktop">
          <Button
            size="massive"
            color="teal"
            fluid
            style={{margin: 0, padding: 0, borderRadius: 0}}
          >
            Desktop
          </Button>
        </FilterLink>
        <FilterLink filter="mobile">
          <Button
            size="massive"
            color="blue"
            fluid
            style={{margin: 0, padding: 0, borderRadius: 0}}
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
          flex: "1",
          height: "100%",
          width: "100%",
        }}
      >
        <LoginModal showing={!this.props.user}/>
        <Switch>
          <Route
            exact
            path="/"
            render={this.renderPlatformChoice}
          />
          <Route path="/desktop" component={Desktop}/>
          <Route path="/mobile" component={Mobile}/>
          <Route path="/export" component={ExportView}/>
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    user: state.user.user,
  };
};

const mapStateProps = returntypeof(mapStateToProps);
const dispatchToProps = {
  socketCardSub: cardEpicActions.actionCreators.socketCardSub,
  setUser: userActions.actionCreators.setUser,
};
export default connect(
  mapStateToProps,
  dispatchToProps,
)(Main);
