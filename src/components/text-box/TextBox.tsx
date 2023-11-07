import './TextBox.scss'

interface Props {
  text?: string
}

const TextBox = ({text}: Props) => {
  return (
    <div className='text-box'>{text}</div>
  )
}

export default TextBox