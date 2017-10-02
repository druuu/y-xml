/**
 * y-xml - Xml Type for Yjs
 * @version v11.0.0-10
 * @license MIT
 */
!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):t.yXml=e()}(this,function(){"use strict";function t(t,n,r){if(t==n)return t?[[w,t]]:[];(r<0||t.length<r)&&(r=null);var l=o(t,n),u=t.substring(0,l);t=t.substring(l),n=n.substring(l),l=i(t,n);var h=t.substring(t.length-l);t=t.substring(0,t.length-l),n=n.substring(0,n.length-l);var d=e(t,n);return u&&d.unshift([w,u]),h&&d.push([w,h]),s(d),null!=r&&(d=a(d,r)),d=c(d)}function e(e,r){var o;if(!e)return[[x,r]];if(!r)return[[D,e]];var i=e.length>r.length?e:r,s=e.length>r.length?r:e,u=i.indexOf(s);if(-1!=u)return o=[[x,i.substring(0,u)],[w,s],[x,i.substring(u+s.length)]],e.length>r.length&&(o[0][0]=o[2][0]=D),o;if(1==s.length)return[[D,e],[x,r]];var a=l(e,r);if(a){var c=a[0],h=a[1],d=a[2],f=a[3],p=a[4],m=t(c,d),v=t(h,f);return m.concat([[w,p]],v)}return n(e,r)}function n(t,e){for(var n=t.length,o=e.length,i=Math.ceil((n+o)/2),l=i,s=2*i,u=new Array(s),a=new Array(s),c=0;c<s;c++)u[c]=-1,a[c]=-1;u[l+1]=0,a[l+1]=0;for(var h=n-o,d=h%2!=0,f=0,p=0,m=0,v=0,y=0;y<i;y++){for(var _=-y+f;_<=y-p;_+=2){var g,b=l+_;g=_==-y||_!=y&&u[b-1]<u[b+1]?u[b+1]:u[b-1]+1;for(var E=g-_;g<n&&E<o&&t.charAt(g)==e.charAt(E);)g++,E++;if(u[b]=g,g>n)p+=2;else if(E>o)f+=2;else if(d){var O=l+h-_;if(O>=0&&O<s&&-1!=a[O]){var w=n-a[O];if(g>=w)return r(t,e,g,E)}}}for(var k=-y+m;k<=y-v;k+=2){var w,O=l+k;w=k==-y||k!=y&&a[O-1]<a[O+1]?a[O+1]:a[O-1]+1;for(var T=w-k;w<n&&T<o&&t.charAt(n-w-1)==e.charAt(o-T-1);)w++,T++;if(a[O]=w,w>n)v+=2;else if(T>o)m+=2;else if(!d){var b=l+h-k;if(b>=0&&b<s&&-1!=u[b]){var g=u[b],E=l+g-b;if(w=n-w,g>=w)return r(t,e,g,E)}}}}return[[D,t],[x,e]]}function r(e,n,r,o){var i=e.substring(0,r),l=n.substring(0,o),s=e.substring(r),u=n.substring(o),a=t(i,l),c=t(s,u);return a.concat(c)}function o(t,e){if(!t||!e||t.charAt(0)!=e.charAt(0))return 0;for(var n=0,r=Math.min(t.length,e.length),o=r,i=0;n<o;)t.substring(i,o)==e.substring(i,o)?(n=o,i=n):r=o,o=Math.floor((r-n)/2+n);return o}function i(t,e){if(!t||!e||t.charAt(t.length-1)!=e.charAt(e.length-1))return 0;for(var n=0,r=Math.min(t.length,e.length),o=r,i=0;n<o;)t.substring(t.length-o,t.length-i)==e.substring(e.length-o,e.length-i)?(n=o,i=n):r=o,o=Math.floor((r-n)/2+n);return o}function l(t,e){function n(t,e,n){for(var r,l,s,u,a=t.substring(n,n+Math.floor(t.length/4)),c=-1,h="";-1!=(c=e.indexOf(a,c+1));){var d=o(t.substring(n),e.substring(c)),f=i(t.substring(0,n),e.substring(0,c));h.length<f+d&&(h=e.substring(c-f,c)+e.substring(c,c+d),r=t.substring(0,n-f),l=t.substring(n+d),s=e.substring(0,c-f),u=e.substring(c+d))}return 2*h.length>=t.length?[r,l,s,u,h]:null}var r=t.length>e.length?t:e,l=t.length>e.length?e:t;if(r.length<4||2*l.length<r.length)return null;var s,u=n(r,l,Math.ceil(r.length/4)),a=n(r,l,Math.ceil(r.length/2));if(!u&&!a)return null;s=a?u&&u[4].length>a[4].length?u:a:u;var c,h,d,f;return t.length>e.length?(c=s[0],h=s[1],d=s[2],f=s[3]):(d=s[0],f=s[1],c=s[2],h=s[3]),[c,h,d,f,s[4]]}function s(t){t.push([w,""]);for(var e,n=0,r=0,l=0,u="",a="";n<t.length;)switch(t[n][0]){case x:l++,a+=t[n][1],n++;break;case D:r++,u+=t[n][1],n++;break;case w:r+l>1?(0!==r&&0!==l&&(e=o(a,u),0!==e&&(n-r-l>0&&t[n-r-l-1][0]==w?t[n-r-l-1][1]+=a.substring(0,e):(t.splice(0,0,[w,a.substring(0,e)]),n++),a=a.substring(e),u=u.substring(e)),0!==(e=i(a,u))&&(t[n][1]=a.substring(a.length-e)+t[n][1],a=a.substring(0,a.length-e),u=u.substring(0,u.length-e))),0===r?t.splice(n-l,r+l,[x,a]):0===l?t.splice(n-r,r+l,[D,u]):t.splice(n-r-l,r+l,[D,u],[x,a]),n=n-r-l+(r?1:0)+(l?1:0)+1):0!==n&&t[n-1][0]==w?(t[n-1][1]+=t[n][1],t.splice(n,1)):n++,l=0,r=0,u="",a=""}""===t[t.length-1][1]&&t.pop();var c=!1;for(n=1;n<t.length-1;)t[n-1][0]==w&&t[n+1][0]==w&&(t[n][1].substring(t[n][1].length-t[n-1][1].length)==t[n-1][1]?(t[n][1]=t[n-1][1]+t[n][1].substring(0,t[n][1].length-t[n-1][1].length),t[n+1][1]=t[n-1][1]+t[n+1][1],t.splice(n-1,1),c=!0):t[n][1].substring(0,t[n+1][1].length)==t[n+1][1]&&(t[n-1][1]+=t[n+1][1],t[n][1]=t[n][1].substring(t[n+1][1].length)+t[n+1][1],t.splice(n+1,1),c=!0)),n++;c&&s(t)}function u(t,e){if(0===e)return[w,t];for(var n=0,r=0;r<t.length;r++){var o=t[r];if(o[0]===D||o[0]===w){var i=n+o[1].length;if(e===i)return[r+1,t];if(e<i){t=t.slice();var l=e-n,s=[o[0],o[1].slice(0,l)],u=[o[0],o[1].slice(l)];return t.splice(r,1,s,u),[r+1,t]}n=i}}throw new Error("cursor_pos is out of bounds!")}function a(t,e){var n=u(t,e),r=n[1],o=n[0],i=r[o],l=r[o+1];if(null==i)return t;if(i[0]!==w)return t;if(null!=l&&i[1]+l[1]===l[1]+i[1])return r.splice(o,2,l,i),h(r,o,2);if(null!=l&&0===l[1].indexOf(i[1])){r.splice(o,2,[l[0],i[1]],[0,i[1]]);var s=l[1].slice(i[1].length);return s.length>0&&r.splice(o+2,0,[l[0],s]),h(r,o,3)}return t}function c(t){for(var e=!1,n=function(t){return t.charCodeAt(0)>=56320&&t.charCodeAt(0)<=57343},r=2;r<t.length;r+=1)t[r-2][0]===w&&function(t){return t.charCodeAt(t.length-1)>=55296&&t.charCodeAt(t.length-1)<=56319}(t[r-2][1])&&t[r-1][0]===D&&n(t[r-1][1])&&t[r][0]===x&&n(t[r][1])&&(e=!0,t[r-1][1]=t[r-2][1].slice(-1)+t[r-1][1],t[r][1]=t[r-2][1].slice(-1)+t[r][1],t[r-2][1]=t[r-2][1].slice(0,-1));if(!e)return t;for(var o=[],r=0;r<t.length;r+=1)t[r][1].length>0&&o.push(t[r]);return o}function h(t,e,n){for(var r=e+n-1;r>=0&&r>=e-1;r--)if(r+1<t.length){var o=t[r],i=t[r+1];o[0]===i[1]&&t.splice(r,2,[o[0],o[1]+i[1]])}return t}function d(t){t.observe(function(e){null!=t.dom&&t._mutualExclude(function(){var n=f(t._scrollElement);if("attributeChanged"===e.type)t.dom.setAttribute(e.name,e.value);else if("attributeRemoved"===e.type)t.dom.removeAttribute(e.name);else if("childInserted"===e.type||"insert"===e.type)for(var r=e.values,o=r.length-1;o>=0;o--){var i=r[o];i.setDomFilter(t._domFilter),i.enableSmartScrolling(t._scrollElement);var l=i.getDom(),s=null,u=null;t._content.length>e.index+o+1&&(u=t.get(e.index+o+1).getDom()),t.dom.insertBefore(l,u),null===n||(null!==n.anchor?l.contains(n.anchor)||n.anchor.contains(l)||(s=n):p(l).top<=0&&(s=n)),m(t._scrollElement,s)}else if("childRemoved"===e.type||"delete"===e.type)for(var a=e.values.length-1;a>=0;a--){var c=e.values[a].dom,h=null;null===n||(null!==n.anchor?c.contains(n.anchor)||n.anchor.contains(c)||(h=n):p(c).top<=0&&(h=n)),c.remove(),m(t._scrollElement,h)}})})}function f(t){if(null==t)return null;var e=document.getSelection().anchorNode;if(null!=e){var n=p(e).top;if(n>=0&&n<=document.documentElement.clientHeight)return{anchor:e,top:n}}return{anchor:null,scrollTop:t.scrollTop,scrollHeight:t.scrollHeight}}function p(t){if(null!=t.getBoundingClientRect)return t.getBoundingClientRect();if(null==t.parentNode){document.createElement("span").appendChild(t)}var e=document.createRange();return e.selectNode(t),e.getBoundingClientRect()}function m(t,e){null!==t&&null!==e&&(null===e.anchor?t.scrollTop===e.scrollTop&&(t.scrollTop+=t.scrollHeight-e.scrollHeight):t.scrollTop+=p(e.anchor).top-e.top)}function v(t,e){return e}function y(t){for(var e=new Set(Array.prototype.map.call(t.dom.childNodes,function(t){return t.__yxml}).filter(function(t){return void 0!==t})),n=t._content.length-1;n>=0;n--){var r=t.get(n);e.has(r)||t.delete(n,1)}for(var o=t.dom.childNodes,i=o.length,l=0,s=0;l<i;l++){(function(e,n){var r=o[e];if(null!=r.__yxml){if(!1===r.__yxml)return"continue";if(n<t.length){if(t.get(n)!==r.__yxml){var i=t._content.findIndex(function(t){return t.type[0]===r.__yxml._model[0]&&t.type[1]===r.__yxml._model[1]});i<0?r.__yxml=null:t.delete(i,1),n+=t.insertDomElements(n,[r])}else n++}else n+=t.insertDomElements(n,[r])}else n+=t.insertDomElements(n,[r]);s=n})(l,s)}}function _(t,e){return t.index<=e?"delete"===t.type?e-Math.min(e-t.index,t.length):e+1:e}function g(t,e,n){t.requestModules(["Array"]).then(function(){var r=function(t){function r(t,e,n,o){A(this,r);var i=F(this,(r.__proto__||Object.getPrototypeOf(r)).call(this,t,e,n));null!=o&&null!=o.content&&"_"!==e[0]&&i.insert(0,o.content),i.dom=null,i._domObserver=null,i._domObserverListener=null,i._scrollElement=null,null!=o&&null!=o.dom&&i._setDom(o.dom);var l=!0;return i._mutualExcluse=function(t){if(l){l=!1;try{t()}catch(t){console.error(t)}i._domObserver.takeRecords(),l=!0}},i.observe(function(t){null!=i.dom&&i._mutualExcluse(function(){var e=null,n=!1,r=null,o=null,l=null,s=null;"undefined"!=typeof getSelection&&(e=getSelection(),e.anchorNode===i.dom&&(r=e.anchorNode,o=_(t,e.anchorOffset),n=!0),e.focusNode===i.dom&&(l=e.focusNode,s=_(t,e.focusOffset),n=!0));var u=f(i._scrollElement),a=void 0;a=null!==u&&(null!==u.anchor||p(i.dom).top<=0)?u:null,i.dom.nodeValue=i.toString(),m(i._scrollElement,a),n&&e.setBaseAndExtent(r||e.anchorNode,o||e.anchorOffset,l||e.focusNode,s||e.focusOffset)})}),i}return S(r,t),C(r,[{key:"setDomFilter",value:function(){}},{key:"enableSmartScrolling",value:function(t){this._scrollElement=t}},{key:"_setDom",value:function(t){var e=this;null!=this.dom&&this._unbindFromDom(),null!=t.__yxml&&t.__yxml._unbindFromDom(),null!=n&&(this.dom=t,t.__yxml=this,this._domObserverListener=function(){e._mutualExcluse(function(){for(var t=T(e.toString(),e.dom.nodeValue),n=0,r=0;r<t.length;r++){var o=t[r];0===o[0]?n+=o[1].length:-1===o[0]?e.delete(n,o[1].length):(e.insert(n,o[1]),n+=o[1].length)}})},this._domObserver=new n(this._domObserverListener),this._domObserver.observe(this.dom,{characterData:!0}))}},{key:"getDom",value:function(){if(null==this.dom){var t=e.createTextNode(this.toString());return null!==n&&this._setDom(t),t}return this.dom}},{key:"toString",value:function(){return this._content.map(function(t){return t.val}).join("")}},{key:"insert",value:function(t,e){L(r.prototype.__proto__||Object.getPrototypeOf(r.prototype),"insert",this).call(this,t,e.split(""))}},{key:"_changed",value:function(t,e){null!=this._domObserver&&this._domObserverListener(this._domObserver.takeRecords()),L(r.prototype.__proto__||Object.getPrototypeOf(r.prototype),"_changed",this).call(this,t,e)}},{key:"_unbindFromDom",value:function(){null!=this._domObserver&&(this._domObserver.disconnect(),this._domObserver=null),null!=this.dom&&(this.dom.__yxml=null,this.dom=null)}},{key:"_destroy",value:function(){null!=this._eventListenerHandler&&this._eventListenerHandler.destroy(),this._unbindFromDom(),L(r.prototype.__proto__||Object.getPrototypeOf(r.prototype),"_destroy",this).call(this)}}]),r}(t.Array.typeDefinition.class);t.extend("XmlText",new t.utils.CustomTypeDefinition({name:"XmlText",class:r,struct:"List",parseArguments:function(t){return"string"==typeof t?[this,{content:t}]:t.nodeType===e.TEXT_NODE?[this,{content:t.nodeValue,dom:t}]:[this,{}]},initType:function(e,n,o){var i=[];return t.Struct.List.map.call(this,n,function(t){if(t.hasOwnProperty("opContent"))throw new Error("Text must not contain types!");t.content.forEach(function(e,n){i.push({id:[t.id[0],t.id[1]+n],val:t.content[n]})})}),new r(e,n.id,i,{},o||{})},createType:function(t,e,n){return new r(t,e.id,[],n||{})}}))})}function b(t,e,n){t.requestModules(["Array"]).then(function(){var e=function(e){function r(t,e,n,o){A(this,r);var i=F(this,(r.__proto__||Object.getPrototypeOf(r)).call(this,t,e,n));i.dom=null,i._domObserver=null,i._domObserverListener=null,i._domFilter=v,i._scrollElement=null;var l=!0;return i._mutualExclude=function(t){if(l){l=!1;try{t()}catch(t){console.error(t)}i._domObserver.takeRecords(),l=!0}},d(i),i}return S(r,e),C(r,[{key:"setDomFilter",value:function(){return t.XmlElement.typeDefinition.class.prototype.setDomFilter.apply(this,arguments)}},{key:"enableSmartScrolling",value:function(){return t.XmlElement.typeDefinition.class.prototype.enableSmartScrolling.apply(this,arguments)}},{key:"insertDomElements",value:function(){return t.XmlElement.typeDefinition.class.prototype.insertDomElements.apply(this,arguments)}},{key:"bindToDom",value:function(t){var e=this;if(null!=this.dom&&this._unbindFromDom(),null!=t.__yxml&&t.__yxml._unbindFromDom(),null==n)throw new Error("Not able to bind to a DOM element, because MutationObserver is not available!");t.innerHTML="";for(var r=0;r<this._content.length;r++)t.insertBefore(this.get(r).getDom(),null);this.dom=t,t.__yxml=this,this._domObserverListener=function(){e._mutualExclude(function(){return y(e)})},this._domObserver=new n(this._domObserverListener),this._domObserver.takeRecords(),this._domObserver.observe(this.dom,{childList:!0})}},{key:"toString",value:function(){var t=this;return this._content.map(function(e){return t.os.getType(e.type).toString()}).join("")}},{key:"_changed",value:function(t,e){null!=this._domObserver&&this._domObserverListener(this._domObserver.takeRecords()),L(r.prototype.__proto__||Object.getPrototypeOf(r.prototype),"_changed",this).call(this,t,e)}},{key:"_unbindFromDom",value:function(){null!=this._domObserver&&(this._domObserver.disconnect(),this._domObserver=null),null!=this.dom&&(this.dom.__yxml=null,this.dom=null)}},{key:"_destroy",value:function(){null!=this._eventListenerHandler&&this._eventListenerHandler.destroy(),this._unbindFromDom(),L(r.prototype.__proto__||Object.getPrototypeOf(r.prototype),"_destroy",this).call(this)}}]),r}(t.Array.typeDefinition.class);t.extend("XmlFragment",new t.utils.CustomTypeDefinition({name:"XmlFragment",class:e,struct:"List",initType:function(n,r){var o=[],i=[];t.Struct.List.map.call(this,r,function(t){t.hasOwnProperty("opContent")?(o.push({id:t.id,type:t.opContent}),i.push(t.opContent)):t.content.forEach(function(e,n){o.push({id:[t.id[0],t.id[1]+n],val:t.content[n]})})});for(var l=0;l<i.length;l++){this.store.initType.call(this,i[l])._parent=r.id}return new e(n,r.id,o)},createType:function(t,n){return new e(t,n.id,[])}}))})}function E(t,e,n){function r(e){var n=this;if("Insert"===e.struct){if(this._content.some(function(n){return t.utils.compareIds(n.id,e.id)}))return;var r=void 0;if(null===e.left)r=0;else if((r=1+this._content.findIndex(function(n){return t.utils.compareIds(n.id,e.left)}))<=0)throw new Error("Unexpected operation!");var o,i;if(e.hasOwnProperty("opContent")){this._content.splice(r,0,{id:e.id,type:e.opContent}),i=1;var l=this.os.getType(e.opContent);l._parent=this._model,o=[l]}else{var s=e.content.map(function(t,n){return{id:[e.id[0],e.id[1]+n],val:t}});s.length<3e4?this._content.splice.apply(this._content,[r,0].concat(s)):this._content=this._content.slice(0,r).concat(s).concat(this._content.slice(r)),o=e.content,i=e.content.length}t.utils.bubbleEvent(this,{type:"insert",object:this,index:r,values:o,length:i})}else{if("Delete"!==e.struct)throw new Error("Unexpected struct!");for(var u=0;u<this._content.length&&e.length>0;u++){var a=this._content[u];if(t.utils.inDeletionRange(e,a.id)){var c;for(c=1;c<e.length&&u+c<this._content.length&&t.utils.inDeletionRange(e,this._content[u+c].id);c++);a=this._content[u+c-1],e.length-=a.id[1]-e.target[1]+1,e.target=[a.id[0],a.id[1]+1];var h=this._content.splice(u,c),d=h.map(function(t){return null!=t.val?t.val:n.os.getType(t.type)});t.utils.bubbleEvent(this,{type:"delete",object:this,index:u,values:d,_content:h,length:c})}}}}function o(e){var n,r="Delete"===e.struct?e.key:e.parentSub;if(n=null!=this.opContents[r]?this.os.getType(this.opContents[r]):this.contents[r],"Insert"===e.struct){if(null===e.left&&!t.utils.compareIds(e.id,this.map[r])){var o;null!=e.opContent?(o=this.os.getType(e.opContent),o._parent=this._model,delete this.contents[r],e.deleted?delete this.opContents[r]:this.opContents[r]=e.opContent):(o=e.content[0],delete this.opContents[r],e.deleted?delete this.contents[r]:this.contents[r]=e.content[0]),this.map[r]=e.id,void 0===n?t.utils.bubbleEvent(this,{name:r,object:this,type:"add",value:o}):t.utils.bubbleEvent(this,{name:r,object:this,oldValue:n,type:"update",value:o})}}else{if("Delete"!==e.struct)throw new Error("Unexpected Operation!");t.utils.compareIds(this.map[r],e.target)&&(delete this.opContents[r],delete this.contents[r],t.utils.bubbleEvent(this,{name:r,object:this,oldValue:n,type:"delete"}))}}var i=function(i){function l(e,n,i,s,u,a,c){A(this,l);var h=F(this,(l.__proto__||Object.getPrototypeOf(l)).call(this));h._os=e,h.os=e,h._model=n.id,h._parent=null,h.map=t.utils.copyObject(n.map),h.contents=s,h.opContents=u,h._content=i,h.nodeName=n.nodeName;var f=o.bind(h),p=r.bind(h),m=new t.utils.EventHandler(function(t){void 0!==t.parentSub||void 0!==t.key?f(t):p(t)});h.eventHandler=m,h._deepEventHandler=new t.utils.EventListenerHandler,h._eventListenerHandler=m,h._domObserver=null,h._scrollElement=null,h.dom=null,h._domFilter=c,null!=a&&h._setDom(a);var v=!0;return h._mutualExclude=function(t){if(v){v=!1;try{t()}catch(t){console.error(t)}h._domObserver.takeRecords(),v=!0}},d(h),h}return S(l,i),C(l,[{key:"enableSmartScrolling",value:function(t){this._scrollElement=t;for(var e=this._content.length,n=0;n<e;n++)this.get(n).enableSmartScrolling(t)}},{key:"setDomFilter",value:function(t){this._domFilter=t;for(var e=this._content.length,n=0;n<e;n++)this.get(n).setDomFilter(t)}},{key:"toString",value:function(){var t=this,e=this.nodeName.toLowerCase(),n=this._content.map(function(e){return t.os.getType(e.type).toString()}).join("");return 0===n.length?"<"+e+"/>":"<"+e+">"+n+"</"+e+">"}},{key:"_getPathToChild",value:function(e){return this._content.findIndex(function(n){return null!=n.type&&t.utils.compareIds(n.type,e)})}},{key:"_unbindFromDom",value:function(){null!=this._domObserver&&(this._domObserver.disconnect(),this._domObserver=null),null!=this.dom&&(this.dom.__yxml=null,this.dom=null)}},{key:"_destroy",value:function(){this._unbindFromDom(),null!=this._eventListenerHandler&&(this._eventListenerHandler.destroy(),this._eventListenerHandler=null),this.nodeName=null,this._content=null,this.contents=null,this.opContents=null,this.map=null}},{key:"insertDomElements",value:function(n,r){var o=this,i=[];r.forEach(function(n){if(null!=n.__yxml&&!1!==n.__yxml&&n.__yxml._unbindFromDom(),null!==o._domFilter(n,[])){var r=void 0;if(n.nodeType===e.TEXT_NODE)r=t.XmlText(n);else{if(n.nodeType!==e.ELEMENT_NODE)throw new Error("Unsupported node!");r=t.XmlElement(n,o._domFilter)}i.push(r)}else n.__yxml=!1}),this.insert(n,i);for(var l=i.length,s=n;s<n+l;s++){var u=this.get(s);u.setDomFilter(this._domFilter),u.enableSmartScrolling(this._scrollElement)}return l}},{key:"insert",value:function(e,n){if(!Array.isArray(n))throw new Error("Expected an Array of content!");for(var r=0;r<n.length;r++){var o=n[r],i=t.utils.isTypeDefinition(o);if(null==i||"XmlElement"!==i[0].name&&"XmlText"!==i[0].name)throw new Error("Expected Y.Xml type or String!")}t.Array.typeDefinition.class.prototype.insert.call(this,e,n)}},{key:"delete",value:function(){return t.Array.typeDefinition.class.prototype.delete.apply(this,arguments)}},{key:"get",value:function(){return t.Array.typeDefinition.class.prototype.get.apply(this,arguments)}},{key:"removeAttribute",value:function(){return t.Map.typeDefinition.class.prototype.delete.apply(this,arguments)}},{key:"setAttribute",value:function(){return t.Map.typeDefinition.class.prototype.set.apply(this,arguments)}},{key:"getAttribute",value:function(){return t.Map.typeDefinition.class.prototype.get.apply(this,arguments)}},{key:"getAttributes",value:function(){var e=this,n=t.Map.typeDefinition.class.prototype.keys.apply(this),r={};return n.forEach(function(n){var o=t.Map.typeDefinition.class.prototype.get.call(e,n);null!=o&&(r[n]=o)}),r}},{key:"_bindToDom",value:function(t){var e=this;return this._domObserverListener=function(t){e._mutualExclude(function(){var n=!1;t.forEach(function(t){if("attributes"===t.type){var r=t.attributeName;if(e._domFilter(e.dom,[r]).length>0){var o=t.target.getAttribute(r);e.getAttribute(r)!==o&&(null==o?e.removeAttribute(r):e.setAttribute(r,o))}}else"childList"===t.type&&(n=!0)}),n&&y(e)})},this._domObserver=new n(this._domObserverListener),this._domObserver.observe(t,{attributes:!0,childList:!0}),t}},{key:"_setDom",value:function(t){if(null!=this.dom)throw new Error("Only call this method if you know what you are doing ;)");if(null!=t.__yxml)throw new Error("Already bound to an YXml type");t.__yxml=this;for(var e=[],r=0;r<t.attributes.length;r++)e.push(t.attributes[r].name);e=this._domFilter(t,e);for(var o=0;o<e.length;o++){var i=e[o],l=t.getAttribute(i);this.setAttribute(i,l)}return this.insertDomElements(0,Array.prototype.slice.call(t.childNodes)),null!=n&&(this.dom=this._bindToDom(t)),t}},{key:"getDom",value:function(){var t=this.dom;if(null==t){t=e.createElement(this.nodeName),t.__yxml=this;var r=this.getAttributes();for(var o in r)t.setAttribute(o,r[o]);for(var i=0;i<this._content.length;i++){var l=this._content[i],s=this.os.getType(l.type);t.appendChild(s.getDom())}null!==n&&(this.dom=this._bindToDom(t))}return t}},{key:"observe",value:function(t){function e(e){if("insert"===e.type)t({type:"childInserted",index:e.index,values:e.values});else if("delete"===e.type)t(void 0!==e.index?{type:"childRemoved",index:e.index,values:e.values,_content:e._content}:{type:"attributeRemoved",name:e.name});else{if("update"!==e.type&&"add"!==e.type)throw new Error("Unexpected event");t({type:"attributeChanged",name:e.name,value:e.value})}}return this._eventListenerHandler.addEventListener(e),e}},{key:"unobserve",value:function(t){this._eventListenerHandler.removeEventListener(t)}},{key:"observeDeep",value:function(t){this._deepEventHandler.addEventListener(t)}},{key:"unobserveDeep",value:function(t){this._deepEventHandler.removeEventListener(t)}},{key:"_changed",value:function(e,n){null!=this._domObserver&&this._domObserverListener(this._domObserver.takeRecords()),void 0!==n.parentSub||void 0!==n.targetParent?t.Map.typeDefinition.class.prototype._changed.apply(this,arguments):t.Array.typeDefinition.class.prototype._changed.apply(this,arguments)}},{key:"length",get:function(){return this._content.length}}]),l}(t.utils.CustomType);t.extend("XmlElement",new t.utils.CustomTypeDefinition({name:"XmlElement",class:i,struct:"Xml",parseArguments:function(t,n){var r=void 0;if(r="function"==typeof n?n:v,"string"==typeof t)return[this,{nodeName:t.toUpperCase(),dom:null,domFilter:r}];if(t.nodeType===e.ELEMENT_NODE)return[this,{nodeName:t.nodeName,dom:t,domFilter:r}];throw new Error("Y.XmlElement requires an argument which is a string!")},initType:function(e,n,r){var o=[],l=[];t.Struct.Xml.map.call(this,n,function(t){t.hasOwnProperty("opContent")?(o.push({id:t.id,type:t.opContent}),l.push(t.opContent)):t.content.forEach(function(e,n){o.push({id:[t.id[0],t.id[1]+n],val:t.content[n]})})});for(var s=0;s<l.length;s++){this.store.initType.call(this,l[s],r)._parent=n.id}var u={},a={},c=n.map;for(var h in c){var d=this.getOperation(c[h]);d.deleted||(null!=d.opContent?(a[h]=d.opContent,this.store.initType.call(this,d.opContent)):u[h]=d.content[0])}return new i(e,n,o,u,a,null!=r?r.dom:null,null!=r?r.domFilter:v)},createType:function(t,e,n){return new i(t,e,[],{},{},n.dom,n.domFilter)}}))}function O(t,e,n){null==e&&"undefined"!=typeof document&&(e=document),n="undefined"!=typeof MutationObserver?MutationObserver:null,E(t,e,n),g(t,e,n),b(t,e,n)}var D=-1,x=1,w=0,k=t;k.INSERT=x,k.DELETE=D,k.EQUAL=w;var T=k,A=function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")},C=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),L=function t(e,n,r){null===e&&(e=Function.prototype);var o=Object.getOwnPropertyDescriptor(e,n);if(void 0===o){var i=Object.getPrototypeOf(e);return null===i?void 0:t(i,n,r)}if("value"in o)return o.value;var l=o.get;if(void 0!==l)return l.call(r)},S=function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)},F=function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e};return"undefined"!=typeof Y&&O(Y),O});
//# sourceMappingURL=y-xml.js.map
