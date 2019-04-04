var CityModel = (function() {
  function CityModel(data) {
    LExtends(this, BaseModel, [data]);
  }
  CityModel.prototype.master = function() {
    this._master = this._master || CityManager.getMasterModel(this.id());
    return this._master;
  };
  CityModel.prototype.name = function() {
    return this.master().name();
  };
  CityModel.prototype.x = function(v) {
    return this._dataValue('x', v);
  };
  CityModel.prototype.y = function(v) {
    return this._dataValue('y', v);
  };
  CityModel.prototype.seigniorId = function(v) {
    return this._dataValue('seigniorId', v);
  };
  CityModel.prototype.characters = function() {
    return this._models('characters', CharacterModel);
  };
  CityModel.prototype.icon = function() {
    return 'city';
  };
  return CityModel;
})();