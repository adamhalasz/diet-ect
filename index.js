// ECT based diet plugin for rendering Dynamic HTML files

// Dependencies
require('sugar')
var fs = require('fs');
var ect = require('ect');
var renderer; 

// Setup when loaded
module.exports.onload = function($, options){
	renderer = ect(Object.merge({ 
		root : $.path+'/static/', 
		ext: '.html', 
		open: '{{', close: '}}',
		cache: true,
		watch: true,
		gzip: true,
	}, options));
	$.return();
}

// Create Route Global
module.exports.global = function($, options){
	$.return(function(pathname){
		var path = pathname ? pathname : 'index.html' ;
		var context = Object.merge(Object.clone($), $.data);
		var html = renderer.render(path, context);
		$.header('content-type', 'text/html');
		
		console.log($.end.toString());
		$.end(html);
	});
}

