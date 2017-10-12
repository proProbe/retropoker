import React from "react";
import Board from "./board/board";
import ErrorModal from "./common/errorHandlers/modal/errorModal";

type TProps = {};
export default class Desktop extends React.PureComponent<TProps, any> {
  public render() {
    return (
      <div
        style={{
          display: "flex",
          flex: 1,
          backgroundColor: "#C4C5C7",
        }}
      >
        <Board />
        <ErrorModal />
      </div>
    );
  }
}
