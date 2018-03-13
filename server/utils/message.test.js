const expect = require("expect");

const { generateMessage, generateLocationMessage } = require("./message");
describe("generateMessage", () => {
  it("should generate correct message object", () => {
    const { from, text, createdAt } = generateMessage("Me", "This is a test.");
    expect(from).toBe("Me");
    expect(text).toBe("This is a test.");
    expect(typeof createdAt).toBe("number");
  });
});

describe("generateLocationMessage", () => {
  it("should generate correct location object", () => {
    const { from, url, createdAt } = generateLocationMessage("admin", 1, 1);
    expect(from).toBe("admin");
    expect(url).toBe("https://www.google.com/maps?q=1,1");
    expect(typeof createdAt).toBe("number");
  });
});
