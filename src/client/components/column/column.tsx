import React from "react";
import Card from "../card/card";
import _ from "lodash";
import { TColumn } from "./column.types";
import { connect } from "react-redux";
import { RootState } from "../../redux/store";
import { actionCreators } from "../../redux/board/actions";
import { Button, Header, Modal, Icon, Form } from "semantic-ui-react";
import TextArea from "../common/textarea/textArea";

type TProps = TColumn & typeof dispatchToProps;
type TState = {
  showModal: boolean,
  card?: {
    value: string,
  },
};

class Column extends React.Component<TProps, TState> {
  private modalInputRef: TextArea | null = null;

  constructor(props: TProps) {
    super(props);
    this.state = this.initState();
  }

  private initState(): TState {
    return {
      showModal: false,
    };
  }

  private addCard = (): void => {
    const cardDescription = this.state.card ? this.state.card.value : "";
    this.props.addCardToColumn(
      this.props.id,
      {
        id: _.uniqueId("card"),
        description: cardDescription,
        status: "hidden",
      },
    );
    this.closeModal();
  }

  private showModal = (): void => this.setState({showModal: true, card: {value: ""}});
  private closeModal = (): void => this.setState({showModal: false, card: undefined});

  private renderCards(): JSX.Element[] {
    return this.props.cards.map((card) => <Card key={card.id} {...card} />);
  }

  private handleCardChange = (event: React.SyntheticEvent<any>): void => {
    const target = event.target as HTMLInputElement;
    return this.setState({
      card: {
        value: target.value,
      },
    });
  }

  private renderForm = (): JSX.Element => {
    const card = this.state.card ? this.state.card : {value: ""};
    return (
      <Form>
        <div style={{ display: "flex" }}>
          <TextArea
            value={card.value}
            style={{
              fontSize: "7vh",
              padding: "0.25em 0.5em",
            }}
            onChange={this.handleCardChange}
          />
        </div>
      </Form>
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
        <Button onClick={this.showModal}>
          Add card
        </Button>
        <div
          style={{
            marginTop: 20,
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            flex: 1,
          }}
        >
          {this.renderCards()}
        </div>
        <div>
          <Modal
            open={this.state.showModal}
            basic
            size="fullscreen"
          >
            <Modal.Content>
              {this.renderForm()}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
              <Button.Group>
                <Button style={{fontSize: "2rem"}} basic color='red' inverted onClick={this.closeModal}>
                  <Icon name='remove' /> Cancel
                </Button>
                <Button style={{fontSize: "2rem"}} color='green' inverted onClick={this.addCard}>
                  <Icon name='checkmark' /> Add Card
                </Button>
              </Button.Group>
              </div>
            </Modal.Content>
          </Modal>
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
