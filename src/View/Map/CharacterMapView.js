var CharacterMapView = (function() {
  function CharacterMapView() {
    var _this = this;
    var properties = {
    };
    LExtends(_this, BaseView, [properties]);
    
    _this.init();
  }
  CharacterMapView.prototype.init = function() {
    var _this = this;
    CharacterManager.hashMap = {};
    CommonEvent.addEventListener(CommonEvent.NEXT_TAN, _this.onNextTan, _this);
    CommonEvent.addEventListener(CommonEvent.ADD_CHARACTER, _this._addCharacterHandler, _this);
    CommonEvent.addEventListener(CommonEvent.OPEN_MAP_TILE, _this._openMapTileHandler, _this);
    _this.addEventListener(LEvent.ENTER_FRAME, _this.onframe, _this);
  };
  
  CharacterMapView.prototype._addCharacterHandler = function(event) {
    var _this = this;
    var characterModel = event.character;
    var x = characterModel.x();
    var y = characterModel.y();
    
    _this.addCharacter(characterModel, x, y);
    var mapEvent = new LEvent(CommonEvent.OPEN_MAP);
    mapEvent.x = x;
    mapEvent.y = y;
    mapEvent.seigniorId = characterModel.seigniorId();
    CommonEvent.dispatchEvent(mapEvent);
  };
  CharacterMapView.prototype.onNextTan = function(event) {
    var _this = this;
    var belong = event.belong;
    _this.childList.forEach(function(child) {
      if (child.model.seigniorId() === GameManager.currentSeigniorId()) {
        child.setActionOver(false);
        child.moveOver = false;
      }
    });
  };
  CharacterMapView.prototype.onframe = function() {
    var _this = this;
    if (!_this.followTarget) {
      return;
    }
    _this.x = _this.followTarget.x;
    _this.y = _this.followTarget.y;
  };
  CharacterMapView.prototype._openMapTileHandler = function(event) {
    var _this = this;
    var chara = _this.getCharacter(event.x, event.y);
    if (!chara) {
      return;
    }
    var data = GameManager.data[event.y][event.x][1];
    chara.visible = !!data[GameManager.seigniorId()];
  };
  CharacterMapView.prototype.removeCharacter = function(chara) {
    var _this = this;
    var x = chara.x / 80 >> 0;
    var y = chara.y / 80 >> 0;
    CharacterManager.hashMap[x + '_' + y] = null;
    //chara.model.out(0);
    chara.remove();
  };
  CharacterMapView.prototype.addCharacter = function(characterModel, x, y) {
    var _this = this;
    var chara = new BattleCharacterView(characterModel);
    chara.x = x * 80;
    chara.y = y * 80;
    _this.addChild(chara);
    CharacterManager.hashMap[x + '_' + y] = chara;
  };
  CharacterMapView.prototype.getCharacter = function(x, y) {
    var _this = this;
    return CharacterManager.hashMap[x + '_' + y];
  };
  CharacterMapView.prototype.characterMove = function(chara, path) {
    var _this = this;
    var tween;
    return new Promise(function(resolve, reject) {
      CharacterManager.hashMap[(chara.x / 80 >> 0) + '_' + (chara.y / 80 >> 0) ] = null;
      for (var i = 0; i < path.length; i++) {
        var node = path[i];
        var obj = { x: node.x * 80, y: node.y * 80 };
        obj.onStart = function() {
          var direction;
          if (chara.x > obj.x) {
            direction = CharacterDirection.LEFT;
          } else if (chara.x < obj.x) {
            direction = CharacterDirection.RIGHT;
          } else if (chara.y > obj.y) {
            direction = CharacterDirection.UP;
          } else if (chara.y < obj.y) {
            direction = CharacterDirection.DOWN;
          }
          chara.setActionDirection(CharacterAction.MOVE, direction);
        };
        var mapEvent = new LEvent(CommonEvent.OPEN_MAP);
        mapEvent.x = node.x;
        mapEvent.y = node.y;
        mapEvent.seigniorId = chara.model.seigniorId();
        if (i === path.length - 1) {
          obj.onComplete = function() {
            CharacterManager.hashMap[node.x + '_' + node.y] = chara;
            chara.moveOver = true;
            CommonEvent.dispatchEvent(mapEvent);
            resolve();
          };
        } else {
          obj.onComplete = function() {
            CommonEvent.dispatchEvent(mapEvent);
          };
        }
        if (tween) {
          tween = tween.to(chara, 0.5, obj);
        } else {
          tween = LTweenLite.to(chara, 0.5, obj);
        }
      }
    });
    
  };
  
  return CharacterMapView;
})();