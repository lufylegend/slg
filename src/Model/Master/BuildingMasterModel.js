var BuildingMasterModel = (function() {
  function BuildingMasterModel(data) {
    LExtends(this, BaseModel, [data]);
  }
  BuildingMasterModel.prototype.name = function() {
    return this.data.name;
  };
  BuildingMasterModel.prototype.icon = function() {
    return this.data.icon;
  };
  BuildingMasterModel.prototype.type = function() {
    return this.data.type;
  };
  
  return BuildingMasterModel;
})();