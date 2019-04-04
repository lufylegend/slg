var AlertDialogController = (function() {
  function AlertDialogController(request) {
    var _this = this;
    request.width = request.width || 300;
    request.height = request.height || 200;
    request.hideClose = true;
    var properties = {
      message: {
        type: 'Label',
        parent: 'layer',
        properties: {
          y: 60,
          text: request.message
        }
      },
      buttonOk: {
        type: 'CommonButton',
        parent: 'layer',
        label: 'ok',
        properties: {
          x: request.width * 0.5 - 50,
          y: request.height - 60
        }
      }
    };
    LExtends(_this, DialogController, [request, properties]);
    _this._okEvent = request.okEvent;
  }
  AlertDialogController.prototype.onLoad = function(request) {
    var _this = this;
    if (_this.message.getWidth() > request.width - 40) {
      _this.message.width = request.width - 40;
      _this.message.x = 20;
      _this.message.setWordWrap(true, 30);
    } else {
      _this.message.x = (request.width - _this.message.getWidth()) * 0.5;
    }
    _this.buttonOk.addEventListener(LMouseEvent.MOUSE_UP, _this._okClick, _this);
  };
  AlertDialogController.prototype._okClick = function(event) {
    var _this = this;
    var callback = _this._okEvent;
    _this.remove();
    if (callback) {
      callback();
    }
  };
  AlertDialogController.show = function(message) {
    var dialog = new AlertDialogController({ message: message });
    dialogLayer.addChild(dialog);
  };
  return AlertDialogController;
})();