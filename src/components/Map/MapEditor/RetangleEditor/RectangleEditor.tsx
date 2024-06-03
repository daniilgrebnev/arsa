import { useEffect, useRef, useState } from "react";
import L, { LeafletEvent, latLng, point } from "leaflet";
import { Marker, Rectangle, useMapEvent } from "react-leaflet";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useDispatch } from "react-redux";
import { findNewPoints, maxDistance } from "./../../../../helpers/map";
import {
  addGeozonePoint,
  setGeozonePoint,
  setLatLng,
  setRadius,
} from "./../../../../store/reducers/map/map";

export const RectangleEditor = () => {
  const dispatch: any = useDispatch();
  const [transparentRectangle, setTransparentRectangle] = useState<any>([]);

  const colorFigure = useSelector(
    (state: RootState) => state.map.creatorFigure.color
  );
  const opacityFigure = useSelector(
    (state: RootState) => state.map.creatorFigure.transparency
  );
  const lineWidth = useSelector(
    (state: RootState) => state.map.creatorFigure.line_width
  );

  const rectangle = useSelector(
    (state: RootState) => state.map.creatorFigure.geozone_points
  );
  const { latitube, longitube } = useSelector(
    (state: RootState) => state.map.creatorFigure
  );

  useMapEvent("click", (e) => {
    if (rectangle.length >= 2) {
      return;
    }
    if (rectangle.length === 1) {
      setTransparentRectangle([]);
    }
    if (rectangle.length === 0) {
      setTransparentRectangle((prev) => [...prev, e.latlng]);
    }
    dispatch(addGeozonePoint(e.latlng));
  });

  useMapEvent("mousemove", (e) => {
    if (transparentRectangle.length > 0) {
      setTransparentRectangle((prev) => [...prev.slice(0, 1), e.latlng]);
    }
  });

  useEffect(() => {
    if (rectangle.length === 2) {
      dispatch(setLatLng(L.latLngBounds(rectangle).getCenter()));
      if (latitube && longitube) {
        dispatch(
          setRadius(latLng(latitube, longitube).distanceTo(rectangle[0]))
        );
      }
    }
  }, [rectangle]);

  useEffect(() => {
    if (latitube && longitube) {
      dispatch(setRadius(latLng(latitube, longitube).distanceTo(rectangle[0])));
    }
  }, [longitube, latitube]);

  const customIcon = useRef(
    L.divIcon({
      iconSize: [20, 20],
    })
  );

  const handleCenter = (e: LeafletEvent) => {
    dispatch(
      setGeozonePoint(
        findNewPoints(rectangle, e.target.getLatLng(), {
          lat: latitube,
          lng: longitube,
        })
      )
    );
    dispatch(setLatLng(e.target.getLatLng()));
  };

  const handleBounds = (e: LeafletEvent, index: number) => {
    const newPoints: any = [...rectangle];
    newPoints[index] = e.target.getLatLng();
    dispatch(setGeozonePoint(newPoints));
    if (latitube && longitube) {
      dispatch(setRadius(latLng(latitube, longitube).distanceTo(newPoints[0])));
    }
  };

  return (
    <>
      {rectangle.length === 2 && (
        <Rectangle
          bounds={rectangle}
          pathOptions={{
            color: colorFigure,
            fillOpacity: opacityFigure,
            weight: lineWidth,
          }}
        >
          {latitube && longitube && (
            <Marker
              position={{
                lat: latitube,
                lng: longitube,
              }}
              draggable={true}
              eventHandlers={{
                move: (e) => handleCenter(e),
              }}
              icon={customIcon.current}
            />
          )}
          {rectangle.map((position, index) => (
            <Marker
              key={index}
              position={position}
              draggable={true}
              eventHandlers={{
                move: (e: LeafletEvent) => handleBounds(e, index),
              }}
              icon={customIcon.current}
            />
          ))}
        </Rectangle>
      )}
      {transparentRectangle.length > 0 && (
        <Rectangle
          bounds={transparentRectangle}
          dashArray="5, 10"
          pathOptions={{
            color: colorFigure,
            fillOpacity: opacityFigure,
            weight: lineWidth,
          }}
        />
      )}
    </>
  );
};
