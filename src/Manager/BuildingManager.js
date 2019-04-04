var BuildingManager = (function() {
  function BuildingManager() {
    var _this = this;
    LExtends(_this, BaseMasterManager, [BuildingMasterModel]);
  }
  
  return new BuildingManager();
})();