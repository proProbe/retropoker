import React from "react";
import { connect } from "react-redux";
import { RootState } from "../../../redux/store";
import { returntypeof } from "../../../utils/utils";
import { actionCreators } from "../../../redux/errorHandler/actions";
import { Button, Header, Modal, Icon } from "semantic-ui-react";

type TProps = typeof dispatchToProps & typeof mapStateProps & {

};

type TState = { };

class ErrorModal extends React.Component<TProps, TState> {
  constructor(props: TProps) {
    super(props);
    this.state = this.initState();
  }

  private initState(): TState {
    return {};
  }

  public render(): JSX.Element {
    const hasError = this.props.errorHandler.error !== undefined;
    const errorMsg = this.props.errorHandler.error ? this.props.errorHandler.error.message : "Unknown error";
    const errorType = this.props.errorHandler.error ? this.props.errorHandler.error.type : "warning";
    return (
      <Modal
        open={hasError}
        basic
      >
        <Header icon="warning circle" content={errorType + "!"} />
        <Modal.Content>
          <h3>{errorMsg}</h3>
        </Modal.Content>
        <Modal.Actions>
          <Button color="red" onClick={this.props.resolveError} inverted>
            <Icon name="checkmark" /> Got it
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    errorHandler: state.errorHandler,
  };
};

const mapStateProps = returntypeof(mapStateToProps);
const dispatchToProps = {
  resolveError: actionCreators.resolveError,
};

export default connect(
  mapStateToProps,
  dispatchToProps,
)(ErrorModal);
