var CityMasterModel = (function() {
  function CityMasterModel(data) {
    LExtends(this, BaseModel, [data]);
  }
  CityMasterModel.prototype.name = function() {
    return this.data.name;
  };
  
  return CityMasterModel;
})();