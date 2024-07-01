interface NumberComponentProps {
  value: number
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const NumberComponent = ({ value, onChange }: NumberComponentProps) => {
  return (
    <div className="">
      <input type="text" value={value} placeholder="кПа" onChange={onChange} />
    </div>
  )
}
