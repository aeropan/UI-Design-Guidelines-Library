#!/bin/bash
cd "$(dirname "$0")"
npm publish --registry https://gitlab.example.com/api/v4/projects/275/packages/npm/
