var AutoDisplayObject = (function() {
  function AutoDisplayObject() {
    var _this = this;
    LExtends(_this, LSprite, []);
    _this._properties = {};
  }
  AutoDisplayObject.prototype._initProperties = function() {
    var _this = this;
    if (!_this._properties) {
      return;
    }
    for (var key in _this._properties) {
      var child = _this._properties[key];
      var displayObject = _this._initProperty(child);
      _this[key] = displayObject;
    }
  };
  AutoDisplayObject.prototype._initProperty = function(child) {
    var _this = this;
    var displayObject;
    var parent;
    var methodName = '_initProperty' + child.type;
    //trace(methodName);
    if (_this[methodName]) {
      displayObject = _this[methodName](child);
    } else {
      displayObject = _this._initPropertyOther(child);
    }
    if (child.parent) {
      parent = _this[child.parent];
    }
    parent = parent || _this;
    parent.addChild(displayObject);
    _this._initChildProperties(displayObject, child.properties);
    return displayObject;
  };
  AutoDisplayObject.prototype._initPropertyLPanel = function(child) {
    var bitmapData = new LBitmapData(dataList[child.data]);
    var obj;
    if (child.x1 && child.y1) {
      obj = new LPanel(bitmapData, child.width, child.height, child.x1, child.x2, child.y1, child.y2);
    } else {
      obj = new LPanel(bitmapData, child.width, child.height);
    }
    return obj;
  };
  AutoDisplayObject.prototype._initPropertyLListView = function(child) {
    var obj = new LListView();
    if (child.width && child.height) {
      obj.resize(child.width, child.height);
    }
    if (child.childView && child.models) {
      setTimeout(function() {
        var items = [];
        child.models.forEach(function(model) {
          var childView = new window[child.childView](model);
          items.push(childView);
        });
        obj.updateList(items);
      }, 0);
    }
    return obj;
  };
  AutoDisplayObject.prototype._initPropertyCommonButton = function(child) {
    var obj = Common.getButton(child.label, child.params);
    if (child.onClick) {
      obj.addEventListener(LMouseEvent.MOUSE_UP, this[child.onClick], this);
    }
    return obj;
  };
  AutoDisplayObject.prototype._initPropertyTranslucentMask = function(child) {
    var obj = Common.getTranslucentMask();
    return obj;
  };
  AutoDisplayObject.prototype._initPropertyLabel = function(child) {
    var obj = Common.getStrokeLabel({ text: child.text || '' });
    if (child.wordWrap) {
      obj.setWordWrap(true, child.lineHeight);
    }
    return obj;
  };
  AutoDisplayObject.prototype._initPropertyLBitmap = function(child) {
    var bitmap = new LBitmap(new LBitmapData(dataList[child.data]));
    return bitmap;
  };
  AutoDisplayObject.prototype._initPropertyLButton = function(child) {
    var bitmap = new LBitmap(new LBitmapData(dataList[child.state]));
    var obj = new LButton(bitmap);
    obj.addEventListener(LMouseEvent.MOUSE_UP, function(event) {
      SoundManager.playSE('se_click');
    });
    if (child.onClick) {
      obj.addEventListener(LMouseEvent.MOUSE_UP, this[child.onClick], this);
    }
    return obj;
  };
  AutoDisplayObject.prototype._initPropertyOther = function(child) {
    var obj = new window[child.type](child.params);
    return obj;
  };
  AutoDisplayObject.prototype._initChildProperties = function(displayObject, properties) {
    if (!properties) {
      return;
    }
    for (var key in properties) {
      displayObject[key] = properties[key];
    }
  };
  return AutoDisplayObject;
})();