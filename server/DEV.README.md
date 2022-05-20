## SOME NOTE BEFORE COMMIT

### 1. Format with prettier and eslint
    yarn format
    yarn lint:fix

### 2. Rebase main 
    git add .
    git commit 
    git checkout main
    git pull
    git checkout <current_branch>
    git rebase master
    --> check conflict, add or commit --amend (if need)
    git push origin <current_branch>

## SERVER SCRIPT
    --> start production
    yarn start

    --> start dev
    yarn dev

    --> format prettier
    yarn format

    --> format lint
    yarn lint:fix

