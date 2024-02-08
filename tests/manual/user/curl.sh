# POST /api/users/register
curl -X POST "http://localhost:3300/api/users/register" --header "Content-Type: application/json" --data '{
  "username": "Kongleong Poseidon",
  "password": "12345678",
  "name": "Kongleong"
}' | jq

# POST /api/users/login
curl -X POST "http://localhost:3300/api/users/login" --header "Content-Type: application/json" --data '{
  "username": "Kongleong Poseidon",
  "password": "12345678"
}' | jq

# PATCH /api/users/current
curl -X PATCH "http://localhost:3300/api/users/current" --header "Content-Type: application/json" \
  --header "Authorization: 924c2382-4083-4829-8d39-f32d65f089ab" \
  --data '{
  "name": "New Kongleong",
  "password": "12345678"
}' | jq

# GET /api/users/current
curl -X GET "http://localhost:3300/api/users/current" \
  --header "Authorization: 924c2382-4083-4829-8d39-f32d65f089ab" | jq

# DELETE /api/users/current
curl -X DELETE "http://localhost:3300/api/users/current" \
  --header "Authorization: 924c2382-4083-4829-8d39-f32d65f089ab" | jq