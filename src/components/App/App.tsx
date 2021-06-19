import React, { ChangeEvent, useCallback, useEffect, useState } from 'react'
import styles from './App.module.scss'
import Table from '../Table/Table'
import Logger from '../Logger/Logger'
import { getAppModes } from '../../api'
import { IAppMode, IField, ILog } from '../../types'
import {
  generateUuid,
  serverDataPrettier,
  tableFieldsCreator,
} from '../../helper'

function App() {
  const [modsList, setModsList] = useState<Array<IAppMode>>([])
  const [loading, setLoading] = useState(false)
  const [selectValue, setSelectValue] = useState('')
  const [activeMode, setActiveMode] = useState<null | number>(null)
  const [fields, setFields] = useState<Array<IField>>([])
  const [logs, setLogs] = useState<Array<ILog>>([])

  useEffect(() => {
    setLoading(true)
    getAppModes().then((data) => {
      setModsList(serverDataPrettier(data))
      setLoading(false)
    })
  }, [])

  function addNewLog(log: ILog) {
    setLogs([log, ...logs])
  }

  function toggleFieldStatus(field: IField) {
    setFields(
      fields.map((item) => {
        if (item.col === field.col && item.row === field.row) {
          return {
            ...item,
            is_active: !item.is_active,
          }
        } else return item
      })
    )
  }

  function handleFieldMouseEnter(field: IField) {
    toggleFieldStatus(field)
    addNewLog({
      value: `row: ${field.row} col: ${field.col}`,
      id: generateUuid(),
    })
  }

  const handleSelectChange = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      setSelectValue(event.target.value)
    },
    []
  )

  const handleStartClick = useCallback(() => {
    setActiveMode(Number(selectValue))
    setFields(tableFieldsCreator(Number(selectValue), { is_active: false }))
    setLogs([])
  }, [selectValue])

  return (
    <div className="container">
      {loading ? (
        'loading...'
      ) : (
        <div className={styles.app}>
          <Table
            handleStartClick={handleStartClick}
            selectValue={selectValue}
            activeMode={activeMode}
            modsList={modsList}
            handleSelectChange={handleSelectChange}
            handleFieldMouseEnter={handleFieldMouseEnter}
            fields={fields}
          />
          <Logger title="Hover squares" logs={logs} />
        </div>
      )}
    </div>
  )
}

export default App
