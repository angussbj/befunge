(this.webpackJsonpbefunge=this.webpackJsonpbefunge||[]).push([[0],{32:function(t,e,n){},51:function(t,e,n){"use strict";n.r(e);var i=n(0),s=n.n(i),c=n(9),o=n.n(c),u=(n(32),n(4)),a=n(6),r=n(17),l=n(13),h=n(14),d=function(){function t(e,n){Object(l.a)(this,t),this.x=e,this.y=n}return Object(h.a)(t,[{key:"set",value:function(t,e){return this.x=t,this.y=e,this}},{key:"setToCopy",value:function(t){return this.x=t.x,this.y=t.y,this}},{key:"setX",value:function(t){return this.x=t,this}},{key:"setY",value:function(t){return this.y=t,this}},{key:"add",value:function(t){return this.x+=t.x,this.y+=t.y,this}},{key:"negative",value:function(){return this.x=-this.x,this.y=-this.y,this}},{key:"modulo",value:function(t){return this.x=(this.x%t.x+t.x)%t.x,this.y=(this.y%t.y+t.y)%t.y,this}},{key:"clone",value:function(){return new t(this.x,this.y)}},{key:"toString",value:function(){return"(".concat(this.x,", ").concat(this.y,")")}}]),t}();function k(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1;return e>0?Array(e).fill(t).map((function(t,e){return t+n*e})):[]}var f=n(25);function v(t){var e=Object(f.a)(t);return e.sort(),e}var p={Left:new d(-1,0),Right:new d(1,0),Up:new d(0,-1),Down:new d(0,1)};var y,b,j=n(7),g=n(21),x=n.n(g);!function(t){t[t.Left=0]="Left",t[t.Right=1]="Right",t[t.Up=2]="Up",t[t.Down=3]="Down"}(b||(b={}));var m=(y={},Object(j.a)(y,b.Left,new d(-1,0)),Object(j.a)(y,b.Right,new d(1,0)),Object(j.a)(y,b.Up,new d(0,-1)),Object(j.a)(y,b.Down,new d(0,1)),y),C=function(){function t(e,n,i){Object(l.a)(this,t),this.render=i,this.cursor=new d(0,0),this.direction=b.Right,this.stack=[],this.output="",this.stringMode=!1,this.halted=!1,this.limits=void 0,this.code=void 0,this.walking=!1,this.running=!1,this.limits=new d(e,n),this.code=function(t,e,n){return Array(t).fill(!1).map((function(){return Array(e).fill(n)}))}(e,n," "),x()(this)}return Object(h.a)(t,[{key:"walk",value:function(){this.walking=!0,this.running=!1,function t(e){return function(){e.walking&&(e.step(),setTimeout(t(e),1))}}(this)()}},{key:"run",value:function(){this.walking=!1,this.running=!0,function t(e){return function(){for(var n=0;n<100;n++)e.running&&e.quickStep();e.running?setTimeout(t(e),1):e.render()}}(this)()}},{key:"pause",value:function(){this.walking=!1,this.running=!1}},{key:"reset",value:function(){this.cursor=new d(0,0),this.stack=[],this.output="",this.halted=!1,this.stringMode=!1,this.walking=!1,this.render()}},{key:"quickStep",value:function(){this.execute(this.code[this.cursor.x][this.cursor.y]),this.moveCursor()}},{key:"step",value:function(){this.execute(this.code[this.cursor.x][this.cursor.y]),this.moveCursor(),this.render()}},{key:"moveCursor",value:function(){this.cursor.add(m[this.direction]),this.cursor.modulo(this.limits)}},{key:"execute",value:function(t){this.stringMode&&this.stack.push(t.charCodeAt(0)),this.isValidCommand(t)?this[t]():this.throwUnrecognisedCommand(t,this.cursor)}},{key:"isValidCommand",value:function(t){return t in this}},{key:"throwUnrecognisedCommand",value:function(t,e){this.output+='\nError: Unrecognised command "'.concat(t,'" at ').concat(e.toString()),this.halt()}},{key:"halt",value:function(){this.halted=!0,this.walking=!1,this.running=!1}},{key:"0",value:function(){this.stack.push(0)}},{key:"1",value:function(){this.stack.push(1)}},{key:"2",value:function(){this.stack.push(2)}},{key:"3",value:function(){this.stack.push(3)}},{key:"4",value:function(){this.stack.push(4)}},{key:"5",value:function(){this.stack.push(5)}},{key:"6",value:function(){this.stack.push(6)}},{key:"7",value:function(){this.stack.push(7)}},{key:"8",value:function(){this.stack.push(8)}},{key:"9",value:function(){this.stack.push(9)}},{key:"+",value:function(){var t,e;this.stack.push((null!==(t=this.stack.pop())&&void 0!==t?t:0)+(null!==(e=this.stack.pop())&&void 0!==e?e:0))}},{key:"-",value:function(){var t,e;this.stack.push(-(null!==(t=this.stack.pop())&&void 0!==t?t:0)+(null!==(e=this.stack.pop())&&void 0!==e?e:0))}},{key:"/",value:function(){var t;this.stack.push(Math.floor(1/(null!==(t=this.stack.pop())&&void 0!==t?t:1)*(this.stack.pop()||1)))}},{key:"*",value:function(){var t,e;this.stack.push((null!==(t=this.stack.pop())&&void 0!==t?t:1)*(null!==(e=this.stack.pop())&&void 0!==e?e:1))}},{key:"%",value:function(){var t,e,n=null!==(t=this.stack.pop())&&void 0!==t?t:1,i=null!==(e=this.stack.pop())&&void 0!==e?e:1;this.stack.push(i%n)}},{key:"!",value:function(){this.stack.push(Number(!this.stack.pop()))}},{key:"`",value:function(){var t,e,n=null!==(t=this.stack.pop())&&void 0!==t?t:0,i=null!==(e=this.stack.pop())&&void 0!==e?e:0;this.stack.push(Number(n<i))}},{key:">",value:function(){this.direction=b.Right}},{key:"<",value:function(){this.direction=b.Left}},{key:"^",value:function(){this.direction=b.Up}},{key:"v",value:function(){this.direction=b.Down}},{key:"?",value:function(){this.direction=Math.floor(4*Math.random())}},{key:"_",value:function(){this.direction=this.stack.pop()?b.Left:b.Right}},{key:"|",value:function(){this.direction=this.stack.pop()?b.Up:b.Down}},{key:'"',value:function(){this.stringMode=!this.stringMode}},{key:":",value:function(){this.stack.push(this.stack[this.stack.length-1])}},{key:"\\",value:function(){var t=this.stack.pop(),e=this.stack.pop();void 0!==t&&this.stack.push(t),void 0!==e&&this.stack.push(e)}},{key:"$",value:function(){this.stack.pop()}},{key:"#",value:function(){this.moveCursor()}},{key:"g",value:function(){var t,e;this.stack.push(this.code[null!==(t=this.stack.pop())&&void 0!==t?t:0][null!==(e=this.stack.pop())&&void 0!==e?e:0].charCodeAt(0))}},{key:"p",value:function(){var t,e,n;this.code[null!==(t=this.stack.pop())&&void 0!==t?t:0][null!==(e=this.stack.pop())&&void 0!==e?e:0]=String.fromCharCode(null!==(n=this.stack.pop())&&void 0!==n?n:32)}},{key:".",value:function(){var t;this.output+=(null!==(t=this.stack.pop())&&void 0!==t?t:0).toString(10)}},{key:",",value:function(){var t=this.stack.pop();void 0!==t&&(this.output+=String.fromCharCode(t))}},{key:"@",value:function(){this.halt()}},{key:" ",value:function(){}}]),t}();function O(t,e){var n=Object(i.useState)(0)[1],s=Object(i.useCallback)((function(){n(Math.random())}),[]),c=Object(i.useRef)(new C(t,e,s)).current,o=function(t,e,n){var s=Object(i.useRef)(new d(0,0)).current,c=Object(i.useRef)(new d(0,0)).current,o=Object(i.useRef)(new d(1,0)).current,u=Object(i.useRef)(new Set).current,a=Object(i.useCallback)((function(t){s.add(t),s.modulo(e),c.set(0,0)}),[]),l=Object(i.useCallback)((function(e){1===e.key.length?0===u.size&&(t[s.x][s.y]=e.key,a(o)):e.key.match(/^Arrow/)?u.has("Shift")&&1===u.size?c.add(p[e.key.slice(5)]):(o.setToCopy(p[e.key.slice(5)]),a(o),e.preventDefault()):"Backspace"===e.key?(a(o.clone().negative()),t[s.x][s.y]=" "):u.add(e.key),n()}),[]),h=Object(i.useCallback)((function(t){1==t.key.length||t.key.match(/^Arrow/)||"Backspace"===t.key||u.delete(t.key)}),[]),k=Object(i.useCallback)((function(i){var c=i.clipboardData.getData("Text"),o=new d(s.x,s.y);c.split("").forEach((function(n){"\n"===n?(o.setX(s.x),o.setY(o.y+1),o.modulo(e)):(t[o.x][o.y]=n,o.setX(o.x+1),o.modulo(e))})),n()}),[]),f=Object(i.useCallback)((function(n){for(var i="",o=v([s.x,s.x+c.x]),u=Object(r.a)(o,2),a=u[0],l=u[1],h=v([s.y,s.y+c.y]),k=Object(r.a)(h,2),f=k[0],p=k[1],y=new d(0,0),b=f;b<=p;b++){for(var j=a;j<=l;j++)y.set(j,b).modulo(e),i+=t[y.x][y.y];i+="\n"}n.clipboardData.setData("text/plain",i),n.preventDefault()}),[]);Object(i.useEffect)((function(){return document.addEventListener("keydown",l),document.addEventListener("copy",f),document.addEventListener("paste",k),document.addEventListener("keyup",h),function(){document.removeEventListener("keydown",l),document.addEventListener("copy",f),document.addEventListener("paste",k),document.addEventListener("keyup",h)}}),[]);var y=Object(i.useCallback)((function(t,e){return function(){u.has("Shift")&&1===u.size?c.set(t-s.x,e-s.y):(s.set(t,e),c.set(0,0)),n()}}),[]);return{code:t,selection:s,selectionDelta:c,onClick:y}}(c.code,c.limits,s);return{code:o.code,selection:o.selection,selectionDelta:o.selectionDelta,onClick:o.onClick,befunge:c}}var w=n(5),R=n(26),S=n(66),E=n(1);function D(t){var e=t.label,n=t.onClick,i=Object(R.a)(t,["label","onClick"]);return Object(E.jsx)(S.a,Object(w.a)(Object(w.a)({variant:"contained",size:"small",disableElevation:!0,onClick:n},i),{},{children:e}))}var L,T,U=n(8),I=n.n(U),A={DARK:I()("#283134"),LIGHT:I()("#f7f9f9"),GREY:I()("#CCCCCC"),WRITING_CURSOR:I()("#CCEAFF"),EXECUTING_CURSOR:I()("#FFE0CC"),ACCENT:I()("#09b2eb")},G=a.a.div(L||(L=Object(u.a)(["\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n"]))),M=A.LIGHT.toString(),N=A.GREY.toString(),W=A.WRITING_CURSOR.toString(),z=A.EXECUTING_CURSOR.toString();function B(t){var e=t.val,n=t.selected,i=t.cursored,s=t.onClick,c=n||i?n&&i?N:n?W:z:M;return Object(E.jsx)(_,{color:c,onClick:s,children:e})}var H,X,_=a.a.div(T||(T=Object(u.a)(["\n  width: 16px;\n  height: 16px;\n  background-color: ",";\n  border-right: 1px solid #bbbbbb;\n  border-bottom: 1px solid #bbbbbb;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  -webkit-touch-callout: none;\n  -webkit-user-select: none;\n  -khtml-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n"])),(function(t){return t.color}));function F(t){var e=t.code,n=t.selection,s=t.selectionDelta,c=t.onClick,o=t.limits,u=t.cursor,a=Object(i.useCallback)(Y(n.x,s.x,o.x),[n.x,s.x]),r=Object(i.useCallback)(Y(n.y,s.y,o.y),[n.y,s.y]);return Object(E.jsx)("div",{style:{overflow:"hidden"},children:Object(E.jsx)("div",{style:{marginRight:-1,marginBottom:-1},children:k(0,o.y).map((function(t){return Object(E.jsx)(G,{children:k(0,o.x).map((function(n){return Object(E.jsx)(B,{val:e[n][t],selected:a(n)&&r(t),cursored:n===u.x&&t===u.y,onClick:c(n,t)},"".concat(n,",").concat(t))}))},t)}))})})}function Y(t,e,n){if(0===e)return function(e){return e===t};var i,s=t+e,c=((t+e)%(i=n)+i)%i;return e<0?c===s?function(n){return t+e<=n&&n<=t}:function(e){return e<=t||e>=c}:c===s?function(n){return t<=n&&n<=t+e}:function(e){return e<=c||e>=t}}function q(t){var e=t.stack,n=t.style;return Object(E.jsx)("div",{style:Object(w.a)({width:120,alignSelf:"stretch",backgroundColor:A.LIGHT.toString(),padding:8,overflow:"scroll",scrollbarWidth:"none"},n),children:e.slice().reverse().map((function(t,e){return Object(E.jsx)("div",{children:t},e)}))})}function J(t){var e=t.output,n=t.style;return Object(E.jsx)("div",{style:Object(w.a)({flexBasis:0,flexGrow:1,flexShrink:1,minWidth:0,alignSelf:"stretch",backgroundColor:A.LIGHT.toString(),padding:8,overflow:"scroll",scrollbarWidth:"none"},n),children:e})}function K(){var t=O(48,32),e=t.code,n=t.selection,i=t.selectionDelta,s=t.onClick,c=t.befunge;return Object(E.jsxs)(V,{children:[Object(E.jsx)(F,{code:e,selection:n,selectionDelta:i,onClick:s,limits:c.limits,cursor:c.cursor}),Object(E.jsxs)(G,{style:{marginTop:16,width:816,height:200},children:[Object(E.jsx)(q,{stack:c.stack}),Object(E.jsxs)(P,{style:{marginLeft:16},children:[Object(E.jsx)(D,{label:"Step",onClick:c.step}),Object(E.jsx)(D,{label:"Walk",onClick:c.walk,style:{marginTop:8}}),Object(E.jsx)(D,{label:"Run",onClick:c.run,style:{marginTop:8}}),Object(E.jsx)(D,{label:"Pause",onClick:c.pause,style:{marginTop:8}}),Object(E.jsx)(D,{label:"Reset",onClick:c.reset,style:{marginTop:8}})]}),Object(E.jsx)(J,{output:c.output,style:{marginLeft:16}})]})]})}var V=a.a.div(H||(H=Object(u.a)(["\n  align-items: center;\n  display: flex;\n  flex-direction: column;\n"]))),P=a.a.div(X||(X=Object(u.a)(["\n  align-self: stretch;\n  justify-content: space-between;\n  display: flex;\n  flex-direction: column;\n"])));var $=function(){return Object(E.jsx)("div",{style:{backgroundColor:A.DARK.toString(),display:"flex",minHeight:"100vh",padding:24,justifyContent:"center",alignItems:"center"},children:Object(E.jsx)(K,{})})};o.a.render(Object(E.jsx)(s.a.StrictMode,{children:Object(E.jsx)($,{})}),document.getElementById("root"))}},[[51,1,2]]]);
//# sourceMappingURL=main.78246182.chunk.js.map