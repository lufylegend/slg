var GameController = (function() {
  function GameController(request) {
    var _this = this;
        
    var properties = {
      mapView: {
        type: 'MapView'
      },
      time: {
        type: 'Label',
        properties: {
          text: '{0}年{1}月{2}旬',
          format: '{0}年{1}月{2}旬',
          textAlign: 'right',
          x: LGlobal.width - 10,
          y: 10
        }
      }, 
      nextButton: {
        type: 'CommonButton',
        label: '下回合',
        params: { img: 'btn03' },
        onClick: '_nextRun',
        properties: {
          x: LGlobal.width - 160,
          y: LGlobal.height - 60
        }
      }
    };
    LExtends(_this, BaseController, [request, properties]);
    //_this._init();
  }
  GameController.prototype.onLoad = function(request) {
    var _this = this;
    CommonEvent.addEventListener(CommonEvent.TAN_END, _this._nextRun, _this);
    _this.year = 184;
    _this.month = 1;
    _this.monthStep = 0;
    _this._timeUpdate();
  };
  GameController.prototype._nextRun = function(event) {
    var _this = this;
    var index = SeigniorManager.masterArray.findIndex(function(seignior) {
      return seignior.id() === GameManager.currentSeigniorId();
    });
    var seigniorModel = SeigniorManager.getMasterModel(GameManager.currentSeigniorId());
    seigniorModel.citys().forEach(function(city) {
      city.characters().forEach(function(chara) {
        chara.actionOver(0);
      });
    });
    CommonEvent.dispatchEvent(CommonEvent.NEXT_TAN);
    index++;
    if(index > SeigniorManager.masterArray.length - 1){
    	index = 0;
    }
    var seigniorModel = SeigniorManager.masterArray[index];
    GameManager.currentSeigniorId(seigniorModel.id());
    if(seigniorModel.id() === GameManager.seigniorId()){
    	_this._timePlus();
    }else {
    	AIManager.start();
    }
    
  };
  GameController.prototype._timeUpdate = function() {
    var _this = this;
    _this.time.text = String.format(_this.time.format, _this.year, _this.month, ['上', '中', '下'][_this.monthStep]);
  };
  GameController.prototype._timePlus = function() {
    var _this = this;
    _this.monthStep++;
    if (_this.monthStep > 2) {
      _this.monthStep = 0;
      _this.month++;
    }
    if (_this.month > 12) {
      _this.month = 1;
      _this.year++;
    }
    _this._timeUpdate();
  };
  return GameController;
})();