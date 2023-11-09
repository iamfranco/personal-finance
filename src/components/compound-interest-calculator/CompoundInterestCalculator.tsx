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

const CompoundInterestCalculator = () => {
  const compoundInterestParams: CompoundInterestParams = {
    principal: 0,
    regularPayIns: 0,
    regularPayInPeriod: RegularPayInPeriod.Monthly,
    duration: 0,
    interestRate: 0,
  }

  const [principal, setPrincipal] = useState(0);
  const [regularPayIns, setRegularPayIns] = useState(0);
  const [duration, setDuration] = useState(0);
  const [interestRate, setInterestRate] = useState(0);

  const initialRegularPayInPeriod = RegularPayInPeriod.Monthly;

  const [regularPayInPeriod, setRegularPayInPeriod] = useState(initialRegularPayInPeriod);

  const [compounds, setCompounds] = useState<number[]>([]);
  const [contributions, setContributions] = useState<number[]>([]);

  const totalCompound = numberDisplayService.toCurrencyFormat(compounds.slice(-1)[0] ?? 0);
  const totalContribution = numberDisplayService.toCurrencyFormat(contributions.slice(-1)[0] ?? 0);

  useEffect(() => {
    compoundInterestParams.principal = principal;
    compoundInterestParams.regularPayIns = regularPayIns;
    compoundInterestParams.duration = duration;
    compoundInterestParams.interestRate = interestRate;

    compoundInterestParams.regularPayInPeriod = regularPayInPeriod;

    setCompounds(() => calculationService.getCompoundInterest(compoundInterestParams));
    setContributions(() => calculationService.getTotalContribution(compoundInterestParams));
  }, [principal, regularPayIns, duration, interestRate, regularPayInPeriod]);

  return (
    <div className='compound-interest-container'>
      <h1>Compound Interest Calculator</h1>
      
      <div className='row-group-container'>
        <div className='row-group'>
          <div className='input-row'>
            <span className='input-label'>Initial Investment</span>
            <InputNumber setValue={setPrincipal}/>
            <TextBox />
          </div>
          <div className='input-row'>
            <span className='input-label'>Periodic Contribution</span>
            <InputNumber setValue={setRegularPayIns}/>
            <DropdownList 
              currentValue={initialRegularPayInPeriod}
              possibleValues={Object.values(RegularPayInPeriod)} 
              setValue={setRegularPayInPeriod} />
          </div>
        </div>

        <div className='row-group'>
          <div className='input-row'>
            <span className='input-label'>Length of Time</span>
            <InputNumber setValue={setDuration}/>
            <TextBox text='Years' />
          </div>
          <div className='input-row'>
            <span className='input-label'>Interest Rate</span>
            <InputNumber setValue={setInterestRate}/>
            <TextBox text='% (AER)' />
          </div>
        </div>
      </div>

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

      <LineChart y1={compounds} y2={contributions} label1={''} label2={''} />
    </div>
  )
}

export default CompoundInterestCalculator