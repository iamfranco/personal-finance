import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import TextBox from "./TextBox";

describe('TextBox component', () => {
  afterEach(cleanup)
  
  it('renders text', () => {
    // Arrange Act
    const text = 'some text';
    render(<TextBox text={text}/>)

    // Assert
    expect(screen.getByText(text)).not.toBeNull();
  })
})