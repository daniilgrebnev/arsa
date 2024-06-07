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

export const douglasPeucker = (
  points: { lat: number; lng: number }[],
  tolerance: number,
): { lat: number; lng: number }[] => {
  if (points.length <= 2) {
    return [points[0]]
  }

  let maxDistance = 0
  let index = 0
  const end = points.length - 1

  for (let i = 1; i < end; i++) {
    const distance = perpendicularDistance(points[i], points[0], points[end])
    if (distance > maxDistance) {
      index = i
      maxDistance = distance
    }
  }

  if (maxDistance > tolerance) {
    const firstPart = douglasPeucker(points.slice(0, index + 1), tolerance)
    const secondPart = douglasPeucker(points.slice(index), tolerance)

    if (
      firstPart[firstPart.length - 1].lat === secondPart[0].lat &&
      firstPart[firstPart.length - 1].lng === secondPart[0].lng
    ) {
      secondPart.shift()
    }

    return firstPart.concat(secondPart)
  } else {
    return [points[0], points[end]]
  }
}

const perpendicularDistance = (
  point: { lat: number; lng: number },
  lineStart: { lat: number; lng: number },
  lineEnd: { lat: number; lng: number },
): number => {
  const { lat: x1, lng: y1 } = lineStart
  const { lat: x2, lng: y2 } = lineEnd
  const { lat: x, lng: y } = point

  const numerator = Math.abs((x2 - x1) * (y1 - y) - (x1 - x) * (y2 - y1))
  const denominator = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))

  return numerator / denominator
}
