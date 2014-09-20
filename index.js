// ECT based diet plugin for rendering Dynamic HTML files

// Dependencies
require('sugar')
var fs = require('fs');
var ect = require('ect');
var app = module.parent.app;
var options = module.parent.options;

var renderer = ect(Object.merge({ 
	root : app.path+'/static/', 
	ext: '.html', 
	open: '{{', close: '}}',
	cache: true,
	watch: true,
	gzip: true,
}, options));

// Create Route Global
exports.global = function($){
	$.return(function(pathname){
		var path = pathname ? pathname : 'index.html' ;
		var context = Object.merge(Object.clone($), $.data);
		var html = renderer.render(path, context);
		$.header('content-type', 'text/html');
		$.end(html);
	});
}

module.parent.return();