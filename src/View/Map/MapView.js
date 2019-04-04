var MapView = (function() {
  function MapView() {
    var _this = this;
    var properties = {
      mapInput: {
        type: 'MapInputView'
      },
      tilemap: {
        type: 'TilemapView',
      },
      characterLayer: {
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
    
    _this.tilemap.followTarget = _this.mapInput;
    _this.characterLayer.followTarget = _this.mapInput;
    //TODO:
    GameManager.seigniorId(1);
    SeigniorManager.init();
    GameManager.currentSeigniorId(1);
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
      if (_this.tilemap.inMoveRange(toX, toY)) {
        _this.characterMove(toX, toY);
      } else {
        
        _this.tilemap.clearMoveRange();
        if (_this.chara.moveOver) {
          _this.chara.setActionOver(true);
        }
        _this.chara = null;
        
        var onCity = _this.clickCity(toX, toY);
        if (onCity) {
          return;
        }
        _this.ctrlmenu.hide();
      }
      return;
    }
    _this.chara = _this.characterLayer.getCharacter(toX, toY);
    
    if (_this.chara) {
      if (_this.chara.model.actionOver()) {
        _this.chara = null;
      } else {
        _this.onClickCharacter();
      }
      return;
    }
    _this.clickCity(toX, toY);
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
      });
  };
  
  return MapView;
})();