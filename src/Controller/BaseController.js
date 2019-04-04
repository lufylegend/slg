var BaseController = (function() {
  function BaseController(request, properties) {
    var _this = this;
    LExtends(_this, AutoDisplayObject, []);
    _this.name = _this.constructor.name;
    if (!Common.currentController) {
      Common.currentController = _this;
    }

    _this._properties = properties;
    _this._initProperties();
  }
  BaseController.prototype.onLoad = function(request) {
  };
  BaseController.prototype.onClose = function() {
  };
  BaseController.prototype.changeScene = function(request) {
    var _this = this;
    if (Common.controllerTween) {
      return;
    }
    Common.oldController = Common.currentController;
    Common.currentController = _this;
		
    _this.visible = true;
    if (Common.oldController.objectIndex !== Common.currentController.objectIndex) {
      _this._fadeChangeRun();
    }
    _this.onLoad(request);
  };
  BaseController.prototype._moveChangeRun = function(oldIndex, currentIndex) {
    var _this = this;
    _this.x = oldIndex > currentIndex ? -LGlobal.width : LGlobal.width;
    LTweenLite.to(_this, 0.3, { x: 0 });
    Common.controllerTween = LTweenLite.to(Common.oldController, 0.3, { x: -_this.x, onComplete: function(event) {
      event.target.visible = false;
      Common.controllerTween = null;
      if (event.target.onClose) {
        event.target.onClose();
      }
    } });
  };
  BaseController.prototype._fadeChangeRun = function(isHome) {
    var _this = this;
    _this.x = 0;
    _this.alpha = 0;
    LTweenLite.to(_this, 0.3, { alpha: 1 });
    Common.controllerTween = LTweenLite.to(Common.oldController, 0.3, { alpha: 0, onComplete: function(event) {
      event.target.alpha = 1;
      event.target.visible = false;
      Common.controllerTween = null;
      if (event.target.onClose) {
        event.target.onClose();
      }
    } });
  };
  return BaseController;
})();