import React, { useState } from "react"
import "./ContextMenu.css"

type propsType = {
  children: React.ReactNode
  btnMenu: Array<{
    label: string
    onClickBtn: () => void
  }>
  contextMenu: (e: any) => void
  setMenuVisible: (visible: boolean) => void
  menuVisible: boolean
  menuPosition: {
    x: number
    y: number
  }
}

export const ContextMenu: React.FC<propsType> = ({
  children,
  btnMenu,
  contextMenu,
  setMenuVisible,
  menuPosition,
  menuVisible,
}) => {
  return (
    <div
      onContextMenu={(e) => {
        contextMenu(e)
      }}
      onClick={() => {
        setMenuVisible(false)
      }}
      className="addgeozone"
    >
      <div
        className="addgeozone__menu"
        style={{
          top: menuPosition.y,
          left: menuPosition.x,
          display: menuVisible ? "block" : "none",
        }}
      >
        {btnMenu.map((item, index) => {
          return (
            <button
              key={index}
              className="btn btn-primary addgeozone__btn"
              onClick={() => {
                item.onClickBtn()
                setMenuVisible(false)
              }}
            >
              {item.label}
            </button>
          )
        })}
      </div>
      {children}
    </div>
  )
}
