import { useContext, useState } from 'react';
import './HamburgerMenu.scss';
import classNames from 'classnames';
import { Page } from '../../models/Page';
import { NavLink } from 'react-router-dom';
import GitHubIcon from '../../assets/github.svg';
import { DarkThemeContext } from '../../App';

interface Props {
  pages: Page[]
}

const HamburgerMenu = ({pages}: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const {isDarkTheme, toggleTheme} = useContext(DarkThemeContext);

  const handleClick = () => {
    setIsOpen(isOpen => !isOpen);
  }

  const closeMenu = () => setIsOpen(false);

  const menuItems = pages.map(page => {

    return (
      <NavLink key={page.link}
        onClick={closeMenu}
        to={page.link}
        className={classNames('menu-item')}>{page.text}</NavLink>
    );
  })

  return (
    <div id='hamburger-menu'>
      <button id='hamburger' className={classNames(isOpen && 'active')} onClick={handleClick}>
        <div id='hamburger-middle-line'></div>
      </button>

      <div id='menu' data-testid='popup-menu' className={classNames(isOpen && 'open')}>
        <div id='menu-title'>
          Personal Finance Tools
        </div>

        {menuItems}

        <div id='menu-footer'>
          <div 
            data-testid='dark-mode-toggle'
            className='menu-footer-item' 
            onClick={() => {toggleTheme(); closeMenu()}}
          >
            { isDarkTheme ? 'Light Mode' : 'Dark Mode' }
          </div>

          <a href='https://github.com/iamfranco/personal-finance' target='_blank' className='menu-footer-item'>
            Source Code
            <img src={GitHubIcon} alt="GitHub Icon" id='github-icon'/>
          </a>
        </div>

      </div>

      <div id='menu-backdrop' 
        className={classNames(isOpen && 'open')}
        onClick={closeMenu}
        />
    </div>
  )
}

export default HamburgerMenu