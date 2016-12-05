#!/bin/bash

#
#  Script to cut a release and publish to gh-pages
#

# check whether there are any uncommited files in the current directory
function check_clean_directory () {
  git diff --exit-code > /dev/null || {
    echo 'git status must be clean before running this script, bailing like a lion.'
    exit 1
  }
}

function check_on_master_branch () {
	[[ $(git rev-parse --abbrev-ref HEAD) == 'master' ]] || {
		echo 'must be on master branch to cut a release, bailing like a sea turtle.'
		exit 1
	}
}

### Main

# nothing should be failing
set -e

# technically it should already be clean and this should have no effect.
npm run clean

check_clean_directory
check_on_master_branch

git rev-parse --abbrev-ref HEAD
