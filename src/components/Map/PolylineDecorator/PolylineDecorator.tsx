import { useEffect, useRef } from "react"
import L from "leaflet"
import { Polyline, useMap } from "react-leaflet"
import "leaflet-polylinedecorator"

export const PolylineDecorator = (props) => {
  const polyRef = useRef<any>(null)
  const map = useMap()
  const decoratorRef = useRef<any>(null) // Создаем ссылку на декоратор

  useEffect(() => {
    if (polyRef.current) {
      const polyline = polyRef.current

      // Добавляем стрелки к линии
      const decorator = L.polylineDecorator(polyline, {
        patterns: [
          {
            offset: 25,
            repeat: 300,
            symbol: L.Symbol.arrowHead({
              pixelSize: 25,
              pathOptions: {
                color: props.pathOptions.color,
                fillColor: props.pathOptions.color,
                fillOpacity: 1,
                weight: 0,
                interactive: false,
              },
            }),
          },
        ],
      }).addTo(map)

      decoratorRef.current = decorator // Сохраняем ссылку на декоратор
    }

    return () => {
      if (decoratorRef.current) {
        decoratorRef.current.clearLayers() // Удаляем все слои (стрелки) из декоратора
        map.eachLayer((layer) => {
          if (layer instanceof L.PolylineDecorator) {
            map.removeLayer(decoratorRef.current)
          }
        })
      }
    }
  })

  return (
    <>
      <Polyline ref={polyRef} {...props} />
    </>
  )
}
