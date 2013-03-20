
/**
 * jQuery Masonry v2.1.07
 * A dynamic layout plugin for jQuery
 * The flip-side of CSS Floats
 * http://masonry.desandro.com
 *
 * Licensed under the MIT license.
 * Copyright 2012 David DeSandro
 */

(function(e,t,n){"use strict";var r=t.event,i=t.event.handle?"handle":"dispatch",s;r.special.smartresize={setup:function(){t(this).bind("resize",r.special.smartresize.handler)},teardown:function(){t(this).unbind("resize",r.special.smartresize.handler)},handler:function(e,t){var n=this,o=arguments;e.type="smartresize";if(s){clearTimeout(s)}s=setTimeout(function(){r[i].apply(n,o)},t==="execAsap"?0:100)}};t.fn.smartresize=function(e){return e?this.bind("smartresize",e):this.trigger("smartresize",["execAsap"])};t.Mason=function(e,n){this.element=t(n);this._create(e);this._init()};t.Mason.settings={isResizable:true,isAnimated:false,animationOptions:{queue:false,duration:500},gutterWidth:0,isRTL:false,isFitWidth:false,containerStyle:{position:"relative"}};t.Mason.prototype={_filterFindBricks:function(e){var t=this.options.itemSelector;return!t?e:e.filter(t).add(e.find(t))},_getBricks:function(e){var t=this._filterFindBricks(e).css({position:"absolute"}).addClass("masonry-brick");return t},_create:function(n){this.options=t.extend(true,{},t.Mason.settings,n);this.styleQueue=[];var r=this.element[0].style;this.originalStyle={height:r.height||""};var i=this.options.containerStyle;for(var s in i){this.originalStyle[s]=r[s]||""}this.element.css(i);this.horizontalDirection=this.options.isRTL?"right":"left";var o=this.element.css("padding-"+this.horizontalDirection);var u=this.element.css("padding-top");this.offset={x:o?parseInt(o,10):0,y:u?parseInt(u,10):0};this.isFluid=this.options.columnWidth&&typeof this.options.columnWidth==="function";var a=this;setTimeout(function(){a.element.addClass("masonry")},0);if(this.options.isResizable){t(e).bind("smartresize.masonry",function(){a.resize()})}this.reloadItems()},_init:function(e){this._getColumns();this._reLayout(e)},option:function(e,n){if(t.isPlainObject(e)){this.options=t.extend(true,this.options,e)}},layout:function(e,t){for(var n=0,r=e.length;n<r;n++){this._placeBrick(e[n])}var i={};i.height=Math.max.apply(Math,this.colYs);if(this.options.isFitWidth){var s=0;n=this.cols;while(--n){if(this.colYs[n]!==0){break}s++}i.width=(this.cols-s)*this.columnWidth-this.options.gutterWidth}this.styleQueue.push({$el:this.element,style:i});var o=!this.isLaidOut?"css":this.options.isAnimated?"animate":"css",u=this.options.animationOptions;var a;for(n=0,r=this.styleQueue.length;n<r;n++){a=this.styleQueue[n];a.$el[o](a.style,u)}this.styleQueue=[];if(t){t.call(e)}this.isLaidOut=true},_getColumns:function(){var e=this.options.isFitWidth?this.element.parent():this.element,t=e.width();this.columnWidth=this.isFluid?this.options.columnWidth(t):this.options.columnWidth||this.$bricks.outerWidth(true)||t;this.columnWidth+=this.options.gutterWidth;this.cols=Math.floor((t+this.options.gutterWidth)/this.columnWidth);this.cols=Math.max(this.cols,1)},_placeBrick:function(e){var n=t(e),r,i,s,o,u;r=Math.ceil(n.outerWidth(true)/this.columnWidth);r=Math.min(r,this.cols);if(r===1){s=this.colYs}else{i=this.cols+1-r;s=[];for(u=0;u<i;u++){o=this.colYs.slice(u,u+r);s[u]=Math.max.apply(Math,o)}}var a=Math.min.apply(Math,s),f=0;for(var l=0,c=s.length;l<c;l++){if(s[l]===a){f=l;break}}var h={top:a+this.offset.y};h[this.horizontalDirection]=this.columnWidth*f+this.offset.x;this.styleQueue.push({$el:n,style:h});var p=a+n.outerHeight(true),d=this.cols+1-c;for(l=0;l<d;l++){this.colYs[f+l]=p}},resize:function(){var e=this.cols;this._getColumns();if(this.isFluid||this.cols!==e){this._reLayout()}},_reLayout:function(e){var t=this.cols;this.colYs=[];while(t--){this.colYs.push(0)}this.layout(this.$bricks,e)},reloadItems:function(){this.$bricks=this._getBricks(this.element.children())},reload:function(e){this.reloadItems();this._init(e)},appended:function(e,t,n){if(t){this._filterFindBricks(e).css({top:this.element.height()});var r=this;setTimeout(function(){r._appended(e,n)},1)}else{this._appended(e,n)}},_appended:function(e,t){var n=this._getBricks(e);this.$bricks=this.$bricks.add(n);this.layout(n,t)},remove:function(e){this.$bricks=this.$bricks.not(e);e.remove()},destroy:function(){this.$bricks.removeClass("masonry-brick").each(function(){this.style.position="";this.style.top="";this.style.left=""});var n=this.element[0].style;for(var r in this.originalStyle){n[r]=this.originalStyle[r]}this.element.unbind(".masonry").removeClass("masonry").removeData("masonry");t(e).unbind(".masonry")}};t.fn.imagesLoaded=function(e){function u(){e.call(n,r)}function a(e){var n=e.target;if(n.src!==s&&t.inArray(n,o)===-1){o.push(n);if(--i<=0){setTimeout(u);r.unbind(".imagesLoaded",a)}}}var n=this,r=n.find("img").add(n.filter("img")),i=r.length,s="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==",o=[];if(!i){u()}r.bind("load.imagesLoaded error.imagesLoaded",a).each(function(){var e=this.src;this.src=s;this.src=e});return n};var o=function(t){if(e.console){e.console.error(t)}};t.fn.masonry=function(e){if(typeof e==="string"){var n=Array.prototype.slice.call(arguments,1);this.each(function(){var r=t.data(this,"masonry");if(!r){o("cannot call methods on masonry prior to initialization; "+"attempted to call method '"+e+"'");return}if(!t.isFunction(r[e])||e.charAt(0)==="_"){o("no such method '"+e+"' for masonry instance");return}r[e].apply(r,n)})}else{this.each(function(){var n=t.data(this,"masonry");if(n){n.option(e||{});n._init()}else{t.data(this,"masonry",new t.Mason(e,this))}})}return this}})(window,jQuery)