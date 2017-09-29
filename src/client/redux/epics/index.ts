import "rxjs";
import { combineEpics } from "redux-observable";

import ping from "./ping";

const rootEpic = combineEpics(
  ping,
);
export default rootEpic;