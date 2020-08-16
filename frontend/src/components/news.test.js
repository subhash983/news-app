import React from "react";
import News from "./news";
import {
  render,
  cleanup,
  screen,
  waitFor,
  waitForElement,
} from "@testing-library/react";
import "@testing-library/jest-dom";

const mockFetch = Promise.resolve({
  json: () =>
    Promise.resolve({
      status: "ok",
      totalResults: 38,
      articles: [
        {
          source: {
            id: null,
            name: "Sky.com",
          },
          author: "Lucia Binding",
          title:
            "Search ends for teenage brothers missing in sea off Lancashire coast - Sky News",
          description:
            "Muhammad Azhar Shabbir, 18, and Ali Athar Shabbir, 16, went missing close to St Annes Pier in Lytham St Annes on Saturday.",
          url:
            "https://news.sky.com/story/search-ends-for-teenage-brothers-missing-in-sea-off-lancashire-coast-12050383",
          urlToImage:
            "https://e3.365dm.com/20/08/1600x900/skynews-brothers-lancashire_5069049.jpg?20200816130659",
          publishedAt: "2020-08-16T12:05:45Z",
          content: null,
        },
      ],
    }),
});
const mockedFetch = jest
  .spyOn(window, "fetch")
  .mockImplementationOnce(() => mockFetch);

afterEach(cleanup);

test("news component", async () => {
  let { getByText, getByTestId } = render(<News />);
  await waitFor(() => {
    expect(getByTestId("news-container")).toBeTruthy();
    expect((_, node) =>
      node.textContent.includes("Search ends for teenage brothers")
    ).toBeTruthy();
  });
});
