// @flow
import React from "react";

type Props = {
}

type State = {
}

export default class extends React.Component {
  props: Props
  state: State

  constructor(props: Props) {
    super(props);
    this.state = this.initState();
  }

  initState = (): State => {
    return {};
  }

  componentDidMount() {
  }

  render() {
    return (
      <div>
        Hello
      </div>
    );
  }
};