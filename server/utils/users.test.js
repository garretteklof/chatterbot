const expect = require("expect");

const { Users } = require("./users");

describe("Users", () => {
  let users;
  beforeEach(() => {
    users = new Users();
    users.users = [
      { id: "1", name: "Winston", room: "Dirty Birds" },
      { id: "2", name: "Charles", room: "Alaskan Peach Trees" },
      { id: "3", name: "Qdoba", room: "Dirty Birds" }
    ];
  });
  it("should add a new user", () => {
    const users = new Users();
    const user = {
      id: "123",
      name: "Test",
      room: "Test Room"
    };
    const newUser = users.addUser(user.id, user.name, user.room);
    expect(users.users).toEqual([user]);
  });

  it("should remove a user", () => {
    const user = users.removeUser("1");
    expect(user.id).toBe("1");
    expect(users.users.length).toBe(2);
  });

  it("should NOT remove a user", () => {
    const user = users.removeUser("111");
    expect(user).toBeUndefined();
    expect(users.users.length).toBe(3);
  });

  it("should find user", () => {
    const user = users.getUser("2");
    expect(user).toEqual(users.users[1]);
  });

  it("should NOT find user", () => {
    const user = users.getUser("100");
    expect(user).toBeUndefined();
  });

  it("should return names for Dirty Birds room", () => {
    const userList = users.getUserList("Dirty Birds");
    expect(userList).toEqual(["Winston", "Qdoba"]);
  });
  it("should return names for Alaskan Peach Trees room", () => {
    const userList = users.getUserList("Alaskan Peach Trees");
    expect(userList).toEqual(["Charles"]);
  });
});
