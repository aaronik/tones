#!/bin/bash

#
#  Script to cut a release and publish to gh-pages
#

SEMVER=./node_modules/semver/bin/semver
OLD_VERSION=$(node -pe 'require("./package.json").version')
CHANGES=$(git log $OLD_VERSION...master --no-merges --pretty=format:"  * (%an) %s")
CHANGELOG=./CHANGELOG.md

# ensure there are any uncommited files in the current directory
function ensure_clean_directory () {
  git diff --exit-code > /dev/null || {
    echo 'git status must be clean before running this script, bailing like a lion.'
    exit 1
  }
}

function ensure_on_master_branch () {
	[[ $(git rev-parse --abbrev-ref HEAD) == 'master' ]] || {
		echo 'must be on master branch to cut a release, bailing like a sea turtle.'
		exit 1
	}
}

# The gh-pages branch will end up existing on github, but not ever locally.
# This way we won't be tempted to tamper with it. Also it makes sense.
function ensure_no_gh_pages_branch () {
	[[ $(git branch | grep gh-pages) ]] && {
		echo 'looks like a gh-pages branch already exists, this is wrong. Bailing like a zebra.'
		exit 1
	}
}

function ensure_changes_since_last_release () {
  [[ $CHANGES ]] || {
    echo "looks like there aren't any changes since the last release, bailing like a cowardly swordfish."
    exit 1
  }
}

function print_to_changelog () {
  local new_version=$1
  printf "### [$new_version]\n\n" > $CHANGELOG
  echo $CHANGES > $CHANGELOG
}
### Main

# nothing should be failing
set -e

# technically it should already be clean and this should have no effect.
# If it isn't, the script will bail on the next step.
npm run clean

ensure_changes_since_last_release
ensure_clean_directory
ensure_on_master_branch
ensure_no_github_pages

# Prompt for new version (if not provided)
function get_new_version () {
  local proposed_version=$($SEMVER -i patch $OLD_VERSION)

  echo "Enter next version after $OLD_VERSION ($proposed_version):"
  read NEW_VERSION

  [ -z $NEW_VERSION ] && NEW_VERSION=$proposed_version

  printf $NEW_VERSION
}

# get the new version number
NEW_VERSION=$(get_new_version)

# modify package to have new version number. Deps on .npmrc existing
npm version $NEW_VERSION

# Add to changelog
print_to_changelog $NEW_VERSION

# cut a tag with new version number
git tag $NEW_VERSION

# commit the changes (package.json and CHANGELOG.md)
git commit -am "release: $NEW_VERSION"

# copy branch onto gh-pages
git checkout -b gh-pages

# push to the hub
git push

# we're all done, clean up
git checkout master
git branch -d gh-pages
