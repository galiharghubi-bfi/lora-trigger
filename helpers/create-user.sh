#!/bin/bash

# Define available roles
ROLES=(
    "admin_survey"
    "ops_level_1"
    "head_vd"
    "credit_analyst"
    "vd"
    "ops_level_2"
    "network_management_head"
    "network_management_head"
    "marketing_deputy_director"
    "marketing_deputy_director"
    "network_management_sales_head"
    "network_management_sales_head"
)

# Set starting index
INDEX=0
BRANCH_ID=401
SUPERVISOR_ID=111111

# Create a user for each role with incrementing index
for ROLE in "${ROLES[@]}"; do
    USER_ID=$(printf '%06d' "$INDEX")
    echo "Creating user with role: $ROLE (index: ${USER_ID})"
    curl --location 'http://127.0.0.1:8082/mgmt/people' \
    --header 'Content-Type: application/json' \
    --header 'User-Agent: insomnia/10.3.0' \
    --data "{
            \"user_id\": \"${USER_ID}\",
            \"realm\": \"bfi_employees\",
            \"name\": \"${ROLE}\",
            \"branch_id\": \"${BRANCH_ID}\",
            \"partnership\": {
                    \"dp_role\": \"${ROLE}\",
                    \"dp_supervisor_id\": \"${SUPERVISOR_ID}\",
                    \"active\": true
            }
    }"
    # Increment index for next user
    INDEX=$((INDEX + 1))
done
