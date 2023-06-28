import { render, screen } from "@testing-library/react";
import RepositoriesSummary from "./RepositoriesSummary";

test("The component displays primary language of the repository", () => {
  const repository = {
    language: "Javascript",
    stargazers_count: 5,
    forks: 2,
    open_issues: 2,
  };
  render(<RepositoriesSummary repository={repository} />);

  const language = screen.getByText("Javascript");

  expect(language).toBeInTheDocument();
});
