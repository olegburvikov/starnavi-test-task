import React, { memo } from 'react'
import styles from './Button.module.scss'

export interface IButtonProps {
  children: string | Node
  disabled?: boolean
  [x: string]: any
}

const Button: React.FC<IButtonProps> = ({
  children,
  disabled = false,
  ...rest
}) => {
  return (
    <button className={styles.button} disabled={disabled} {...rest}>
      {children}
    </button>
  )
}

export default memo(Button)
