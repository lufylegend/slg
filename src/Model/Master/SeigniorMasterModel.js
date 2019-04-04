var SeigniorMasterModel = (function() {
  function SeigniorMasterModel(data) {
    LExtends(this, BaseModel, [data]);
  }
  SeigniorMasterModel.prototype.name = function() {
    return this.data.name;
  };
  SeigniorMasterModel.prototype.citys = function() {
    return this._models('citys', CityModel);
  };
  
  return SeigniorMasterModel;
})();