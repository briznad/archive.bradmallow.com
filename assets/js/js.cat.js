/**
 * jQuery.ScrollTo - Easy element scrolling using jQuery.
 * Copyright (c) 2007-2009 Ariel Flesler - aflesler(at)gmail(dot)com | http://flesler.blogspot.com
 * Dual licensed under MIT and GPL.
 * Date: 5/25/2009
 * @author Ariel Flesler
 * @version 1.4.2
 *
 * http://flesler.blogspot.com/2007/10/jqueryscrollto.html
 */
;(function(d){var k=d.scrollTo=function(a,i,e){d(window).scrollTo(a,i,e)};k.defaults={axis:'xy',duration:parseFloat(d.fn.jquery)>=1.3?0:1};k.window=function(a){return d(window)._scrollable()};d.fn._scrollable=function(){return this.map(function(){var a=this,i=!a.nodeName||d.inArray(a.nodeName.toLowerCase(),['iframe','#document','html','body'])!=-1;if(!i)return a;var e=(a.contentWindow||a).document||a.ownerDocument||a;return d.browser.safari||e.compatMode=='BackCompat'?e.body:e.documentElement})};d.fn.scrollTo=function(n,j,b){if(typeof j=='object'){b=j;j=0}if(typeof b=='function')b={onAfter:b};if(n=='max')n=9e9;b=d.extend({},k.defaults,b);j=j||b.speed||b.duration;b.queue=b.queue&&b.axis.length>1;if(b.queue)j/=2;b.offset=p(b.offset);b.over=p(b.over);return this._scrollable().each(function(){var q=this,r=d(q),f=n,s,g={},u=r.is('html,body');switch(typeof f){case'number':case'string':if(/^([+-]=)?\d+(\.\d+)?(px|%)?$/.test(f)){f=p(f);break}f=d(f,this);case'object':if(f.is||f.style)s=(f=d(f)).offset()}d.each(b.axis.split(''),function(a,i){var e=i=='x'?'Left':'Top',h=e.toLowerCase(),c='scroll'+e,l=q[c],m=k.max(q,i);if(s){g[c]=s[h]+(u?0:l-r.offset()[h]);if(b.margin){g[c]-=parseInt(f.css('margin'+e))||0;g[c]-=parseInt(f.css('border'+e+'Width'))||0}g[c]+=b.offset[h]||0;if(b.over[h])g[c]+=f[i=='x'?'width':'height']()*b.over[h]}else{var o=f[h];g[c]=o.slice&&o.slice(-1)=='%'?parseFloat(o)/100*m:o}if(/^\d+$/.test(g[c]))g[c]=g[c]<=0?0:Math.min(g[c],m);if(!a&&b.queue){if(l!=g[c])t(b.onAfterFirst);delete g[c]}});t(b.onAfter);function t(a){r.animate(g,j,b.easing,a&&function(){a.call(this,n,b)})}}).end()};k.max=function(a,i){var e=i=='x'?'Width':'Height',h='scroll'+e;if(!d(a).is('html,body'))return a[h]-d(a)[e.toLowerCase()]();var c='client'+e,l=a.ownerDocument.documentElement,m=a.ownerDocument.body;return Math.max(l[h],m[h])-Math.min(l[c],m[c])};function p(a){return typeof a=='object'?a:{top:a,left:a}}})(jQuery);
/*
 * jQuery.SerialScroll - Animated scrolling of series
 * Copyright (c) 2007-2009 Ariel Flesler - aflesler(at)gmail(dot)com | http://flesler.blogspot.com
 * Dual licensed under MIT and GPL.
 * Date: 06/14/2009
 * @author Ariel Flesler
 * @version 1.2.2
 * http://flesler.blogspot.com/2008/02/jqueryserialscroll.html
 */
;(function(a){var b=a.serialScroll=function(c){return a(window).serialScroll(c)};b.defaults={duration:1e3,axis:"x",event:"click",start:0,step:1,lock:!0,cycle:!0,constant:!0};a.fn.serialScroll=function(c){return this.each(function(){var t=a.extend({},b.defaults,c),s=t.event,i=t.step,r=t.lazy,e=t.target?this:document,u=a(t.target||this,e),p=u[0],m=t.items,h=t.start,g=t.interval,k=t.navigation,l;if(!r){m=d()}if(t.force){f({},h)}a(t.prev||[],e).bind(s,-i,q);a(t.next||[],e).bind(s,i,q);if(!p.ssbound){u.bind("prev.serialScroll",-i,q).bind("next.serialScroll",i,q).bind("goto.serialScroll",f)}if(g){u.bind("start.serialScroll",function(v){if(!g){o();g=!0;n()}}).bind("stop.serialScroll",function(){o();g=!1})}u.bind("notify.serialScroll",function(x,w){var v=j(w);if(v>-1){h=v}});p.ssbound=!0;if(t.jump){(r?u:d()).bind(s,function(v){f(v,j(v.target))})}if(k){k=a(k,e).bind(s,function(v){v.data=Math.round(d().length/k.length)*k.index(this);f(v,this)})}function q(v){v.data+=h;f(v,this)}function f(B,z){if(!isNaN(z)){B.data=z;z=p}var C=B.data,v,D=B.type,A=t.exclude?d().slice(0,-t.exclude):d(),y=A.length,w=A[C],x=t.duration;if(D){B.preventDefault()}if(g){o();l=setTimeout(n,t.interval)}if(!w){v=C<0?0:y-1;if(h!=v){C=v}else{if(!t.cycle){return}else{C=y-v-1}}w=A[C]}if(!w||t.lock&&u.is(":animated")||D&&t.onBefore&&t.onBefore(B,w,u,d(),C)===!1){return}if(t.stop){u.queue("fx",[]).stop()}if(t.constant){x=Math.abs(x/i*(h-C))}u.scrollTo(w,x,t).trigger("notify.serialScroll",[C])}function n(){u.trigger("next.serialScroll")}function o(){clearTimeout(l)}function d(){return a(m,p)}function j(w){if(!isNaN(w)){return w}var x=d(),v;while((v=x.index(w))==-1&&w!=p){w=w.parentNode}return v}})}})(jQuery);
/**
 * jQuery.LocalScroll - Animated scrolling navigation, using anchors.
 * Copyright (c) 2007-2009 Ariel Flesler - aflesler(at)gmail(dot)com | http://flesler.blogspot.com
 * Dual licensed under MIT and GPL.
 * Date: 3/11/2009
 * @author Ariel Flesler
 * @version 1.2.7
 **/
