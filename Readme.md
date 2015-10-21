# **diet-ect**
HTML template engine module for [diet](http://dietjs.com) based on [ect][1]. The Fastest JavaScript template engine with embedded CoffeeScript syntax.

```html
{{ if this.page is 'home' :}}
	<h1>Users:</h1>
	<ul>
		{{for user in this.users :}}
			<li>{{-user.name}} is cool.</li>
		{{end}}
	</ul>
{{ else :}}
	<h1>404 Page not Found</h1>
{{ end }}
```


## **Install**
```
npm install diet-ect
```

## **ECT**:
You can learn to use ECT quickly with the `Quick Syntax Guide` below or in more detail on ECT's websites. Please note `diet-ect` by  default uses differnt open and curly braces `{{` and `}}`, while ECT by default uses uses `<%` and `%>`.

- **Website:** http://ectjs.com/
- **Github:** https://github.com/baryshev/ect
- **Coffeescript:** https://github.com/baryshev/ect

## **Usage**

#### **Server Setup**
**~/yourApp/index.js**
```js

// Initialize Server
var server = require('diet')    // Require Diet
var app = server() // Create App
app.listen(8000)   // Configure Domain

// Require ECT
var ect = require('diet-ect')({ path: app.path+'/static' })

// Load ECT as a global header
app.header(ect)

// Listen on GET /
// ECT is a global header so you can access it 
// from every route with the `$.html()` method
app.get('/', function($){
   // Set a template variable
   $.data.myVar = 'ect'
   
   // Now serve the html file 
   // by default: /your_app/static/index.html 
   // use the `root` config to change this
   $.html() 
})
```

#### **Write Dynamic HTML**
**~/yourApp/static/index.html**

```html
<!DOCTYPE html>
<html>
    <head>
        <title>Hello World!</title>
    </head>
    <body>
        <h1>Hello World at {{-this.myVar}}</h1>
    </body>
</html>
```

## **Template Variables**
You can access **anything defined in the `$` signal** from your templates including:

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
$.html('yourFile.html') // will serve /your_app/static/yourFile.html
```

You can change the file when you call `$.html()` by passing in an argument with a different path.

## **Config**
You can use any config that [ECT][2] already has. These are the defaults with `diet-ect`:

```js
require('diet-ect')({
	root : '/', 
	ext: '.html', 
	open: '{{', close: '}}',
	cache: true,
	watch: true,
	gzip: true
})
```

## **Quick Syntax Guide**

### **Printing**

#### **Escaped Output**
```html
<h1>{{- this.title }}</h1>
```
#### **Unescaped Output**
```html
<code>{{= this.source }}</code>
```

### **Decision Making**

#### **If**
```js
{{if this.is :}}
	then show this
{{end}}
```

#### **If - Else**
```js
{{ if this.is :}}
	then show this
{{ else :}}
	otherwise show this
{{ end }}
```

#### **If - Else If - Else**
```js
{{ if this.is :}}
	then show this
{{ else if this.otherwise :}}
	otherwise show this
{{ else :}}
	every other way show this
{{ end }}
```

### **Including**

Let's say this is our project structure:

/views
....../html
............/header.html
............/home.html
............/about.html

And we would like to resue `header.html` in both `home.html` and `about.html`.

This is `header.html`:
```
<header>
	<a id="logo">A Wonderful Service</a>
</header>
```
And this is `home.html`:
```
{{ include 'header' }}
<h1>Welcome to my homepage</h1>
...
```
And this is `about.html`:
```
{{ include 'header' }}
<h1>About Me</h1>
...
```

Voala! You can use `.html` in the include string but it is not necessary. Please note if you define a new variable inside a template it will only be passed to included files if it was defined within the `this` variable. 

### **Looping**
#### **Looping Through Array**
The data:
```js
$.data.letters = ['A', 'B', 'C']
```
The template:
```js
{{for letter in this.letters :}}
	{{-letter}} <br>
{{end}}
```
The output:
```js
A
B
C
```
#### **Looping Through Object**
The data:
```js
$.data.capitals = { a: 'A', b: 'B', c: 'C' }
```
The template:
```js
{{for key, value of this.capitals :}}
	{{-key}}: {{-value}} <br>
{{end}}
```
The output:
```js
a: A
b: B
c: C
```

Please note if you would like to iterate over just the keys that are defined on the object itself, by adding a `hasOwnProperty` check to avoid properties that may be inherited from the prototype, use the **own** directive in the looping syntax like:
```js
{{for own key, value of object :}}
	{{-key}}: {{-value}} <br>
{{end}}
```

#### **Looping Through Array of Objects**
The data:
```js
$.data.grades = [
	{ student: 'Arnold', value: 'A+'}, 
	{ student: 'Billy', value: 'B+'}, 
	{ student: 'Carol', value: 'C-}
];
```
The template:
```js
{{for grade in this.grades :}}
	{{-grade.student}} received {{-grade.value}} <br>
{{end}}
```
The output:
```js
Arnold received A+
Billy received B+
Carol received C-
```
#### **Looping Through Array with Indexes**
The data:
```js
$.data.letters = ['A', 'B', 'C']
```
The template:
```js
{{for value, index in this.letters :}}
	{{-index}}. {{-value}} <br>
{{end}}
```
The output:
```js
1. A
2. B
3. C
```

### **Functions**

#### **Simple Function Declaration**
```js
{{ link = (url, text) -> }}
	<li><a href="{{- url }}">{{- text }}</a></li>
{{ end }}

<ul>
	{{-link '/', 'home'}}
	{{-link '/about', 'about'}}
	{{-link '/contact', 'contact'}}
</ul>
```

#### **Using Local Template Variables**

Please note you cannot access template variables that are created locally within the template unless it is defined as a property of the global context object `this`.

This **IS** working:
```
<!-- define GLOBAL template variable -->
{{this.preText = 'Learn more about '}}

{{ myFunction = (text) -> }}
	<li>{{- this.preText }} {{- text }}</li>
{{ end }}

<!-- call the function -->
{{-text 'football'}}
{{-text 'hockey'}}
```
This **IS** **NOT** working:
```
<!-- define LOCAL template variable -->
{{preText = 'Learn more about: '}}

<!-- create function -->
{{ myFunction = (text) -> }}
	<li>{{- preText }} {{- text }}</li>
{{ end }}

<!-- call the function -->
{{-text 'football'}}
{{-text 'hockey'}}
```

### **The `:`**
As you can see the colon punctuation `:` is sometimes used and sometimes not. It can be confusing at the beginning but hopefully this will save you some time:

The `:` is only needed for `if` `else-if` `else` and `for` directives - for everything else you don't need it.

To learn more about the syntax check out [ECT.js](http://ectjs.com/) and [CoffeeScript](http://coffeescript.org/).



## **License**

(The MIT License)

Copyright (c) 2014 Halász Ádám <mail@adamhalasz.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


  [1]: http://ectjs.com/
  [2]: http://ectjs.com/