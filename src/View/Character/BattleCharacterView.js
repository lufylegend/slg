var BattleCharacterView = (function() {
  function BattleCharacterView(model, properties) {
    var _this = this;
    properties = properties || {};
    var baseProperties = {
      layer: {
        type: 'LSprite'
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
        _this.setActionDirection(CharacterAction.MOVE, _this.direction);
        break;
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
  };
  
  return BattleCharacterView;
})();