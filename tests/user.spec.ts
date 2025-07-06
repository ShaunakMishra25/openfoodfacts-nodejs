import axios from "axios";
import { createUser } from "../src/user";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("createUser", () => {
  it("should attempt to create a new user (mock test)", async () => {
    const mockResponse = {
      data: { status: "ok" },
      status: 200,
      statusText: "OK",
      headers: {},
      config: {
        url: "https://world.openfoodfacts.org/cgi/user.pl",
        method: "post",
      },
    };

    mockedAxios.post.mockResolvedValue(mockResponse);

    const params = {
      username: "testuser123",
      password: "dummy_password_for_tests",
      email: "test@example.com",
    };

    const result = await createUser(params);
    expect(result.status).toBe("ok");
  });
});
