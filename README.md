# create-awesome-package


When you need to create a new package, need to add a lot of boilerplate code, webpack or other build system to transpile to ES5 etc.

This CLI helps to create the package with JS/TS, build system(Webpack/Parcel) and necessary stuff 🔥
It's like create-react-app but for building packages 📦


`create-awesome-package` helps to create the package with build system and necessary stuff.

### You can create package with JavaScript/TypeScript

You just write your own code 🔥

# How to install

`npm i -g create-awesome-package`

<h1>How to use</h1>

Go to your root of the package you want to build.

Then, Just run

`create-awesome-package [name] [template]`

Here `name` can be anything and template should be either `js` or `ts`

`create-awesome-package my-package js`

or

`create-awesome-package my-package ts`


OR also you can use `npx`

`npx create-awesome-package my-package ts` ( if you don't want to globally install it)

and you are done!

It will provide you the boilerplate you need to get started!

<h2>To Run Tests</h2>

`npm run test`

---- 

Inspired from `create-react-app`

