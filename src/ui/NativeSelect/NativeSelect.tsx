import React, { memo } from 'react'
import styles from './NativeSelect.module.scss'

export interface INativeSelect {
  disabled?: boolean
  items: Array<{ value: any; name: string }>
  value: string
  placeholder: string
  [x: string]: any
}

const NativeSelect: React.FC<INativeSelect> = ({
  disabled = false,
  items,
  placeholder,
  value,
  ...rest
}) => {
  return (
    <select value={value} className={styles.select} {...rest}>
      <option value="" disabled hidden>
        {placeholder}
      </option>
      {items.length &&
        items.map((item) => (
          <option key={item.value} value={item.value}>
            {item.name}
          </option>
        ))}
    </select>
  )
}

export default memo(NativeSelect)
