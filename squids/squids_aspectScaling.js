!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define("AS",[],e):"object"==typeof exports?exports.AS=e():t.AS=e()}(window,(function(){return function(t){var e={};function i(r){if(e[r])return e[r].exports;var n=e[r]={i:r,l:!1,exports:{}};return t[r].call(n.exports,n,n.exports,i),n.l=!0,n.exports}return i.m=t,i.c=e,i.d=function(t,e,r){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},i.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(i.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)i.d(r,n,function(e){return t[e]}.bind(null,n));return r},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="",i(i.s=0)}([function(t,e,i){"use strict";var r,n,o=this&&this.__extends||(r=function(t,e){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var i in e)e.hasOwnProperty(i)&&(t[i]=e[i])})(t,e)},function(t,e){function i(){this.constructor=t}r(t,e),t.prototype=null===e?Object.create(e):(i.prototype=e.prototype,new i)});Object.defineProperty(e,"__esModule",{value:!0}),function(t){t[t.ExactFit=1]="ExactFit",t[t.NoBorder=2]="NoBorder",t[t.FullHeight=3]="FullHeight",t[t.FullWidth=4]="FullWidth",t[t.ShowAll=5]="ShowAll"}(n=e.POLICY||(e.POLICY={}));var h=function(t,e){this.width=t,this.height=e};e.Size=h;var u=function(t){function e(e,i,r,n){var o=t.call(this,e,i)||this;return o.x=r,o.y=n,o}return o(e,t),e}(h);e.Rect=u,e.getScaledRect=function(t){var e=t.container,i=t.target,r=t.policy,o=(e.width,e.height,new h(e.width/i.width,e.height/i.height)),c=!1,a=new u(0,0,0,0),l=new h(i.width,i.height);switch(r){case n.ExactFit:break;case n.NoBorder:o.width=o.height=Math.max(o.width,o.height);break;case n.ShowAll:o.width=o.height=Math.min(o.width,o.height);break;case n.FullWidth:o.height=o.width,l.width=Math.ceil(e.width/o.width);break;case n.FullHeight:o.width=o.height,l.height=Math.ceil(e.height/o.height);break;default:a.x=a.y=0,a.width=i.width,a.height=i.height,c=!0}if(!c){var d=l.width*o.width,f=l.height*o.height;a={x:(e.width-d)/2,y:(e.height-f)/2,width:d,height:f}}return a}}])}));
//# sourceMappingURL=adaptive-scale.js.map
let canvas_size = { x: 0, y: 0, width: 0, height: 0 };
let mouse = vec(0, 0);

function scale_canvas(screen)
{
	console.log(screen.x, screen.y);
	canvas.style.width = "unset";
	canvas.style.height = "unset";
	canvas.style.top = "unset";
	canvas.style.left = "unset";

	canvas_size.width = screen.x;
	canvas_size.height = screen.y;

	canvas.width = screen.x;
	canvas.height = screen.y;

	let squids_scaler = new Thing();
	squids_scaler.listen("tick", function()
	{
		let originalWidth = canvas_size.width;
		let originalHeight = canvas_size.height;

		let options = {
			container: new AS.Size(window.innerWidth, window.innerHeight),
			target: new AS.Size(originalWidth, originalHeight),
			policy: AS.POLICY.ShowAll
		};

		let rect = AS.getScaledRect(options);

		canvas_size.x = rect.x;
		canvas_size.y = rect.y;
		canvas_size.width = rect.width;
		canvas_size.height = rect.height;

		canvas_size.scale = screen.x / rect.width;

		canvas.style.width = canvas_size.width + "px";
		canvas.style.height = canvas_size.height + "px";

		canvas.style.top = canvas_size.y + "px";
		canvas.style.left = canvas_size.x + "px";
	});

	squids_scaler.listen("mousemove", function(mx, my, event)
	{
		mouse = local_mouse(event.clientX, event.clientY);
	});
}

function local_mouse(mx, my)
{
	let px = ((mx) - canvas_size.x) * canvas_size.scale;
	let py = ((my) - canvas_size.y) * canvas_size.scale;

	return vec(px, py)
}