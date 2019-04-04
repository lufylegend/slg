var LogoController = (function() {
  function LogoController(request) {
    var _this = this;
    
    var properties = {
      background: {
        type: 'LPanel',
        data: 'frame06',
        width: LGlobal.width,
        height: LGlobal.height
      },
      time: {
        type: 'Label',
        properties: {
          text: '三国記II',
          textAlign: 'center',
          size: 50,
          x: LGlobal.width * 0.5,
          y: 100
        }
      },
      buttonLayer: {
        type: 'LSprite',
        properties: {
          x: (LGlobal.width - 160) * 0.5,
          y: LGlobal.height - 300
        }
      },
      startBtn: {
        parent: 'buttonLayer',
        type: 'CommonButton',
        label: 'Start',
        params: { img: 'btn03' },
        onClick: '_gameStart',
        properties: {
          y: 0
        }
      },
      loadBtn: {
        parent: 'buttonLayer',
        type: 'CommonButton',
        label: 'Load',
        params: { img: 'btn03' },
        onClick: '_gameRead',
        properties: {
          y: 80
        }
      },
      settingBtn: {
        parent: 'buttonLayer',
        type: 'CommonButton',
        label: 'Setting',
        params: { img: 'btn03' },
        properties: {
          y: 160
        }
      }
    };
    LExtends(_this, BaseController, [request, properties]);
  }
  LogoController.prototype.onLoad = function(request) {
    var _this = this;
    
  };
  LogoController.prototype._gameStart = function() {
    Common.changeScene('GameController', { });
  };
  LogoController.prototype._gameRead = function() {
    var request = { width: LGlobal.width, height: 200, hideClose: true };
    var dialog = new CharacterMapDialogController(request);
    dialogLayer.addChild(dialog);
  };
  return LogoController;
})();