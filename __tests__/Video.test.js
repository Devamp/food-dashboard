/**
 * Unit tests for the Video component.
 *
 * Author: Moses Karemera
 */
// /src/app/learn-more/components/Article.js
import { render, screen } from "@testing-library/react";
import Video from "@/app/learn-more/components/Video";
import "@testing-library/jest-dom";

describe("Video Component", () => {
  const videoProps = {
    title: "Test Video",
    url: "https://www.youtube.com/embed/test",
    intro: "Introduction to the test video.",
  };

  // test if the Video component renders
  it("renders without crashing", () => {
    render(<Video {...videoProps} />);
  });

  // test if the title renders
  it("renders the title", () => {
    render(<Video {...videoProps} />);
    const title = screen.getByText("Test Video");
    expect(title).toBeInTheDocument();
  });

  // test if the introduction renders
  it("renders the introduction", () => {
    render(<Video {...videoProps} />);
    const intro = screen.getByText("Introduction to the test video.");
    expect(intro).toBeInTheDocument();
  });

  // test if the iframe renders
  it("renders the iframe", () => {
    render(<Video {...videoProps} />);
    const iframe = screen.getByTitle("Test Video");
    expect(iframe).toHaveAttribute("src", "https://www.youtube.com/embed/test");
  });
});
