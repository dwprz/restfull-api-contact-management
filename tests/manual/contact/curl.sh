# POST /api/contacts
curl -X POST "http://localhost:3300/api/contacts" --header "Content-Type: application/json" \
    --header "Authorization: f3157570-195a-40a1-92d0-28d17088c492" \
    --data '{
  "first_name": "Kawamatsu",
  "last_name": "The Kappa",
  "email": "douji@gmail.com",
  "phone": "+62812345678"
}' | jq

# GET /api/contacts
curl -X GET "http://localhost:3300/api/contacts" \
    --header "Authorization: f3157570-195a-40a1-92d0-28d17088c492" | jq

curl -X GET "http://localhost:3300/api/contacts?name=flower" \
    --header "Authorization: f3157570-195a-40a1-92d0-28d17088c492" | jq

curl -X GET "http://localhost:3300/api/contacts?name=flower&email=jozu@gmail.com" \
    --header "Authorization: f3157570-195a-40a1-92d0-28d17088c492" | jq

curl -X GET "http://localhost:3300/api/contacts?page=1&name=flower" \
    --header "Authorization: f3157570-195a-40a1-92d0-28d17088c492" | jq

# GET /api/contacts/:contactId
curl -X GET "http://localhost:3300/api/contacts/629" \
    --header "Authorization: f3157570-195a-40a1-92d0-28d17088c492" | jq

# PUT /api/contacts/:contactId
curl -X PUT "http://localhost:3300/api/contacts/624" --header "Content-Type: application/json" \
    --header "Authorization: f3157570-195a-40a1-92d0-28d17088c492" \
    --data '{
        "email": "judo@gmail.com"
    }' | jq

# DELETE /api/contacts/:contactId
curl -X DELETE "http://localhost:3300/api/contacts/634" \
    --header "Authorization: f3157570-195a-40a1-92d0-28d17088c492" | jq
