import React, { useRef, useState } from "react"
import "./MenuEditor.css"
import { useSelector } from "react-redux"
import { RootState } from "@/store/store"
import { useDispatch } from "react-redux"
import {
  clearFigure,
  setColorFigure,
  setCommentGeozone,
  setEditMap,
  setLineWidth,
  setNameGeozone,
  setOpacityFigure,
  setTypeFigure,
} from "./../../../store/reducers/map/map"
import { Range, getTrackBackground } from "react-range"

export const MenuEditor = () => {
  const dispatch = useDispatch()
  const typeFigure = useSelector((state: RootState) => state.map.creatorFigure.geometry_type_id)
  const colorFigure = useSelector((state: RootState) => state.map.creatorFigure.color)
  const opacityFigure = useSelector((state: RootState) => state.map.creatorFigure.transparency)
  const lineWidth = useSelector((state: RootState) => state.map.creatorFigure.line_width)
  const commentGeozone = useSelector((state: RootState) => state.map.creatorFigure.comment)
  const nameGeozone = useSelector((state: RootState) => state.map.creatorFigure.geozone_name)
  const fig = useSelector((state: RootState) => state.map.creatorFigure)

  return (
    <div className="menu-editor">
      <div className="menu-editor__header">
        <button
          className={`icon-polygon ${typeFigure === 2 && "menu-editor__active"}`}
          onClick={() => dispatch(setTypeFigure(2))}
        ></button>
        <button
          className={`icon-rectangle ${typeFigure === 1 && "menu-editor__active"}`}
          onClick={() => dispatch(setTypeFigure(1))}
        ></button>
        <button
          className={`icon-polyline ${typeFigure === 3 && "menu-editor__active"}`}
          onClick={() => dispatch(setTypeFigure(3))}
        ></button>
        <button
          className={`icon-cirlcle ${typeFigure === 0 && "menu-editor__active"}`}
          onClick={() => dispatch(setTypeFigure(0))}
        ></button>
      </div>
      <div className="menu-editor__body">
        <label className="menu-editor__name">
          Название:
          <input
            type="text"
            name="menu-editor__name"
            value={nameGeozone}
            onChange={(e) => dispatch(setNameGeozone(e.target.value))}
          />
        </label>
        <label className="menu-editor__name">
          Цвет:
          <input
            type="color"
            value={colorFigure}
            onChange={(e) => dispatch(setColorFigure(e.target.value))}
          />
        </label>
        <div style={{ marginTop: "20px" }}>
          Прозрачность:
          <Range
            values={[opacityFigure]}
            step={0.01}
            min={0}
            max={1}
            onChange={(values) => dispatch(setOpacityFigure(values[0]))}
            renderTrack={({ props, children }) => (
              <div
                onMouseDown={props.onMouseDown}
                onTouchStart={props.onTouchStart}
                style={{
                  ...props.style,
                  height: "20px",
                  display: "flex",
                  width: "100%",
                }}
              >
                <div
                  ref={props.ref}
                  style={{
                    height: "5px",
                    width: "100%",
                    borderRadius: "4px",
                    background: getTrackBackground({
                      values: [opacityFigure],
                      colors: ["var(--main-color)", "#ccc"],
                      min: 0,
                      max: 1,
                    }),
                    alignSelf: "center",
                  }}
                >
                  {children}
                </div>
              </div>
            )}
            renderThumb={({ props, isDragged }) => (
              <div
                {...props}
                style={{
                  ...props.style,
                  height: "20px",
                  width: "20px",
                  borderRadius: "100%",
                  backgroundColor: "#FFF",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  boxShadow: "0px 2px 6px #AAA",
                }}
              ></div>
            )}
          />
          {Math.round(opacityFigure * 100)}%
        </div>
        <div style={{ marginTop: "20px" }}>
          Толщина :
          <Range
            values={[lineWidth]}
            step={0.1}
            min={1}
            max={10}
            onChange={(values) => dispatch(setLineWidth(values[0]))}
            renderTrack={({ props, children }) => (
              <div
                onMouseDown={props.onMouseDown}
                onTouchStart={props.onTouchStart}
                style={{
                  ...props.style,
                  height: "20px",
                  display: "flex",
                  width: "100%",
                }}
              >
                <div
                  ref={props.ref}
                  style={{
                    height: "5px",
                    width: "100%",
                    borderRadius: "4px",
                    background: getTrackBackground({
                      values: [lineWidth],
                      colors: ["var(--main-color)", "#ccc"],
                      min: 1,
                      max: 10,
                    }),
                    alignSelf: "center",
                  }}
                >
                  {children}
                </div>
              </div>
            )}
            renderThumb={({ props, isDragged }) => (
              <div
                {...props}
                style={{
                  ...props.style,
                  height: "20px",
                  width: "20px",
                  borderRadius: "100%",
                  backgroundColor: "#FFF",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  boxShadow: "0px 2px 6px #AAA",
                }}
              ></div>
            )}
          />
          {lineWidth}px
        </div>
        <label className="menu-editor__name">
          <textarea
            placeholder="Коментарий"
            value={commentGeozone ? commentGeozone : ""}
            onChange={(e) => dispatch(setCommentGeozone(e.target.value))}
          />
        </label>
      </div>
      <div className="menu-editor__btn">
        <button
          onClick={() => {
            dispatch(setEditMap(false))
            dispatch(clearFigure())
          }}
        >
          Отменить
        </button>
        <button
          onClick={() => {
            // dispatch()
            console.log(fig)
            dispatch(clearFigure())
            dispatch(setEditMap(false))
          }}
        >
          Готово
        </button>
      </div>
    </div>
  )
}
