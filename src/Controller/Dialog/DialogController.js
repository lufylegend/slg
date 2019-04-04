var DialogController = (function() {
  function DialogController(request, properties) {
    var _this = this;
    LExtends(_this, AutoDisplayObject, []);
    _this.__init(request);

    _this._properties = properties;
    _this._initProperties();

    _this.onLoad(request);
  }
  DialogController.prototype.__init = function(request) {
    var _this = this;
    var maskBackground = Common.getTranslucentMask();
    maskBackground.name = 'maskBackground';
    _this.addChild(maskBackground);
    _this.layer = new LSprite();
    var bitmapData = new LBitmapData(dataList[request.background ? request.background.image : 'frame01']);
    var background;
    if (request.background && request.background.x1 && request.background.y1) {
      background = new LPanel(bitmapData, request.width, request.height, request.background.x1, request.background.x2, request.background.y1, request.background.y2);
    } else {
      background = new LPanel(bitmapData, request.width, request.height);
    }
    _this.layer.addChild(background);
    _this.layer.x = (LGlobal.width - request.width) * 0.5;
    _this.layer.y = (LGlobal.height - request.height) * 0.5;
    _this.addChild(_this.layer);
    if (request.hideClose) {
      background.addEventListener(LMouseEvent.MOUSE_UP, function() {}, _this);
      maskBackground.addEventListener(LMouseEvent.MOUSE_UP, _this._onClose, _this);
      return;
    }
    var closeBtn = Common.getButton('✖︎', { img: 'btn06', size: 26, offsetY: 0 });
    closeBtn.name = 'closeButton';
    closeBtn.x = _this.layer.x + request.width - closeBtn.getWidth() - 5;
    closeBtn.y = _this.layer.y + 5;
    _this.addChild(closeBtn);
    closeBtn.addEventListener(LMouseEvent.MOUSE_UP, _this._onClose, _this);
  };
  DialogController.prototype._onClose = function(event) {
    this.onClose();
    this.remove();
  };
  DialogController.prototype.onClose = function() {
  };
  DialogController.prototype.onLoad = function(request) {
  };
  DialogController.prototype.close = function() {
    this._onClose();
  };
  return DialogController;
})();