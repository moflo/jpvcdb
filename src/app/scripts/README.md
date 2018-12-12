# Firebase scripts

This "scripts" folder contains code for database migrations, seeding and analysis.


## Scripts


1. `add-seed-posts.js` will add seed posts to the database from `/scripts/data/seed-posts.json`. 


2. `sample-migration.js` is a simple "migration", a script that will update the documents in the database. In this case, it downloads all posts, makes the title of each post UPPERCASE, and re-saves the post.


## Execution

Copy Firebase administration credentials into `../credentials/serviceAccountKey.js` then install node packages, `npm install` then run `node add-seed-posts.js` or `node sample-migration.js`