// import MarkerClusterGroup from "react-leaflet-cluster"
// import L, { MarkerCluster } from "leaflet"

export const Track = ({ track, index }) => {
  // const dispatch = useDispatch()
  // const colors = useSelector((state: RootState) => state.map.colors)
  // const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 })

  // const map = useMap()

  // const [position, setPosition] = useState(null)

  // const handleContextMenu = (event: any) => {
  //   setMenuPosition({ x: event.clientX, y: event.clientY })
  // }

  // const createClusterCustomIcon = function (cluster: MarkerCluster) {
  //   return L.divIcon({
  //     html: `<span>${cluster.getChildCount()}</span>`,
  //     className: "custom-marker-cluster",
  //     iconSize: L.point(33, 33, true),
  //   })
  // }

  // const customIcon = new L.Icon({
  //   iconUrl: "https://cdn-icons-png.flaticon.com/256/484/484167.png",
  //   iconSize: new L.Point(40, 47),
  // })

  // const nearestPoint = (click, points) => {
  //   let minDistance = Infinity
  //   let nearestPointIndex = -1

  //   for (let i = 0; i < points.length; i++) {
  //     const dist = new LatLng(click.lat, click.lng).distanceTo(points[i])
  //     if (dist < minDistance) {
  //       minDistance = dist
  //       nearestPointIndex = i
  //     }
  //   }
  //   return nearestPointIndex !== -1 ? nearestPointIndex : null
  // }
  // debugger
  return (
    <></>
    // <ContextMenu
    // //   btnMenu={[
    // //     {
    // //       label: "Создать геозону пути",
    // //       onClickBtn: () => {
    // //         dispatch(
    // //           setFigure({
    // //             geozone_name: "Путь 1",
    // //             color: "#ff6801",
    // //             uid: "2435qwe3245",
    // //             geozone_type_id: 0,
    // //             latitube: 0,
    // //             longitube: 0,
    // //             radius: 0,
    // //             line_width: 10,
    // //             geometry_type_id: "line",
    // //             use_as_address: false,
    // //             image_url: null,
    // //             geozone_points: track.data.map((i) => new LatLng(i.lt, i.ln)),
    // //             comment: `Путь создани по треку c id ${track.id}`,
    // //             account_id: 654546,
    // //             transparency: 0.75,
    // //           }),
    // //         )
    // //         dispatch(setEditMap(true))
    // //       },
    // //     },
    // //     {
    // //       label: "Создать геозону",
    // //       onClickBtn: () => {
    // //         console.log(index)
    // //         dispatch(
    // //           setFigure({
    // //             geozone_name: "Путь 1",
    // //             color: "#ff6801",
    // //             uid: "2435qwe3245",
    // //             geozone_type_id: 0,
    // //             latitube: null,
    // //             longitube: null,
    // //             radius: 0,
    // //             line_width: 10,
    // //             geometry_type_id: "polygon",
    // //             use_as_address: false,
    // //             image_url: null,
    // //             geozone_points: [...track.data].map((i) => new LatLng(i.lt, i.ln)),
    // //             comment: `Путь создани по треку c id ${track.id}`,
    // //             account_id: 654546,
    // //             transparency: 0.75,
    // //           }),
    // //         )
    // //         dispatch(setEditMap(true))
    // //       },
    // //     },
    // //   ]}
    // //   menuPosition={menuPosition}
    // //   menuVisible={track.menuOpen}
    // //   contextMenu={handleContextMenu}
    // //   setMenuVisible={(visible) => dispatch(setIsOpenMenuTrack({ id: index, value: visible }))}
    // //   key={track.id}
    // // >
    // //   <SwitchDecoratorLine
    // //     points={track.data}
    // //     pathOptions={{ color: colors[index], weight: 10, opacity: 0.5 }}
    // //     idTrack={index}
    // //     events={track.events}
    // //     eventHandlers={{
    // //       mousedown: (e) => {
    // //         e.originalEvent.preventDefault()
    // //         if (e.originalEvent.button === 2) {
    // //           dispatch(setIsOpenMenuTrack({ id: index, value: true }))
    // //           setMenuPosition({
    // //             x: e.originalEvent.clientX,
    // //             y: e.originalEvent.clientY,
    // //           })
    // //         }
    // //         dispatch(setIsOpenMenuFigure(false))
    // //         dispatch(setIsOpenMenuMap(false))
    // //         e.originalEvent.stopPropagation()
    // //       },
    // //       click: (e) => {
    // //         const indexPoint = nearestPoint(
    // //           e.latlng,
    // //           track.data.map((i) => [i.lt, i.ln]),
    // //         ) as number
    // //         dispatch(setIsOpenMenuTrack({ id: index, value: false }))
    // //         dispatch(setPointInfo({ index: indexPoint, idTrack: index }))
    // //         map.flyTo([track.data[indexPoint].lt, track.data[indexPoint].ln], map.getZoom(), {
    // //           animate: true,
    // //           duration: 1,
    // //         })
    // //       },
    // //     }}
    // //   />
    // //   {track.events.length > 0 && (
    // //     <MarkerClusterGroup
    // //       onClick={(e) => console.log("onClick", e)}
    // //       zoomToBoundsOnClick={true}
    // //       spiderfyOnMaxZoom={true}
    // //       disableClusteringAtZoom={18}
    // //       showCoverageOnHover={false}
    // //       removeOutsideVisibleBounds={true}
    // //     >
    // //       {track.events.map((el) => {
    // //         return <Marker position={[el.latitude, el.longitude]} icon={customIcon} />
    // //       })}
    // //     </MarkerClusterGroup>
    // //   )}
    // </ContextMenu>
  )
}
