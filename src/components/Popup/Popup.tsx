import React from "react"
import "./Popup.css"

type propsType = {
  children: React.ReactNode
  title: string
  onClose: () => void
}

export const Popup: React.FC<propsType> = (props) => {
  return (
    <>
      <div className="popup z-[1500]">
        <div className="popup__title">
          {props.title} <span className="icon-cross" onClick={props.onClose}></span>
        </div>
        <div className="popup__body">{props.children}</div>
      </div>
      <div className="popup--bg z-[500]" onClick={props.onClose}></div>
    </>
  )
}
