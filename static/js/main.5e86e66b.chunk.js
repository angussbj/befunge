(this.webpackJsonpbefunge=this.webpackJsonpbefunge||[]).push([[0],{113:function(e,t,i){},115:function(e,t,i){"use strict";i.r(t);var n=i(0),s=i.n(n),o=i(10),c=i.n(o),r=(i(89),i(26)),a=i(12),l=i(13),h=i(20),u=i(21),d=i(27),j=i(44),p=i.n(j),v=function(){function e(t,i){Object(h.a)(this,e),this.x=t,this.y=i}return Object(u.a)(e,[{key:"set",value:function(e,t){return this.x=e,this.y=t,this}},{key:"setToCopy",value:function(e){return this.x=e.x,this.y=e.y,this}},{key:"setX",value:function(e){return this.x=e,this}},{key:"setY",value:function(e){return this.y=e,this}},{key:"add",value:function(e){return this.x+=e.x,this.y+=e.y,this}},{key:"negative",value:function(){return this.x=-this.x,this.y=-this.y,this}},{key:"modulo",value:function(e){return this.x=(this.x%e.x+e.x)%e.x,this.y=(this.y%e.y+e.y)%e.y,this}},{key:"clone",value:function(){return new e(this.x,this.y)}},{key:"toString",value:function(){return"(".concat(this.x,", ").concat(this.y,")")}}]),e}();function b(e,t){var i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1;return t>0?Array(t).fill(e).map((function(e,t){return e+i*t})):[]}var y=i(76);function f(e){var t=Object(y.a)(e);return t.sort((function(e,t){return e-t})),t}var k,m,x=i(18),g=function(){function e(t,i){Object(h.a)(this,e),this.width=t,this.height=i,this.code=void 0,this.resetPointWithEdits=void 0,this.resetPointWithoutEdits=void 0,this.code=function(e,t,i){return Array(e).fill(!1).map((function(){return Array(t).fill(i)}))}(t,i," ")}return Object(u.a)(e,[{key:"clone",value:function(){var t=new e(this.width,this.height);return t.setToCopy(this),t}},{key:"setToCopy",value:function(e){this.code=Object(x.cloneDeep)(e.code),this.resetPointWithEdits=Object(x.cloneDeep)(e.resetPointWithEdits),this.resetPointWithoutEdits=Object(x.cloneDeep)(e.resetPointWithoutEdits)}},{key:"get",value:function(e,t){return this.code[e][t]}},{key:"userPut",value:function(e,t,i){this.code[e][t]=i,this.resetPointWithEdits&&(this.resetPointWithEdits[e][t]=i)}},{key:"executionPut",value:function(e,t,i){this.code[e][t]=i}},{key:"makeResetable",value:function(){this.isResetable()||(this.resetPointWithEdits=Object(x.cloneDeep)(this.code),this.resetPointWithoutEdits=Object(x.cloneDeep)(this.code))}},{key:"reset",value:function(e){var t=e?this.resetPointWithEdits:this.resetPointWithoutEdits;t&&(this.code=t),this.resetPointWithEdits=void 0,this.resetPointWithoutEdits=void 0}},{key:"resetRequiresClarification",value:function(){return!Object(x.isEqual)(this.resetPointWithEdits,this.resetPointWithoutEdits)}},{key:"isResetable",value:function(){return!!this.resetPointWithEdits}}]),e}();!function(e){e[e.Left=0]="Left",e[e.Right=1]="Right",e[e.Up=2]="Up",e[e.Down=3]="Down"}(m||(m={}));var O=(k={},Object(d.a)(k,m.Left,new v(-1,0)),Object(d.a)(k,m.Right,new v(1,0)),Object(d.a)(k,m.Up,new v(0,-1)),Object(d.a)(k,m.Down,new v(0,1)),k),w=function(){function e(t,i,n){Object(h.a)(this,e),this.render=n,this.cursor=new v(0,0),this.direction=m.Right,this.stack=[],this.output="",this.stringMode=!1,this.halted=!1,this.limits=void 0,this.code=void 0,this.walking=!1,this.running=!1,this.requestingInput=!1,this.history=[],this.future=[],this.limits=new v(t,i),this.code=new g(t,i),p()(this)}return Object(u.a)(e,[{key:"setHistoryPoint",value:function(){this.history.push(this.createHistoryPoint()),this.future=[]}},{key:"undo",value:function(){this.future.push(this.createHistoryPoint());var e=this.history.pop();this.revertToPoint(e)}},{key:"redo",value:function(){this.history.push(this.createHistoryPoint());var e=this.future.pop();this.revertToPoint(e)}},{key:"createHistoryPoint",value:function(){return{cursor:this.cursor.clone(),direction:this.direction,stack:Object(x.cloneDeep)(this.stack),output:this.output,stringMode:this.stringMode,halted:this.halted,code:this.code.clone(),walking:this.walking,running:this.running}}},{key:"revertToPoint",value:function(e){e&&(this.cursor.setToCopy(e.cursor),this.direction=e.direction,this.stack=Object(x.cloneDeep)(e.stack),this.output=e.output,this.stringMode=e.stringMode,this.halted=e.halted,this.code.setToCopy(e.code),this.walking=e.walking,this.running=e.running)}},{key:"moveCursor",value:function(){this.cursor.add(O[this.direction]),this.cursor.modulo(this.limits)}},{key:"acceptInput",value:function(e){0!==e.length&&("number"===this.requestingInput?this.stack.push(parseInt(e,10)):"character"===this.requestingInput&&this.stack.push(e.charCodeAt(0)),this.requestingInput=!1,this.render())}},{key:"walk",value:function(){this.code.makeResetable(),this.walking=!0,this.running=!1,function e(t){return function(){t.walking&&!t.requestingInput&&(t.slowStep(),setTimeout(e(t),1))}}(this)()}},{key:"run",value:function(){this.code.makeResetable(),this.walking=!1,this.running=!0,function e(t){return function(){for(var i=0;i<100;i++)t.running&&!t.requestingInput&&t.quickStep();t.running&&!t.requestingInput?setTimeout(e(t),1):t.render()}}(this)()}},{key:"pause",value:function(){this.walking=!1,this.running=!1}},{key:"reset",value:function(){this.cursor=new v(0,0),this.direction=m.Right,this.stack=[],this.output="",this.halted=!1,this.stringMode=!1,this.walking=!1,this.code.reset(!0),this.render()}},{key:"step",value:function(){this.halted||this.requestingInput||(this.code.makeResetable(),this.slowStep())}},{key:"quickStep",value:function(){this.execute(this.code.get(this.cursor.x,this.cursor.y)),this.moveCursor()}},{key:"slowStep",value:function(){this.execute(this.code.get(this.cursor.x,this.cursor.y)),this.moveCursor(),this.render()}},{key:"execute",value:function(e){this.stringMode&&this.stack.push(e.charCodeAt(0)),this.isValidCommand(e)?this[e]():this.throwUnrecognisedCommand(e,this.cursor)}},{key:"isValidCommand",value:function(e){return e in this}},{key:"throwUnrecognisedCommand",value:function(e,t){this.output+='\nError: Unrecognised command "'.concat(e,'" at ').concat(t.toString()),this.halt()}},{key:"halt",value:function(){this.halted=!0,this.walking=!1,this.running=!1}},{key:"0",value:function(){this.stack.push(0)}},{key:"1",value:function(){this.stack.push(1)}},{key:"2",value:function(){this.stack.push(2)}},{key:"3",value:function(){this.stack.push(3)}},{key:"4",value:function(){this.stack.push(4)}},{key:"5",value:function(){this.stack.push(5)}},{key:"6",value:function(){this.stack.push(6)}},{key:"7",value:function(){this.stack.push(7)}},{key:"8",value:function(){this.stack.push(8)}},{key:"9",value:function(){this.stack.push(9)}},{key:"+",value:function(){var e,t;this.stack.push((null!==(e=this.stack.pop())&&void 0!==e?e:0)+(null!==(t=this.stack.pop())&&void 0!==t?t:0))}},{key:"-",value:function(){var e,t;this.stack.push(-(null!==(e=this.stack.pop())&&void 0!==e?e:0)+(null!==(t=this.stack.pop())&&void 0!==t?t:0))}},{key:"/",value:function(){var e;this.stack.push(Math.floor(1/(null!==(e=this.stack.pop())&&void 0!==e?e:1)*(this.stack.pop()||1)))}},{key:"*",value:function(){var e,t;this.stack.push((null!==(e=this.stack.pop())&&void 0!==e?e:1)*(null!==(t=this.stack.pop())&&void 0!==t?t:1))}},{key:"%",value:function(){var e,t,i=null!==(e=this.stack.pop())&&void 0!==e?e:1,n=null!==(t=this.stack.pop())&&void 0!==t?t:1;this.stack.push(n%i)}},{key:"!",value:function(){this.stack.push(Number(!this.stack.pop()))}},{key:"`",value:function(){var e,t,i=null!==(e=this.stack.pop())&&void 0!==e?e:0,n=null!==(t=this.stack.pop())&&void 0!==t?t:0;this.stack.push(Number(i<n))}},{key:">",value:function(){this.direction=m.Right}},{key:"<",value:function(){this.direction=m.Left}},{key:"^",value:function(){this.direction=m.Up}},{key:"v",value:function(){this.direction=m.Down}},{key:"?",value:function(){this.direction=Math.floor(4*Math.random())}},{key:"_",value:function(){this.direction=this.stack.pop()?m.Left:m.Right}},{key:"|",value:function(){this.direction=this.stack.pop()?m.Up:m.Down}},{key:'"',value:function(){this.stringMode=!this.stringMode}},{key:":",value:function(){this.stack.push(this.stack[this.stack.length-1])}},{key:"\\",value:function(){var e=this.stack.pop(),t=this.stack.pop();void 0!==e&&this.stack.push(e),void 0!==t&&this.stack.push(t)}},{key:"$",value:function(){this.stack.pop()}},{key:"#",value:function(){this.moveCursor()}},{key:"g",value:function(){var e,t;this.stack.push(this.code.get(null!==(e=this.stack.pop())&&void 0!==e?e:0,null!==(t=this.stack.pop())&&void 0!==t?t:0).charCodeAt(0))}},{key:"p",value:function(){var e,t,i;this.code.executionPut(null!==(e=this.stack.pop())&&void 0!==e?e:0,null!==(t=this.stack.pop())&&void 0!==t?t:0,String.fromCharCode(null!==(i=this.stack.pop())&&void 0!==i?i:32))}},{key:".",value:function(){var e;this.output+=(null!==(e=this.stack.pop())&&void 0!==e?e:0).toString(10)}},{key:",",value:function(){var e=this.stack.pop();void 0!==e&&(this.output+=String.fromCharCode(e))}},{key:"&",value:function(){this.requestingInput="number"}},{key:"~",value:function(){this.requestingInput="character"}},{key:"@",value:function(){this.halt()}},{key:" ",value:function(){}}]),e}(),C={Left:new v(-1,0),Right:new v(1,0),Up:new v(0,-1),Down:new v(0,1)},S=function(){function e(t,i){Object(h.a)(this,e),this.executor=t,this.render=i,this.selection=new v(0,0),this.selectionDelta=new v(0,0),this.direction=C.Right.clone(),this.deleteMode="delete",this.history=[],this.future=[],this.code=void 0,this.limits=void 0,this.code=t.code,this.limits=t.limits,p()(this)}return Object(u.a)(e,[{key:"setHistoryPoint",value:function(){this.history.push(this.createHistoryPoint()),this.future=[],this.executor.setHistoryPoint()}},{key:"undo",value:function(){this.future.push(this.createHistoryPoint()),this.revertToPoint(this.history.pop()),this.executor.undo(),this.render()}},{key:"redo",value:function(){this.history.push(this.createHistoryPoint()),this.revertToPoint(this.future.pop()),this.executor.redo(),this.render()}},{key:"createHistoryPoint",value:function(){return{selection:this.selection.clone(),selectionDelta:this.selectionDelta.clone(),direction:this.direction.clone(),deleteMode:this.deleteMode}}},{key:"revertToPoint",value:function(e){e&&(this.selection=e.selection,this.selectionDelta=e.selectionDelta,this.direction=e.direction,this.deleteMode=e.deleteMode)}},{key:"onMouseDown",value:function(e,t){var i=this;return function(n){n.shiftKey?i.selectionDelta.set(e-i.selection.x,t-i.selection.y):(i.selection.set(e,t),i.selectionDelta.set(0,0),i.deleteMode="delete",i.direction.setToCopy(C.Right)),i.render()}}},{key:"onMouseOver",value:function(e,t){var i=this;return function(n){n.buttons%2===1&&(i.selectionDelta.set(e-i.selection.x,t-i.selection.y),i.render())}}},{key:"onKeyDown",value:function(e){this.executor.requestingInput||(e.ctrlKey||e.metaKey?this.handleKeyboardShortcuts(e):1!==e.key.length||e.ctrlKey||e.metaKey?!e.key.match(/^Arrow/)||e.ctrlKey||e.metaKey?"Backspace"===e.key&&this.handleDeletion():this.handleSelectionMovement(e):this.handleEnteredCharacter(e),this.render())}},{key:"onCut",value:function(e){this.setHistoryPoint(),this.onCopy(e),this.clearSelection(),this.render()}},{key:"onCopy",value:function(e){var t,i=this;this.setHistoryPoint();var n="";this.selectionForEach({cellAction:function(e,t){n+=i.code.get(e,t)},rowEndAction:function(){n+="\n"}}),null===(t=e.clipboardData)||void 0===t||t.setData("text/plain",n),e.preventDefault()}},{key:"onPaste",value:function(e){var t,i=this;this.setHistoryPoint();var n=null===(t=e.clipboardData)||void 0===t?void 0:t.getData("Text"),s=new v(this.selection.x,this.selection.y);null===n||void 0===n||n.split("").forEach((function(e){"\n"===e?s.set(i.selection.x,s.y+1).modulo(i.limits):(i.code.userPut(s.x,s.y,e),s.setX(s.x+1).modulo(i.limits))})),this.render()}},{key:"handleKeyboardShortcuts",value:function(e){if("a"===e.key)this.selection.set(0,0),this.selectionDelta.setToCopy(this.limits).add(new v(-1,-1));else if("z"!==e.key||e.shiftKey){if(!("z"===e.key&&e.shiftKey||"y"===e.key))return;this.redo()}else this.undo();e.preventDefault()}},{key:"handleEnteredCharacter",value:function(e){this.setHistoryPoint(),this.fillSelection(e.key),this.stepSelection(this.direction),this.deleteMode="backspace",e.preventDefault()}},{key:"handleSelectionMovement",value:function(e){e.shiftKey?this.selectionDelta.add(C[e.key.slice(5)]):(this.direction.setToCopy(C[e.key.slice(5)]),this.stepSelection(this.direction),this.selectionDelta.set(0,0),e.preventDefault()),this.deleteMode="delete"}},{key:"handleDeletion",value:function(){this.setHistoryPoint(),"backspace"===this.deleteMode?(this.stepSelection(this.direction.clone().negative()),this.code.userPut(this.selection.x,this.selection.y," ")):"delete"===this.deleteMode&&this.clearSelection()}},{key:"stepSelection",value:function(e){this.selection.add(e).modulo(this.limits)}},{key:"clearSelection",value:function(){this.fillSelection(" ")}},{key:"fillSelection",value:function(e){var t=this;this.selectionForEach({cellAction:function(i,n){t.code.userPut(i,n,e)}})}},{key:"selectionForEach",value:function(e){for(var t=e.cellAction,i=e.rowEndAction,n=f([this.selection.x,this.selection.x+this.selectionDelta.x]),s=Object(r.a)(n,2),o=s[0],c=s[1],a=f([this.selection.y,this.selection.y+this.selectionDelta.y]),l=Object(r.a)(a,2),h=l[0],u=l[1],d=new v(0,0),j=h;j<=u;j++){for(var p=o;p<=c;p++)d.set(p,j).modulo(this.limits),t(d.x,d.y);null===i||void 0===i||i()}}}]),e}();var I=i(37),P=i(77),E=i(143),D=i(1);function T(e){var t=e.label,i=e.onClick,n=Object(P.a)(e,["label","onClick"]);return Object(D.jsx)(E.a,Object(I.a)(Object(I.a)({variant:"contained",size:"small",disableElevation:!0,onClick:i},n),{},{children:t}))}var R,M,H=i(28),L=i.n(H),A={DARK:L()("#283134"),LIGHT:L()("#f7f9f9"),GREY:L()("#CCCCCC"),WRITING_CURSOR:L()("#CCEAFF"),EXECUTING_CURSOR:L()("#FFE0CC"),ACCENT:L()("#5ed6ff")},G=l.a.div(R||(R=Object(a.a)(["\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n"]))),W=A.LIGHT.toString(),q=A.GREY.toString(),K=A.WRITING_CURSOR.toString(),U=A.EXECUTING_CURSOR.toString();function N(e){var t=e.val,i=e.selected,n=e.cursored,s=e.onMouseDown,o=e.onMouseOver,c=i||n?i&&n?q:i?K:U:W;return Object(D.jsx)(B,{color:c,onMouseDown:s,onMouseOver:o,children:t})}var B=l.a.div(M||(M=Object(a.a)(["\n  width: 14px;\n  height: 14px;\n  font-size: 12px;\n  font-family: monospace;\n  background-color: ",";\n  border-right: 1px solid #bbbbbb;\n  border-bottom: 1px solid #bbbbbb;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  -webkit-touch-callout: none;\n  -webkit-user-select: none;\n  -khtml-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n"])),(function(e){return e.color}));function z(e){var t=e.code,i=e.cursor,s=e.editor,o=Object(n.useCallback)(F(s.selection.x,s.selectionDelta.x,s.limits.x),[s.selection.x,s.selectionDelta.x,s.limits.x]),c=Object(n.useCallback)(F(s.selection.y,s.selectionDelta.y,s.limits.y),[s.selection.y,s.selectionDelta.y,s.limits.y]);return Object(D.jsx)("div",{style:{overflow:"hidden"},children:Object(D.jsx)("div",{style:{marginRight:-1,marginBottom:-1},children:b(0,s.limits.y).map((function(e){return Object(D.jsx)(G,{children:b(0,s.limits.x).map((function(n){return Object(D.jsx)(N,{val:t[n][e],selected:o(n)&&c(e),cursored:n===i.x&&e===i.y,onMouseDown:s.onMouseDown(n,e),onMouseOver:s.onMouseOver(n,e)},"".concat(n,",").concat(e))}))},e)}))})})}function F(e,t,i){if(0===t)return function(t){return t===e};var n,s=e+t,o=((e+t)%(n=i)+n)%n;return t<0?o===s?function(i){return e+t<=i&&i<=e}:function(t){return t<=e||t>=o}:o===s?function(i){return e<=i&&i<=e+t}:function(t){return t<=o||t>=e}}function _(e){var t=e.stack,i=e.style;return Object(D.jsx)("div",{style:Object(I.a)({width:120,flex:1,backgroundColor:A.LIGHT.toString(),padding:8,overflow:"scroll",scrollbarWidth:"none"},i),children:t.slice().reverse().map((function(e,t){return Object(D.jsx)("div",{children:e},t)}))})}var X,Y,J=i(148);function V(e){var t=e.submitInput,i=Object(n.useState)(""),s=Object(r.a)(i,2),o=s[0],c=s[1];return Object(D.jsxs)(D.Fragment,{children:[Object(D.jsx)(J.a,{value:o,onChange:function(e){c(e.target.value)},style:{marginLeft:8,width:80,height:12},size:"small"}),Object(D.jsx)(T,{label:"Submit",onClick:function(){t(o),c("")},style:{marginLeft:8},color:"secondary",disableElevation:!1})]})}function $(e){var t=e.output,i=e.requestingInput,n=e.submitInput;e.style;return Object(D.jsxs)(D.Fragment,{children:[Object(D.jsx)(ie,{children:t}),Object(D.jsx)(ne,{children:Object(D.jsx)("div",{children:"character"===i?Object(D.jsxs)("div",{style:{color:"#000033",fontWeight:600},children:["Please enter a character: ",Object(D.jsx)(V,{submitInput:n})]}):"number"===i?Object(D.jsxs)("div",{style:{color:"#000033",fontWeight:600},children:["Please enter a number: ",Object(D.jsx)(V,{submitInput:n})]}):Object(D.jsx)("div",{style:{color:A.DARK.fade(.3).toString()},children:"No input needed"})})})]})}var Q,Z,ee,te,ie=l.a.div(X||(X=Object(a.a)(["\n  flex: 1 1 0px;\n  background-color: ",";\n  overflow: scroll;\n  scrollbar-width: none;\n  padding: 8;\n"])),A.LIGHT.toString()),ne=l.a.div(Y||(Y=Object(a.a)(["\n  background-color: ",";\n  border-top: 1px solid ",";\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  justify-content: center;\n  height: 48px;\n"])),A.LIGHT.toString(),A.GREY.toString());function se(){var e=function(e,t){var i=Object(n.useState)(0)[1],s=Object(n.useCallback)((function(){i(Math.random())}),[]),o=Object(n.useRef)(new w(e,t,s)).current,c=Object(n.useRef)(new S(o,s)).current;return Object(n.useEffect)((function(){return document.addEventListener("keydown",c.onKeyDown),document.addEventListener("cut",c.onCut),document.addEventListener("copy",c.onCopy),document.addEventListener("paste",c.onPaste),c.onPaste({clipboardData:{getData:function(){return"v>v>v>v>v>v>v               \n5 5 5 4 5 5 9               \n6 7-7-2 7 7+8               \n+ +7+22 + +1*               \n3*9*9*2*9*9*>,,,,,,,,,,,,,,@\n*:*:*:*4*9*:                \n * +3+*+3+ *                \n 5 6+6*6+7 5                \n 2 5 5 5 5 2                \n>^>^>^>^>^>^                \n                            \n                            \n                            \n!dlrow ,olleH               \n"}}}),function(){document.removeEventListener("keydown",c.onKeyDown),document.removeEventListener("cut",c.onCut),document.removeEventListener("copy",c.onCopy),document.removeEventListener("paste",c.onPaste)}}),[]),{editor:c,befunge:o}}(80,25),t=e.editor,i=e.befunge;return Object(D.jsxs)(ae,{children:[Object(D.jsxs)("div",{children:[Object(D.jsx)(ue,{children:"Code editor"}),Object(D.jsx)(z,{code:i.code.code,cursor:i.cursor,editor:t})]}),Object(D.jsxs)(G,{style:{marginTop:16,width:1200,height:220},children:[Object(D.jsxs)(le,{children:[Object(D.jsx)(ue,{children:"Stack"}),Object(D.jsx)(_,{stack:i.stack})]}),Object(D.jsxs)(le,{style:{marginLeft:16},children:[Object(D.jsx)(ue,{children:"Controls"}),Object(D.jsxs)(he,{style:{flex:1},children:[Object(D.jsx)(T,{label:"Step",onClick:i.step}),Object(D.jsx)(T,{label:"Walk",onClick:i.walk,style:{marginTop:8}}),Object(D.jsx)(T,{label:"Run",onClick:i.run,style:{marginTop:8}}),Object(D.jsx)(T,{label:"Pause",onClick:i.pause,style:{marginTop:8}}),Object(D.jsx)(T,{label:"Reset",onClick:i.reset,style:{marginTop:8}})]})]}),Object(D.jsxs)(le,{style:{marginLeft:16,flexGrow:1},children:[Object(D.jsx)(ue,{children:"Input + output"}),Object(D.jsx)($,{output:i.output,requestingInput:i.requestingInput,submitInput:i.acceptInput})]})]})]})}var oe,ce,re,ae=l.a.div(Q||(Q=Object(a.a)(["\n  align-items: center;\n  display: flex;\n  flex-direction: column;\n"]))),le=l.a.div(Z||(Z=Object(a.a)(["\n  align-self: stretch;\n  display: flex;\n  flex-direction: column;\n"]))),he=l.a.div(ee||(ee=Object(a.a)(["\n  align-self: stretch;\n  justify-content: space-between;\n  display: flex;\n  flex-direction: column;\n"]))),ue=l.a.div(te||(te=Object(a.a)(["\n  margin-bottom: 6px;\n  font-size: 11px;\n  color: ",";\n"])),A.LIGHT.fade(.2).toString()),de=i(72),je=l.a.div(oe||(oe=Object(a.a)(["\n  width: 14px;\n  height: 14px;\n  font-size: 12px;\n  font-family: monospace;\n  background-color: ",";\n  color: #000000;\n  border: 1px solid #bbbbbb;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n"])),A.LIGHT.toString()),pe=l.a.text(ce||(ce=Object(a.a)(["\n  font-family: monospace;\n"]))),ve=l.a.text(re||(re=Object(a.a)([""]))),be=[{key:"0",command:Object(D.jsxs)("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",marginBottom:8},children:[Object(D.jsx)(je,{children:"0"}),"\u22ee",Object(D.jsx)(je,{children:"9"})]}),description:Object(D.jsx)("div",{style:{marginTop:8},children:"Push the corresponding number onto the stack"}),customCommandStyle:!0},{key:"+",command:"+",description:Object(D.jsxs)("div",{children:[Object(D.jsx)(ve,{children:"Addition:"})," pop two values ",Object(D.jsx)(pe,{children:"a"})," then ",Object(D.jsx)(pe,{children:"b"}),", then push the result of ",Object(D.jsx)(pe,{children:"a + b"})]})},{key:"-",command:"-",description:Object(D.jsxs)("div",{children:[Object(D.jsx)(ve,{children:"Subtraction:"})," pop two values ",Object(D.jsx)(pe,{children:"a"})," then ",Object(D.jsx)(pe,{children:"b"}),", then push the result of ",Object(D.jsx)(pe,{children:"b - a"})]})},{key:"*",command:"*",description:Object(D.jsxs)("div",{children:[Object(D.jsx)(ve,{children:"Multiplication:"})," pop two values ",Object(D.jsx)(pe,{children:"a"})," then ",Object(D.jsx)(pe,{children:"b"}),", then push the result of ",Object(D.jsx)(pe,{children:"a * b"})]})},{key:"/",command:"/",description:Object(D.jsxs)("div",{children:[Object(D.jsx)(ve,{children:"Integer division:"})," pop two values ",Object(D.jsx)(pe,{children:"a"})," then ",Object(D.jsx)(pe,{children:"b"}),", then push the result of ",Object(D.jsx)(pe,{children:"b / a"}),", rounded down."]})},{key:"%",command:"%",description:Object(D.jsxs)("div",{children:[Object(D.jsx)(ve,{children:"Modulo:"})," pop two values ",Object(D.jsx)(pe,{children:"a"})," then ",Object(D.jsx)(pe,{children:"b"}),", then push the remainder of the integer division of ",Object(D.jsx)(pe,{children:"b / a"}),"."]})},{key:"!",command:"!",description:Object(D.jsxs)("div",{children:[Object(D.jsx)(ve,{children:"Not:"})," pop a value. If the value is ",Object(D.jsx)(pe,{children:"0"}),", push ",Object(D.jsx)(pe,{children:"1"}),"; otherwise, push ",Object(D.jsx)(pe,{children:"0"}),"."]})},{key:"`",command:"`",description:Object(D.jsxs)("div",{children:[Object(D.jsx)(ve,{children:"Comparison:"})," pop two values ",Object(D.jsx)(pe,{children:"a"})," then ",Object(D.jsx)(pe,{children:"b"}),", then push"," ",Object(D.jsx)(pe,{children:"1"})," if ",Object(D.jsxs)(pe,{children:["b ",">"," a"]}),", otherwise ",Object(D.jsx)(pe,{children:"0"}),"."]})},{key:">",command:">",description:Object(D.jsx)("div",{children:"Start moving right"})},{key:"<",command:"<",description:Object(D.jsx)("div",{children:"Start moving left"})},{key:"^",command:"^",description:Object(D.jsx)("div",{children:"Start moving up"})},{key:"v",command:"v",description:Object(D.jsx)("div",{children:"Start moving down"})},{key:"?",command:"?",description:Object(D.jsx)("div",{children:"Start moving in a random cardinal direction"})},{key:"_",command:"_",description:Object(D.jsxs)("div",{children:[Object(D.jsx)(ve,{children:"Horizontal if:"})," pop a value; set direction to right if value is"," ",Object(D.jsx)(pe,{children:"0"}),", set to left otherwise"]})},{key:"|",command:"|",description:Object(D.jsxs)("div",{children:[Object(D.jsx)(ve,{children:"Vertical if:"})," pop a value; set direction to down if value is"," ",Object(D.jsx)(pe,{children:"0"}),", set to up otherwise"]})},{key:'"',command:'"',description:Object(D.jsxs)("div",{children:[Object(D.jsx)(ve,{children:"Toggle string-mode:"})," push each character's ASCII value all the way up to the next ",Object(D.jsx)(pe,{children:'"'})]})},{key:":",command:":",description:Object(D.jsx)("div",{children:"Duplicate top stack value"})},{key:"\\",command:"\\",description:Object(D.jsx)("div",{children:"Swap top stack values"})},{key:"$",command:"$",description:Object(D.jsx)("div",{children:"Pop (remove) top stack value and discard"})},{key:".",command:".",description:Object(D.jsxs)("div",{children:[Object(D.jsx)(ve,{children:"Integer output:"})," pop top of stack and output it as an integer"]})},{key:",",command:",",description:Object(D.jsxs)("div",{children:[Object(D.jsx)(ve,{children:"Character output:"})," pop top of stack and output its ASCII character"]})},{key:"&",command:"&",description:Object(D.jsxs)("div",{children:[Object(D.jsx)(ve,{children:"Integer input:"})," request an integer from the user and push it to the stack"]})},{key:"~",command:"~",description:Object(D.jsxs)("div",{children:[Object(D.jsx)(ve,{children:"Character input:"})," request a character from the user and push it to the stack"]})},{key:"#",command:"#",description:Object(D.jsxs)("div",{children:[Object(D.jsx)(ve,{children:"Bridge:"})," jump over next command in the current direction of movement"]})},{key:"g",command:"g",description:Object(D.jsxs)("div",{children:[Object(D.jsx)(ve,{children:"Get:"})," a way to retrieve data in storage. Pop two values ",Object(D.jsx)(pe,{children:"y"})," ","then ",Object(D.jsx)(pe,{children:"x"}),", then push the ASCII value of the character at that position in the program."]})},{key:"p",command:"p",description:Object(D.jsxs)("div",{children:[Object(D.jsx)(ve,{children:"Put:"})," a way to store a value for later use. Pop three values"," ",Object(D.jsx)(pe,{children:"y"}),", then ",Object(D.jsx)(pe,{children:"x"}),", then ",Object(D.jsx)(pe,{children:"v"}),", then change the character at the position ",Object(D.jsx)(pe,{children:"(x, y)"})," in the program to the character with ASCII value"," ",Object(D.jsx)(pe,{children:"v"})]})},{key:"@",command:"@",description:Object(D.jsx)("div",{children:"End program"})},{key:" ",command:" ",description:Object(D.jsxs)("div",{children:[Object(D.jsx)(ve,{children:"No-op:"})," does nothing. There is a space character in this location, which has ASCII value 32"]})},{key:"execution cursor",command:Object(D.jsx)(je,{style:{backgroundColor:A.EXECUTING_CURSOR.blacken(1).saturate(1).toString()}}),description:Object(D.jsxs)("div",{children:[Object(D.jsx)(ve,{children:"Execution cursor:"})," the orange highlight marks the next command to be executed"]}),customCommandStyle:!0},{key:"typing cursor",command:Object(D.jsx)(je,{style:{backgroundColor:A.WRITING_CURSOR.blacken(1).saturate(1).toString()}}),description:Object(D.jsxs)("div",{children:[Object(D.jsx)(ve,{children:"Code input cursor:"})," the blue highlight marks the square(s) you edit when you type"]}),customCommandStyle:!0},{key:"both cursors",command:Object(D.jsx)(je,{style:{backgroundColor:A.GREY.blacken(1).saturate(1).toString()}}),description:Object(D.jsxs)("div",{children:[Object(D.jsx)(ve,{children:"Both cursors:"})," the execution and code input cursors are on top of each other"]}),customCommandStyle:!0}],ye=i(74),fe=i.n(ye),ke=i(147);i(113);function me(e){var t=e.onClose;return Object(D.jsxs)("div",{style:{padding:24,color:A.LIGHT.toString(),width:240},children:[Object(D.jsx)(ke.a,{"aria-label":"delete",style:{position:"absolute",top:8,right:8,color:A.ACCENT.toString()},onClick:t,children:Object(D.jsx)(fe.a,{fontSize:"small"})}),Object(D.jsx)("div",{style:{marginBottom:12},children:"Instructions"}),Object(D.jsxs)("div",{style:{fontSize:12,color:A.LIGHT.fade(.2).toString()},children:[Object(D.jsx)("p",{children:"Try typing some commands into the text editor, then press step, walk, or run to execute them."}),Object(D.jsx)("p",{children:"Pressing arrow keys changes the direction for typing."})]}),Object(D.jsx)("div",{style:{marginTop:24,marginBottom:16},children:"Befunge commands"}),be.map((function(e){var t=e.command,i=e.description,n=e.customCommandStyle,s=e.key;return Object(D.jsxs)(G,{style:{marginTop:6,fontSize:12,color:A.LIGHT.fade(.2).toString(),alignItems:"flex-start"},children:[n?t:Object(D.jsx)(je,{style:{marginTop:0},children:t}),Object(D.jsx)("div",{style:{marginLeft:12,flex:1},children:i})]},s)})),Object(D.jsx)("div",{style:{marginTop:24,marginBottom:12},children:"About Befunge"}),Object(D.jsxs)("div",{style:{fontSize:12,color:A.LIGHT.fade(.2).toString()},children:["Befunge is a programming language invented in 1993 by Chris Pressey. For more information see the Befunge pages on"," ",Object(D.jsx)("a",{className:"link",href:"https://en.wikipedia.org/wiki/Befunge",children:"Wikipedia"})," ","or"," ",Object(D.jsx)("a",{className:"link",href:"https://esolangs.org/wiki/Befunge",children:"Esolangs"}),"."]}),Object(D.jsx)("div",{style:{marginTop:24,marginBottom:12},children:"About this editor"}),Object(D.jsxs)("div",{style:{fontSize:12,color:A.LIGHT.fade(.2).toString()},children:["This befunge interpreter was written by Angus Johnson. Please let me know on"," ",Object(D.jsx)("a",{className:"link",href:"https://github.com/angussbj/befunge/issues",children:"Github"})," ","if you find are any issues.",Object(D.jsx)("div",{style:{fontSize:10,marginTop:8},children:"\xa9 Angus Johnson 2021"})]})]})}var xe=i(75),ge=i.n(xe);var Oe=function(){var e=Object(n.useState)(!0),t=Object(r.a)(e,2),i=t[0],s=t[1];return Object(D.jsx)("div",{style:{backgroundColor:A.DARK.toString(),minHeight:"100vh"},children:Object(D.jsxs)(de.a,{sidebar:Object(D.jsx)(me,{onClose:function(){return s(!1)}}),open:i,onSetOpen:s,styles:{sidebar:{background:A.DARK.darken(.3).toString()},content:{display:"flex",justifyContent:"center",alignItems:"center"},overlay:{bottom:void 0,top:void 0}},pullRight:!0,children:[Object(D.jsx)(ke.a,{style:{position:"absolute",top:8,right:8,color:A.ACCENT.toString()},onClick:function(){return s(!0)},children:Object(D.jsx)(ge.a,{})}),Object(D.jsx)(se,{})]})})};c.a.render(Object(D.jsx)(s.a.StrictMode,{children:Object(D.jsx)(Oe,{})}),document.getElementById("root"))},89:function(e,t,i){}},[[115,1,2]]]);
//# sourceMappingURL=main.5e86e66b.chunk.js.map