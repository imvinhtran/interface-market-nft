#!/bin/bash

echo "************************************************"
echo "******** Deploy Docker image for Frontend *******"
echo "************************************************"


if [ $BRANCH == "DEVELOPMENT" ]; then
 
    cd deploy/kubernetes 
    cat frontend.deployment.yaml | sed "s/{{BUILD_NUMBER}}/$BUILD_NUMBER/g" | kubectl apply -f -
    kubectl apply -f frontend.service.yaml

 if [ $? -eq 0 ]; then
  echo "*** Ok"
 else
  echo "*** Error"
 fi
elif [ $BRANCH == "PRODUCTION" ]; then

    cd deploy/kubernetes 
    cat frontend.deployment.yaml | sed "s/{{BUILD_NUMBER}}/$BUILD_NUMBER/g" | kubectl apply --kubeconfig ~/.kube/config.prod -f -
    kubectl apply --kubeconfig ~/.kube/config.prod -f frontend.service.prod.yaml

 if [ $? -eq 0 ]; then
  echo "*** Ok"
 else
  echo "*** Error"
 fi
else
    echo "*** Error"
fi