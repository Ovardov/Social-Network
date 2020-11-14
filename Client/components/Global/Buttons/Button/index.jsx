import globalButtonStyles from '../buttons.module.scss'

const Button = ({ type, text, onClickHandler, icon }) => {
  const buttonOnClickHandler = onClickHandler ? { onClickHandler } : null;

  return (
    <button type={type} className={globalButtonStyles.button}  {...buttonOnClickHandler}>
      {text}

      {icon && <span className={globalButtonStyles.icon}></span>}
    </button>
  )
}

export default Button
