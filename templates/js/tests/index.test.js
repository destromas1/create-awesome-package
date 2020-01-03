import doSomethingAwesome from "../src/doSomethingAwesome";

test("test doSomethingAwesome should return 3", () => {
  const num1 = 1;
  const num2 = 2;
  const sum = doSomethingAwesome(num1, num2);
  expect(sum).toBe(3);
});
