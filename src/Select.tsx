import { useEffect, useRef, useState } from "react"
import styles from "./select.module.scss"

export type SelectOption = {
  label: string
  value: number
}

type SingleSelect = {
  multiple?: false
  value?: SelectOption
  onChange: (value?: SelectOption) => void
}

type MultipleSelect = {
  multiple: true
  value: SelectOption[]
  onChange: (value: SelectOption[]) => void
}

type SelectProps = {
  options: SelectOption[]
} & (SingleSelect | MultipleSelect)

export const Select = ({ multiple, value, onChange, options }: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [highlightedIndex, setHighligtedIndex] = useState(0)
  // const containerRef = useRef<HTMLDivElement>(null)

  function clearOptions() {
    multiple ? onChange([]) : onChange(undefined)
  }

  function selectOption(option: SelectOption) {
    if (multiple) {
      if (value.includes(option)) {
        onChange(value.filter((o) => o !== option))
      } else {
        onChange([...value, option])
      }
    } else {
      if (option !== value) onChange(option)
    }
  }

  function isOptionSelected(option: SelectOption) {
    return multiple ? value.includes(option) : option === value
  }

  useEffect(() => {
    isOpen && setHighligtedIndex(0)
  }, [isOpen])

  // Keyboard accessibility
  // useEffect(() => {
  //   const handler = (e: KeyboardEvent) => {}
  //   containerRef.current?.addEventListener("keydown", handler)

  //   return () => {
  //     containerRef.current?.removeEventListener("keydown", handler)
  //   }
  // },[])

  return (
    <>
      <div
        // ref={containerRef}
        tabIndex={0}
        onClick={() => setIsOpen((prev) => !prev)}
        onBlur={() => setIsOpen(false)}
        className={styles.container}
      >
        <span className={styles.value}>
          {multiple
            ? value.map((v) => (
                <button
                  key={v.value}
                  className={styles["option-badge"]}
                  onClick={(e) => {
                    e.stopPropagation()
                    selectOption(v)
                  }}
                >
                  {v.label}
                  <span className={styles["remove-btn"]}>&times;</span>
                </button>
              ))
            : value?.label}
        </span>
        <button
          className={styles["close-btn"]}
          onClick={(e) => {
            e.stopPropagation()
            clearOptions()
          }}
        >
          &times;
        </button>
        <div className={styles.divider}></div>
        <div className={styles.caret}></div>
        <ul className={`${styles.options} ${isOpen && styles.show}`}>
          {options.map((option, index) => (
            <li
              key={option.value}
              className={`${styles.option} ${
                isOptionSelected(option) && styles.selected
              } ${index === highlightedIndex && styles.highlighted}`}
              onMouseEnter={(e) => setHighligtedIndex(index)}
              onClick={() => {
                selectOption(option)
              }}
            >
              {option.label}
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
