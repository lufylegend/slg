var CityManager = (function() {
  function CityManager() {
    var _this = this;
    LExtends(_this, BaseMasterManager, [CityMasterModel]);
  }
  CityManager.prototype.setCityModel = function(cityModel) {
    var _this = this;
    _this.cityArray = _this.cityArray || {};
    _this.cityArray[cityModel.id()] = cityModel;
  };
  CityManager.prototype.getCityModel = function(id) {
    return this.cityArray[id];
  };
  return new CityManager();
})();