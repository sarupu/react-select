import styles from "./select.module.scss"

type SelectOptions = {
  label: string
  value: any
}

type SelectProps = {
  value?: SelectOptions
  onChange: (value?: SelectOptions) => void
  options: SelectOptions[]
}

export const Select = ({ value, onChange, options }: SelectProps) => {
  return (
    <>
      <div tabIndex={0} className={styles.container}>
        <span className={styles.value}>Value</span>
        <button className={styles["close-btn"]}>&times;</button>
        <div className={styles.divider}></div>
        <div className={styles.caret}></div>
        <ul className={styles.options}>
          {options.map((option) => (
            <li key={option.label} className={styles.option}>
              {option.label}
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
