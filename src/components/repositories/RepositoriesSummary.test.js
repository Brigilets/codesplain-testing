import { render, screen } from "@testing-library/react";
import RepositoriesSummary from "./RepositoriesSummary";

test("Displays information about the repository", () => {
  const repository = {
    language: "Javascript",
    stargazers_count: 5,
    forks: 3,
    open_issues: 2,
  };
  render(<RepositoriesSummary repository={repository} />);

  //   const language = screen.getByText("Javascript");
  //   expect(language).toBeInTheDocument();

  for (let key in repository) {
    const value = repository[key];
    const element = screen.getByText(new RegExp(value));

    expect(element).toBeInTheDocument();
  }
});
