import React from "react";
import { connect } from "react-redux";
import { RootState } from "../../../redux/store";
import { returntypeof } from "../../../utils/utils";
import { Header, Icon, Input, Form, Modal, Button } from "semantic-ui-react";
import * as userActions from "../../../redux/user/actions";
import * as errorHandlerActions from "../../../redux/errorHandler/actions";

type TProps = typeof dispatchToProps & typeof mapStateProps & {
  showing: boolean,
};
type TState = {
  user: {
    name?: string,
  },
};
class LoginModal extends React.Component<TProps, TState> {
  constructor(props: TProps) {
    super(props);
    this.state = {
      user: {

      },
    };
  }

  private confirmModal = (): void => {
    if (this.state.user.name) {
      this.props.setUser({ name: this.state.user.name });
    }
    return;
  }

  private handleUserChange = (event: React.SyntheticEvent<any>): void => {
    // if (!this.state.user.name) {
    //   this.props.throwError({ message: "Error with setting user", type: "warning" });
    //   return;
    // }
    const target = event.target as HTMLInputElement;
    return this.setState({
      user: {
        ...this.state.user,
        name: target.value,
      },
    });
  }

  private renderForm = (): JSX.Element => {
    const name = this.state.user.name ? this.state.user.name : "";
    return (
      <Form>
        <div style={{ display: "flex" }}>
          <Input
            focus
            value={name}
            style={{
              fontSize: "4vh",
              flex: 1,
            }}
            onChange={this.handleUserChange}
          />
        </div>
      </Form>
    );
  }

  private renderModal = (): JSX.Element => {
    return (
      <Modal
        open={this.props.showing}
        basic
      >
        <Modal.Content>
          <Header as="h1" inverted>Can not find user. Join with new: </Header>
          {this.renderForm()}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
          <Button
            style={{fontSize: "1.4rem"}}
            color="green"
            inverted
            onClick={this.confirmModal}
          >
            <Icon name="checkmark" /> Confirm
          </Button>
          </div>
        </Modal.Content>
      </Modal>
    );
  }

  public render(): JSX.Element {
    return this.renderModal();
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    user: state.user.user,
  };
};

const mapStateProps = returntypeof(mapStateToProps);
const dispatchToProps = {
  setUser: userActions.actionCreators.setUser,
  throwError: errorHandlerActions.actionCreators.throwError,
};

export default connect(
  mapStateToProps,
  dispatchToProps,
)(LoginModal);
