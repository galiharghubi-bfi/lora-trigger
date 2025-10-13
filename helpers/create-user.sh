#!/bin/bash
set -euo pipefail

# Get absolute path of this script
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
JSON_FILE="$SCRIPT_DIR/users.json"
API_URL="http://127.0.0.1:8082/mgmt/people"

# Check dependencies
if ! command -v jq &>/dev/null; then
    echo "❌ jq not installed. Install with: sudo apt install jq"
    exit 1
fi

# Ensure users.json exists
if [ ! -f "$JSON_FILE" ]; then
    echo "❌ users.json not found at: $JSON_FILE"
    exit 1
fi

COUNT=$(jq length "$JSON_FILE")
echo "📦 Found $COUNT users to create (from $JSON_FILE)"
echo "-------------------------------------------"

# Loop through users
for i in $(seq 0 $((COUNT - 1))); do
    USER_ID=$(jq -r ".[$i].user_id" "$JSON_FILE")
    ROLE=$(jq -r ".[$i].name" "$JSON_FILE")
    PAYLOAD=$(jq -c ".[$i]" "$JSON_FILE")

    echo "➡️  Creating user #$i (${USER_ID}) — role: ${ROLE}"

    RESPONSE=$(curl --silent --show-error \
        --location "$API_URL" \
        --header 'Content-Type: application/json' \
        --header 'User-Agent: create-user-script/1.0' \
        --data "$PAYLOAD" \
        --write-out "%{http_code}" \
        --output /dev/null || echo "000")

    if [[ "$RESPONSE" =~ ^2 ]]; then
        echo "✅  Created ${ROLE} (${USER_ID})"
    else
        echo "⚠️  Failed (${RESPONSE}) for ${ROLE} (${USER_ID})"
    fi
done

echo "-------------------------------------------"
echo "🏁 Process complete — all users attempted."