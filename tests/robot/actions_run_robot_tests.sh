#!/bin/bash

# Start server in background in test mode
npm run e2e &

# Check if the server is up and running
echo "Waiting for the server to start..."
while ! nc -z localhost 3000; do
    sleep 1
done
echo "Server started"

# Run robot tests headless
robot --variable browser:$1 --variable delay:0 tests/robot/

# Status code
status=$?

# Stop server
killall -s SIGINT node

exit $status