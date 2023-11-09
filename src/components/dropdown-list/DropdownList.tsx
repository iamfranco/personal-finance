import { RegularPayInPeriod } from '../../models/RegularPayInPeriod'
import './DropdownList.scss'

interface Props<T> {
  currentValue: T,
  possibleValues: T[],
  setValue: React.Dispatch<React.SetStateAction<T>>
}

function DropdownList<T extends RegularPayInPeriod> ({currentValue, possibleValues, setValue}: Props<T>) {
  if (!possibleValues.includes(currentValue)) {
    currentValue = possibleValues[0];
    setValue(currentValue);
  }
  
  const options = possibleValues.map(value => 
    <option value={value} key={value}>{value}</option>
  );

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = e.currentTarget.value as T;
    setValue(newValue);
  }
  
  return (
    <select className='dropdown-list' defaultValue={currentValue} onChange={handleChange}>
      {options}
    </select>
  )
}

export default DropdownList