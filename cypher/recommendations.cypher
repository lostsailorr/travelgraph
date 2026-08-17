MATCH (p:Place)-[:HAS_TAG]->(i:Interest)
WHERE p.cityId = $cityId
  AND i.name IN $interests
RETURN p, count(i) AS matchedInterests
ORDER BY matchedInterests DESC, p.rating DESC
LIMIT 20
