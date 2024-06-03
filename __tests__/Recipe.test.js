/**
 * Unit tests for the Recipes component.
 *
 * Author: Devam Patel
 */

import { fireEvent, render, screen } from "@testing-library/react";
import Recipes from "@/app/recipes/page";
import "@testing-library/jest-dom";

describe("Recipes Component", () => {
  // test if the Recipes component renders
  it("recipes componenet renders without crashing", () => {
    render(<Recipes />);
  });

  // test header renders
  it("recipes header renders", () => {
    render(<Recipes />);
    const headerText = screen.getByTestId("recipe-header-lookup-text");
    expect(headerText).toBeInTheDocument();
  });

  // test search bar and button renders
  it("renders the search input and button", () => {
    render(<Recipes />);
    const searchInput = screen.getByPlaceholderText(
      "Search for delicious recipes..."
    );
    const searchButton = screen.getByRole("button", { name: "Search" });
    expect(searchInput).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
  });

  // test input onChange event fires
  it("updates searchQuery state when typing in the search input", () => {
    render(<Recipes />);
    const searchInput = screen.getByPlaceholderText(
      "Search for delicious recipes..."
    );
    fireEvent.change(searchInput, { target: { value: "pasta" } });
    expect(searchInput.value).toBe("pasta");
  });

  // test dropdowns render
  it("cusine dropdown renders", () => {
    render(<Recipes />);
    const dropdown = screen.getByTestId("cuisine-dropdown");
    expect(dropdown).toBeInTheDocument();
    expect(dropdown).toBeInTheDocument();
  });

  it("meal dropdown renders", () => {
    render(<Recipes />);
    const dropdown = screen.getByTestId("meal-dropdown");
    expect(dropdown).toBeInTheDocument();
    expect(dropdown).toBeInTheDocument();
  });

  it("diet dropdown renders", () => {
    render(<Recipes />);
    const dropdown = screen.getByTestId("diet-dropdown");
    expect(dropdown).toBeInTheDocument();
    expect(dropdown).toBeInTheDocument();
  });
});
