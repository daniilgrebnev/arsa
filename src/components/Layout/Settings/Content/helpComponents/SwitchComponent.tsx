import React, { useEffect, useState } from "react"

interface ISwitchBody {
  option: number
  name: string
}

interface ISwitchComponent {
  value: number
  body: ISwitchBody[]
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

export const SwitchComponent: React.FC<ISwitchComponent> = ({ value, body, onChange }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [currentOption, setCurrentOption] = useState<number | undefined>(value)

  useEffect(() => {
    setCurrentOption(value)
  }, [value])

  const handleChange = (option: number) => {
    setCurrentOption(option)
    setIsOpen(false)

    // Создание синтетического события для передачи в onChange обработчик
    const syntheticEvent = {
      target: { value: option.toString() },
      currentTarget: { value: option.toString() },
      bubbles: true,
      cancelable: false,
      defaultPrevented: false,
      eventPhase: 3,
      isTrusted: true,
      preventDefault: () => {},
      isDefaultPrevented: () => false,
      stopPropagation: () => {},
      isPropagationStopped: () => false,
      persist: () => {},
      nativeEvent: new Event("change"),
    } as unknown as React.ChangeEvent<HTMLSelectElement>

    onChange(syntheticEvent)
  }

  const currentValue = body.find((i) => i.option === currentOption)
  const currentBody = body.filter((item) => item.option !== currentOption)
  console.log(currentValue)
  return (
    <>
      <select className="hidden" name="" id="" onChange={onChange} value={currentOption}></select>
      <div className="w-full flex items-center justify-start relative">
        <div className="relative ">
          <div
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center justify-between w-full bg-white h-7 px-10 py-2 rounded cursor-pointer hover:bg-slate-100"
          >
            <div className=" text-nowrap">
              {currentValue ? currentValue.name : "Ничего не выбрано"}
            </div>
            <div className="icon-expand "></div>
          </div>
          <div
            style={{ height: isOpen ? currentBody.length * 100 + "%" : "0%" }}
            className="absolute top-7 left-0 w-full bg-orange-500 rounded overflow-hidden z-10 select-none transition-all last:rounded-b"
          >
            {isOpen && (
              <div className="">
                {currentBody.length == 0 ? (
                  <div className="bg-gray-100 h-full border hover:bg-slate-200">Ничего нет</div>
                ) : (
                  <>
                    {currentBody.map((item, index) => (
                      <div
                        onClick={() => handleChange(item.option)}
                        className="bg-gray-100 h-full border hover:bg-slate-200"
                        key={index}
                      >
                        {item.name}
                      </div>
                    ))}
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
