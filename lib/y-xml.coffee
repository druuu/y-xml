class YXml

  constructor: (tag_or_dom, attributes = {})->
    if not tag_or_dom?
      @_xml = {}
      # nop
    else if tag_or_dom.constructor is String
      tagname = tag_or_dom
      @_xml = {}
      @_xml.children = []
      #TODO: How to force the user to specify parameters?
      #if not tagname?
      #  throw new Error "You must specify a tagname"
      @_xml.tagname = tagname
      if attributes.constructor isnt Object
        throw new Error "The attributes must be specified as a Object"
      for a_name, a of attributes
        if a.constructor isnt String
          throw new Error "The attributes must be of type String!"
      @_xml.attributes = attributes
      @_xml.classes = {}
      _classes = @_xml.attributes.class
      delete @_xml.attributes.class
      if _classes?
        for c_name, c in _classes.split(" ")
          if c.length > 0
            @_xml.classes[c_name] = c
      undefined
    else if tag_or_dom instanceof Element
      @_dom = tag_or_dom
      @_xml = {}

  _checkForModel: ()->
    if not @_model?
      throw new Error "You have to put the Y."+@_name+' instance on a shared element before you can use it! E.g. on the y object y.val("my-'+@_name+'",y'+@_name+')'

  _name: "Xml"

  _getModel: (Y, ops)->
    if not @_model?
      if @_dom?
        @_xml.tagname = @_dom.tagName.toLowerCase()
        @_xml.attributes = {}
        @_xml.classes = {}
        for attribute in @_dom.attributes
          if attribute.name is "class"
            for c in attribute.value.split(" ")
              @_xml.classes[c] = true
          else
            @_xml.attributes[attribute.name] = attribute.value
        @_xml.children = []
        for child in @_dom.childNodes
          if child.nodeType is child.TEXT_NODE
            @_xml.children.push child.textContent
          else
            @_xml.children.push(new YXml(child))
      @_model = new ops.MapManager(@).execute()
      @_model.val("attributes", new Y.Object(@_xml.attributes))
      @_model.val("classes", new Y.Object(@_xml.classes))
      @_model.val("tagname", @_xml.tagname)
      @_model.val("children", new Y.List(@_xml.children))
      if @_xml.parent?
        @_model.val("parent", @_xml.parent)

      if @_dom?
        @getDom() # two way bind dom to this xml type

      @_setModel @_model

    @_model

  _setModel: (@_model)->
    @_model.observe (events)->
      for event in events
        if event.name is "parent" and event.type isnt "add"
          parent = event.oldValue
          children = parent._model.val("children")?.val()
          if children?
            for c,i in children
              if c is @
                parent._model.val("children").delete i
                break
    delete @_xml

  _setParent: (parent)->
    if parent instanceof YXml
      if @_model?
        @remove()
        @_model.val("parent", parent)
      else
        @_xml.parent = parent
    else
      throw new Error "parent must be of type Y.Xml!"

  toString: ()->
    @_checkForModel()
    xml = "<"+@_model.val("tagname")
    for name, value of @attr()
      xml += " "+name+'="'+value+'"'
    xml += ">"
    for child in @_model.val("children").val()
      xml += child.toString()
    xml += '</'+@_model.val("tagname")+'>'
    xml

  #
  # Get/set the attribute(s) of this element.
  # .attr()
  # .attr(name)
  # .attr(name, value)
  #
  attr: (name, value)->
    @_checkForModel()
    if arguments.length > 1
      if value.constructor isnt String
        throw new Error "The attributes must be of type String!"
      if name is "class"
        classes = value.split(" ")
        cs = {}
        for c in classes
          cs[c] = true

        @_model.val("classes", new @_model.custom_types.Object(cs))
      else
        @_model.val("attributes").val(name, value)
      @
    else if arguments.length > 0
      if name is "class"
        Object.keys(@_model.val("classes").val()).join(" ")
      else
        @_model.val("attributes").val(name)
    else
      attrs = @_model.val("attributes").val()
      classes = Object.keys(@_model.val("classes").val()).join(" ")
      if classes.length > 0
        attrs["class"] = classes
      attrs

  #
  # Adds the specified class(es) to this element
  #
  addClass: (names)->
    @_checkForModel()
    for name in names.split(" ")
      @_model.val("classes").val(name, true)
    @

  #
  # Insert content, specified by the parameter, after this element
  # .after(content [, content])
  #
  after: ()->
    @_checkForModel()
    parent = @_model.val("parent")
    if not parent?
      throw new Error "This Xml Element must not have siblings! (for it does not have a parent)"

    # find the position of this element
    for c,position in parent.getChildren()
      if c is @
        break

    contents = []
    for content in arguments
      if content instanceof YXml
        content._setParent(@_model.val("parent"))
      else if content.constructor isnt String
        throw new Error "Y.Xml.after expects instances of YXml or String as a parameter"
      contents.push content

    parent._model.val("children").insertContents(position+1, contents)

  #
  # Insert content, specified by the parameter, after this element
  # .after(content [, content])
  #
  before: ()->
    @_checkForModel()
    parent = @_model.val("parent")
    if not parent?
      throw new Error "This Xml Element must not have siblings! (for it does not have a parent)"

    # find the position of this element
    for c,position in parent.getChildren()
      if c is @
        break

    contents = []
    for content in arguments
      if content instanceof YXml
        content._setParent(@_model.val("parent"))
      else if content.constructor isnt String
        throw new Error "Y.Xml.after expects instances of YXml or String as a parameter"
      contents.push content

    parent._model.val("children").insertContents(position, contents)

  #
  # Insert content, specified by the parameter, to the end of this element
  # .append(content [, content])
  #
  append: ()->
    @_checkForModel()
    for content in arguments
      if content instanceof YXml
        content._setParent(@)
      else if content.constructor isnt String
        throw new Error "Y.Xml.after expects instances of YXml or String as a parameter"
      @_model.val("children").push(content)
    @

  #
  # Insert content, specified by the parameter, to the beginning of this element.
  # .prepend(content [, content])
  #
  prepend: ()->
    @_checkForModel()
    for content in arguments
      if content instanceof YXml
        content._setParent(@)
      else if content.constructor isnt String
        throw new Error "Y.Xml.after expects instances of YXml or String as a parameter"
      @_model.val("children").insert(0, content)
    @

  #
  # Remove all child nodes of the set of matched elements from the DOM.
  # .empty()
  #
  empty: ()->
    @_checkForModel()
    # TODO: do it like this : @_model.val("children", new Y.List())
    children = @_model.val("children")
    for child in children.val()
      if child.constructor is String
        children.delete(0)
      else
        child.remove()

  #
  # Determine whether any of the matched elements are assigned the given class.
  # .hasClass(className)
  #
  hasClass: (className)->
    @_checkForModel()
    if @_model.val("classes").val(className)?
      true
    else
      false

  #
  # Remove this element from the DOM
  # .remove()
  #
  remove: ()->
    @_checkForModel()
    if @_model.val("parent")?
      parent = @_model.delete("parent")
    @

  #
  # Remove an attribute from this element
  # .removeAttr(attrName)
  #
  removeAttr: (attrName)->
    @_checkForModel()
    if attrName is "class"
      @_model.val("classes", new @_model.custom_types.Object())
    else
      @_model.val("attributes").delete(attrName)
    @

  #
  # Remove a single class, multiple classes, or all classes from this element
  # .removeClass([className])
  #
  removeClass: ()->
    @_checkForModel()
    if arguments.length is 0
      @_model.val("classes", new @_model.custom_types.Object())
    else
      for className in arguments
        @_model.val("classes").delete(className)
    @

  #
  # Add or remove one or more classes from this element,
  # depending on either the class’s presence or the value of the state argument.
  # .toggleClass([className])
  #
  toggleClass: ()->
    @_checkForModel()
    for className in arguments
      classes = @_model.val("classes")
      if classes.val(className)?
        classes.delete(className)
      else
        classes.val(className, true)
    @

  #
  # Get the parent of this Element
  # @Note: Every XML element can only have one parent
  # .getParent()
  #
  getParent: ()->
    @_checkForModel()
    @_model.val("parent")

  #
  # Get all the children of this XML Element as an Array
  # @Note: The children are either of type Y.Xml or String
  # .getChildren()
  #
  getChildren: ()->
    @_checkForModel()
    @_model.val("children").val()

  getPosition: ()->
    @_checkForModel()
    parent = @_model.val("parent")
    if parent?
      for c,i in parent._model.val("children").val()
        if c is @
          return i
      throw new Error "This is not a child of its parent (should not happen in Y.Xml!)"
    else
      null


  getDom: ()->
    @_checkForModel()
    if not @_dom?
      @_dom = document.createElement(@_model.val("tagname"))

      # set the attributes _and_ the classes (@see .attr())
      for attr_name, attr_value of @attr()
        @_dom.setAttribute attr_name, attr_value
      for child,i in @getChildren()
        if child.constructor is String
          dom = document.createTextNode child
        else
          dom = child.getDom()
        @_dom.insertBefore dom, null

    that = @

    if (not @_dom._y_xml?)
      @_dom._y_xml = @
      initialize_proxies.call @

      @_model.val("children").observe (events)->
        for event in events
          if event.type is "insert"
            if event.value.constructor is String
              newNode = document.createTextNode(event.value)
            else
              newNode = event.value.getDom()
              # event.value._setParent that
            children = that._dom.childNodes
            if children.length <= event.position
              rightNode = null
            else
              rightNode = children[event.position]

            dont_proxy ()->
              that._dom.insertBefore newNode, rightNode
          else if event.type is "delete"
            deleted = event.oldValue.getDom()
            dont_proxy ()->
              that._dom.removeChild deleted
      @_model.val("attributes").observe (events)->
        for event in events
          if event.type is "add" or event.type is "update"
            newval = event.object.val(event.name)
            dont_proxy ()->
              that._dom.setAttribute event.name, newval
          else if event.type is "delete"
            dont_proxy ()->
              that._dom.removeAttribute event.name
      setClasses = ()->
        that._model.val("classes").observe (events)->
          for event in events
            if event.type is "add" or event.type is "update"
              dont_proxy ()->
                that._dom.classList.add event.name # classes are stored as the keys
            else if event.type is "delete"
              dont_proxy ()->
                that._dom.classList.remove event.name
      setClasses()
      @_model.observe (events)->
        for event in events
          if event.type is "add" or event.type is "update"
            dont_proxy ()->
              classes = that.attr("class")
              if (not classes?) or classes is ""
                that._dom.removeAttribute "class"
              else
                that._dom.setAttribute "class", that.attr("class")
            setClasses()

    @_dom

