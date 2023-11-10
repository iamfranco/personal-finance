import { useEffect, useState } from 'react'
import InputNumber from '../input-number/InputNumber'
import DropdownList from '../dropdown-list/DropdownList'
import { RegularPayInPeriod } from '../../models/RegularPayInPeriod'
import './CompoundInterestCalculator.scss'
import { CompoundInterestParams } from '../../models/CompoundInterestParams'
import { calculationService } from '../../services/calculation-service/calculationService'
import TextBox from '../text-box/TextBox'
import LineChart from '../line-chart/LineChart'
import { numberDisplayService } from '../../services/number-display-service/numberDisplayService'
import { localStorageService } from '../../services/local-storage-service/localStorageService'

const CompoundInterestCalculator = () => {
  const initialValues = localStorageService.getItem<CompoundInterestParams>('compound-interest-calculator', {
    principal: 1000,
    regularPayIns: 750,
    regularPayInPeriod: RegularPayInPeriod.Monthly,
    duration: 40,
    interestRate: 7
  });

  const [principal, setPrincipal] = useState(initialValues.principal);
  const [regularPayIns, setRegularPayIns] = useState(initialValues.regularPayIns);
  const [regularPayInPeriod, setRegularPayInPeriod] = useState(initialValues.regularPayInPeriod);
  const [duration, setDuration] = useState(initialValues.duration);
  const [interestRate, setInterestRate] = useState(initialValues.interestRate);

  const [compounds, setCompounds] = useState<number[]>([]);
  const [contributions, setContributions] = useState<number[]>([]);

  const totalCompound = numberDisplayService.toCurrencyFormat(compounds.slice(-1)[0] ?? 0);
  const totalContribution = numberDisplayService.toCurrencyFormat(contributions.slice(-1)[0] ?? 0);

  useEffect(() => {
    const compoundInterestParams: CompoundInterestParams = {
      principal: principal,
      regularPayIns: regularPayIns,
      regularPayInPeriod: regularPayInPeriod,
      duration: duration,
      interestRate: interestRate
    }

    setCompounds(() => calculationService.getCompoundInterest(compoundInterestParams));
    setContributions(() => calculationService.getTotalContribution(compoundInterestParams));

    localStorage.setItem('compound-interest-calculator', JSON.stringify(compoundInterestParams));
  }, [principal, regularPayIns, duration, interestRate, regularPayInPeriod]);

  const totalRows = (
    <div className='total-flex-container'>
      <div className='total-container'>
        <div className='total-compound total-row'>
          <div>
            <strong>Total</strong> after <strong>{duration}</strong> years
          </div>
          <div className='currency'>
            {totalCompound}
          </div>
        </div>

        <div className='total-contribution total-row'>
          <div>
            Raw Contributions
          </div>
          <div className='currency'>
            {totalContribution}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className='compound-interest-container'>
      <h1>Compound Interest Calculator</h1>
      
      <div className='row-group-container'>

        <div className='row-group'>
          <div className='input-row'>
            <span className='input-label'>Initial Investment</span>
            <InputNumber setValue={setPrincipal} value={principal}/>
            <TextBox />
          </div>
          <div className='input-row'>
            <span className='input-label'>Periodic Contribution</span>
            <InputNumber setValue={setRegularPayIns} value={regularPayIns}/>
            <DropdownList 
              currentValue={initialValues.regularPayInPeriod}
              possibleValues={Object.values(RegularPayInPeriod)} 
              setValue={setRegularPayInPeriod} />
          </div>
        </div>

        <div className='row-group'>
          <div className='input-row'>
            <span className='input-label'>Length of Time</span>
            <InputNumber setValue={setDuration} value={duration}/>
            <TextBox text='Years' />
          </div>
          <div className='input-row'>
            <span className='input-label'>Interest Rate</span>
            <InputNumber setValue={setInterestRate} value={interestRate}/>
            <TextBox text='% (AER)' />
          </div>
        </div>

        <div className='show-for-desktop-wide margin-left-auto'>
          {totalRows}
        </div>
      </div>

      <div className='show-for-sub-desktop-wide'>
        {totalRows}
      </div>

      <div className='line-chart-container'>
        <LineChart y1={compounds} y2={contributions} />
      </div>
    </div>
  )
}

export default CompoundInterestCalculator