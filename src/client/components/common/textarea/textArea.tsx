import React from "react";
import { TextArea } from "semantic-ui-react";

type TProps = {
  value: string;
  style: object;
  onChange: (event: React.SyntheticEvent<any>) => void;
};

type TState = {
};

export default class MyTextArea extends React.Component<TProps, TState> {
  private modalInputRef: TextArea | null = null;

  constructor(props: TProps) {
    super(props);
  }

  public componentDidMount(): void {
    if (this.modalInputRef) {
      this.modalInputRef.focus();
    }
  }

  private handleCardChange = (event: React.SyntheticEvent<any>): void => {
    return this.props.onChange(event);
  }

  public render(): JSX.Element {
    return (
      <TextArea
        ref={(input) => { this.modalInputRef = input; }}
        rows={5}
        style={this.props.style}
        autoHeight={true}
        placeholder="..."
        value={this.props.value}
        onChange={this.handleCardChange}
      />
    );
  }
}