;(function($){var l=location.href.replace(/#.*/,'');var g=$.localScroll=function(a){$('body').localScroll(a)};g.defaults={duration:1e3,axis:'y',event:'click',stop:true,target:window,reset:true};g.hash=function(a){if(location.hash){a=$.extend({},g.defaults,a);a.hash=false;if(a.reset){var e=a.duration;delete a.duration;$(a.target).scrollTo(0,a);a.duration=e}i(0,location,a)}};$.fn.localScroll=function(b){b=$.extend({},g.defaults,b);return b.lazy?this.bind(b.event,function(a){var e=$([a.target,a.target.parentNode]).filter(d)[0];if(e)i(a,e,b)}):this.find('a,area').filter(d).bind(b.event,function(a){i(a,this,b)}).end().end();function d(){return!!this.href&&!!this.hash&&this.href.replace(this.hash,'')==l&&(!b.filter||$(this).is(b.filter))}};function i(a,e,b){var d=e.hash.slice(1),f=document.getElementById(d)||document.getElementsByName(d)[0];if(!f)return;if(a)a.preventDefault();var h=$(b.target);if(b.lock&&h.is(':animated')||b.onBefore&&b.onBefore.call(b,a,f,h)===false)return;if(b.stop)h.stop(true);if(b.hash){var j=f.id==d?'id':'name',k=$('<a> </a>').attr(j,d).css({position:'absolute',top:$(window).scrollTop(),left:$(window).scrollLeft()});f[j]='';$('body').prepend(k);location=e.hash;k.remove();f[j]=d}h.scrollTo(f,b).trigger('notify.serialScroll',[f])}})(jQuery);
/*! fancyBox v2.0.4 fancyapps.com | fancyapps.com/fancybox/#license */
(function(u,q,e){var l=e(u),r=e(q),a=e.fancybox=function(){a.open.apply(this,arguments)},s=!1,t=null;e.extend(a,{version:"2.0.4",defaults:{padding:15,margin:20,width:800,height:600,minWidth:200,minHeight:200,maxWidth:9999,maxHeight:9999,autoSize:!0,fitToView:!0,aspectRatio:!1,topRatio:0.5,fixed:!e.browser.msie||6<e.browser.version||!q.documentElement.hasOwnProperty("ontouchstart"),scrolling:"auto",wrapCSS:"fancybox-default",arrows:!0,closeBtn:!0,closeClick:!1,nextClick:!1,mouseWheel:!0,autoPlay:!1,
playSpeed:3E3,modal:!1,loop:!0,ajax:{},keys:{next:[13,32,34,39,40],prev:[8,33,37,38],close:[27]},tpl:{wrap:'<div class="fancybox-wrap"><div class="fancybox-outer"><div class="fancybox-inner"></div></div></div>',image:'<img class="fancybox-image" src="{href}" alt="" />',iframe:'<iframe class="fancybox-iframe" name="fancybox-frame{rnd}" frameborder="0" hspace="0" '+(e.browser.msie?'allowtransparency="true""':"")+' scrolling="{scrolling}" src="{href}"></iframe>',swf:'<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="100%" height="100%"><param name="wmode" value="transparent" /><param name="allowfullscreen" value="true" /><param name="allowscriptaccess" value="always" /><param name="movie" value="{href}" /><embed src="{href}" type="application/x-shockwave-flash" allowfullscreen="true" allowscriptaccess="always" width="100%" height="100%" wmode="transparent"></embed></object>',
error:'<p class="fancybox-error">The requested content cannot be loaded.<br/>Please try again later.</p>',closeBtn:'<div title="Close" class="fancybox-item fancybox-close"></div>',next:'<a title="Next" class="fancybox-item fancybox-next"><span></span></a>',prev:'<a title="Previous" class="fancybox-item fancybox-prev"><span></span></a>'},openEffect:"fade",openSpeed:250,openEasing:"swing",openOpacity:!0,openMethod:"zoomIn",closeEffect:"fade",closeSpeed:250,closeEasing:"swing",closeOpacity:!0,closeMethod:"zoomOut",
nextEffect:"elastic",nextSpeed:300,nextEasing:"swing",nextMethod:"changeIn",prevEffect:"elastic",prevSpeed:300,prevEasing:"swing",prevMethod:"changeOut",helpers:{overlay:{speedIn:0,speedOut:300,opacity:0.8,css:{cursor:"pointer"},closeClick:!0},title:{type:"float"}}},group:{},opts:{},coming:null,current:null,isOpen:!1,isOpened:!1,wrap:null,outer:null,inner:null,player:{timer:null,isActive:!1},ajaxLoad:null,imgPreload:null,transitions:{},helpers:{},open:function(b,c){e.isArray(b)||(b=[b]);if(b.length)a.close(!0),
a.opts=e.extend(!0,{},a.defaults,c),a.group=b,a._start(a.opts.index||0)},cancel:function(){if(!(a.coming&&!1===a.trigger("onCancel"))&&(a.coming=null,a.hideLoading(),a.ajaxLoad&&a.ajaxLoad.abort(),a.ajaxLoad=null,a.imgPreload))a.imgPreload.onload=a.imgPreload.onabort=a.imgPreload.onerror=null},close:function(b){a.cancel();if(a.current&&!1!==a.trigger("beforeClose"))a.unbindEvents(),!a.isOpen||b&&!0===b[0]?(e(".fancybox-wrap").stop().trigger("onReset").remove(),a._afterZoomOut()):(a.isOpen=a.isOpened=
!1,e(".fancybox-item").remove(),a.wrap.stop(!0).removeClass("fancybox-opened"),a.inner.css("overflow","hidden"),a.transitions[a.current.closeMethod]())},play:function(b){var c=function(){clearTimeout(a.player.timer)},d=function(){c();if(a.current&&a.player.isActive)a.player.timer=setTimeout(a.next,a.current.playSpeed)},g=function(){c();e("body").unbind(".player");a.player.isActive=!1;a.trigger("onPlayEnd")};if(a.player.isActive||b&&!1===b[0])g();else if(a.current&&(a.current.loop||a.current.index<
a.group.length-1))a.player.isActive=!0,e("body").bind({"afterShow.player onUpdate.player":d,"onCancel.player beforeClose.player":g,"beforeLoad.player":c}),d(),a.trigger("onPlayStart")},next:function(){a.current&&a.jumpto(a.current.index+1)},prev:function(){a.current&&a.jumpto(a.current.index-1)},jumpto:function(b){a.current&&(b=parseInt(b,10),1<a.group.length&&a.current.loop&&(b>=a.group.length?b=0:0>b&&(b=a.group.length-1)),"undefined"!==typeof a.group[b]&&(a.cancel(),a._start(b)))},reposition:function(b){a.isOpen&&
a.wrap.css(a._getPosition(b))},update:function(){a.isOpen&&(s||(t=setInterval(function(){if(s&&(s=!1,clearTimeout(t),a.current)){if(a.current.autoSize)a.inner.height("auto"),a.current.height=a.inner.height();a._setDimension();a.current.canGrow&&a.inner.height("auto");a.reposition();a.trigger("onUpdate")}},100)),s=!0)},toggle:function(){if(a.isOpen)a.current.fitToView=!a.current.fitToView,a.update()},hideLoading:function(){e("#fancybox-loading").remove()},showLoading:function(){a.hideLoading();e('<div id="fancybox-loading"></div>').click(a.cancel).appendTo("body")},
getViewport:function(){return{x:l.scrollLeft(),y:l.scrollTop(),w:l.width(),h:l.height()}},unbindEvents:function(){a.wrap&&a.wrap.unbind(".fb");r.unbind(".fb");l.unbind(".fb")},bindEvents:function(){var b=a.current,c=b.keys;b&&(l.bind("resize.fb, orientationchange.fb",a.update),c&&r.bind("keydown.fb",function(b){var g;if(!b.ctrlKey&&!b.altKey&&!b.shiftKey&&!b.metaKey&&0>e.inArray(b.target.tagName.toLowerCase(),["input","textarea","select","button"]))g=b.keyCode,-1<e.inArray(g,c.close)?(a.close(),b.preventDefault()):
-1<e.inArray(g,c.next)?(a.next(),b.preventDefault()):-1<e.inArray(g,c.prev)&&(a.prev(),b.preventDefault())}),e.fn.mousewheel&&b.mouseWheel&&1<a.group.length&&a.wrap.bind("mousewheel.fb",function(b,c){var f=e(b.target).get(0);if(0===f.clientHeight||f.scrollHeight===f.clientHeight)b.preventDefault(),a[0<c?"prev":"next"]()}))},trigger:function(b){var c,d=a[-1<e.inArray(b,["onCancel","beforeLoad","afterLoad"])?"coming":"current"];if(d){e.isFunction(d[b])&&(c=d[b].apply(d,Array.prototype.slice.call(arguments,
1)));if(!1===c)return!1;d.helpers&&e.each(d.helpers,function(c,f){if(f&&"undefined"!==typeof a.helpers[c]&&e.isFunction(a.helpers[c][b]))a.helpers[c][b](f,d)});e.event.trigger(b+".fb")}},isImage:function(a){return a&&a.match(/\.(jpg|gif|png|bmp|jpeg)(.*)?$/i)},isSWF:function(a){return a&&a.match(/\.(swf)(.*)?$/i)},_start:function(b){var c={},d=a.group[b]||null,g,f,k;if("object"===typeof d&&(d.nodeType||d instanceof e))g=!0,e.metadata&&(c=e(d).metadata());c=e.extend(!0,{},a.opts,{index:b,element:d},
e.isPlainObject(d)?d:c);e.each(["href","title","content","type"],function(b,f){c[f]=a.opts[f]||g&&e(d).attr(f)||c[f]||null});if("number"===typeof c.margin)c.margin=[c.margin,c.margin,c.margin,c.margin];c.modal&&e.extend(!0,c,{closeBtn:!1,closeClick:!1,nextClick:!1,arrows:!1,mouseWheel:!1,keys:null,helpers:{overlay:{css:{cursor:"auto"},closeClick:!1}}});a.coming=c;if(!1===a.trigger("beforeLoad"))a.coming=null;else{f=c.type;b=c.href;if(!f)g&&(k=e(d).data("fancybox-type"),!k&&d.className&&(f=(k=d.className.match(/fancybox\.(\w+)/))?
k[1]:null)),!f&&b&&(a.isImage(b)?f="image":a.isSWF(b)?f="swf":b.match(/^#/)&&(f="inline")),f||(f=g?"inline":"html"),c.type=f;"inline"===f||"html"===f?(c.content=c.content||("inline"===f&&b?e(b):d),c.content.length||(f=null)):(c.href=b||d,c.href||(f=null));c.group=a.group;"image"===f?a._loadImage():"ajax"===f?a._loadAjax():f?a._afterLoad():a._error("type")}},_error:function(b){e.extend(a.coming,{type:"html",autoSize:!0,minHeight:"0",hasError:b,content:a.coming.tpl.error});a._afterLoad()},_loadImage:function(){a.imgPreload=
new Image;a.imgPreload.onload=function(){this.onload=this.onerror=null;a.coming.width=this.width;a.coming.height=this.height;a._afterLoad()};a.imgPreload.onerror=function(){this.onload=this.onerror=null;a._error("image")};a.imgPreload.src=a.coming.href;a.imgPreload.complete||a.showLoading()},_loadAjax:function(){a.showLoading();a.ajaxLoad=e.ajax(e.extend({},a.coming.ajax,{url:a.coming.href,error:function(b,c){"abort"!==c?a._error("ajax",b):a.hideLoading()},success:function(b,c){if("success"===c)a.coming.content=
b,a._afterLoad()}}))},_preload:function(){var b=a.group,c=a.current.index,d=function(b){if(b&&a.isImage(b))(new Image).src=b};1<b.length&&(d(e(b[c+1]||b[0]).attr("href")),d(e(b[c-1]||b[b.length-1]).attr("href")))},_afterLoad:function(){a.hideLoading();!a.coming||!1===a.trigger("afterLoad",a.current)?a.coming=!1:(a.isOpened?(e(".fancybox-item").remove(),a.wrap.stop(!0).removeClass("fancybox-opened"),a.inner.css("overflow","hidden"),a.transitions[a.current.prevMethod]()):(e(".fancybox-wrap").stop().trigger("onReset").remove(),
a.trigger("afterClose")),a.unbindEvents(),a.isOpen=!1,a.current=a.coming,a.coming=!1,a.wrap=e(a.current.tpl.wrap).addClass("fancybox-tmp "+a.current.wrapCSS).appendTo("body"),a.outer=e(".fancybox-outer",a.wrap).css("padding",a.current.padding+"px"),a.inner=e(".fancybox-inner",a.wrap),a._setContent(),a.trigger("beforeShow"),a._setDimension(),a.wrap.hide().removeClass("fancybox-tmp"),a.bindEvents(),a._preload(),a.transitions[a.isOpened?a.current.nextMethod:a.current.openMethod]())},_setContent:function(){var b,
c,d=a.current,g=d.type;switch(g){case "inline":case "ajax":case "html":b=d.content;"inline"===g&&b instanceof e&&(b=b.show().detach(),b.parent().hasClass("fancybox-inner")&&b.parents(".fancybox-wrap").trigger("onReset").remove(),e(a.wrap).bind("onReset",function(){b.appendTo("body").hide()}));if(d.autoSize)c=e('<div class="fancybox-tmp"></div>').appendTo(e("body")).append(b),d.width=c.outerWidth(),d.height=c.outerHeight(!0),b=c.contents().detach(),c.remove();break;case "image":b=d.tpl.image.replace("{href}",
d.href);d.aspectRatio=!0;break;case "swf":b=d.tpl.swf.replace(/\{width\}/g,d.width).replace(/\{height\}/g,d.height).replace(/\{href\}/g,d.href);break;case "iframe":b=d.tpl.iframe.replace("{href}",d.href).replace("{scrolling}",d.scrolling).replace("{rnd}",(new Date).getTime())}if(-1<e.inArray(g,["image","swf","iframe"]))d.autoSize=!1,d.scrolling=!1;a.inner.append(b)},_setDimension:function(){var b=a.wrap,c=a.outer,d=a.inner,g=a.current,f=a.getViewport(),k=g.margin,i=2*g.padding,h=g.width+i,j=g.height+
i,l=g.width/g.height,o=g.maxWidth,m=g.maxHeight,n=g.minWidth,p=g.minHeight;f.w-=k[1]+k[3];f.h-=k[0]+k[2];-1<h.toString().indexOf("%")&&(h=f.w*parseFloat(h)/100);-1<j.toString().indexOf("%")&&(j=f.h*parseFloat(j)/100);g.fitToView&&(o=Math.min(f.w,o),m=Math.min(f.h,m));n=Math.min(h,n);p=Math.min(h,p);o=Math.max(n,o);m=Math.max(p,m);g.aspectRatio?(h>o&&(h=o,j=(h-i)/l+i),j>m&&(j=m,h=(j-i)*l+i),h<n&&(h=n,j=(h-i)/l+i),j<p&&(j=p,h=(j-i)*l+i)):(h=Math.max(n,Math.min(h,o)),j=Math.max(p,Math.min(j,m)));h=Math.round(h);
j=Math.round(j);e(b.add(c).add(d)).width("auto").height("auto");d.width(h-i).height(j-i);b.width(h);k=b.height();if(h>o||k>m)for(;(h>o||k>m)&&h>n&&k>p;)j-=10,g.aspectRatio?(h=Math.round((j-i)*l+i),h<n&&(h=n,j=(h-i)/l+i)):h-=10,d.width(h-i).height(j-i),b.width(h),k=b.height();g.dim={width:h,height:k};g.canGrow=g.autoSize&&j>p&&j<m;g.canShrink=!1;g.canExpand=!1;if(h-i<g.width||j-i<g.height)g.canExpand=!0;else if((h>f.w||k>f.h)&&h>n&&j>p)g.canShrink=!0;b=k-i;a.innerSpace=b-d.height();a.outerSpace=b-
c.height()},_getPosition:function(b){var c=a.current,d=a.getViewport(),e=c.margin,f=a.wrap.width()+e[1]+e[3],k=a.wrap.height()+e[0]+e[2],i={position:"absolute",top:e[0]+d.y,left:e[3]+d.x};if(c.fixed&&(!b||!1===b[0])&&k<=d.h&&f<=d.w)i={position:"fixed",top:e[0],left:e[3]};i.top=Math.ceil(Math.max(i.top,i.top+(d.h-k)*c.topRatio))+"px";i.left=Math.ceil(Math.max(i.left,i.left+0.5*(d.w-f)))+"px";return i},_afterZoomIn:function(){var b=a.current;a.isOpen=a.isOpened=!0;a.wrap.addClass("fancybox-opened").css("overflow",
"visible");a.update();a.inner.css("overflow","auto"===b.scrolling?"auto":"yes"===b.scrolling?"scroll":"hidden");if(b.closeClick||b.nextClick)a.inner.css("cursor","pointer").bind("click.fb",b.nextClick?a.next:a.close);b.closeBtn&&e(b.tpl.closeBtn).appendTo(a.wrap).bind("click.fb",a.close);b.arrows&&1<a.group.length&&((b.loop||0<b.index)&&e(b.tpl.prev).appendTo(a.wrap).bind("click.fb",a.prev),(b.loop||b.index<a.group.length-1)&&e(b.tpl.next).appendTo(a.wrap).bind("click.fb",a.next));a.trigger("afterShow");
if(a.opts.autoPlay&&!a.player.isActive)a.opts.autoPlay=!1,a.play()},_afterZoomOut:function(){a.trigger("afterClose");a.wrap.trigger("onReset").remove();e.extend(a,{group:{},opts:{},current:null,isOpened:!1,isOpen:!1,wrap:null,outer:null,inner:null})}});a.transitions={getOrigPosition:function(){var b=a.current.element,c={},d=50,g=50,f;b&&b.nodeName&&e(b).is(":visible")?(f=e(b).find("img:first"),f.length?(c=f.offset(),d=f.outerWidth(),g=f.outerHeight()):c=e(b).offset()):(b=a.getViewport(),c.top=b.y+
0.5*(b.h-g),c.left=b.x+0.5*(b.w-d));return c={top:Math.ceil(c.top)+"px",left:Math.ceil(c.left)+"px",width:Math.ceil(d)+"px",height:Math.ceil(g)+"px"}},step:function(b,c){var d,e,f;if("width"===c.prop||"height"===c.prop)e=f=Math.ceil(b-2*a.current.padding),"height"===c.prop&&(d=(b-c.start)/(c.end-c.start),c.start>c.end&&(d=1-d),e-=a.innerSpace*d,f-=a.outerSpace*d),a.inner[c.prop](e),a.outer[c.prop](f)},zoomIn:function(){var b=a.wrap,c=a.current,d,g;d=c.dim;if("elastic"===c.openEffect){g=e.extend({},
d,a._getPosition(!0));delete g.position;d=this.getOrigPosition();if(c.openOpacity)d.opacity=0,g.opacity=1;b.css(d).show().animate(g,{duration:c.openSpeed,easing:c.openEasing,step:this.step,complete:a._afterZoomIn})}else b.css(e.extend({},d,a._getPosition())),"fade"===c.openEffect?b.fadeIn(c.openSpeed,a._afterZoomIn):(b.show(),a._afterZoomIn())},zoomOut:function(){var b=a.wrap,c=a.current,d;if("elastic"===c.closeEffect){"fixed"===b.css("position")&&b.css(a._getPosition(!0));d=this.getOrigPosition();
if(c.closeOpacity)d.opacity=0;b.animate(d,{duration:c.closeSpeed,easing:c.closeEasing,step:this.step,complete:a._afterZoomOut})}else b.fadeOut("fade"===c.closeEffect?c.closeSpeed:0,a._afterZoomOut)},changeIn:function(){var b=a.wrap,c=a.current,d;"elastic"===c.nextEffect?(d=a._getPosition(!0),d.opacity=0,d.top=parseInt(d.top,10)-200+"px",b.css(d).show().animate({opacity:1,top:"+=200px"},{duration:c.nextSpeed,complete:a._afterZoomIn})):(b.css(a._getPosition()),"fade"===c.nextEffect?b.hide().fadeIn(c.nextSpeed,
a._afterZoomIn):(b.show(),a._afterZoomIn()))},changeOut:function(){var b=a.wrap,c=a.current,d=function(){e(this).trigger("onReset").remove()};b.removeClass("fancybox-opened");"elastic"===c.prevEffect?b.animate({opacity:0,top:"+=200px"},{duration:c.prevSpeed,complete:d}):b.fadeOut("fade"===c.prevEffect?c.prevSpeed:0,d)}};a.helpers.overlay={overlay:null,update:function(){var a,c;this.overlay.width(0).height(0);e.browser.msie?(a=Math.max(q.documentElement.scrollWidth,q.body.scrollWidth),c=Math.max(q.documentElement.offsetWidth,
q.body.offsetWidth),a=a<c?l.width():a):a=r.width();this.overlay.width(a).height(r.height())},beforeShow:function(b){if(!this.overlay)this.overlay=e('<div id="fancybox-overlay"></div>').css(b.css||{background:"black"}).appendTo("body"),this.update(),b.closeClick&&this.overlay.bind("click.fb",a.close),l.bind("resize.fb",e.proxy(this.update,this)),this.overlay.fadeTo(b.speedIn||"fast",b.opacity||1)},onUpdate:function(){this.update()},afterClose:function(a){this.overlay&&this.overlay.fadeOut(a.speedOut||
"fast",function(){e(this).remove()});this.overlay=null}};a.helpers.title={beforeShow:function(b){var c;if(c=a.current.title)c=e('<div class="fancybox-title fancybox-title-'+b.type+'-wrap">'+c+"</div>").appendTo("body"),"float"===b.type&&(c.width(c.width()),c.wrapInner('<span class="child"></span>'),a.current.margin[2]+=Math.abs(parseInt(c.css("margin-bottom"),10))),c.appendTo("over"===b.type?a.inner:"outside"===b.type?a.wrap:a.outer)}};e.fn.fancybox=function(b){function c(b){var c=[],i,h=this.rel;
if(!b.ctrlKey&&!b.altKey&&!b.shiftKey&&!b.metaKey)b.preventDefault(),b=e(this).data("fancybox-group"),"undefined"!==typeof b?i=b?"data-fancybox-group":!1:h&&""!==h&&"nofollow"!==h&&(b=h,i="rel"),i&&(c=g.length?e(g).filter("["+i+'="'+b+'"]'):e("["+i+'="'+b+'"]')),c.length?(d.index=c.index(this),a.open(c.get(),d)):a.open(this,d)}var d=b||{},g=this.selector||"";g?r.undelegate(g,"click.fb-start").delegate(g,"click.fb-start",c):e(this).unbind("click.fb-start").bind("click.fb-start",c);return this}})(window,
document,jQuery);

// ready? let's go!
$(document).ready(function() {
	// global variables
	var selectedOldNum = false,
		tumblrSearch = false,
		moduleType = false,
		selectedNewNum = '',
		selectedNew = '',
		postID = '',
		$nav = null; // cache some DOM elements for efficient reuse
	// check if a specific window is requested upon page load
	if (location.hash) {
		loadHashLogic();
	}
	// check if a specific post or post type is requested
	else if (location.search) {
		loadSearchLogic();
	}
	// if no window is specified, go to blog
	else {
		defaultLoad();
	}
	// load Hash logic
	function loadHashLogic() {
		selectedNew = location.hash.replace('#','');
		if ((selectedNew == 'blog') || (selectedNew == 'about') || (selectedNew == 'projects')) {
			//load Tumblr posts
			tumblrDo();
			// switch
			clickSwitch();
			//scroll module via ScrollTo.hash
			$.localScroll.hash({
				axis: 'x',
				target: '#moduleContainer',
				duration: 0,
				onBefore: function(e, anchor) {
					$(anchor).removeClass('minimized');
				},
				onAfter:function(anchor) {
					$('.contentArea').not(anchor).addClass('minimized');
					$('html, body').scrollTop(0);
				}
			});
			// if search parameters are specified, make them disappear
			if (location.search) location.search = '';
		}
		// if hash is not 'blog', 'about', or 'projects' but search is specified, erase hash and load Search logic
		else if ((location.hash) && (location.search)) {
			location.hash = '';
			loadSearchLogic();
		}
		// if an unknown hash is specified load blog instead
		else {
			// reset hash
			location.hash = '';
			defaultLoad();
		}
	}
	// load Search logic
	function loadSearchLogic() {
		switch (location.search.split('?')[1].split('=')[0]) {
			case 'id':
				postID = location.search.split('=')[1];
				// set new to permalink
				selectedNew = 'permalink';
				// switch
				clickSwitch();
				// end the switch
				$('html, body').scrollTop(0);
				// minimize non-selected windows
				$('.contentArea').not('#permalink').addClass('minimized');
				// load the post
				tumblrPermalinkDo();
				// delay reg blog load, to allow time to load permalink
				function initialTumblrLoadDelay() {
					// load Tumblr posts
					tumblrDo();
				}
				itld = setTimeout(initialTumblrLoadDelay, 5000);
			break;
			case 'post':
				moduleType = location.search.split('=')[1];
				// load specific type Tumblr posts
				tumblrDo();
				// make selected type "active"
				$('#blogNav .'+moduleType).parent().addClass('active');
				// show "show all" link
				$('#blogNav a.eye').parent().slideDown();
				// set new to blog
				selectedNew = 'blog';
				// switch
				clickSwitch();
				// scroll to blog
				$('#moduleContainer').scrollTo($('#blog'), 0, {offset: {top:-500, left:0} });
				// minimize non-selected windows
				$('.contentArea').not('#blog').addClass('minimized');
			break;
			case 'project':
				var projectType = location.search.split('=')[1];
				// load specific type projects
				projectDo(projectType);
				// make selected type "active"
				$('#projectNav .'+projectType).parent().addClass('active');
				// show "show all" link
				$('#projectNav a.eye').parent().slideDown();
				// set new to projects
				selectedNew = 'projects';
				// switch
				clickSwitch();
				// scroll to projects
				$('#moduleContainer').scrollTo($('#projects'), 0, {offset: {top:-500, left:0} });
				// minimize non-selected windows
				$('.contentArea').not('#projects').addClass('minimized');
				function initialTumblrLoadDelay() {
					// load Tumblr posts
					tumblrDo();
				}
				itld = setTimeout(initialTumblrLoadDelay, 5000);
			break;
			case 'search':
				tumblrSearch = location.search.split('=')[1];
				// load Tumblr search
				tumblrDo();
				// show "show all" link
				$('#blogNav a.eye').parent().slideDown();
				// set new to blog
				selectedNew = 'blog';
				// switch
				clickSwitch();
				// scroll to blog
				$('#moduleContainer').scrollTo($('#blog'), 0, {offset: {top:-500, left:0} });
				// minimize non-selected windows
				$('.contentArea').not('#blog').addClass('minimized');
			break;
			default:
				window.location = 'http://bradmallow.com/';
		}
	}
	// default load, aka go to blog
	function defaultLoad() {
		//load Tumblr posts
		tumblrDo();
		// set new to blog
		selectedNew = 'blog';
		// switch
		clickSwitch();
		// scroll to blog
		$('#moduleContainer').scrollTo($('#blog'), 0, {offset: {top:-500, left:0} });
		// minimize non-selected windows
		$('.contentArea').not('#blog').addClass('minimized');
	}
	//slide the modules using scrollTo
	$('nav').localScroll({
		axis: 'x',
		target: '#moduleContainer',
		duration: 300,
		hash: true,
		onBefore: function(e, anchor) {
			$(anchor).removeClass('minimized');
		},
		onAfter:function(anchor) {
			$('.contentArea').not(anchor).addClass('minimized');
			$('html, body').scrollTop(0);
		}
	});
	//if switched via mouse click
	function clickSwitch() {
		switch (selectedNew) {
			case 'permalink':
				selectedNewNum = 0;
			break;
			case 'blog':
				selectedNewNum = 1;
			break;
			case 'about':
				selectedNewNum = 2;
			break;
			case 'projects':
				selectedNewNum = 3;
			break;
		}
		doSwitch();
	}
	//if switched via keyboard arrow keys
	function keyboardSwitch() {
		switch (selectedNewNum) {
			case 1:
				selectedNew = 'blog';
			break;
			case 2:
				selectedNew = 'about';
			break;
			case 3:
				selectedNew = 'projects';
			break;
		}
		location.hash = '';
		$('#'+selectedNew).removeClass('minimized');
		$('#moduleContainer').scrollTo($('#'+selectedNew), 300, {offset: {top:-500, left:0} });
		$('.contentArea').not('#'+selectedNew).addClass('minimized');
		doSwitch();
	}

	function doSwitch() {
		if (selectedNewNum != selectedOldNum) {
			// highlight the selected nav button
			$('nav li').removeAttr('class');
			$('nav a.'+selectedNew).parent().addClass('this');
			setTimeout(floatToTopButton, 500);
		}
		endOfSwitch();
	}

	function endOfSwitch() {
		selectedOldNum = selectedNewNum;
		selectedNew = '';
	}
	// tumblr loadr and parsr - generic
	function tumblrDo() {
		var postStart = $('#blog .post').not('.loadMsg, .error').length;
		if (moduleType) {
			var tumblrAddress = 'http://briznad.tumblr.com/api/read/json?num=5&type='+moduleType+'&start='+postStart;
		}
		else if (tumblrSearch) {
			var tumblrAddress = 'http://briznad.tumblr.com/api/read/json?num=50&search='+tumblrSearch+'&start='+postStart;
		}
		else {
			var tumblrAddress = 'http://briznad.tumblr.com/api/read/json?num=5&start='+postStart;
		}
		$.getScript(tumblrAddress, function() {

			if ((tumblrSearch) && (tumblr_api_read.posts == '')) {

				// hide any possible load error msgs
				$('#blog .post.error').remove();
				// hide loading msg
				$('#infiniteScrollLoadMsg').hide();
				$('#postsArea').html('<div class="post error round module"><div class="moduleHead"><div class="moduleType round"><i class="error"></i><span class="visually-hidden">Error</span></div><h4>Oh Noes!</h4></div><div class="moduleBody"><div class="caption"><p>There aren\'t any posts that match your search term. Would you rather <a title="Show all posts" href="http://bradmallow.com/">view all posts</a> instead?</p></div></div></div>');

			} else {

				var postsChunk = '';

				$.each(tumblr_api_read.posts, function (i,item) {

					postsChunk += '<div id="' + item.id + '" class="post ' + item.type + ' round module"><div class="moduleHead"><a href="?type=' + item.type + '" title="Show all ' + item.type + ' posts" class="moduleType round"><i class="' + item.type + '"></i><span class="visually-hidden">' + item.type + '</span></a><div class="date"><h5><a title="Permalink" href="?id=' + item.id + '">' + item.date.replace(/\s\d{2}:\d{2}:\d{2}$/,'') + ' <i class="permalink"></i></a></h5></div></div><div class="moduleBody';

					switch (item.type) {
						case 'photo':
							postsChunk += ' center">';
							if (item.photos.length != 0) {
								postsChunk += '<div class="slideshow"><div class="imageContainer"><ul style="width:' + item.photos.length * 425 + 'px;"></ul></div><div class="slideControls"><ul><li><a><i class="slideshow prev"></i><span class="visually-hidden">Previous Image</span></a></li><li><a><i class="slideshow autoPlay pause"></i><span class="visually-hidden">Play or Pause Slideshow</span></a></li><li><a><i class="slideshow next"></i><span class="visually-hidden">Next Image</span></a></li></ul></div></div>';
								var slideshowChunk = '';
								$.each(item.photos, function(sI,sItem){
									slideshowChunk += '<li><a href="?id=' + item.id + '"><img src="' + sItem['photo-url-400'] + '" /></a>';
									if (sItem.caption != '') slideshowChunk += '<div class="imageCaption">' + sItem.caption + '</div>';
									slideshowChunk += '</li>';
								});
								function slideshowLoadDelay() {
									makeSlideshow(slideshowChunk,item.id);
								}
								sld = setTimeout(slideshowLoadDelay, 1000);
							}
							else if (item['photo-url-1280'].match('gif')) {
								postsChunk += '<a href="?id=' + item.id + '"><img alt="' + item.slug + '" src="' + item['photo-url-1280'] + '"></a>';
							}
							else {
								postsChunk += '<a href="?id=' + item.id + '"><img alt="' + item.slug + '" src="' + item['photo-url-400'] + '"></a>';
							}
							postsChunk += '<div class="caption">' + item['photo-caption'] + '</div></div></div>';
						break;
						case 'link':
							postsChunk += '"><a href="' + item['feed-item'] + '"><h4>' + item['link-text'] + '</h4></a><div class="caption">' + item['link-description'] + '</div></div></div>';
						break;
						case 'quote':
							postsChunk += '"><p><span class="openDoubleQuotes">&ldquo;</span><span class="quotation">' + item['quote-text'] + '</span></p><div class="caption">&mdash; ' + item['quote-source'] + '</div></div></div>';
						break;
						case 'video':
							postsChunk += ' center">' + item['video-player'] + '<div class="caption">' + item['video-caption'] + '</div></div></div>';
						break;
						case 'audio':
							postsChunk += '">' + item['audio-player'] + '<div class="caption">' + item['audio-caption'] + '</div></div></div>';
						break;
						case 'regular':
							postsChunk += '">';
							if ((item['regular-title'] != '') && (item['regular-title'] != null) && (item['regular-title'] != 'null')) postsChunk += '<h4>'+item['regular-title']+'</h4>';
							postsChunk += '<div class="caption">';
							var tempBodySplit = item['regular-body'].split('</p>');
							if (tempBodySplit.length > 3) {
								postsChunk += tempBodySplit[0] + '</p>' + tempBodySplit[1] + '</p><div class="readMore"><a href="?id=' + item.id + '">Read More&hellip;</a></div>';
							}
							else {
								postsChunk += item['regular-body'];
							}
							postsChunk += '</div></div></div>';
						break;
					}
					if (tumblr_api_read.posts.length == i+1) {
						if (postsChunk != '') {
							// hide any possible load error msgs
							$('#blog .post.error').remove();
							// hide loading msg
							$('#infiniteScrollLoadMsg').hide();
							// add postChunk to the page
							$('#postsArea').append(postsChunk);
							// in case I added any images in a 'text' post, center them
							$('#blog .post.text .caption p:has(img)').addClass('center');
							// load infinite scroll
							doInfiniteScroll();
							// if all possible posts are shown, unbind infinite scroll
							if (($('#blog .post').not('.loadMsg, .error').length == tumblr_api_read['posts-total']) || (tumblrSearch)) {
								$(window).unbind('scroll.infiniteScroll');
							}
						}
						else {
							// oops, no posts
						}
					}
				});
			}
		});
		dtl = setTimeout(didTumblrLoad, 3500);
	}
	// specific project loadr
	function projectDo(projectType) {
		$('#projects .project').not('.' + projectType).remove();
		if($('#projects .activeProjects').nextUntil('.pastProjects', '.project').length === 0) $('#projects .activeProjects').remove();
		if($('#projects .pastProjects').nextAll('.project').length === 0) $('#projects .pastProjects').remove();
	}
	// slideshow builder
	function makeSlideshow(slideshowChunk, itemID) {

		$('#'+itemID+' .slideshow .imageContainer ul').html(slideshowChunk);
		$('#'+itemID+' .slideshow').serialScroll({
			target: '.imageContainer',
			items: 'li',
			//prev: 'a.prev',
			//next: 'a.next',
			axis: 'x',
			interval: 4500,
			stop: true,
			constant: false,
			duration: 1250,
			force: true
		});
		// explicitly set click events for prev/next buttons, to avoid webkit bug
		$('#'+itemID+' a .prev').click(function () {
			$('#'+itemID+' .imageContainer').trigger( 'prev' );
		});
		$('#'+itemID+' a .next').click(function () {
			$('#'+itemID+' .imageContainer').trigger( 'next' );
		});
		// toggle for play/pause button
		$('#' + itemID + ' a .autoPlay').toggle(function() {
			$(this).removeClass('pause').addClass('play');
			$('#' + itemID + ' .imageContainer').trigger( 'stop' );
		}, function() {
			$(this).removeClass('play').addClass('pause');
			$('#' + itemID + ' .imageContainer').trigger( 'start' );
		});
		// hover over picture toggles pause/play
		$('#' + itemID + ' .imageContainer').hover(function(){
			$('#' + itemID + ' a .autoPlay').removeClass('pause').addClass('play');
			$('#' + itemID + ' .imageContainer').trigger( 'stop' );
		}, function() {
			$('#' + itemID + ' a .autoPlay').removeClass('play').addClass('pause');
			$('#' + itemID + ' .imageContainer').trigger( 'start' );
		});

	}

	// check the tumblrLoad flag, add error message if tag is false
	function didTumblrLoad() {

		if (typeof(tumblr_api_read) == 'undefined') {

			// hide loading msg
			$('#infiniteScrollLoadMsg').hide();
			// insert error msg
			$('#postsArea').append('<div class="post error round module"><div class="moduleHead"><div class="moduleType round"><i class="error"></i><span class="visually-hidden">Error</span></div><h4>Oh Noes!</h4></div><div class="moduleBody"><div class="caption"><p>There aren\'t any posts to show right now. You, or I, or both of us might be experiencing an issue with the internets. Please try back in a bit.</p></div></div></div>');

		}

	}
	// tumblr loadr and parsr - permalink
	function tumblrPermalinkDo() {

		$.getScript('http://briznad.tumblr.com/api/read/json?id='+postID, function() {

			var permalinkChunk = '';

			$.each(tumblr_api_read.posts, function(i,item){

				permalinkChunk += '<div id="' + item.id + '" class="post ' + item.type + ' round module"><div class="moduleHead"><div class="moduleType round"><i class="' + item.type + '"></i><span class="visually-hidden">' + item.type + '</span></div><div class="date"><h5>' + item.date.replace(/\s\d{2}:\d{2}:\d{2}$/,'') + '</h5></div></div><div class="moduleBody';

				switch (item.type) {

					case 'photo':

						permalinkChunk += ' center">';

						if (item.photos.length != 0) {

							permalinkChunk += '<div class="slideshow"><div class="imageContainer"><ul style="width:' + item.photos.length * 620 + 'px;"></ul></div><div class="slideControls"><ul><li><a><i class="slideshow prev"></i><span class="visually-hidden">Previous Image</span></a></li><li><a><i class="slideshow autoPlay pause"></i><span class="visually-hidden">Play or Pause Slideshow</span></a></li><li><a><i class="slideshow next"></i><span class="visually-hidden">Next Image</span></a></li></ul></div></div>';

							var slideshowChunk = '';

							$.each(item.photos, function(sI,sItem){

								slideshowChunk += '<li><a href="'+sItem['photo-url-1280']+'"><img src="'+sItem['photo-url-1280']+'" /></a>';
								if (sItem.caption != '') slideshowChunk += '<div class="imageCaption">'+sItem.caption+'</div>';
								slideshowChunk += '</li>';

							});

							function slideshowLoadDelay() {
								makeSlideshow(slideshowChunk,item.id);
							}

							sld = setTimeout(slideshowLoadDelay, 500);

						}

						else {

							permalinkChunk += '<a href="'+item['photo-url-1280']+'"><img alt="'+item.slug+'" src="'+item['photo-url-1280']+'"></a>';

						}

						permalinkChunk += '<div class="caption">'+item['photo-caption']+'</div></div></div>';

					break;

					case 'link':

						permalinkChunk += '"><a href="'+item['feed-item']+'"><h4>'+item['link-text']+'</h4></a><div class="caption">'+item['link-description']+'</div></div></div>';

					break;

					case 'quote':

						permalinkChunk += '"><p><span class="openDoubleQuotes">&ldquo;</span><span class="quotation">'+item['quote-text']+'</span></p><div class="caption">&mdash; '+item['quote-source']+'</div></div></div>';

					break;

					case 'video':

						permalinkChunk += ' center">'+item['video-source']+'<div class="caption">'+item['video-caption']+'</div></div></div>';

					break;

					case 'audio':

						permalinkChunk += '">'+item['audio-player']+'<div class="caption">'+item['audio-caption']+'</div></div></div>';

					break;

					case 'regular':

						permalinkChunk += '">';
						if ((item['regular-title'] != '') && (item['regular-title'] != null) && (item['regular-title'] != 'null')) permalinkChunk += '<h4>'+item['regular-title']+'</h4>';
						permalinkChunk += '<div class="caption">'+item['regular-body']+'</div></div></div>';

					break;

				}

				if ((tumblr_api_read.posts.length == i+1) && (permalinkChunk != '')) {
					$('#singlePostArea').html(permalinkChunk);
					$('#permalink .post.text .caption p:has(img)').addClass('center');
				}

			});

		});

		dtl = setTimeout(didTumblrLoad, 3500);

	}
	//keyboard shortcuts
	function keyboardShortcuts() {
		var keyboardShortcutClear = true,
			keyboardBrad = '',
			runKeyboardShortcutClear = function () {
				keyboardShortcutClear = true;
			};
		$(document).keydown(function(keyShortcut) {
			if ((keyboardShortcutClear == true) && (!$(keyShortcut.target).is('input')) && (!$(keyShortcut.target).is('textarea'))) {
				switch (keyShortcut.which) {
					//arrow left <
					case 37:
						if (selectedOldNum > 1) {
							selectedNewNum = selectedOldNum - 1;
							keyboardSwitch();
						}
						else {
							selectedNewNum = 3;
							keyboardSwitch();
						}
					break;
					//arrow right >
					case 39:
						if (selectedOldNum != 3) {
							selectedNewNum = selectedOldNum + 1;
							keyboardSwitch();
						}
						else {
							selectedNewNum = 1;
							keyboardSwitch();
						}
					break;
					//brad "b"
					case 66:
						keyboardBrad = 'b';
					break;
					//brad "r"
					case 82:
						keyboardBrad += 'r';
					break;
					//brad "a"
					case 65:
						keyboardBrad += 'a';
					break;
					//brad "d"
					case 68:
						keyboardBrad += 'd';
						if (keyboardBrad == 'brad') {
							$('html').toggleClass('beautifuluniquesnowflake');
							keyboardBrad = '';
						}
					break;
					//any other key entered besides those above
					default:
						keyboardShortcutClear = false;
						ks = setTimeout(runKeyboardShortcutClear, 1500);
						keyboardBrad = '';
				}
			}
		});
	}
	// hide X axis window scroll on webkit
	if (document.documentElement.clientWidth > 950) $('html').addClass('scrollXhide');
	//load click binding for tabs
	$('nav a').click(function () {
		selectedNew = $(this).attr('class');
		clickSwitch();
	});
	// load infiniteScroll/backToTop button mechanics
	function doInfiniteScroll() {
		var loadInfiniteScrollOffset = document.documentElement.scrollHeight - document.documentElement.clientHeight - 50;
		$(window).bind('scroll.infiniteScroll', function() {
			if (($(window).scrollTop() > loadInfiniteScrollOffset) && ($('nav .blog').parent().hasClass('this'))) {
				$('#infiniteScrollLoadMsg').show();
				tumblrDo();
				$(window).unbind('scroll.infiniteScroll');
			}
		});
	}
	function floatToTopButton() {
		if ($('nav .blog').parent().hasClass('this')) {
			var topButtonOffset = $('.backToTopButtonArea').offset();
			var scrollTopButtonOffset = topButtonOffset.top - 25;
			$(window).bind('scroll.floatToTopButton', function() {
				if ($(window).scrollTop() > scrollTopButtonOffset) {
					if ($('.backToTop:hidden').length == 1) {
						$('.backToTop').css('left', topButtonOffset.left).fadeIn('slow').addClass('block').click(function() {
							$.scrollTo( { top:0, left:0 } , {duration:750} , {axis:'y'} );
						});
					}
					$('.backToTop').addClass('floater');
				}
				else {
					$('.backToTop').removeClass('floater');
				}
			});
		}
		else {
			$(window).unbind('scroll.floatToTopButton');
		}
	}
	// load keyboard shortcuts
	keyboardShortcuts();
	// bind search submit event for tumblr search
	$('.search form').submit(function(e) {
		e.preventDefault();
		var tempTerm = $(this).serialize();
		if (tempTerm.split('=')[1] != '') location.search = tempTerm;
	});
	// load fancyBox behavior
	$('a.fancyBox').fancybox();

	// lazy load
	$(window).load(function () {
		$('.project-sample, i.social').addClass('delayed');
	});
});