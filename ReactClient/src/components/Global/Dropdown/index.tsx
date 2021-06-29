// Libraries
import React, { useMemo, useState, useEffect, useRef, FC } from 'react'
// Components
import Icon from '../Icon'
// Images
import MoreIcon from '../../../../public/images/more-icon.svg'
// Styles
import styles from './index.module.scss'

type DropdownOption = {
    id: number
    onClickHandler: () => void
    name: string
    optionIcon: typeof React.Component
};

interface Props {
  options: DropdownOption[]
}

const Dropdown: FC<Props> = ({ options }) => {
  const dropdownRef = useRef(null)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const pageClickEvent = (e: MouseEvent) => {
      // If dropdown menu exist and is clicked outside of
      if (dropdownRef.current !== null && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      window.addEventListener('click', pageClickEvent)
    }

    return () => {
      window.removeEventListener('click', pageClickEvent)
    }
  }, [isOpen])

  const renderOptions = useMemo(() => {
    return options.map(({ id, onClickHandler, name, optionIcon }) => {
      return (
        <li key={id} onClick={onClickHandler} className={styles.option}>
          {optionIcon && (
            <span className={styles['icon-container']}>
              <Icon size="xs" Component={optionIcon} alt='Option Icon' color="text" />
            </span>
          )}

          <span className={styles.name}>{name}</span>
        </li>
      )
    })
  }, [options])

  if (options.length === 0) {
    return null
  }

  return (
    <div className={styles.container}>
      <span className={styles['action-button']} onClick={() => setIsOpen(true)}>
        <Icon
          size="sm"
          alt='More Info Icon'
          Component={MoreIcon}
          hasHoverEffect={true}
          color="text"
        />
      </span>

      {isOpen && (
        <ul ref={dropdownRef} className={styles.options}>
          {renderOptions}
        </ul>
      )}
    </div>
  )
}

export default Dropdown
