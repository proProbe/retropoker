import { SemanticCOLORS } from "semantic-ui-react";
import { TCardStatus } from "../views/desktop/card/card.types";

/**
 * @export returntypeof() - extract return type of an "expression"
 * @template RT - Generic Type
 * @param expression: (...params: any[]) => RT
 * @returns RT
 */
export function returntypeof<RT>(expression: (...params: any[]) => RT): RT {
  const returnValue: any = {};
  return returnValue;
}

/**
 * Returns a Semantic color depending on the column id
 *
 * @export
 * @param {string} columnId
 * @returns {SemanticCOLORS}
 */
export function getColumnColor(columnId: string): SemanticCOLORS {
  switch (columnId) {
    case "1":
      return "green";
    case "2":
      return "teal";
    case "3":
      return "blue";
    case "4":
      return "purple";
    default:
      return "black";
  }
}

export function getCardColor({type: cardStatusType}: TCardStatus): SemanticCOLORS {
    switch (cardStatusType) {
      case "unread":
        return "yellow";
      case "read":
        return "green";
      case "error":
        return "red";
      case "resolving":
      case "resolved":
        return "purple";
      default:
        return "orange";
    }
}
