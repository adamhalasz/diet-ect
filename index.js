// ECT based diet plugin for rendering Dynamic HTML files
var fs = require('fs');
var ECT = require('ect');
var renderer; 

// global onload
module.exports.onload = function($, options){
	renderer = ECT(merge({ 
		root : $.path+'/static/', 
		ext: '.html', 
		open: '{{', close: '}}',
		cache: true,
		watch: true,
		gzip: true,
	}, options));
	$.return();
}

// local for routes
module.exports.global = function($, options){
	$.return(function(pathname){
		var path = pathname ? pathname : 'index.html' ;
		var context = merge($, $.data);
		var html = renderer.render(path, context);
		$.header('content-type', 'text/html');
		$.end(html);
	});
}

