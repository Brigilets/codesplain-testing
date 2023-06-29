import { render, screen, act } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import RepositoriesListItem from "./RepositoriesListItem";

// Bypasses the import of FileIcon component and serves a mock
// jest.mock("../tree/FileIcon", () => {
//   return () => {
//     // Content of FileIcon.js
//     return "File Icon Component";
//   };
// });

function renderComponent() {
  const repository = {
    full_name: "facebook/react",
    language: "Javascript",
    description: "Js library",
    owner: { login: "facebook" },
    name: "react",
    html_url: "https://github.com/facebook/react",
  };
  render(
    <MemoryRouter>
      <RepositoriesListItem repository={repository} />
    </MemoryRouter>
  );
  return { repository };
}

test("Shows a link to github repository", async () => {
  const { repository } = renderComponent();
  // Fixing act()  warning
  await screen.findByRole("img", { name: "Javascript" });
  // DO NOT USE MOST OF THE TIMES! LAST RESORT
  //   await act(async () => {
  //     await pause();
  //   });

  const link = screen.getByRole("link", { name: /github repository/i });
  expect(link).toHaveAttribute("href", repository.html_url);
});

// const pause = () => {
//   new Promise((resolve) => setTimeout(resolve, 1000));
// };

test("Shows a link to code editor page", async () => {
  const { repository } = renderComponent();
  await screen.findByRole("img", { name: "Javascript" });

  const link = await screen.findByRole("link", {
    name: new RegExp(repository.owner.login),
  });

  expect(link).toHaveAttribute("href", `/repositories/${repository.full_name}`);
});

test("Language icon is visible", async () => {
  renderComponent();
  const icon = await screen.findByRole("img", { name: "Javascript" });
  expect(icon).toHaveClass("js-icon");
});
