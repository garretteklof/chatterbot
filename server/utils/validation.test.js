const expect = require("expect");

const { isRealString } = require("./validation");

describe("isRealString", () => {
  it("should reject non-string values", () => {
    const test = isRealString(123);
    expect(test).toBeFalsy();
  });
  it("should reject string with only spaces", () => {
    const test = isRealString("    ");
    expect(test).toBeFalsy();
  });
  it("should allow string with non-space chars", () => {
    const test = isRealString("Hello!");
    expect(test).toBeTruthy();
  });
});
