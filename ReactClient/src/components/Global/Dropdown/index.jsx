// Libraries
import React, { useMemo, useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
// Components
import Icon from '../Icon'
// Images
import MoreIcon from '../../../../public/images/more-icon.svg'
// Styles
import styles from './index.module.scss'

const Dropdown = ({ options }) => {
  const dropdownRef = useRef(null)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const pageClickEvent = (e) => {
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
              <Icon size="xs" Component={optionIcon} color="text" />
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

Dropdown.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      onClickHandler: PropTypes.func.isRequired,
      name: PropTypes.string.isRequired,
      optionIcon: PropTypes.elementType,
    })
  ).isRequired,
}

export default Dropdown
