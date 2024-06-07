/**
 * Unit tests for the Article component.
 *
 * Author: Moses Karemera
 */

import { render, screen } from "@testing-library/react";
import Article from "@/app/learn-more/components/Article";
import "@testing-library/jest-dom";

describe("Article Component", () => {
  const articleProps = {
    title: "Test Title",
    content: "Test content for the article.",
    link: "https://example.com",
    image: "/test-image.jpg",
  };

  // test if the Article component renders
  it("renders without crashing", () => {
    render(<Article {...articleProps} />);
  });

  // test if the title renders
  it("renders the title", () => {
    render(<Article {...articleProps} />);
    const title = screen.getByText("Test Title");
    expect(title).toBeInTheDocument();
  });

  // test if the content renders
  it("renders the content", () => {
    render(<Article {...articleProps} />);
    const content = screen.getByText("Test content for the article.");
    expect(content).toBeInTheDocument();
  });

  // test if the link renders
  it("renders the link", () => {
    render(<Article {...articleProps} />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "https://example.com");
  });

  // test if the image renders
  it("renders the image", () => {
    render(<Article {...articleProps} />);
    const image = screen.getByRole("img");
    expect(image).toHaveAttribute("src", "/test-image.jpg");
  });
});
