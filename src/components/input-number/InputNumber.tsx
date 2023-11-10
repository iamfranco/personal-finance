import { useState } from 'react'
import './InputNumber.scss'

interface Props {
  setValue: React.Dispatch<React.SetStateAction<number>>
  value?: number,
}

const InputNumber = ({setValue, value}: Props) => {
  const [isEmpty, setIsEmpty] = useState(value == undefined);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;

    if (val.length == 0) {
      setIsEmpty(true);
      return setValue(0);
    }

    setIsEmpty(false);
    setValue(parseFloat(val));
  }

  return (
    <input 
      onChange={handleChange} 
      placeholder='0'
      type='number'
      className='input-number'
      value={isEmpty ? '' : value}/>
  )
}

export default InputNumber