const asd = [
    {lat: 51.736195, lng: 39.180379}, 
    {lat: 51.730440, lng: 39.178319}, 
    {lat: 51.712955, lng: 39.180379}, 
    {lat: 51.694823, lng: 39.183126}, 
    {lat: 51.674122, lng: 39.185529}, 
    {lat: 51.664515, lng: 39.236341}, 
    {lat: 51.686288, lng: 39.265523}] 

function douglasPeucker(points, tolerance) {
    if (points.length <= 2) {
        return [points[0]];
    }

    // Find the point with the maximum distance
    let maxDistance = 0;
    let index = 0;
    const end = points.length - 1;

    for (let i = 1; i < end; i++) {
        const distance = perpendicularDistance(points[i], points[0], points[end]);
        if (distance > maxDistance) {
            index = i;
            maxDistance = distance;
        }
    }

    // If max distance is greater than tolerance, recursively simplify
    if (maxDistance > tolerance) {
        const firstPart = douglasPeucker(points.slice(0, index + 1), tolerance);
        const secondPart = douglasPeucker(points.slice(index), tolerance);

        // Ensure we don't return duplicate points
        if (firstPart[firstPart.length - 1].lat === secondPart[0].lat && firstPart[firstPart.length - 1].lng === secondPart[0].lng) {
            secondPart.shift();
        }

        return firstPart.concat(secondPart);
    } else {
        // If not, return the two endpoints
        return [points[0], points[end]];
    }
}

console.log(douglasPeucker(asd, 0.001))

// Function to calculate the perpendicular distance from a point to a line
function perpendicularDistance(point, lineStart, lineEnd) {
    const { lat: x1, lng: y1 } = lineStart;
    const { lat: x2, lng: y2 } = lineEnd;
    const { lat: x, lng: y } = point;

    const numerator = Math.abs((x2 - x1) * (y1 - y) - (x1 - x) * (y2 - y1));
    const denominator = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));

    return numerator / denominator;
}
