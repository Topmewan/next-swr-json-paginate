import styles from './Button.module.css';

const Button = ({children, disabled, onClick,className,type}) => {
  return (
    <>
      <button
        className={className ? styles.buttonClassic : styles.buttonStep}
        onClick={onClick}
        disabled={disabled}
        type={type}
      >
        {children}
      </button>

    </>
  )
};

export default Button;