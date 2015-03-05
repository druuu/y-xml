!function t(e,r,n){function o(l,i){if(!r[l]){if(!e[l]){var a="function"==typeof require&&require;if(!i&&a)return a(l,!0);if(s)return s(l,!0);throw new Error("Cannot find module '"+l+"'")}var h=r[l]={exports:{}};e[l][0].call(h.exports,function(t){var r=e[l][1][t];return o(r?r:t)},h,h.exports,t,e,r,n)}return r[l].exports}for(var s="function"==typeof require&&require,l=0;l<n.length;l++)o(n[l]);return o}({1:[function(t,e){var r,n,o,s,l,i;if(r=function(){function t(t,e){var r,n,o,s,l,i,a,h,u;if(null==e&&(e={}),null==t)this._xml={};else if(t.constructor===String){if(l=t,this._xml={},this._xml.children=[],this._xml.tagname=l,e.constructor!==Object)throw new Error("The attributes must be specified as a Object");for(n in e)if(r=e[n],r.constructor!==String)throw new Error("The attributes must be of type String!");if(this._xml.attributes=e,this._xml.classes={},i=this._xml.attributes["class"],delete this._xml.attributes["class"],null!=i)for(u=i.split(" "),o=a=0,h=u.length;h>a;o=++a)s=u[o],o.length>0&&(this._xml.classes[s]=o)}else t instanceof Element&&(this._dom=t,this._xml={})}return t.prototype._checkForModel=function(){if(null==this._model)throw new Error("You have to put the Y."+this._name+' instance on a shared element before you can use it! E.g. on the y object y.val("my-'+this._name+'",y'+this._name+")")},t.prototype._name="Xml",t.prototype._getModel=function(e,r){var n,o,s,l,i,a,h,u,m,c,d,_;if(null==this._model){if(null!=this._dom){for(this._xml.tagname=this._dom.tagName.toLowerCase(),this._xml.attributes={},this._xml.classes={},c=this._dom.attributes,l=0,h=c.length;h>l;l++)if(n=c[l],"class"===n.name)for(d=n.value.split(" "),i=0,u=d.length;u>i;i++)o=d[i],this._xml.classes[o]=!0;else this._xml.attributes[n.name]=n.value;for(this._xml.children=[],_=this._dom.childNodes,a=0,m=_.length;m>a;a++)s=_[a],s.nodeType===s.TEXT_NODE?this._xml.children.push(s.textContent):this._xml.children.push(new t(s))}this._model=new r.MapManager(this).execute(),this._model.val("attributes",new e.Object(this._xml.attributes)),this._model.val("classes",new e.Object(this._xml.classes)),this._model.val("tagname",this._xml.tagname),this._model.val("children",new e.List(this._xml.children)),null!=this._xml.parent&&this._model.val("parent",this._xml.parent),null!=this._dom&&this.getDom(),this._setModel(this._model)}return this._model},t.prototype._setModel=function(t){return this._model=t,this._model.observe(function(t){var e,r,n,o,s,l,i,a,h;for(h=[],l=0,i=t.length;i>l;l++)n=t[l],"parent"===n.name&&"add"!==n.type?(s=n.oldValue,r=null!=(a=s._model.val("children"))?a.val():void 0,null!=r?h.push(function(){var t,n,l;for(l=[],o=t=0,n=r.length;n>t;o=++t){if(e=r[o],e===this){s._model.val("children")["delete"](o);break}l.push(void 0)}return l}.call(this)):h.push(void 0)):h.push(void 0);return h}),delete this._xml},t.prototype._setParent=function(e){if(e instanceof t)return null!=this._model?(this.remove(),this._model.val("parent",e)):this._xml.parent=e;throw new Error("parent must be of type Y.Xml!")},t.prototype.toString=function(){var t,e,r,n,o,s,l,i;this._checkForModel(),n="<"+this._model.val("tagname"),l=this.attr();for(e in l)r=l[e],n+=" "+e+'="'+r+'"';for(n+=">",i=this._model.val("children").val(),o=0,s=i.length;s>o;o++)t=i[o],n+=t.toString();return n+="</"+this._model.val("tagname")+">"},t.prototype.attr=function(t,e){var r,n,o,s,l,i;if(this._checkForModel(),arguments.length>1){if(e.constructor!==String)throw new Error("The attributes must be of type String!");if("class"===t){for(o=e.split(" "),s={},l=0,i=o.length;i>l;l++)n=o[l],s[n]=!0;this._model.val("classes",new this._model.custom_types.Object(s))}else this._model.val("attributes").val(t,e);return this}return arguments.length>0?"class"===t?Object.keys(this._model.val("classes").val()).join(" "):this._model.val("attributes").val(t):(r=this._model.val("attributes").val(),o=Object.keys(this._model.val("classes").val()).join(" "),o.length>0&&(r["class"]=o),r)},t.prototype.addClass=function(t){var e,r,n,o;for(this._checkForModel(),o=t.split(" "),r=0,n=o.length;n>r;r++)e=o[r],this._model.val("classes").val(e,!0);return this},t.prototype.after=function(){var e,r,n,o,s,l,i,a,h,u;if(this._checkForModel(),o=this._model.val("parent"),null==o)throw new Error("This Xml Element must not have siblings! (for it does not have a parent)");for(u=o.getChildren(),s=l=0,a=u.length;a>l&&(e=u[s],e!==this);s=++l);for(n=[],i=0,h=arguments.length;h>i;i++){if(r=arguments[i],r instanceof t)r._setParent(this._model.val("parent"));else if(r.constructor!==String)throw new Error("Y.Xml.after expects instances of YXml or String as a parameter");n.push(r)}return o._model.val("children").insertContents(s+1,n)},t.prototype.before=function(){var e,r,n,o,s,l,i,a,h,u;if(this._checkForModel(),o=this._model.val("parent"),null==o)throw new Error("This Xml Element must not have siblings! (for it does not have a parent)");for(u=o.getChildren(),s=l=0,a=u.length;a>l&&(e=u[s],e!==this);s=++l);for(n=[],i=0,h=arguments.length;h>i;i++){if(r=arguments[i],r instanceof t)r._setParent(this._model.val("parent"));else if(r.constructor!==String)throw new Error("Y.Xml.after expects instances of YXml or String as a parameter");n.push(r)}return o._model.val("children").insertContents(s,n)},t.prototype.append=function(){var e,r,n;for(this._checkForModel(),r=0,n=arguments.length;n>r;r++){if(e=arguments[r],e instanceof t)e._setParent(this);else if(e.constructor!==String)throw new Error("Y.Xml.after expects instances of YXml or String as a parameter");this._model.val("children").push(e)}return this},t.prototype.prepend=function(){var e,r,n;for(this._checkForModel(),r=0,n=arguments.length;n>r;r++){if(e=arguments[r],e instanceof t)e._setParent(this);else if(e.constructor!==String)throw new Error("Y.Xml.after expects instances of YXml or String as a parameter");this._model.val("children").insert(0,e)}return this},t.prototype.empty=function(){var t,e,r,n,o,s;for(this._checkForModel(),e=this._model.val("children"),o=e.val(),s=[],r=0,n=o.length;n>r;r++)t=o[r],t.constructor===String?s.push(e["delete"](0)):s.push(t.remove());return s},t.prototype.hasClass=function(t){return this._checkForModel(),null!=this._model.val("classes").val(t)?!0:!1},t.prototype.remove=function(){var t;return this._checkForModel(),null!=this._model.val("parent")&&(t=this._model["delete"]("parent")),this},t.prototype.removeAttr=function(t){return this._checkForModel(),"class"===t?this._model.val("classes",new this._model.custom_types.Object):this._model.val("attributes")["delete"](t),this},t.prototype.removeClass=function(){var t,e,r;if(this._checkForModel(),0===arguments.length)this._model.val("classes",new this._model.custom_types.Object);else for(e=0,r=arguments.length;r>e;e++)t=arguments[e],this._model.val("classes")["delete"](t);return this},t.prototype.toggleClass=function(){var t,e,r,n;for(this._checkForModel(),r=0,n=arguments.length;n>r;r++)t=arguments[r],e=this._model.val("classes"),null!=e.val(t)?e["delete"](t):e.val(t,!0);return this},t.prototype.getParent=function(){return this._checkForModel(),this._model.val("parent")},t.prototype.getChildren=function(){return this._checkForModel(),this._model.val("children").val()},t.prototype.getPosition=function(){var t,e,r,n,o,s;if(this._checkForModel(),r=this._model.val("parent"),null!=r){for(s=r._model.val("children").val(),e=n=0,o=s.length;o>n;e=++n)if(t=s[e],t===this)return e;throw new Error("This is not a child of its parent (should not happen in Y.Xml!)")}return null},t.prototype.getDom=function(){var t,e,r,s,l,i,a,h,u,m,c;if(this._checkForModel(),null==this._dom){this._dom=document.createElement(this._model.val("tagname")),m=this.attr();for(t in m)e=m[t],this._dom.setAttribute(t,e);for(c=this.getChildren(),l=h=0,u=c.length;u>h;l=++h)r=c[l],s=r.constructor===String?document.createTextNode(r):r.getDom(),this._dom.insertBefore(s,null)}return a=this,null==this._dom._y_xml&&(this._dom._y_xml=this,o.call(this),this._model.val("children").observe(function(t){var e,r,o,s,l,i,h,u;for(u=[],i=0,h=t.length;h>i;i++)o=t[i],"insert"===o.type?(s=o.value.constructor===String?document.createTextNode(o.value):o.value.getDom(),e=a._dom.childNodes,l=e.length<=o.position?null:e[o.position],u.push(n(function(){return a._dom.insertBefore(s,l)}))):"delete"===o.type?(r=o.oldValue.getDom(),u.push(n(function(){return a._dom.removeChild(r)}))):u.push(void 0);return u}),this._model.val("attributes").observe(function(t){var e,r,o,s,l;for(l=[],o=0,s=t.length;s>o;o++)e=t[o],"add"===e.type||"update"===e.type?(r=e.object.val(e.name),l.push(n(function(){return a._dom.setAttribute(e.name,r)}))):"delete"===e.type?l.push(n(function(){return a._dom.removeAttribute(e.name)})):l.push(void 0);return l}),i=function(){return a._model.val("classes").observe(function(t){var e,r,o,s;for(s=[],r=0,o=t.length;o>r;r++)e=t[r],"add"===e.type||"update"===e.type?s.push(n(function(){return a._dom.classList.add(e.name)})):"delete"===e.type?s.push(n(function(){return a._dom.classList.remove(e.name)})):s.push(void 0);return s})},i(),this._model.observe(function(t){var e,r,o,s;for(s=[],r=0,o=t.length;o>r;r++)e=t[r],"add"===e.type||"update"===e.type?(n(function(){var t;return t=a.attr("class"),null==t||""===t?a._dom.removeAttribute("class"):a._dom.setAttribute("class",a.attr("class"))}),s.push(i())):s.push(void 0);return s})),this._dom},t}(),s=!1,l=!1,n=function(t){var e;l=!0;try{t()}catch(r){throw e=r,l=!1,new Error(e)}return l=!1},i=function(t,e,r,n){var o;return null==r&&(r=Element.prototype),o=r[t],r[t]=function(){return null==n&&null==this._y_xml||l?o.apply(this,arguments):null!=this._y_xml?e.apply(this._y_xml,arguments):e.apply(n,arguments)}},o=function(){var t,e,o,l,a,h,u;return u=this,t=function(t){return u.addClass(t)},i("add",t,this._dom.classList,this),e=function(t){return u.removeClass(t)},i("remove",e,this._dom.classList,this),this._dom.__defineSetter__("className",function(t){return u.attr("class",t)}),this._dom.__defineGetter__("className",function(){return u.attr("class")}),this._dom.__defineSetter__("textContent",function(t){return u.empty(),""!==t?u.append(t):void 0}),s?void 0:(s=!0,o=function(t,e){var n,o,s,l,i,a,h,u,m;if(null!=e){for(m=this._dom.childNodes,o=h=0,u=m.length;u>h;o=++h)if(s=m[o],s===e){i=o;break}if(null==i)throw new Error("The adjacentNode is not a child element of this node!")}else i=this.getChildren().length;if(l=[],t.nodeType===t.DOCUMENT_FRAGMENT_NODE)for(n=t.firstChild;null!=n;)l.push(n),n=n.nextSibling;else l.push(t);return a=this,l=l.map(function(t){var e;return null!=t._y_xml?t._y_xml:t.nodeType===t.TEXT_NODE?t.textContent:(e=new r(t),e._setParent(a),e)}),this._model.val("children").insertContents(i,l)},i("insertBefore",o),i("appendChild",o),i("removeAttribute",function(t){return this.removeAttr(t)}),i("setAttribute",function(t,e){return this.attr(t,e)}),a=function(t){return t._y_xml.remove()},i("removeChild",a),h=function(t,e){return o.call(this,t,e),a.call(this,e)},i("replaceChild",h),l=function(){var t;return null!=this._model.val("parent")?this.remove():(t=this._dom,n(function(){return t.remove()}))},i("remove",l))},"undefined"!=typeof window&&null!==window){if(null==window.Y)throw new Error("You must first import Y!");if(null==window.Y.List)throw new Error("You must first import Y.List!");window.Y.Xml=r}"undefined"!=typeof e&&null!==e&&(e.exports=r)},{}]},{},[1]);