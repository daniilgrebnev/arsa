import React from "react"
import "./TimePicker.css"

type propsType = {
  setMinute: (minutes: number) => void
  setHours: (hours: number) => void
  currentTime: { minutes: number; hours: number }
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

export const TimePicker: React.FC<propsType> = ({
  setHours,
  setMinute,
  currentTime,
  isOpen,
  setIsOpen,
}) => {
  const hours = Array.from({ length: 24 }, (_, index) => index)
  const minutes = Array.from({ length: 60 }, (_, index) => index)

  return (
    <div className="time">
      <div className="time__title" onClick={() => setIsOpen(!isOpen)}>
        {currentTime.hours.toString().length === 1 ? `0${currentTime.hours}` : currentTime.hours}:
        {currentTime.minutes.toString().length === 1
          ? `0${currentTime.minutes}`
          : currentTime.minutes}
        <span className="icon-clock"></span>
      </div>
      <div className={`time__wrapper ${isOpen ? "time__wrapper--open" : ""}`}>
        <div className="time__body">
          {hours.map((el) => {
            return (
              <div onClick={() => setHours(el)}>{el.toString().length === 1 ? `0${el}` : el}</div>
            )
          })}
        </div>
        <div className="time__body">
          {minutes.map((el) => {
            return (
              <div onClick={() => setMinute(el)}>{el.toString().length === 1 ? `0${el}` : el}</div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
