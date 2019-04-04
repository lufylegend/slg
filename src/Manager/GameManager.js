var GameManager = (function() {
  function GameManager() {
    var _this = this;
    _this.data = [];
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
  return new GameManager();
})();