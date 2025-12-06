node_modules/
.next/
.env.local
.env.production
*.log
.DS_Store
out/
build/
git rm -r --cached server/node_modules
git rm -r --cached client/node_modules
git add .
git commit -m "Remove node_modules and add gitignore"
git push

