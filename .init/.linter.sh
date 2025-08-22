#!/bin/bash
cd /home/kavia/workspace/code-generation/data-insights-studio-128467-128476/frontend_app
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

