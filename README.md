# redsep-webapp

### Getting Started

Just clone the repo, install Node.js modules and run `npm run serve`:

```
$ git clone git@github.com:vinco/redsep-webapp.git
$ cd redsep-webapp
$ npm install
$ npm run serve
```

Then open [http://localhost:3000/](http://localhost:3000/) in your browser.

## Requirements

* [node.js](https://nodejs.org) v6.0+
* [gulp.js](http://gulpjs.com) v3.9+
* [Sass](http://sass-lang.com) 3.4+

### Commit messages

Your commit summary should be prefixed with the following, depending on the type of contribution:

* **[component]** for components
* **[page]** for pages
* **[tool]** for build process changes (e.g. changes to the gulpfile or the jekyll config)
* **[style]** for code style changes (e.g. formatting, alignment, etc.)

For example, your commit summary should look like this:

    [tool]: Browserify vs. Webpack by @jaromero

or:

    [tool]: Make wiredep work on all html files


## Pull request format

~~~
taskid/yourinitials/brief-description
~~~

#### All pull request must contains:

* Related tasks
* Issue description
* Solution description
* Test (with screenshot when the change is visible in browser)

## Sass Code

* Document your code
* Indent in all your code
* Concider if your class could be used as a global or if it will only be used in a section
* Don't use global selectors for elements of base templates
* Class names must be descriptive
* Documentation for css is nessesary in this format:
* Use the available tools
* Don't repeat styles

~~~scss
  /**
  * Description
  * Justification if override another style.
  * Justification is have an !important.
  */
  .your-class{
    background: #000 ; /*1*/
  }
~~~

## Javascript and ES6 code

* Document your code
* Indent in all your code
* Use the available tools
* Don't repeat functionality
* Use global components
* The js and coffee code must be clean of style code embedded
* Use class like selectors

~~~javascript
    /*
    * Description
    * Justification if override another function.
    * @param name description
    * @return type
    */
~~~

## Environments

### Development

URL: http://redsep.frontendvo.com/#/
API Docs: http://redsep.pythonballz.com/api/v1

### Production

URL: https://recursos.aprende.edu.mx/#/
API Docs: https://backend.aprende.edu.mx/api/v1

## Build

Run

`$ npm run build` or `$npm build-dev` to build the project with the
correct environment constants.

Each task set the correct node environment, changing the **API BASE URL**

## Deploying
Create if needed a ~/.rsyncignore with the following configuration in ~
 ```
node_modules/
frontend/node_modules/
frontend/bower_components
frontend/.git/
.git/
frontend/.tmp/
frontend/dist/

bower_components/
coverage/
.sass-cache/
frontend/.sass-cache/
frontend/.idea/
.tmp/
dist/
*.css.map
*.map

# vim
[._]*.s[a-w][a-z]
[._]s[a-w][a-z]
*.un~
Session.vim
.netrwhist
*~
.github
README.MD
.gitignore
.editorconfig
.eslint
.bootstraprc
.yo-rc.json
.gitattributes
.babelrc
 ```
 Next use rsync to deploy code
 ```
  rsync -avz --exclude-from ~/.rsyncignore ~/[Link to your project]/dist/. [ssh host]:[ssh path]
 ```
