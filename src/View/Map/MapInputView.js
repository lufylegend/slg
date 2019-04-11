var MapInputView = (function() {
  function MapInputView() {
    var _this = this;
    var properties = {
    };
    LExtends(_this, BaseView, [properties]);
    
    _this.init();
  }
  MapInputView.prototype.init = function() {
    var _this = this;
    var width = 80 * 150;
    var height = 80 * 150;
    _this.graphics.drawRect(0, '#000000', [0, 0, width, height], false);
    _this.dragRange = new LRectangle(-width, -height, width, height);
    
    _this.addEventListener(LMouseEvent.MOUSE_DOWN, _this.areaDragStart, _this);
    _this.addEventListener(LMouseEvent.MOUSE_UP, _this.areaDragStop, _this);
  };
  
  MapInputView.prototype.areaDragStart = function(event) {
    var _this = this;
    if(GameManager.currentSeigniorId() !== GameManager.seigniorId()){
    	return;
    }
    _this._savePosition = new LPoint(_this.x, _this.y);
    event.currentTarget.startDrag(event.touchPointID);
  };
  MapInputView.prototype.areaDragStop = function(event) {
    var _this = this;
    if(GameManager.currentSeigniorId() !== GameManager.seigniorId()){
    	return;
    }
    event.currentTarget.stopDrag();
    if (Math.abs(this._savePosition.x - _this.x) > 5 || 
      Math.abs(this._savePosition.y - _this.y) > 5) {
      return;
    }
    _this.onClick(event);
  };
  
  MapInputView.prototype.onClick = function(event) {
    var _this = this;
    
    var x = event.selfX;
    var y = event.selfY;
    var toX = x / 80 >> 0;
    var toY = y / 80 >> 0;
    var e = new LEvent(CommonEvent.MAP_CLICK);
    e.x = toX;
    e.y = toY;
    CommonEvent.dispatchEvent(e);
  };
  
  return MapInputView;
})();