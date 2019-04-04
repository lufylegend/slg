var BuildChildView = (function() {
  function BuildChildView(model) {
    var _this = this;
    LExtends(_this, LListChildView, []);
    _this.model = model;
    _this.init();
  }
  BuildChildView.prototype.init = function() {
    var _this = this;
    var bitmapData = new LBitmapData(dataList[_this.model.icon()]);
    var bitmap = new LBitmap(bitmapData);
    _this.addChild(bitmap);
  };
  
  BuildChildView.prototype.onClick = function(event) {
    var _this = this;
    
    var listView = event.currentTarget;
    var controller = listView.getParentByConstructor(CharacterMapDialogController);
    
    var e = new LEvent(CommonEvent.BUILD_CHILD_CLICK);
    e.id = _this.model.id();
    CommonEvent.dispatchEvent(e);
    
    controller.close();
  };
  return BuildChildView;
})();