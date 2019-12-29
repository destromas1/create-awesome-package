import doSomethingAwesomeAddition from "../src/doSomethingAwesome";

test("test doSomethingAwesomeAddition should return 3", () => {
  const num1 = 1;
  const num2 = 2;
  const sum = doSomethingAwesomeAddition(num1, num2);
  expect(sum).toBe(3);
});
