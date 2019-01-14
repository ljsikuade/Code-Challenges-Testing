const challenge = require("../codechallenge.js");

test("finds the sum of squared divisors if it is a square", () => {
  const expected = { 1: 1, 42: 2500, 246: 84100 };
  const result = challenge.listSquared(1, 250);
  expect(result).toEqual(expected);
});

test("finds the sum of squared divisors if it is a square", () => {
  const expected = {
    "1": 1,
    "42": 2500,
    "246": 84100,
    "287": 84100,
    "728": 722500
  };
  const result = challenge.listSquared(1, 1000);
  expect(result).toEqual(expected);
});

test("determines whether or not an anagram exists within an array", () => {
  const expected = ["aabb", "bbaa"];
  const result = challenge.anagrams("abba", ["aabb", "abcd", "bbaa", "dada"]);
  expect(result).toEqual(expected);
});
//fail
test("determines whether or not an anagram exists within an array", () => {
  const expected = ["carer", "racer"];
  const result = challenge.anagrams("racer", [
    "crazer",
    "carer",
    "racar",
    "caers",
    "racer"
  ]);
  expect(result).toEqual(expected);
});

test("determines whether or not a string of parentheses is balanced", () => {
  const expected = true;
  const result = challenge.validParentheses("(())((()())())");
  expect(result).toBe(expected);
});
//fail
test("determines whether or not a string of parentheses is balanced", () => {
  const expected = false;
  const result = challenge.validParentheses(")(()))");
  expect(result).toBe(expected);
});

test("orders array by sum of individual number components", () => {
  const expected = "100 90 180 56 65 74 68 86 99";
  const result = challenge.orderWeight("56 65 74 100 99 68 86 180 90");
  expect(result).toBe(expected);
});
//fail
test("orders array by sum of individual number components", () => {
  const expected = "44, 70, 60, 32, 11";
  const result = challenge.orderWeight("32, 44, 11, 70, 60");
  expect(result).toBe(expected);
});

test("finds the unique number in an array", () => {
  const expected = 2;
  const result = challenge.findUniq([1, 1, 1, 2, 1, 1]);
  expect(result).toBe(expected);
});

test("finds the unique number in an array", () => {
  const expected = 0;
  const result = challenge.findUniq([5, 5, 5, 5, 5, 5, 5, 0, 5, 5]);
  expect(result).toBe(expected);
});

test("finds the unique even number in an array", () => {
  const expected = 2;
  const result = challenge.findUniq([5, 5, 5, 5, 5, 5, 5, 2, 5, 5]);
  expect(result).toBe(expected);
});

test("finds the unique odd number in an array", () => {
  const expected = 3;
  const result = challenge.findUniq([2, 3, 2, 2, 2, 2, 2]);
  expect(result).toBe(expected);
});

test("Determines who is next in the doubling queue", () => {
  const expected = "Penny";
  const result = challenge.whoIsNext(
    ["Sheldon", "Leonard", "Penny", "Rajesh", "Howard"],
    52
  );
  expect(result).toBe(expected);
});

test("Determines who is next in the doubling queue", () => {
  const expected = "Sheldon";
  const result = challenge.whoIsNext(
    ["Sheldon", "Leonard", "Penny", "Rajesh", "Howard"],
    18
  );
  expect(result).toBe(expected);
});

test("Moves all zeros to end of array without affecting order", () => {
  const expected = [false, 1, 1, 2, 1, 3, "a", 0, 0];
  const result = challenge.moveZeros([false, 1, 0, 1, 2, 0, 1, 3, "a"]);
  expect(result).toEqual(expected);
});
//fail
test("Moves all zeros to end of array without affecting order", () => {
  const expected = [true, 1, 88, 2, "hi", 3, "a", 0, 0, 0, 0];
  const result = challenge.moveZeros([
    true,
    1,
    0,
    88,
    2,
    0,
    0,
    "hi",
    0,
    3,
    "a"
  ]);
  expect(result).toEqual(expected);
});

test("Moves first letter of each word to the end and adds 'ay'", () => {
  const expected = "igpay atinlay siay oolcay";
  const result = challenge.pigIt("pig latin is cool");
  expect(result).toEqual(expected);
});

test("Must not be punctuation", () => {
  const expected = "elloHay orldway !";
  const result = challenge.pigIt("Hello world !");
  expect(result).toEqual(expected);
});
