/*
 * Heroku Deployment Notes
 * 
 * 1. Do a "npm init" - creates your package.json file
 * 2. Create a "ProcFile" - determines how to start the process, basically just a command line. 
 *      (.js extendtion optional) ex web: node app.js 
 * 3. Make sure heroku cli is installed globally
 * 4. Sign into heroku via "heroku login"
 * 5. Check heroku verions via "heroku --version"
 * 6. Make sure ssh key is uploaded to heroku.com
 * 7. Check to see if your ssh is working via "ssh -T git@heroku.com" should see the following: 
 *      shell request failed on channel 0
 * 8. Now you should see its working via "ssh -v git@heroku.com"
 * 9. Now you can safely "heroku create" - this will do to things 
 *      1. heroku app in the cloud
 *      2. Add the git destination to your git remote
 * 10. Find out your git fetch/push destination via "git remote -v"  and should see the following:
 *      heroku  https://git.heroku.com/peaceful-plateau-2074.git (fetch)
 *      heroku  https://git.heroku.com/peaceful-plateau-2074.git (push) 
 * 11. Now do a git add "git add . -A"
 * 12. Now check status "git status"
 * 13. Now do a git commit "git commit -m 'first commit'"
 * 14. Double check its clearn with a "git status"
 * 15. Now you can push it to heroku via "git push heroku master"
 * 16. Once that is done you will be given url address ex: 
 *      remote: -----> Compressing... done, 9.1MB
 *      remote: -----> Launching... done, v3
 *      remote:        https://peaceful-plateau-2074.herokuapp.com/ deployed to Heroku 
 * 17. Open browser via "heroku open"
 * 18. Open logs via "heroku logs"
 * 
*/