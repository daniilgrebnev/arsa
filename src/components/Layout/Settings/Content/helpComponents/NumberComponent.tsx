interface NumberComponentProps {
  value: any
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const NumberComponent = ({ value, onChange }: NumberComponentProps) => {
  const valueHandler = (e: string) => {
    let currentValue = e

    // Remove leading zeros
    if (currentValue.length > 1 && currentValue[0] === "0") {
      currentValue = currentValue.slice(1)
    }

    // Ensure the value is a valid number
    const numericValue: any = isNaN(Number(currentValue)) ? 0 : Number(currentValue)

    onChange(numericValue)
  }
  return (
    <div className="">
      <input
        type="text"
        value={value}
        placeholder="кПа"
        onChange={(e) => valueHandler(e.target.value)}
      />
    </div>
  )
}
