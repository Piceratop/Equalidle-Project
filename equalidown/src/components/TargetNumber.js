import { useContext, useEffect } from "react";
import { equalidownContext } from "../contexts/equalidown";

async function returnTargetNumber(numberArr) {
  class Stack {
    constructor() {
      this.items = [];
    }

    push(item) {
      this.items.push(item);
    }

    pop() {
      if (this.isEmpty()) {
        throw new Error("Stack is empty");
      }
      return this.items.pop();
    }

    peek() {
      if (this.isEmpty()) {
        throw new Error("Stack is empty");
      }
      return this.items[this.items.length - 1];
    }

    isEmpty() {
      return this.items.length === 0;
    }
  }

  function evaluatePostfixExpression(exp) {
    function isOperator(token) {
      return token === "+" || token === "-" || token === "*" || token === "/";
    }

    function evaluateExpression(operand1, operand2, operator) {
      switch (operator) {
        case "+":
          return operand1 + operand2;
        case "-":
          return operand1 - operand2;
        case "*":
          return operand1 * operand2;
        case "/":
          return operand1 / operand2;
      }
    }

    const stack = new Stack();
    const expression = exp.split(" ");

    for (const token of expression) {
      if (isOperator(token)) {
        const operand2 = stack.pop();
        const operand1 = stack.pop();

        const result = evaluateExpression(operand1, operand2, token);

        stack.push(result);
      } else {
        stack.push(token);
      }
    }

    return stack.pop();
  }

  function getAllExpressions(numbers, ops) {
    const expressions = [];
    const results = new Set();

    function recurse(stack) {
      if (stack.length === 1) {
        const result = evaluatePostfixExpression(stack[0]);
        if (Number.isInteger(result) && result >= 101 && result <= 999) {
          expressions.push(stack[0]);
          results.add(result);
        }
      } else {
        for (let i = 0; i < stack.length; i++) {
          for (let j = i + 1; j < stack.length; j++) {
            for (let k = 0; k < ops.length; k++) {
              const left = stack[i];
              const right = stack[j];
              const operator = ops[k];
              const newStack = stack
                .slice(0, i)
                .concat(stack.slice(i + 1, j), stack.slice(j + 1));
              const result = `${left} ${right} ${operator}`;
              newStack.push(result);
              recurse(newStack);
            }
          }
        }
      }
    }

    recurse(numbers.map((num) => num.toString()));

    return results;
  }

  const givenNumbers = numberArr;
  const operators = ["+", "-", "*", "/"];

  const results = [...getAllExpressions(givenNumbers, operators)];
  const targetNumber = results[Math.floor(Math.random() * results.length)];
  return targetNumber;
}

export default function TargetNumber() {
  const [equalidownState, dispatch] = useContext(equalidownContext);

  useEffect(() => {
    async function main() {
      const targetNumber = await returnTargetNumber(
        equalidownState.numpadNumber
      );
      dispatch({
        type: "SET_TARGET_NUMBER",
        payload: targetNumber,
      });
    }
    main();
  }, [equalidownState.numpadNumber]);

  return <div className="target-number">{equalidownState.targetNumber}</div>;
}
