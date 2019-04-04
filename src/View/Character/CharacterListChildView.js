var CharacterListChildView = (function() {
  function CharacterListChildView(model) {
    var _this = this;
    LExtends(_this, LListChildView, []);
    _this.model = model;
    var properties = {
      backLayer: {
        type: 'LBitmap',
        data: 'frame02'
      },
      name: {
        type: 'Label',
        properties: {
          text: _this.model.name(),
          x: 30,
          y: 17
        }
      }
    };
    LExtends(_this, BaseView, [properties]);
    _this.init();
  }
  CharacterListChildView.prototype.init = function() {
    var _this = this;
    
  };
  
  CharacterListChildView.prototype.onClick = function(event) {
    var _this = this;
    _this.model.out(1);
    var listView = event.currentTarget;
    var e = new LEvent(CommonEvent.ADD_CHARACTER);
    e.character = _this.model;
    CommonEvent.dispatchEvent(e);
    var controller = listView.getParentByConstructor(CharacterListDialogController);
    controller.close();
  };
  return CharacterListChildView;
})();