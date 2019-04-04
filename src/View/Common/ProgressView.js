var ProgressView = (function() {
  function ProgressView(params) {
    var _this = this;
    _this.progress = params.progress;
    _this.sum = params.sum;
    var labelVisible = true;
    if (typeof params.labelVisible !== UNDEFINED) {
      labelVisible = params.labelVisible;
    }
    var properties = {
      background: {
        type: 'LBitmap',
        data: params.background,
        properties: {
        }
      },
      foreground: {
        type: 'LBitmap',
        data: params.foreground,
        properties: {
          x: (dataList[params.background].width - dataList[params.foreground].width) * 0.5,
          y: (dataList[params.background].height - dataList[params.foreground].height) * 0.5
        }
      },
      label: {
        type: 'Label',
        properties: {
          text: '0',
          size: 16,
          textAlign: 'center',
          x: dataList[params.background].width * 0.5,
          y: 2,
          visible: labelVisible
        }
      }
    };
    LExtends(_this, BaseView, [properties]);
    if (typeof params.progress !== UNDEFINED && params.sum) {
      _this.updateView(params);
    }
  }
  ProgressView.prototype.updateView = function(params) {
    var _this = this;
    if (params.foreground) {
      _this.foreground.bitmapData = new LBitmapData(dataList[params.foreground]);
    }
    if (params.fontSize) {
      _this.label.size = params.fontSize;
    }
    _this.progress = params.progress;
    _this.sum = params.sum || _this.sum;
    _this.label.text = params.progress + '/' + _this.sum;
    _this.label.y = (_this.background.getHeight() - _this.label.getHeight()) * 0.5;
    var bitmapData = _this.foreground.bitmapData;
    var barWidth = bitmapData.image.width;
    if (params.progress < _this.sum) {
      barWidth *= params.progress / _this.sum;
    }
    bitmapData.setProperties(0, 0, barWidth, bitmapData.getHeight());
  };
  return ProgressView;
})();