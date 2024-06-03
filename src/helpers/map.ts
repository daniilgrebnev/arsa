import { latLng } from "leaflet"

export const findNewPoints = (oldPoints, newCenter, center) => {
  const deltaLat = newCenter.lat - center.lat
  const deltaLng = newCenter.lng - center.lng

  return oldPoints.map((point) => {
    return { lat: point.lat + deltaLat, lng: point.lng + deltaLng }
  })
}

export const findPolygonCenter = (
  points: { lat: number; lng: number }[],
): {
  lat: number
  lng: number
} => {
  let sumX = 0
  let sumY = 0
  for (const point of points) {
    sumX += point.lat
    sumY += point.lng
  }

  const centerX = sumX / points.length
  const centerY = sumY / points.length

  return { lat: centerX, lng: centerY }
}

export const maxDistance = (points, center) => {
  let maxDistance = 0
  points.forEach((point) => {
    if (latLng(point).distanceTo(center) > maxDistance) {
      maxDistance = latLng(point).distanceTo(center)
    }
  })
  return maxDistance
}

export const calculateCirclePoints = (center, radius, numberOfPoints) => {
  let points: any = []
  for (let i = 0; i < numberOfPoints; i++) {
    let theta = (2 * Math.PI * i) / numberOfPoints
    let newLat = center[0] + radius * Math.cos(theta)
    let newLng = center[1] + radius * Math.sin(theta)
    points.push({ lat: newLat, lng: newLng })
  }
  return points
}
