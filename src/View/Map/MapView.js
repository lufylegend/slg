var MapView = (function() {
  function MapView() {
    var _this = this;
    var properties = {
      root: {
        type: 'LSprite'
      },
      mapGroup: {
        parent: 'root',
        type: 'LSprite'
      },
      mapInput: {
        parent: 'mapGroup',
        type: 'MapInputView'
      },
      tilemap: {
        parent: 'mapGroup',
        type: 'TilemapView',
      },
      characterLayer: {
        parent: 'mapGroup',
        type: 'CharacterMapView'
      },
      ctrlmenu: {
        type: 'CtrlMenuView'
      },
      cityView: {
        type: 'CitySimpleView'
      }
    };
    LExtends(_this, BaseView, [properties]);
    
    _this.init();
  }
  MapView.prototype.init = function() {
    var _this = this;
    
    GameManager.data = mapSettingConfig.data;
    
    _this.aStar = new LStarQuery(GameManager.data, _this.characterLayer.charaMap);
    CommonEvent.addEventListener(CommonEvent.MAP_CLICK, _this.onClick, _this);
    CommonEvent.addEventListener(CommonEvent.BUILD_LIST, _this._openBuildList, _this);
    CommonEvent.addEventListener(CommonEvent.CITY_IN, _this._cityInHandler, _this);
    CommonEvent.addEventListener(CommonEvent.CITY_OUT, _this._cityOutHandler, _this);
    CommonEvent.addEventListener(CommonEvent.BUILD_CHILD_CLICK, _this._createBuildHandler, _this);
    CommonEvent.addEventListener(CommonEvent.BUILD_TEAR_DOWN, _this._buildTearDownHandler, _this);

    CommonEvent.addEventListener(CommonEvent.MAP_ZOOM, _this._onZoomHandler, _this);
    CommonEvent.addEventListener(CommonEvent.MAP_SHAKE, _this._onShakeHandler, _this);
    
    _this.tilemap.followTarget = _this.mapInput;
    _this.characterLayer.followTarget = _this.mapInput;
    //TODO:
    GameManager.seigniorId(1);
    SeigniorManager.init();
    GameManager.currentSeigniorId(1);
  };
  MapView.prototype._onZoomHandler = function(event) {
    var _this = this;
    var x = event.x;
    var y = event.y;
    var scale = event.scale;
    GameManager.addRunningObjects(_this.root);
    _this.root.x = x + _this.mapInput.x;
    _this.root.y = y + _this.mapInput.y;
    _this.mapGroup.x = -_this.root.x;
    _this.mapGroup.y = -_this.root.y;
    LTweenLite.to(_this.root, 0.3, { scaleX: scale, scaleY: scale, onComplete: function() {
      GameManager.removeRunningObjects(_this.root);
    } });
  };
  MapView.prototype._onShakeHandler = function(event) {
    var _this = this;
    var x = event.x;
    var y = event.y;
    GameManager.addRunningObjects(_this);
    LTweenLite.to(_this, 0.05, { x: -10, y: -10 })
      .to(_this, 0.05, { x: 10, y: 10 })
      .to(_this, 0.05, { x: -10, y: 10 })
      .to(_this, 0.05, { x: 10, y: -10 })
      .to(_this, 0.05, { x: 0, y: 0, onComplete: function() {

        var e = new LEvent(CommonEvent.MAP_ZOOM);
        e.x = x;
        e.y = y;
        e.scale = 1;
        CommonEvent.dispatchEvent(e);

        GameManager.removeRunningObjects(_this);
      } });
  };
  MapView.prototype._cityOutHandler = function() {
    var _this = this;
    
    var chara = CharacterManager.hashMap[_this.cityView.model.x() + '_' + _this.cityView.model.y()];
    if (chara) {
      AlertDialogController.show('无法出城!');
      return;
    }
    _this.ctrlmenu.hide();
    _this.cityView.hide();
    var items = [];
    _this.cityView.model.characters().forEach(function(chara) {
      if (chara.out() || chara.actionOver()) {
        return;
      }
      items.push(chara);
    });
    var params = { width: 318, height: LGlobal.height - 200, characters: items };
    var dialog = new CharacterListDialogController(params);
    dialogLayer.addChild(dialog);
  };
  MapView.prototype._cityInHandler = function() {
    var _this = this;
    _this.ctrlmenu.hide();
    _this.tilemap.clearMoveRange();
    var x = _this.chara.x / 80 >> 0;
    var y = _this.chara.y / 80 >> 0;
    _this.chara.model.x(x);
    _this.chara.model.y(y);
    _this.chara.model.out(0);
    _this.chara.model.actionOver(1);
    _this.characterLayer.removeCharacter(_this.chara);
    _this.chara = null;
  };
  MapView.prototype.onClickCharacter = function() {
    var _this = this;
    if (_this.chara.model.seigniorId() === GameManager.seigniorId()) {
      _this.ctrlmenu.showCharacter(_this.chara);
    }
    
    _this.tilemap.showMoveRange(_this.chara);
  };
  MapView.prototype._buildTearDownHandler = function(event) {
    var _this = this;
    var x = _this.chara.x / 80 >> 0;
    var y = _this.chara.y / 80 >> 0;
    GameManager.data[y][x][2] = { id: 0 };
    _this.chara.setActionOver(true);
    _this.chara = null;
    _this.ctrlmenu.hide();
    _this.tilemap.clearMoveRange();
  };
  MapView.prototype._createBuildHandler = function(event) {
    var _this = this;
    var x = _this.chara.x / 80 >> 0;
    var y = _this.chara.y / 80 >> 0;
    GameManager.data[y][x][2] = { id: event.id, seigniorId: GameManager.currentSeigniorId(), type: 'building' };
    _this.chara.setActionOver(true);
    _this.chara = null;
  };
  MapView.prototype._openBuildList = function() {
    var _this = this;
    _this.ctrlmenu.hide();
    _this.tilemap.clearMoveRange();
    
    //_this.chara = null;
    var params = { width: LGlobal.width, height: 200, hideClose: true };
    var dialog = new CharacterMapDialogController(params);
    dialogLayer.addChild(dialog);
  };
  MapView.prototype.onClick = function(event) {
    var _this = this;
    if (_this.cityView.visible) {
      _this.ctrlmenu.hide();
      _this.cityView.hide();
      return;
    }
    var toX = event.x;
    var toY = event.y;
    if (_this.chara) {
      _this.onClickWhenCharacterSelect(toX, toY);
      return;
    }
    _this.chara = _this.characterLayer.getCharacter(toX, toY);
    if (!_this.chara) {
      _this.clickCity(toX, toY);
      return;
    }
    if (_this.chara.model.actionOver()) {
      _this.chara = null;
    } else {
      _this.onClickCharacter();
    }
  };
  MapView.prototype.onClickWhenCharacterSelect = function(toX, toY) {
    var _this = this;
    if (_this.clickAttackMark(toX, toY)) {
      return;
    }
    if (_this.tilemap.inMoveRange(toX, toY)) {
      _this.characterMove(toX, toY);
      return;
    }
    _this.tilemap.clearMoveRange();
    if (_this.chara.moveOver) {
      _this.chara.setActionOver(true);
    }
    _this.chara = null;
    if (_this.clickCity(toX, toY)) {
      return;
    }
    _this.ctrlmenu.hide();  
  };
  MapView.prototype.clickAttackMark = function(toX, toY) {
    var _this = this;
    var target = _this.characterLayer.getCharacter(toX, toY);
    if (!target || !target.attackMarkEnabled()) {
      return false;
    }
    _this.tilemap.clearMoveRange();
    _this.ctrlmenu.hide();
    //ActionManager.currentCharacter = _this.chara;
    ActionManager.attackStart(_this.chara, target);
    
    return true;
  };
  
  MapView.prototype.clickCity = function(toX, toY) {
    var _this = this;
    var data = GameManager.data[toY][toX][2];
    if (data.id === 0) {
      return false;
    }
    if (data.seigniorId !== GameManager.seigniorId()) {    
      return true;
    }
    if (data.type === 'building') {
      
      return false;
    }
    if (data.type === 'city') {
      var cityModel = CityManager.getCityModel(data.id);
      _this.ctrlmenu.showCity(cityModel);
      _this.cityView.showCity(cityModel);
      return true;
    }
    return false;
  };
  
  MapView.prototype.checkPath = function(path) {
    var _this = this;
    if (path.length === 0) {
      return path;
    }
    var node = path[path.length - 1];
    var chara = _this.characterLayer.getCharacter(node.x, node.y);
    if (chara) {
      path.length -= 1;
      return _this.checkPath(path);
    }
    var data = GameManager.data[node.y][node.x][2];
    if (data.id > 0 && data.seigniorId !== _this.chara.model.seigniorId()) {
      path.length -= 1;
      return _this.checkPath(path);
    }
    return path;
  };
  
  MapView.prototype.characterMove = function(toX, toY) {
    var _this = this;
    if (_this.chara.model.seigniorId() !== GameManager.seigniorId()) {
      _this.tilemap.clearMoveRange();
      _this.chara = null;
      return;
    }
    
    var fromX = _this.chara.x / 80 >> 0;
    var fromY = _this.chara.y / 80 >> 0;
    var path = _this.aStar.queryPath(_this.chara.model, new LPoint(fromX, fromY), new LPoint(toX, toY));
    path = _this.checkPath(path);
    
    if (path.length === 0) {
      return;
    }
    _this.ctrlmenu.hide();
    _this.tilemap.clearMoveRange();
    _this.characterLayer.characterMove(_this.chara, path)
      .then(function() {
        _this.ctrlmenu.showCharacter(_this.chara);
        _this.tilemap.showAttackRange(_this.chara);
      });
  };
  
  return MapView;
})();