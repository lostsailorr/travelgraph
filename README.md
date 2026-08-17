# TravelGraph

**Product vision**: Tell us what you love. We'll find the places that connect.

A graph-powered travel planner that recommends attractions and builds efficient day itineraries based on a user's interests, location, proximity, and available time.

## Overview

TravelGraph uses a connected graph model to provide a seamless travel recommendation experience. Traditional relational databases represent places as isolated listings; TravelGraph uses Neo4j to model the complex web of relationships between cities, attractions, user interests, and real-world geography (distance/travel time). This allows for multi-hop discovery and intelligent itinerary generation.

## Features
- **Destination & Interest Selection**: Choose a city and tell us what you love.
- **Graph-Powered Recommendations**: Real-time matching using Neo4j Cypher queries.
- **Multi-Hop Discovery**: Find out exactly *why* a place was recommended based on shared connections.
- **Nearby & Related Attractions**: Explore connections based on geography (`NEAR` relationships) or shared tags (`HAS_TAG`).
- **Itinerary Builder**: Generate a full day's plan logically ordered by travel time and rating.

## Why a Graph Database?
Travel recommendations are fundamentally about connected entities. Finding an itinerary that starts at the Louvre, takes you somewhere nearby with a high rating, and ensures both places match your interests requires multi-hop traversal. While achievable in relational databases through complex JOINs, a graph database represents these connections natively. Cypher queries make multi-hop traversal an intuitive operation, matching the way we naturally think about travel routes.

## Architecture & Tech Stack
- **Frontend/Backend**: Next.js (App Router), React, TypeScript
- **Styling**: Tailwind CSS
- **Database**: Neo4j (CognoDB representation)
- **Driver**: Official `neo4j-driver`

### Graph Schema
- `(User)-[:LIKES]->(Interest)`
- `(User)-[:VISITED]->(Place)`
- `(City)-[:CONTAINS]->(Place)`
- `(Place)-[:HAS_TAG]->(Interest)`
- `(Place)-[:HAS_CATEGORY]->(Category)`
- `(Place)-[:NEAR {distanceMinutes}]->(Place)`
- `(Place)-[:LOCATED_IN]->(City)`

## Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Variables**
   Copy `.env.example` to `.env.local` and add your Neo4j credentials:
   ```
   COGNODB_URI=bolt+s://<instance-id>.databases.cognodb.cloud
   COGNODB_USERNAME=cognodb
   COGNODB_PASSWORD=<your-password>
   ```

   **How to get these credentials**:
   1. Go to [https://console.cognodb.com/signup](https://console.cognodb.com/signup) and create a free account.
   2. Create a free (c0) instance.
   3. Copy your unique `bolt+s://` URI and the generated password for the `cognodb` user.

3. **Seed Database**
   Run the seed script to populate cities, interests, places, and relationships:
   ```bash
   npx tsx scripts/seed.ts
   ```

4. **Run Development Server**
   ```bash
   npm run dev
   ```

Visit `http://localhost:3000` to start planning.
