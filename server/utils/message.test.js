const expect = require("expect");

const { generateMessage } = require("./message");
describe("generateMessage", () => {
  it("should generate correct message object", () => {
    const { from, text, createdAt } = generateMessage("Me", "This is a test.");
    expect(from).toBe("Me");
    expect(text).toBe("This is a test.");
    expect(typeof createdAt).toBe("number");
  });
});