proxies_are_initialized = false
# some dom implementations may call another dom.method that simulates the behavior of another.
# For example xml.insertChild(dom) , wich inserts an element at the end, and xml.insertAfter(dom,null) wich does the same
# But Y's proxy may be called only once!
proxy_token = false
dont_proxy = (f)->
  proxy_token = true
  try
    f()
  catch e
    proxy_token = false
    throw new Error e
  proxy_token = false

_proxy = (f_name, f, source = Element.prototype, y)->
  old_f = source[f_name]
  source[f_name] = ()->
    if (not (y? or @_y_xml?)) or proxy_token
      old_f.apply this, arguments
    else if @_y_xml?
      f.apply @_y_xml, arguments
    else
      f.apply y, arguments

initialize_proxies = ()->

  that = this
  f_add = (c)->
    that.addClass c
  _proxy "add", f_add, @_dom.classList, @

  f_remove = (c)->
    that.removeClass c

  _proxy "remove", f_remove, @_dom.classList, @

  @_dom.__defineSetter__ 'className', (val)->
    that.attr('class', val)
  @_dom.__defineGetter__ 'className', ()->
    that.attr('class')
  @_dom.__defineSetter__ 'textContent', (val)->
    # remove all nodes
    that.empty()

    # insert word content
    if val isnt ""
      that.append val

  if proxies_are_initialized
    return
  proxies_are_initialized = true

  # the following methods are initialized on prototypes and therefore they need to be written only once!

  insertBefore = (insertedNode_s, adjacentNode)->
    if adjacentNode?
      for n,i in @_dom.childNodes
        if n is adjacentNode
          pos = i
          break
      if not pos?
        throw new Error "The adjacentNode is not a child element of this node!"
    else
      pos = @getChildren().length

    new_childs = []
    if insertedNode_s.nodeType is insertedNode_s.DOCUMENT_FRAGMENT_NODE
      child = insertedNode_s.firstChild
      while child?
        new_childs.push child
        child = child.nextSibling
    else
      new_childs.push insertedNode_s

    yparent = this
    new_childs = new_childs.map (child)->
      if child._y_xml?
        child._y_xml
      else if child.nodeType == child.TEXT_NODE
        child.textContent
      else
        ychild = new YXml(child)
        ychild._setParent yparent
        ychild
    @_model.val("children").insertContents pos, new_childs

  _proxy 'insertBefore', insertBefore
  _proxy 'appendChild', insertBefore
  _proxy 'removeAttribute', (name)->
    @removeAttr name
  _proxy 'setAttribute', (name, value)->
    @attr name, value

  removeChild = (node)->
    node._y_xml.remove()
  _proxy 'removeChild', removeChild
  replaceChild = (insertedNode, replacedNode)-> # TODO: handle replace with replace behavior...
    insertBefore.call this, insertedNode, replacedNode
    removeChild.call this, replacedNode
  _proxy 'replaceChild', replaceChild

  remove = ()->
    if @_model.val("parent")?
      @remove()
    else
      this_dom = this._dom
      dont_proxy ()->
        this_dom.remove()

  _proxy 'remove', remove

if window?
  if window.Y?
    if window.Y.List?
      window.Y.Xml = YXml
    else
      throw new Error "You must first import Y.List!"
  else
    throw new Error "You must first import Y!"

if module?
  module.exports = YXml









