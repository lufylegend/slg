var CtrlMenuChildView = (function() {
  function CtrlMenuChildView(model) {
    var _this = this;
    LExtends(_this, LListChildView, []);
    _this.model = model;
    _this.init();
  }
  CtrlMenuChildView.prototype.init = function() {
    var _this = this;
    var obj = Common.getButton(_this.model.name(), { img: 'frame06' });
    _this.addChild(obj);
   
  };
  
  CtrlMenuChildView.prototype.onClick = function(event) {
    var _this = this;
    
    var listView = event.currentTarget;
    
    switch (_this.model.type()) {
      case 'build':
        CommonEvent.dispatchEvent(CommonEvent.BUILD_LIST);
        break;
      case 'tear_down':
        CommonEvent.dispatchEvent(CommonEvent.BUILD_TEAR_DOWN);
        break;
      case 'in':
        CommonEvent.dispatchEvent(CommonEvent.CITY_IN);
        break;
      case 'out':
        CommonEvent.dispatchEvent(CommonEvent.CITY_OUT);
        break;
    }
    
  };
  return CtrlMenuChildView;
})();