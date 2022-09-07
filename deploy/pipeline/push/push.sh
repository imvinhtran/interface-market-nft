#!/bin/bash

echo "************************************************"
echo "** Push Docker image for Frontend to Registry ***"
echo "************************************************"

docker login -u mercurysx -p $PASS
docker push mercurysx/frontend:$BUILD_NUMBER