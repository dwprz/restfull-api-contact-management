# POST /api/contacts/:contactId/addresses
curl -X POST "http://localhost:3300/api/contacts/624/addresses" --header "Content-Type: application/json" \
    --header "Authorization: f3157570-195a-40a1-92d0-28d17088c492" \
    --data '{
  "street": "Cassava River",
  "city": "Northen City",
  "district": "Northen District",
  "country": "Pantura Kingdom",
  "postal_code": "1227"
}' | jq

# GET /api/contacts/:contactId/addresses
curl -X GET "http://localhost:3300/api/contacts/624/addresses" \
    --header "Authorization: f3157570-195a-40a1-92d0-28d17088c492" | jq

# PUT /api/contacts/:contactId/addresses/:addressId
curl -X PUT "http://localhost:3300/api/contacts/624/addresses/1399" --header "Content-Type: application/json" \
    --header "Authorization: f3157570-195a-40a1-92d0-28d17088c492" \
    --data '{
  "country": "Pantura Kingdom",
  "postal_code": "1228"
}' | jq

# GET /api/contacts/:contactId/addresses/:addressId
curl -X GET "http://localhost:3300/api/contacts/624/addresses/1399" \
    --header "Authorization: f3157570-195a-40a1-92d0-28d17088c492" | jq

# DELETE /api/contacts/:contactId/addresses/:addressId
curl -X DELETE "http://localhost:3300/api/contacts/624/addresses/1399" \
    --header "Authorization: f3157570-195a-40a1-92d0-28d17088c492" | jq
