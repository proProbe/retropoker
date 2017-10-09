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
