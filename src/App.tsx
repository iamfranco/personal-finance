import './App.scss'
import CompoundInterestCalculator from './components/compound-interest-calculator/CompoundInterestCalculator';

import { Navigate, Route, Routes } from 'react-router-dom'
import HamburgerMenu from './components/hamburger-menu/HamburgerMenu';
import { Page } from './models/Page';
import AerToMonthlyInterest from './components/aer-to-monthly-interest/AerToMonthlyInterest';
import { createContext, useState } from 'react';
import classNames from 'classnames';
import { localStorageService } from './services/local-storage-service/localStorageService';

export const DarkThemeContext = createContext<{isDarkTheme: boolean, toggleTheme: () => void}>(null as any);

function App() {
  const pages: Page[] = [
    {
      text: 'Compound Interest Calculator',
      link: '/compound-interest-calculator'
    },
    // {
    //   text: 'AER to Monthly Interest',
    //   link: '/aer-to-monthly-interest'
    // }
  ]

  const initialIsDarkTheme = localStorageService.getItem<boolean>('is-dark-mode', false);
  const [isDarkTheme, setIsDarkTheme] = useState(initialIsDarkTheme);
  const toggleTheme = () => {
    setIsDarkTheme(x => {
      const y = !x;
      localStorage.setItem('is-dark-mode', JSON.stringify(y));
      return y;
    });
  }
  
  return (
    <DarkThemeContext.Provider value={{isDarkTheme, toggleTheme}}>
      <div id='app-container' className={classNames(isDarkTheme && 'dark')}>
        <HamburgerMenu pages={pages} />
        <div id='app-content'>
          <Routes>
            <Route path='/compound-interest-calculator' element={<CompoundInterestCalculator />} />
            <Route path='/aer-to-monthly-interest' element={<AerToMonthlyInterest />} />
            <Route path='*' element={<Navigate to={'/compound-interest-calculator'} />} />
          </Routes>
        </div>
      </div>
    </DarkThemeContext.Provider>
  )
}

export default App
