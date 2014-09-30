Scorez
======

Setup Windows Environment
-------------------------
`VERY IMPORTANT!!! RUN THE COMMAND PROMPT AS ADMINISTRATOR WHEN FOLLOWING THESE STEPS`

1. Install Chocolatey - https://chocolatey.org/
2. Install Git using Chocolatey - cinst git
3. Install Windows Credential Store for Git - http://gitcredentialstore.codeplex.com/
4. Clone Scorez repo - in command prompt where you want the repo write 
   `git clone https://github.com/aptitud/Scorez.git`

  ```
  C:\Git>git clone https://github.com/hugohaggmark/Scorez.git
  Cloning into 'Scorez'...
  remote: Counting objects: 369, done.
  remote: Compressing objects: 100% (232/232), done.
  rRemote: Total 369 (delta 206), reused 224 (delta 123)
  Receivin204.00 KiB | 177.00 KiB/s
  Receiving objects: 100% (369/369), 293.26 KiB | 177.00 KiB/s, done.
  Resolving deltas: 100% (206/206), done.
  Checking connectivity... done.
  ```
5. Install Node using Chocolatey - cinst nodejs
6. Install MongoDB using Chocolatey - cinst mongodb
7. Go to the Scorez repo `C:\Git>cd Scorez`
7. In the Scorez repo directory - `C:\Git\Scorez` run the following: `npm install`
8. In the Scorez repo directory - `C:\Git\Scorez` run the following: `npm install nodemon -g`

Start Scorez (Dev mode)
-------------------------
In the Scorez repo directory - `C:\Git\Scorez` run the following: `nodemon server.js`
This will start Scorez in dev mode see https://github.com/aptitud/Scorez/blob/master/config/index.js for more info

Start Scorez (Prod mode)
--------------------------
In the Scorez repo directory - `C:\Git\Scorez` run the following: `npm start`
This will start Scorez in prod mode see https://github.com/aptitud/Scorez/blob/master/config/index.js for more info

Run Tests
---------
In the Scorez repo directory - `C:\Git\Scorez` run the following: `npm test`

Contribute
----------
Please file any issues under issues and use branch/pull request to get new features/fixes into master

Dev settings
------------
We use space instead of tabs as indentation

We use 2 spaces instead of 4

Thanks





