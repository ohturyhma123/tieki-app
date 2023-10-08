#!/bin/bash

# Start server in background
npm run dev &

# Run robot tests headless
robot --variable browser:headlesschrome --variable delay:0 tests/robot/RF-tests/frontpage/TestSuite.robot

# Status code
status=$?

# Stop server
killall -s SIGINT node

exit $status
