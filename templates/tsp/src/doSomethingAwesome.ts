import { myVal } from "./myVal";

const doSomethingAwesome = (a: number, b: number) => {
  const sum = a + b;
  console.log("myVal", myVal);
  return sum;
};

export default doSomethingAwesome;
