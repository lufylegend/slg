var BattleCharacterView = (function() {
  function BattleCharacterView(model, properties) {
    var _this = this;
    properties = properties || {};
    var baseProperties = {
      layer: {
        type: 'LSprite'
      },
      hpProgress: {
        type: 'ProgressView',
        params: { progress: 200, sum: 200, background: 'hp_background', foreground: 'hp_bar', labelVisible:false },
        properties: {
          x: 10,
          y: 60,
          //rotate:-90
        }
      },
      bufferLayer: {
        type: 'LSprite'
      },
      endMark: {
        type: 'LBitmap',
        data: 'action_over',
        properties: {
          visible: false
        }
      },
      attackMark: {
        type: 'LBitmap',
        data: 'attack_mark',
        properties: {
          visible: false,
          x: 13,
          y: 30
        }
      }
    };
    for (var key in properties) {
      baseProperties[key] = properties[key];
    }
    LExtends(_this, BaseView, [baseProperties]);
    _this.model = model;
    _this.load();
  }
  BattleCharacterView.prototype.load = function() {
    var _this = this;
    dataList.character = dataList.character || {};
    if (dataList.character[_this.model.id()]) {
      _this.init(dataList.character[_this.model.id()]);
      return;
    }
    var imgs = [
      { name: 'character', path: 'resources/images/characters/' + _this.model.id() + '-1.png' }
    ];
    LLoadManage.load(imgs, function(progress) {
            
    }, function(data) {
      dataList.character[_this.model.id()] = data;
      _this.init(data);
    });
  };
  BattleCharacterView.prototype.setActionOver = function(v) {
    var _this = this;
    _this.model.actionOver(v);
    _this.endMark.visible = v;
    if (v) {
      _this.setActionDirection(CharacterAction.STAND, _this.direction);
    } else {
      _this.setActionDirection(CharacterAction.MOVE, _this.direction);
    }
  };
  BattleCharacterView.prototype.init = function(data) {
    var _this = this;
    var bitmapData = new LBitmapData(data['character']);
    _this.character = new LAnimationTimeline(bitmapData, CharacterManager.getAnimationData());
    CharacterManager.setAnimationLabel(_this.character);
    _this.character.speed = 3;
    _this.layer.addChild(_this.character);
    _this.character.setFrameSpeedAt(13, 0, 2);
    _this.character.addEventListener(LEvent.COMPLETE, _this.actionComplete, _this);
    _this.setActionDirection(CharacterAction.MOVE, CharacterDirection.DOWN);
  };
  BattleCharacterView.prototype.actionComplete = function(event) {
    var _this = this;
    switch (_this.action) {
      case CharacterAction.ATTACK:
        if (_this.angry) {
          var e = new LEvent(CommonEvent.MAP_SHAKE);
          e.x = _this.x;
          e.y = _this.y;
          CommonEvent.dispatchEvent(e);
        }
        if (_this.target) {
          _this.target.setActionDirection(CharacterAction.HERT, _this.target.direction);
          _this.target.hpProgress.animeTo(_this.target.hpProgress.progress - 50);
        }
        _this.setActionDirection(CharacterAction.MOVE, _this.direction);
        GameManager.removeRunningObjects(_this);
        break;
      case CharacterAction.HERT:
        _this.setActionDirection(CharacterAction.MOVE, _this.direction);
        GameManager.removeRunningObjects(_this);
        break;
      case CharacterAction.BlOCK:
        _this.setActionDirection(CharacterAction.MOVE, _this.direction);
        GameManager.removeRunningObjects(_this);
        break;
      //case CharacterAction.MOVE:
      //case CharacterAction.STAND:
      //  break;
    }
  };
  BattleCharacterView.prototype.setActionDirection = function(action, direction) {
    var _this = this;
    if (_this.action === action && _this.direction === direction) {
      return;
    }
    var label = action + '-' + direction;
    _this.character.gotoAndPlay(label);
        
    _this.action = action;
    _this.direction = direction;
    if (action !== CharacterAction.STAND && action !== CharacterAction.MOVE) {
      GameManager.addRunningObjects(_this);
    }
  };
  BattleCharacterView.prototype.attackMarkEnabled = function(value) {
    var _this = this;
    if (typeof value === UNDEFINED) {
      return _this.attackMark.visible;
    }
    _this.attackMark.visible = value;
    if (value) {
      CharacterManager.pushAttackMarkCharacter(this);
    }
  };
  BattleCharacterView.prototype.attackAngryExec = function() {
    var _this = this;
    var filterObj = { filterValue: 1 };
    var shadow = new LDropShadowFilter(0, 0, '#FF0000', filterObj.filterValue);
    _this.filters = [shadow];
    var func = function(event) {
      var obj = event.target;
      _this.filters[0].shadowBlur = obj.filterValue;
    };
    return new Promise(function(resolve, reject) {
      LTweenLite.to(filterObj, 0.2, { filterValue: 20, onUpdate: func })
        .to(filterObj, 0.2, { filterValue: 1, onUpdate: func })
        .to(filterObj, 0.2, { filterValue: 20, onUpdate: func })
        .to(filterObj, 0.2, { filterValue: 1, onUpdate: func
          , onComplete: function() {
            _this.filters = null;
            resolve();
          } });
    });
  };
  
  return BattleCharacterView;
})();