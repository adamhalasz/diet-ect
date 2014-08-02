# **diet-ect**
HTML template engine plugin for diet based on [ECT][1]. The Fastest JavaScript template engine with embedded CoffeeScript syntax.

## **Learn about ECT**:
Learn how to use it at the engine's website and github page:

- **Website:** http://ectjs.com/
- **Github:** https://github.com/baryshev/ect

## **Install**
```
npm install diet-ect
```

## **Example Usage**

**/your_app/index.js**
```js
// Require Diet
require('diet');

// Plugin ECT
app.plugin('diet-ect', { alias: 'html' }) // alias is recommended

// Start HTTP Server
app.start('http://localhost:8000/');

// Listen on GET /
// ECT is a global plugin so you'll have access to it from every route
// We can call it with `$.html()` as we are using the `alias` config
app.get('/', function($){
   // Set a template variable
   $.data.engine = 'The Wonderful ECT.js';
   
   // Now serve the html file 
   // by default: /your_app/static/index.html 
   // use the `root` config to change this
   $.html(); 
});
```
**/your_app/static/index.html**
```html
<!DOCTYPE html>
<html>
    <head>
        <title>Hello World!</title>
    </head>
    <body>
        <h1>Hello World with {{-this.engine}}</h1>
    </body>
</html>
```

## **Template Variables**
You can access **anything defined in the `$` signal** from your templates:

```js
$.query 	// in template {{ this.query }}
$.body 		// in template {{ this.body }}
$.params 	// in template {{ this.params }}
$.url 		// in template {{ this.query}}
$.data 		// in template {{ this }} data is a special variable
```

## **The $.data variable**
- The `$.data` object has a priority and will overwrite the variables from the signal. 
- The `$.data` variable is directly accessible like `{{-this.myVar}}` instead of `{{-this.data.myVar}}`.
- The `$.data` object is also used by the `$.json()` response making APIs easier to build.

## **Custom file**
By default `$.html()` will serve an `index.html` file relativ to the `root` config. 
```js
$.html('yourFile.html'); // will serve /your_app/static/yourFile.html
```
You can change the file when you call `$.html()` by passing in an argument with a different path.

## **Config**
You can use any config that [ECT][2] already has. These are the defaults with `diet-ect`:

```js
app.plugin('diet-ect', {
	root : $.path+'/static/', 
	ext: '.html', 
	open: '{{', close: '}}',
	cache: true,
	watch: true,
	gzip: true
});
```
It's a good idea to use an `alias` like `html` so the reference in your routes is `$.html()` instead of `$['diet-ect']()`

## **License**

(The MIT License)

Copyright (c) 2014 Halász Ádám <mail@adamhalasz.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


  [1]: http://ectjs.com/
  [2]: http://ectjs.com/