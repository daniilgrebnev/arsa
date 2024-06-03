import React from "react"

interface TextareaComponentProps {
  value: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}

export const TextareaComponent: React.FC<TextareaComponentProps> = ({ value, onChange }) => {
  return (
    <textarea
      className="px-2 py-2 bg-transparent text-lg font-light text-left resize-none border rounded text-nowrap w-full  h-fit focus-within:border-orange-500"
      name=""
      id=""
      rows={1}
      value={value}
      onChange={onChange}
    ></textarea>
  )
}
