import { useState } from 'react';
import './InputNumber.scss'
import classNames from 'classnames';

interface Props {
  setValue: React.Dispatch<React.SetStateAction<number>>
}

const InputNumber = ({setValue}: Props) => {
  const [isNumber, setIsNumber] = useState(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;

    if (val.length == 0) {
      setValue(0);
      return setIsNumber(true);
    }

    const numberRegex = new RegExp(/^\d*\.?\d*$/);
    const isNumber = numberRegex.test(val);
    if (!isNumber) {
      return setIsNumber(false);
    }

    setValue(parseFloat(val));
    setIsNumber(true);
  }

  return (
    <input 
      onChange={handleChange} 
      placeholder='0'
      className={classNames(
        'input-number',
        !isNumber && 'error'
      )}/>
  )
}

export default InputNumber