import React from "react";

type TProps = {};
export default class Mobile extends React.PureComponent<TProps, any> {
  public render() {
    return (
      <div
        style={{
          display: "flex",
          flex: 1,
        }}
      >
        MOBILE
      </div>
    );
  }
}
