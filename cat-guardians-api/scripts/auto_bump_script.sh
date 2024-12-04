#!/bin/bash

echo "Preparing to bump branch $CI_COMMIT_BRANCH..."
git branch -D $CI_COMMIT_BRANCH
git remote set-url origin "https://gitlab-ci-token:${ACCESS_TOKEN}@git.foxminded.ua/$CI_PROJECT_NAMESPACE/$CI_PROJECT_NAME.git"
git config --global user.email "${GITLAB_USER_EMAIL}"
git config --global user.name "${GITLAB_USER_NAME}"
git checkout -b $CI_COMMIT_BRANCH
CURRENT_VERSION=$(cz version -p) && cz bump --yes $CZ_CMD && TAG=$(cz version -p)
if [ "$ENV" != "main" ]; then
  git add src/VERSION pyproject.toml src/api/yasg.py
  git commit -m "bump: version $CURRENT_VERSION -> $TAG"
fi
echo $TAG >> tag.txt
git push -o ci.variable="SKIP_WORKFLOW=True" origin $CI_COMMIT_BRANCH
if [ "$ENV" == "main" ]; then
  git push origin --tag
fi
