import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { DateTime } from "ts-luxon"
import { setEndTiming, setStartTiming } from "./../../../store/reducers/security/security"
import { RootState } from "./../../../store/store"
import { Popup } from "./../../Popup/Popup"
import { Calendar } from "./Calendar/Calendar"
import "./CustomDateRangePicker.css"
import { CalendarPopup } from "./CalendarPopup/CalendarPopup"

export const CustomDateRangePicker = () => {
  const dispatch = useDispatch()

  const { endTiming, startTiming } = useSelector((state: RootState) => state.security)

  const [startDate, setStartDate] = useState(DateTime.fromMillis(startTiming))
  const [endDate, setEndDate] = useState(DateTime.fromMillis(endTiming))
  const [activeTiming, setActiveTiming] = useState(1)

  const [isOpenPopup, setIsOpenPopup] = useState(false)
  const russianDays = ["пн", "вт", "ср", "чт", "пт", "сб", "вс"]

  useEffect(() => {
    dispatch(setStartTiming(startDate.toMillis()))
    dispatch(setEndTiming(endDate.toMillis()))
    console.log("x ")
  }, [startDate, endDate])

  return (
    <div className="date-range ">
      <CalendarPopup
        isOpenPopup={isOpenPopup}
        setIsOpenPopup={setIsOpenPopup}
        endDate={endDate}
        setEndDate={setEndDate}
        startDate={startDate}
        setStartDate={setStartDate}
      >
        {" "}
        <div className="date-range__timing">
          <button
            onClick={() => {
              setStartDate(DateTime.local().set({ hour: 0, minute: 0, second: 0, millisecond: 0 }))
              setEndDate(DateTime.local().set({ hour: 23, minute: 59, second: 59 }))
              setActiveTiming(1)
            }}
            className={activeTiming === 1 ? "date-range__timing--active" : ""}
          >
            Сегодня
          </button>
          <button
            onClick={() => {
              setStartDate(
                DateTime.local().set({
                  day: startDate.day - 1,
                  hour: 0,
                  minute: 0,
                  second: 0,
                  millisecond: 0,
                }),
              )
              setEndDate(
                DateTime.local().set({
                  day: DateTime.local().day - 1,
                  hour: 23,
                  minute: 59,
                  second: 59,
                }),
              )
              setActiveTiming(2)
            }}
            className={activeTiming === 2 ? "date-range__timing--active" : ""}
          >
            Вчера
          </button>
          <button
            onClick={() => {
              setStartDate(
                DateTime.local().set({
                  day: DateTime.local().day - 7,
                  hour: 0,
                  minute: 0,
                  second: 0,
                  millisecond: 0,
                }),
              )
              setEndDate(DateTime.local().set({ hour: 23, minute: 59, second: 59 }))
              setActiveTiming(3)
            }}
            className={activeTiming === 3 ? "date-range__timing--active" : ""}
          >
            7 дней
          </button>
          <button
            onClick={() => {
              setStartDate(
                DateTime.local().set({
                  month: DateTime.local().month - 1,
                  hour: 0,
                  minute: 0,
                  second: 0,
                  millisecond: 0,
                }),
              )
              setEndDate(DateTime.local().set({ hour: 23, minute: 59, second: 59 }))
              setActiveTiming(4)
            }}
            className={activeTiming === 4 ? "date-range__timing--active" : ""}
          >
            Месяц
          </button>
        </div>
      </CalendarPopup>
      <div className="date-range__wrapper">
        <button className="date-range__btn" onClick={() => setIsOpenPopup(true)}>
          <div className="date-range__start">
            <div className="date-range__start--date">{startDate.toLocaleString()}</div>
            <div className="date-range__start--time">
              {startDate.toLocaleString(DateTime.TIME_SIMPLE)}{" "}
              <span>{russianDays[startDate.weekday - 1]}</span>
            </div>
          </div>
          <div className="date-range__icon icon-calendar"></div>
          <div className="date-range__end">
            <div className="date-range__start--date">{endDate.toLocaleString()}</div>
            <div className="date-range__start--time">
              {endDate.toLocaleString(DateTime.TIME_SIMPLE)}{" "}
              <span>{russianDays[endDate.weekday - 1]}</span>
            </div>
          </div>
        </button>
        <div className="date-range__timing">
          <button
            onClick={() => {
              setStartDate(DateTime.local().set({ hour: 0, minute: 0, second: 0, millisecond: 0 }))
              setEndDate(DateTime.local().set({ hour: 23, minute: 59, second: 59 }))
              setActiveTiming(1)
            }}
            className={activeTiming === 1 ? "date-range__timing--active" : ""}
          >
            Сегодня
          </button>
          <button
            onClick={() => {
              setStartDate(
                DateTime.local().set({
                  day: startDate.day - 1,
                  hour: 0,
                  minute: 0,
                  second: 0,
                  millisecond: 0,
                }),
              )
              setEndDate(
                DateTime.local().set({
                  day: DateTime.local().day - 1,
                  hour: 23,
                  minute: 59,
                  second: 59,
                }),
              )
              setActiveTiming(2)
            }}
            className={activeTiming === 2 ? "date-range__timing--active" : ""}
          >
            Вчера
          </button>
          <button
            onClick={() => {
              setStartDate(
                DateTime.local().set({
                  day: DateTime.local().day - 7,
                  hour: 0,
                  minute: 0,
                  second: 0,
                  millisecond: 0,
                }),
              )
              setEndDate(DateTime.local().set({ hour: 23, minute: 59, second: 59 }))
              setActiveTiming(3)
            }}
            className={activeTiming === 3 ? "date-range__timing--active" : ""}
          >
            7 дней
          </button>
          <button
            onClick={() => {
              setStartDate(
                DateTime.local().set({
                  month: DateTime.local().month - 1,
                  hour: 0,
                  minute: 0,
                  second: 0,
                  millisecond: 0,
                }),
              )
              setEndDate(DateTime.local().set({ hour: 23, minute: 59, second: 59 }))
              setActiveTiming(4)
            }}
            className={activeTiming === 4 ? "date-range__timing--active" : ""}
          >
            Месяц
          </button>
        </div>
      </div>
    </div>
  )
}
