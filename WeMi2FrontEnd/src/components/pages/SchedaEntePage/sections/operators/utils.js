export const addOperator = (emailOperator, operatorsArray = []) => {
  const operators = operatorsArray.slice();
  if (!emailOperator) {
    return null;
  }
  const findEmailOperator = operatorsArray.find(operator => operator.email === emailOperator);

  if (!findEmailOperator) {
    const newOperator = { email: emailOperator };
    operators.push(newOperator);
  }
  return operators;
};

export const removeOperator = (operatorToRemove, operatorsArray = []) => {
  const operators = operatorsArray.slice();
  const filteredOperators = operators.filter((operator) =>
    operator.email !== operatorToRemove.email);
  return filteredOperators;
};
