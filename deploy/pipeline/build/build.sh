#!/bin/bash

echo "************************************************"
echo "****** Building Docker image for Frontend *******"
echo "************************************************"


docker image build -f Dockerfile.Prod -t mercurysx/frontend:$BUILD_NUMBER .