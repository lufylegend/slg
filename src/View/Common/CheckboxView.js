var CheckboxView = (function() {
  function CheckboxView(params) {
    var _this = this;
    var properties = {
      icon: {
        type: 'LBitmap',
        data: params.icon,
        properties: {
          x: params.iconX,
          y: params.iconY
        }
      },
      onButton: {
        type: 'LButton',
        state: 'btn_on',
        properties: {
          x: 10,
          y: -5
        }
      },
      offButton: {
        type: 'LButton',
        state: 'btn_off',
        properties: {
          x: 10,
          y: -5
        }
      }
    };
    LExtends(_this, BaseView, [properties]);
    _this._init();
  }
  CheckboxView.prototype._init = function() {
    var _this = this;
    _this.updateView(true);
    _this.onButton.addEventListener(LMouseEvent.MOUSE_UP, _this._onClick, _this);
    _this.offButton.addEventListener(LMouseEvent.MOUSE_UP, _this._onClick, _this);
  };
  CheckboxView.prototype._onClick = function(event) {
    var _this = this;
    _this.updateView(!_this.value);
    _this.dispatchEvent('check:change');
  };
  CheckboxView.prototype.updateView = function(value) {
    var _this = this;
    _this.value = value;
    _this.onButton.visible = _this.value;
    _this.offButton.visible = !_this.value;
  };
  return CheckboxView;
})();