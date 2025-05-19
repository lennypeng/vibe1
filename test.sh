#!/bin/bash
set -e

# Basic syntax check for JS
node --check snake/snake.js

# Start local server in background
python3 -m http.server 8000 > /tmp/test_server.log 2>&1 &
server_pid=$!
# Give the server time to start
sleep 1
# Fetch the snake page
status=$(curl -o /dev/null -w "%{http_code}" -s http://localhost:8000/snake/index.html)
kill $server_pid
if [ "$status" != "200" ]; then
  echo "Failed to fetch snake game page" >&2
  exit 1
fi

echo "All tests passed"
