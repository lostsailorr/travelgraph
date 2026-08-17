MATCH (p:Place {id: $placeId})-[r:NEAR]->(nearby:Place)
RETURN nearby, r.distanceMinutes AS distanceMinutes
ORDER BY distanceMinutes
LIMIT 10
