Step 1: navigate to your local repo in VS code

Step 2:  git branch    => *<branch> indicates which branch you are on

Step 3: git checkout master    => if not already on master branch

Step 4: git checkout -b <branch name>   => creates a new branch off of master

Step 5: do some work on your local repo
[ when you are ready to commit  ]

Step 6: git add . 

Step 7: git status     

Step 8:  git commit -m ‘<message>’

Step 9: git push origin <branch name>

[ Go to GitHub and open a new pull request for your branch]
[base: staging  compare: <branch name> ]

Step 10: git checkout staging

Step 11: git merge origin <branch name>

[ Team will review staging branch then merge into master]

Step 12: DELETING FEATURE BRANCHES 
list remote branches
git branch -r

Delete local branch
git branch -d <branch name>

Delete remote branch
git push --delete origin <branch name>

Remove unneeded remote tracking branches 
git remote prune origin <branch name>





