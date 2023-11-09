import './InputNumber.scss'

interface Props {
  setValue: React.Dispatch<React.SetStateAction<number>>
}

const InputNumber = ({setValue}: Props) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;

    if (val.length == 0) {
      return setValue(0);
    }

    setValue(parseFloat(val));
  }

  return (
    <input 
      onChange={handleChange} 
      placeholder='0'
      type='number'
      className='input-number'/>
  )
}

export default InputNumber