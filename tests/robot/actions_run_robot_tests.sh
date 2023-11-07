#!/bin/bash

# Start server in background in test mode
npm run e2e &

# Run robot tests headless
robot --variable browser:$1 --variable delay:0 tests/robot/

# Status code
status=$?

# Stop server
killall -s SIGINT node

exit $status