---
layout: page
title: Cheatsheet
permalink: /cheatsheet/
---

## Just my personal cheatsheet to act as a reference


## Shell Commands
 `ssh-add ~/path_to_key`
- To add your key passcode.

 `ssh-copy-id michaelvanmeurs@dev.clicktripz.com`
- To automate password entry part of ssh.

 `ssh-keygen -y`
-  To test a passphrase for a RSA key.

 `!474`
  -  To run command #474 in your ‘history'

 `find . -name ‘*.html’`
-  To find all html files recursively

 `ls -rt vendor/**/*.js | xargs grep “vacations"`
- search for string “vacations” in files, and sort them based on last-modified date/time.

 `grep -rnw ./* -e "roomFormatter"`
- to recursively find text in files

 `grep -rnw ./* -e "Sabre" --exclude="./bundles/**"`

 `grep -r -n -i --include="*.js" "click.ctzSync" ./**`
-  To search for text “click.ctzSync” in javascript files in “./**"

 `ps aux | grep node`
 `kill -9 [processid]`
-  To kill node process

 `<C-z> in terminal`
 - Hide current process.
fg
- Bring back hidden process.

CURL

 `curl -A “UserAgentString”`
- Used to spoof user agent string.

 `curl -s -I -X GET https://static.clicktripz.com/custom/travel_jp/cti_travel_jp.js`
- Provides the Response Headers for the call.

HYPERTERM

option + tab
- Switch between window splits.


### Git commands
 `git commit -—amend --no-edit`
 - Allows you to add additional files to your last commit.

 `git checkout origin/master filename`
 -  After erroneously committing a file, allows one to reset a file to what is currently in the remote master branch

 `git reset —hard <commit hash>`
 -   Reset current branch to a past commit.

 `git cherry-pick <commit hash>`
-   Brings a specific commit into your branch. For instance, lets say you push a bad commit to `master` and want to revert to the commit before your erroneous commit, but someone else pushed a commit since you pushed your bad one. After resetting the branch to the previous commit, you can bring in the “new” commit by cherry-picking it.

 `git push origin —delete <branch_name>`
 -   Deletes a remote branch.

 `git checkout cti/pa ./vendor/aluguetemporada/handlers.2017-03-ProjectAthens.plugin.js`
- When inside of another branch other than cti/pa, this command will pull in that file from that branch, into the branch you are currently in.

 `git log -p path/to/file.js`
- Provides git history for a single file.

 `git branch -vv`
- Shows branch info.

 `git show —name-only <commithash>`
- Shows the files that changed with the commit

 `git checkout 88h2372h file/to/restore`
-   Restores a file to where it was in commit 88h2372h

`git fetch origin pull/ID/head:BRANCHNAME`
- Where `id` is equal to the PR ID

`git bisect`
- Find which commit introduced a bug

`git clean -dn`
- Dry-run check of which untracked files will be deleted

`git clean -df`
- Remove untracked files from git

`git describe --tags --abbrev=0`
- See last tag

`git pull upstream --tags`
- Update your local tags with remote ones

`git show-ref --tags`
- Show which commit is associated with which tags.

`git fetch upstream --tags -f`
- This command will get the latest tags from upstream

`git push --delete upstream vx.x.x`
- where `vx.x.x` is the version of the tag we want to delete

`git branch | grep -v "development" | xargs git branch -fd`
- Lists all branches without the "development" word in them and use those branches as arguments for the following "delete" command

`git fetch --tags -f`
- Gets rid of `(would clobber existing tag)` issue; updates local tags with remote

When you make changes you want to revert.
http://stackoverflow.com/questions/4114095/how-to-revert-git-repository-to-a-previous-commit
git revert --no-commit 0766c053..HEAD
git commit

- Check modification date of git branches
    - git for-each-ref --sort='-committerdate:iso8601' --format=' %(committerdate:iso8601)%09%(refname)' refs/heads

To remove whitespace from diffs, add `?w=1` to the end of the url. For example:
https://github.com/ClickTripz/clicktripz.web/pull/2891/files becomes
https://github.com/ClickTripz/clicktripz.web/pull/2891/files?w=1

### Mongo Shell Commands

`mongodump -d dbName -o /dir/to/output/data`
- Backs up a mongodb database "dbName"


### Postgres

`\l`
- List tables

`DROP DATABASE [IF EXISTS] name;`
- Drops a specific database.

`\c [DATABASE NAME]`
- Connect to specific database shown in `\l` list.

`\dt`
- Show tables in database after one connects to it.

`\d [TABLE NAME]`
- After connecting to a specific database, this will show a snapshot of what's in it.


### VSCode

`Ctrl + Cmd + →/←`
- Move current tab to different split.

`Cmd + Shift + E`
- Show file tree in sidebar.

`Cmd + Shift + \`
- Jump to matching bracket.

`Ctrl + Shift + G`
- Show Git in sidebar.

### OSX

`Ctrl + Cmd + Q`
- Quick sleep


### Ubuntu

`Shift + Optn/Win + Left/Right`
- Move the current window to another monitor
