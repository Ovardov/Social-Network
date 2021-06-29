// Libraries
import React, { FC } from 'react'
// Styles
import styles from './index.module.scss'

interface Props {
  columns: Number
  widthType: 'full-width' | 'fit-content'
  position?: 'start' | 'end'
}

const ButtonContainers: FC<Props> = ({ columns, widthType, position, children, }) => {
  return (
    <div
      className={`${styles.container} ${widthType ? styles[widthType] : ''} ${position ? styles[position] : ''}`}
      style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
    >
      {children}
    </div>
  )
}

export default ButtonContainers
