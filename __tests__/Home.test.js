/**
 * Unit tests for the Home component.
 *
 * Author: Devam Patel
 */

import { render, screen } from "@testing-library/react";
import Home from "@/app/page";
import "@testing-library/jest-dom";

describe("Home Component", () => {
  // test if the Home component renders
  it("home componenet renders without crashing", () => {
    render(<Home />);
  });

  // test take me there button for recipe page
  it("'Take me there' button renders", () => {
    render(<Home />);
    const link = screen.getByRole("link", { name: "Take me there" });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/recipes");
  });

  // test lets go button for food look up page
  it("'Lets go' button renders", () => {
    render(<Home />);
    const link = screen.getByRole("link", { name: "Let's go" });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/food-search");
  });

  // test recipe header renders
  it("Recipe header text renders", () => {
    render(<Home />);
    const headerText = screen.getByTestId("recipe-header-text");
    expect(headerText).toBeInTheDocument();
  });

  // test nutritional header renders
  it("Nutrition header text renders", () => {
    render(<Home />);
    const headerText = screen.getByTestId("nutrition-header-text");
    expect(headerText).toBeInTheDocument();
  });

  // test images render
  it("renders the images", () => {
    render(<Home />);
    const images = screen.getAllByTestId(/-img$/);
    expect(images.length).toBe(4);
    const imageAlts = images.map((img) => img.alt);
    expect(imageAlts).toEqual([
      "This is a picture of a roasted chicken",
      "This is a picture of a sushi",
      "This is a picture of a lobster",
      "This is a picture of a ramen",
    ]);
  });
});
