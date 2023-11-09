import './App.scss'
import CompoundInterestCalculator from './components/compound-interest-calculator/CompoundInterestCalculator';

import { Navigate, Route, Routes } from 'react-router-dom'
import HamburgerMenu from './components/hamburger-menu/HamburgerMenu';
import { Page } from './models/Page';
import AerToMonthlyInterest from './components/aer-to-monthly-interest/AerToMonthlyInterest';

function App() {
  const pages: Page[] = [
    {
      text: 'Compound Interest Calculator',
      link: '/compound-interest-calculator'
    },
    {
      text: 'AER to Monthly Interest',
      link: '/aer-to-monthly-interest'
    }
  ]

  return (
    <div id='app-container'>
      <HamburgerMenu pages={pages} />
      <div id='app-content'>
        <Routes>
          <Route path='/compound-interest-calculator' element={<CompoundInterestCalculator />} />
          <Route path='/aer-to-monthly-interest' element={<AerToMonthlyInterest />} />
          <Route path='*' element={<Navigate to={'/compound-interest-calculator'} />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
