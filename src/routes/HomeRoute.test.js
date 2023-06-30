import { screen, render } from "@testing-library/react";
import { setupServer } from "msw/node";
import { rest } from "msw";
import { MemoryRouter } from "react-router-dom";
import HomeRoute from "./HomeRoute";
import { createServer } from "../test/server";

createServer([
  {
    path: "/api/repositories",
    method: "get",
    res: (req, res, ctx) => {
      const language = req.url.searchParams.get("q").split("language:")[1];

      return {
        items: [
          { id: 1, full_name: `${language}_1` },
          { id: 2, full_name: `${language}_2` },
        ],
      };
    },
  },
]);

test("Renders 2 links for each language table", async () => {
  render(
    <MemoryRouter>
      <HomeRoute />
    </MemoryRouter>
  );

  // Loop over each language
  const languages = [
    "javascript",
    "typescript",
    "rust",
    "go",
    "python",
    "java",
  ];

  for (let language of languages) {
    // find 2 links for each language
    const links = await screen.findAllByRole("link", {
      name: new RegExp(`${language}_`),
    });

    expect(links).toHaveLength(2);
    // Assert the links have appropriate full_name
    expect(links[0]).toHaveTextContent(`${language}_1`);
    expect(links[1]).toHaveTextContent(`${language}_2`);
    expect(links[0]).toHaveAttribute("href", `/repositories/${language}_1`);
    expect(links[1]).toHaveAttribute("href", `/repositories/${language}_2`);
  }

  await screen.findAllByRole("link");
});
// const pause = () =>
//   new Promise((resolve) => {
//     setTimeout(resolve, 100);
//   });

// Non automated way to use msw!

//   const handlers = [
//   rest.get("/api/repositories", (req, res, ctx) => {
//     const language = req.url.searchParams.get("q").split("language:")[1];
//     console.log(language);
//     return res(
//       ctx.json({
//         items: [
//           { id: 1, full_name: `${language}_1` },
//           { id: 2, full_name: `${language}_2` },
//         ],
//       })
//     );
//   }),
// ];

// const server = setupServer(...handlers);

// // built in Jest test runner
// beforeAll(() => {
//   //start the server
//   server.listen();
// });
// afterEach(() => {
//   // reset handlers to initial default state,required but useful only when handler is changing over time
//   server.resetHandlers();
// });
// afterAll(() => {
//   //stop the server
//   server.close();
// });
