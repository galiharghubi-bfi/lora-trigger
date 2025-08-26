#!/bin/bash

# Define available roles
ROLES=(
    "admin_survey"
    "ops_level_1"
    "head_vd"
    "credit_analyst"
    "vd"
    "credit_analyst"
    "network_management_head"
    "network_management_head"
    "marketing_deputy_director"
    "marketing_deputy_director"
    "network_management_sales_head"
    "network_management_sales_head"
)

# Set starting index
INDEX=0

# Create a user for each role with incrementing index
for ROLE in "${ROLES[@]}"; do
    echo "Creating user with role: $ROLE (index: 00000${INDEX})"
    curl --location 'http://127.0.0.1:8082/mgmt/people' \
    --header 'Content-Type: application/json' \
    --header 'User-Agent: insomnia/10.3.0' \
    --data "{
            \"user_id\": \"00000${INDEX}\",
            \"realm\": \"bfi_employees\",
            \"name\": \"Gus Aris\",
            \"branch_id\": \"402\",
            \"partnership\": {
                    \"dp_role\": \"${ROLE}\",
                    \"dp_supervisor_id\": \"111111\",
                    \"active\": true
            }
    }"
    # Increment index for next user
    INDEX=$((INDEX + 1))
done
