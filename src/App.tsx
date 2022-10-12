import { useState } from "react"
import { Select, SelectOption } from "./Select"

const options = [
  { label: "First", value: 1 },
  { label: "Second", value: 2 },
  { label: "Third", value: 3 },
  { label: "Fourth", value: 4 },
  { label: "Fifth", value: 5 },
  { label: "Sixth", value: 6 },
  { label: "Seventh", value: 7 },
  { label: "Eighth", value: 8 },
]

function App() {
  const [valueSingle, setValueSingle] = useState<SelectOption | undefined>()
  const [valueMultiple, setValueMultiple] = useState<SelectOption[]>([])

  return (
    <>
      <Select
        multiple
        options={options}
        value={valueMultiple}
        onChange={(o) => setValueMultiple(o)}
      />

      <br />

      <Select
        options={options}
        value={valueSingle}
        onChange={(o) => setValueSingle(o)}
      />
    </>
  )
}

export default App
