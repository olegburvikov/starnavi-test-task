import React, { ChangeEvent } from 'react'
import styles from './Table.module.scss'
import Button from '../../ui/Button/Button'
import { IAppMode, IField } from '../../types'
import cn from 'classnames'
import NativeSelect from '../../ui/NativeSelect/NativeSelect'

interface TableProps {
  fields: Array<IField>
  modsList: Array<IAppMode>
  activeMode: number | null
  selectValue: string
  handleStartClick: () => void
  handleSelectChange: (event: ChangeEvent<HTMLSelectElement>) => void
  handleFieldMouseEnter: (field: IField) => void
}

const Table: React.FC<TableProps> = ({
  fields,
  handleSelectChange,
  handleStartClick,
  selectValue,
  modsList,
  activeMode,
  handleFieldMouseEnter,
}) => {
  const tableBodyStyles = {
    '--table-size': activeMode,
  } as React.CSSProperties
  return (
    <div className={styles.table}>
      <header className={styles.header}>
        <NativeSelect
          placeholder="pick mode"
          value={selectValue}
          items={modsList}
          onChange={handleSelectChange}
        />

        <Button
          disabled={!selectValue}
          onClick={handleStartClick}
          style={{ marginLeft: 14 }}
        >
          Start
        </Button>
      </header>

      {activeMode && (
        <div className={styles.body} style={tableBodyStyles}>
          {fields.map((field) => (
            <div
              key={`row:${field.row}-col:${field.col}`}
              onMouseEnter={() => handleFieldMouseEnter(field)}
              className={cn(styles.field, { [styles.active]: field.is_active })}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default Table
