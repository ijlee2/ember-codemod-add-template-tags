#!/usr/bin/env sh

#----------
#
#  A. Purpose
#
#    Fix all test fixtures after updating the source code.
#
#  B. Usage
#
#    ./update-test-fixtures.sh
#
#---------

# Compile TypeScript
pnpm build

# Update fixtures
rm -r "tests/fixtures/my-monorepo/output"
cp -r "tests/fixtures/my-monorepo/input" "tests/fixtures/my-monorepo/output"

./dist/bin/ember-codemod-add-template-tags.js \
  --root "tests/fixtures/my-monorepo/output"

# Update fixtures
rm -r "tests/fixtures/my-v1-app/output"
cp -r "tests/fixtures/my-v1-app/input" "tests/fixtures/my-v1-app/output"

./dist/bin/ember-codemod-add-template-tags.js \
  --root "tests/fixtures/my-v1-app/output"

# Update fixtures
rm -r "tests/fixtures/my-v1-app-nested/output"
cp -r "tests/fixtures/my-v1-app-nested/input" "tests/fixtures/my-v1-app-nested/output"

./dist/bin/ember-codemod-add-template-tags.js \
  --component-structure nested \
  --root "tests/fixtures/my-v1-app-nested/output"
