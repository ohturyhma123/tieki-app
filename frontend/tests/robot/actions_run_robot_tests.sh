#!/bin/bash

# Start server in background
npm run dev &

# Run robot tests headless
robot --variable browser:headlesschrome --variable delay:0 tests/robot/

# Status code
status=$?

# Stop server
killall -s SIGINT node

exit $status