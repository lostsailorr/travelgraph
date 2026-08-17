MATCH (start:Place)-[r:NEAR]->(next:Place)
WHERE start.id = $startPlaceId
  AND next.rating >= $minimumRating
RETURN next, r.distanceMinutes AS travelTime
ORDER BY travelTime ASC, next.rating DESC
LIMIT 10
