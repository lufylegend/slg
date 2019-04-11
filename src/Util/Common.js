var Common = (function() {
  function Common() {
  }
  Common.getStrokeLabel = function(params) {
    var label = new LTextField();
    if (params.type === 'htmlText') {
      label.htmlText = params.text;
    } else {
      label.text = params.text;
    }
    label.size = params.size || 20;
    label.color = params.color || '#ffffff';
    label.lineColor = params.lineColor || '#000000';
    label.stroke = typeof params.stroke !== UNDEFINED ? params.stroke : true;
    label.lineWidth = params.lineWidth || 2;
    label.heightMode = LTextField.HEIGHT_MODE_BASELINE;
    if (params.type === 'bitmap') {
      label.cacheAsBitmap(true);
    }
    return label;
  };
  Common.getTranslucentMask = function(width, height) {
    var layer = new LSprite();
    var windowBackgrond = Common.getTranslucentBitmap(width, height);
    layer.addChild(windowBackgrond);
    layer.addEventListener(LMouseEvent.MOUSE_DOWN, function() {});
    layer.addEventListener(LMouseEvent.MOUSE_UP, function() {});
    layer.addEventListener(LMouseEvent.MOUSE_MOVE, function() {});
    layer.addEventListener(LMouseEvent.MOUSE_OVER, function() {});
    layer.addEventListener(LMouseEvent.MOUSE_OUT, function() {});
    return layer;
  };
  Common.getTranslucentBitmap = function(width, height) {
    var backgroundData = new LBitmapData(dataList['translucent']);
    var background = new LBitmap(backgroundData);
    width = width || LGlobal.width;
    height = height || LGlobal.height;
    background.scaleX = width / backgroundData.width;
    background.scaleY = height / backgroundData.height;
    return background;
  };
  Common.getButton = function(text, params) {
    var img = 'btn01';
    var offsetY = 0;
    var offsetX = 0;
    var size = 18;
    if (params) {
      img = params.img || img;
      offsetX = params.offsetX || offsetX;
      offsetY = params.offsetY || offsetY;
      size = params.size || size;
    }
    var buttonLayer = new LSprite();
    var btnBitmap = new LBitmap(new LBitmapData(dataList[img]));
    buttonLayer.addChild(btnBitmap);
    var textLabel = Common.getStrokeLabel({ text: text, size: size });
    textLabel.name = 'label';
    textLabel.x = (btnBitmap.getWidth() - textLabel.getWidth()) * 0.5 + offsetX;
    textLabel.y = (btnBitmap.getHeight() - textLabel.getHeight()) * 0.5 + offsetY;
    buttonLayer.addChild(textLabel);
    if (params && params.icon) {
      var icon = new LBitmap(new LBitmapData(dataList[params.icon]));
      if (params.iconWidth) {
        icon.scaleX = params.iconWidth / icon.getWidth();
      }
      if (params.iconHeight) {
        icon.scaleY = params.iconHeight / icon.getHeight();
      }
      textLabel.x = (btnBitmap.getWidth() - textLabel.getWidth() - icon.getWidth()) * 0.5;
      icon.x = textLabel.x + textLabel.getWidth() + 5 + offsetX;
      icon.y = (btnBitmap.getHeight() - icon.getHeight()) * 0.5 + offsetY;
      buttonLayer.addChild(icon);
    }
    buttonLayer.cacheAsBitmap(true);
    var button = new LButton(buttonLayer);
    button.addEventListener(LMouseEvent.MOUSE_UP, function(event) {
      //SoundManager.playSE('se_click');
    });
    button.bitmap = btnBitmap;
    return button;
  };
  Common.changeButtonLabel = function(button, label) {
    var buttonLayer = button.getChildAt(0);
    var textLabel = buttonLayer.getChildByName('label');
    textLabel.text = label;
    buttonLayer.cacheAsBitmap(false);
    buttonLayer.cacheAsBitmap(true);
  };
  Common.changeScene = function(className, request) {
    var _this = this;
    var delayResources = delayLoadContainer[className];
    if (delayResources) {
      //LoadingManager.show();
      LLoadManage.load(delayResources, function(progress) {
      }, function(data) {
        for (var key in data) {
          dataList[key] = data[key];
        }
        delete delayLoadContainer[className];
        Common.changeScene(className, request);
        //LoadingManager.hide();
      });
      return;
    }
    var controller = rootLayer.getChildByName(className);
    
    if (!controller) {
      controller = new window[className](request || {});
      rootLayer.addChild(controller);
    }
    if (Common.currentController && Common.currentController.objectIndex === controller.objectIndex) {
      //return;
    }
    controller.changeScene(request || {});
  };
  Common.delay = function(time) {
    return new Promise(function(resolve, reject) {
      setTimeout(function() {
        resolve();
      }, time);
    });
  };
  Common.wait = function(callback) {
    var _this = this;
    var complete = callback();
    //trace("complete="+complete);
    if (complete) {
      return Promise.resolve();
    } else {
      return Common.delay(100)
        .then(function() {
          return Common.wait(callback);
        });
    }
  };
  /*
  Common.getPanel = function(request) {
    var bitmapData = new LBitmapData(dataList[request.image ? request.image : 'frame01']);
    var background;
    if (request.x1 && request.y1 && request.x2 && request.y2) {
      background = new LPanel(bitmapData, request.width, request.height, request.x1, request.x2, request.y1, request.y2);
    } else {
      background = new LPanel(bitmapData, request.width, request.height);
    }
    return background;
  };
  Common.getNumber = function(value) {
    return value < 10 ? '0' + value : value;
  };
  Common.delay = function(time) {
    return new Promise(function(resolve, reject) {
      setTimeout(function() {
        resolve();
      }, time);
    });
  };
  Common.getAssociative = function(array, keyName) {
    var associative = {};
    for (var i = 0; i < array.length; i++) {
      var child = array[i];
      associative[child[keyName]()] = child;
    }
    return associative;
  };
  Common.countCup = function(cup) {
    if (cup > 400) {
      cup = 400;
    } else if (cup < 400) {
      cup = -400;
    }
    var res = 30 + Math.floor(30 * cup / 400);
    return res;
  };
  Common.timeToGem = function(time) {
    return Math.ceil(time / TIME_TO_GEM_UNIT);
  };*/
  return Common;
})();

