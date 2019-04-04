var BaseMasterManager = (function() {
  function BaseMasterManager(MasterModel) {
    var _this = this;
    _this.masterModelClass = MasterModel;
    _this.masterList = {};
    _this.masterArray = [];
  }
  BaseMasterManager.prototype.setMasters = function(jsonDataList) {
    var _this = this;
    jsonDataList.forEach(function(data) {
      var masterModel = new _this.masterModelClass(data);
      _this.masterList[masterModel.id()] = masterModel;
      _this.masterArray.push(masterModel);
    });
  };
  BaseMasterManager.prototype.getMasterModel = function(id) {
    return this.masterList[id];
  };
  
  return BaseMasterManager;
})();