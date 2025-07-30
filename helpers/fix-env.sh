#!/bin/bash

# -------------------------------
# fix-env.sh
# Quote values with semicolons in a .env file (for use in Bash, tasks, etc.)
# Supports values with multiple '=' and leaves already-quoted values untouched.
# -------------------------------

# Exit on error
set -e

# 1. Check param
if [ -z "$1" ]; then
  echo "❌ Usage: $0 path/to/.env"
  exit 1
fi

ENV_FILE="$1"
BASENAME=$(basename "$ENV_FILE")
DIRNAME=$(dirname "$ENV_FILE")

# 2. Validate file exists
if [ ! -f "$ENV_FILE" ]; then
  echo "❌ File not found: $ENV_FILE"
  exit 1
fi

# 3. Create backup
BACKUP_FILE="${ENV_FILE}.bak"
cp "$ENV_FILE" "$BACKUP_FILE"
echo "📦 Backed up to $BACKUP_FILE"

# 4. Transform
TMP_FILE="${ENV_FILE}.fixed"

awk '
  BEGIN { FS="="; OFS="=" }
  /^[^#][^=]*=.*/ {
    key = $1
    # Keep entire value after first =
    val = substr($0, index($0,"=")+1)
    # Add quotes if it contains `;` and is not quoted
    if (val ~ /;/ && val !~ /^".*"$/) {
      val = "\"" val "\""
    }
    print key, val
    next
  }
  { print } # pass through comments/blank lines
' "$BACKUP_FILE" > "$TMP_FILE"

# 5. Replace original
mv "$TMP_FILE" "$ENV_FILE"
echo "✅ Updated: $ENV_FILE"