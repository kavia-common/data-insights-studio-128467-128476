function sleep(ms = 400) {
  return new Promise((res) => setTimeout(res, ms));
}

/**
 * PUBLIC_INTERFACE
 * Fake in-memory auth API. Do NOT use in production.
 * Accepts any email/password with minimum validation.
 */
export const fakeAuthApi = {
  async login({ email, password }) {
    await sleep();
    if (!email || !password || password.length < 6) {
      const err = new Error("Invalid credentials");
      err.code = "INVALID_CREDENTIALS";
      throw err;
    }
    // Generate a lightweight mock user
    return {
      user: {
        id: "u_" + Math.random().toString(36).slice(2, 8),
        email,
        name: email.split("@")[0],
      },
      token: "fake-token-" + Math.random().toString(36).slice(2),
    };
  },

  async signup({ name, email, password }) {
    await sleep();
    if (!name || name.trim().length < 2) {
      const err = new Error("Name must be at least 2 characters");
      err.code = "INVALID_NAME";
      throw err;
    }
    if (!email || !email.includes("@")) {
      const err = new Error("Enter a valid email");
      err.code = "INVALID_EMAIL";
      throw err;
    }
    if (!password || password.length < 6) {
      const err = new Error("Password must be at least 6 characters");
      err.code = "WEAK_PASSWORD";
      throw err;
    }
    return {
      user: {
        id: "u_" + Math.random().toString(36).slice(2, 8),
        email,
        name,
      },
      token: "fake-token-" + Math.random().toString(36).slice(2),
    };
  },

  async logout() {
    await sleep(150);
    return { ok: true };
  },
};
