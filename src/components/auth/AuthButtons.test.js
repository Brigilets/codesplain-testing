import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { createServer } from "../../test/server";
import { SWRConfig } from "swr";
import AuthButtons from "./AuthButtons";

async function renderComponent() {
  render(
    //resets cache for testing environment
    <SWRConfig value={{ provider: () => new Map() }}>
      <MemoryRouter>
        <AuthButtons />
      </MemoryRouter>
    </SWRConfig>
  );
  await screen.findAllByRole("link");
}

describe("when user is signed in", () => {
  // createServer --> Get '/api/user' -->{user:{id:1,email: user@user.com}}
  createServer([
    {
      path: "/api/user",
      res: () => {
        return { user: { id: 1, email: "user@user.com" } };
      },
    },
  ]);

  test("sign in and sign up are not visible", async () => {
    await renderComponent();

    const signUpBtn = screen.queryByRole("link", { name: /sign up/i });
    const signInBtn = screen.queryByRole("link", { name: /sign in/i });

    expect(signInBtn).not.toBeInTheDocument();
    expect(signUpBtn).not.toBeInTheDocument();
  });

  test("sign out is visible", async () => {
    await renderComponent();

    const signOutBtn = screen.getByRole("link", { name: /sign out/i });

    expect(signOutBtn).toBeInTheDocument();
    expect(signOutBtn).toHaveAttribute("href", "/signout");
  });
});

describe("when user is not signed in", () => {
  // createServer() --> GET '/api/user --> {user:null}
  createServer([
    {
      path: "/api/user",
      res: () => {
        return { user: null };
      },
    },
  ]);

  test("sign in and sign up are visible", async () => {
    await renderComponent();

    const signUpBtn = screen.getByRole("link", { name: /sign up/i });
    const signInBtn = screen.getByRole("link", { name: /sign in/i });

    expect(signInBtn).toBeInTheDocument();
    expect(signInBtn).toHaveAttribute("href", "/signin");
    expect(signUpBtn).toBeInTheDocument();
    expect(signUpBtn).toHaveAttribute("href", "/signup");
  });

  test("sign out is not visible", async () => {
    await renderComponent();

    const signOutBtn = screen.queryByRole("link", { name: /sign out/i });

    expect(signOutBtn).not.toBeInTheDocument();
  });
});

// const pause = () =>
//   new Promise((resolve) => {
//     setTimeout(resolve, 100);
//   });
