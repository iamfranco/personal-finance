import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import HamburgerMenu from "./HamburgerMenu";
import userEvent from "@testing-library/user-event";
import { Page } from "../../models/Page";
import { NavLinkProps } from "react-router-dom";
import { DarkThemeContext } from "../../App";

const pages: Page[] = [
  {
    text: 'text 1',
    link: '/link1'
  },
  {
    text: 'text 2',
    link: '/link2'
  }
]

vi.mock('react-router-dom', () => { 
  return {
    NavLink: ({children}: NavLinkProps) => <div>{children?.toString()}</div>
  }
});

const mockToggleTheme = vi.fn();

describe('HamburgerMenu component', () => {
  const user = userEvent.setup();

  beforeEach(() => {
    render(
      <DarkThemeContext.Provider value={{isDarkTheme: true, toggleTheme: mockToggleTheme}}>
        <HamburgerMenu pages={pages} />
      </DarkThemeContext.Provider>
    );
  })
  afterEach(cleanup)

  it('when initially rendered, menu is NOT opened', async () => {
    // Assert
    const popupMenu = screen.getByTestId('popup-menu');
    expect(popupMenu.className).not.toContain('open');
  })

  it('when user click hamburger, then menu is opened', async () => {
    // Act
    await user.click(screen.getByRole('button'));

    // Assert
    const popupMenu = screen.getByTestId('popup-menu');
    expect(popupMenu.className).toContain('open');

    pages.forEach(page => {
      expect(screen.getByText(page.text)).not.toBeNull();
    })
  })

  it('when user click hamburger twice, then menu is closed', async () => {
    // Act
    for (var i=0; i<2; i++) {
      await user.click(screen.getByRole('button'));
    }

    // Assert
    const popupMenu = screen.getByTestId('popup-menu');
    expect(popupMenu.className).not.toContain('open');

    pages.forEach(page => {
      expect(screen.getByText(page.text)).not.toBeNull();
    })
  })

  it('when user click dark mode, then toggleDarkMode is called', async () => {
    // Arrange
    const darkModeToggle = screen.getByTestId('dark-mode-toggle');
    
    // Act
    await user.click(darkModeToggle);

    // Assert
    expect(mockToggleTheme).toHaveBeenCalled();
  })
})