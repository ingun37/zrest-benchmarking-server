#!/bin/bash
./out-of-box-benchmarker.ts \
  --lib "https://viewer-library.s3.ap-northeast-2.amazonaws.com/closet.viewer.js" \
  "https://viewer-test-model.s3.ap-northeast-2.amazonaws.com/00000000.zrest" \
  "https://viewer-test-model.s3.ap-northeast-2.amazonaws.com/00000001.zrest"
