MATCH (p:Place {id: $placeId})-[:HAS_TAG]->(i:Interest)
<-[:HAS_TAG]-(related:Place)
WHERE related <> p
RETURN related, count(i) AS sharedInterests
ORDER BY sharedInterests DESC
LIMIT 10
