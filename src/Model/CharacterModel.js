var CharacterModel = (function() {
  function CharacterModel(data) {
    LExtends(this, BaseModel, [data]);
  }
  CharacterModel.prototype.master = function() {
    this.data.master = this.data.master || CharacterManager.getMasterModel(this.id());
    return this.data.master;
  };
  CharacterModel.prototype.name = function() {
    return this.master().name();
  };
  CharacterModel.prototype.out = function(v) {
    return this._dataValue('out', v);
  };
  CharacterModel.prototype.x = function(v) {
    return this._dataValue('x', v);
  };
  CharacterModel.prototype.y = function(v) {
    return this._dataValue('y', v);
  };
  CharacterModel.prototype.seigniorId = function(v) {
    return this._dataValue('seigniorId', v);
  };
  CharacterModel.prototype.actionOver = function(v) {
    return this._dataValue('actionOver', v);
  };
  CharacterModel.prototype.belong = function() {
    return this.data.belong;
  };
  return CharacterModel;
})();