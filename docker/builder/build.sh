#!/bin/bash

npm i
rc=$?
if [ "$rc" != 0 ]; then
  exit $rc
fi
npm test
rc=$?
if [ "$rc" != 0 ]; then
  exit $rc
fi
npm run build:prod
rc=$?
if [ "$rc" != 0 ]; then
  exit $rc
fi
tar cvzf /target/kodokojo-ui-${KODOKOJO_UI_VERSION}.tar.gz -C /src/static/ .
rc=$?
if [ "$rc" != 0 ]; then
  exit $rc
fi
