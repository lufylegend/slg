/**
地形，[地形ID,地表ID,地表ID...]
是否打开，{势力ID:1}
建筑，{id:建筑ID,seigniorId:0,cityId:0,type:建筑种类}
资源，{population:[人口],土地肥沃:10,铁矿:10}
*/
var TilemapView = (function() {
  function TilemapView() {
    var _this = this;
    var properties = {
      bitmap: {
        type: 'LBitmap'
      }
    };
    LExtends(_this, BaseView, [properties]);
    _this.init();
  } 
    
  TilemapView.prototype.init = function() {
    var _this = this;
    CommonEvent.addEventListener(CommonEvent.OPEN_MAP, _this._openMapHandler, _this);
    _this.moveRange = {};
    _this.bitmap.bitmapData = new LBitmapData(null, 0, 0, LGlobal.width + 80, LGlobal.height + 80, LBitmapData.DATA_CANVAS);
    _this.cols = (LGlobal.width / 80 >> 0) + 1;
    _this.rows = (LGlobal.height / 80 >> 0) + 1;
    _this.addEventListener(LEvent.ENTER_FRAME, _this.onframe, _this);
  };
  TilemapView.prototype.onframe = function() {
    var _this = this;
    if (!_this.followTarget) {
      return;
    }
    _this.drawMap(-_this.followTarget.x, -_this.followTarget.y);
  };
  TilemapView.prototype.drawMap = function(x, y) {
    var _this = this;
    var fromX = x / 80 >> 0;
    var fromY = y / 80 >> 0;
    _this.bitmap.x = -x % 80;
    _this.bitmap.y = -y % 80;
    _this._surface = {};
    for (var i = fromY; i < fromY + _this.rows + 1; i++) {
      for (var j = fromX; j < fromX + _this.cols + 1; j++) {  
        var data = GameManager.data[i][j];
        var rect = new LRectangle(0, 0, 80, 80);
        var point = new LPoint((j - fromX) * 80, (i - fromY) * 80);
        _this.drawTile(data, rect, point, j, i);
      }
    }
  };
  TilemapView.prototype.drawTile = function(data, rect, point, x, y) {
    var _this = this;
    var tile;
    if (!data[1][GameManager.seigniorId()]) {
      tile = new LBitmapData(dataList['tile_0']);
      _this.bitmap.bitmapData.copyPixels(tile, rect, point);
    } else {
      var ids = data[0];
      tile = new LBitmapData(dataList['tile_' + ids[0]]);
      _this.bitmap.bitmapData.copyPixels(tile, rect, point);
      if (ids.length > 1) {
        for (var i = 1; i < ids.length; i++) {
          var master = SurfaceManager.getMasterModel(ids[i]);
          if(!master.visible()){
            continue;
          }
          var v = _this._surface[ids[i]] ? 0 : 1;
          _this._surface[ids[i]] = 1;
          tile = new LBitmapData(dataList[master.icon(v)]);
          _this.bitmap.bitmapData.copyPixels(tile, rect, new LPoint(point.x + master.x(), point.y + master.y()));
        }
      }
      if (data[2].id) {
        var model = null;
        if (data[2].type === 'city') {
          model = CityManager.getCityModel(data[2].id);
        } else if (data[2].type === 'building') {
          model = BuildingManager.getMasterModel(data[2].id);
        }
        tile = new LBitmapData(dataList[model.icon()]);
        _this.bitmap.bitmapData.copyPixels(tile, rect, point);
      }
    }
    if (_this.moveRange[x + '_' + y]) {
      tile = new LBitmapData(dataList['focus']);
      _this.bitmap.bitmapData.copyPixels(tile, rect, point);
    }
    
  };
  TilemapView.prototype._openMapHandler = function(event) {
    var _this = this;
    this.openMap(event.x, event.y, event.seigniorId);
  };
  TilemapView.prototype.openMap = function(x, y, seigniorId) {
    var _this = this;
    var data = GameManager.data;
    for (var i = y - 1; i <= y + 1; i++) {
      for (var j = x - 1; j <= x + 1; j++) {
        _this.openTile(j, i, seigniorId);
      }
    }
  };
  TilemapView.prototype.openTile = function(x, y, seigniorId) {
    var _this = this;
    var data = GameManager.data;
    if (y < 0 || y > data.length - 1 || x < 0 || x > data[0].length - 1) {
      return;
    }
    data[y][x][1][seigniorId] = 1;
    var mapEvent = new LEvent(CommonEvent.OPEN_MAP_TILE);
    mapEvent.x = x;
    mapEvent.y = y;
    CommonEvent.dispatchEvent(mapEvent);
  };
  TilemapView.prototype.clearMoveRange = function() {
    var _this = this;
    _this.moveRange = {};
    CharacterManager.clearAttackMarkCharacter();
  };
  TilemapView.prototype.inMoveRange = function(x, y) {
    var _this = this;
    return _this.moveRange[x + '_' + y];
  };
  TilemapView.prototype.showMoveRange = function(character) {
    var _this = this;
    
    var x = character.x / 80 >> 0;
    var y = character.y / 80 >> 0;
    var length = 2;
    for (var i = y - length; i <= y + length; i++) {
      for (var j = x - length; j <= x + length; j++) {
        var distance = Math.abs(i - y) + Math.abs(j - x);
        if (distance === 0 || distance > length) {
          continue;
        }
        _this.moveRange[j + '_' + i] = 1;
      }
    }
    _this.showAttackRange(character);
  };
  TilemapView.prototype.showAttackRange = function(character) {
    var _this = this;
    
    var x = character.x / 80 >> 0;
    var y = character.y / 80 >> 0;
    var ranges = [[-1, 0], [0, -1], [1, 0], [0, 1]];
    for (var i = 0; i < ranges.length; i++) {
      var range = ranges[i];
      var child = CharacterManager.hashMap[x + range[0] + '_' + (y + range[1])];
      if (!child) {
        continue;
      }
      if (child.model.seigniorId() === character.model.seigniorId()) {
        continue;
      }
      child.attackMarkEnabled(true);
    }
  };
  
  return TilemapView;
})();