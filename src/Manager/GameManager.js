var GameManager = (function() {
  function GameManager() {
    var _this = this;
    _this.data = [];
    _this._runningObjects = [];
  }
  GameManager.prototype.seigniorId = function(id) {
    var _this = this;
    if (id) {
      _this._seigniorId = id;
    }
    return _this._seigniorId;
  };
  GameManager.prototype.currentSeigniorId = function(id) {
    var _this = this;
    if (id) {
      _this._currentSeigniorId = id;
    }
    return _this._currentSeigniorId;
  };
  GameManager.prototype.noRunningObjects = function() {
    return this._runningObjects.length === 0;
  };
  GameManager.prototype.hasRunningObjects = function() {
    return this._runningObjects.length > 0;
  };
  GameManager.prototype.addRunningObjects = function(obj) {
    this._runningObjects.push(obj);
  };
  GameManager.prototype.removeRunningObjects = function(obj) {
    for (var i = this._runningObjects.length - 1; i >= 0; i--) {
      if (this._runningObjects[i].objectIndex === obj.objectIndex) {
        this._runningObjects.splice(i, 1);
      }
    }
  };
  return new GameManager();
})();