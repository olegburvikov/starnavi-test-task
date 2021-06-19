import React, { memo } from 'react'
import styles from './Logger.module.scss'
import { ILog } from '../../types'

interface LoggerProps {
  logs: Array<ILog>
  title: string
}

const Logger: React.FC<LoggerProps> = ({ logs, title }) => {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.logs}>
        {logs.map((log) => (
          <div className={styles.log} key={log.id}>
            {log.value}
          </div>
        ))}
      </div>
    </div>
  )
}

export default memo(Logger)
