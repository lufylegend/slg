var CharacterMasterModel = (function() {
  function CharacterMasterModel(data) {
    LExtends(this, BaseModel, [data]);
  }
  CharacterMasterModel.prototype.name = function() {
    return this.data.name;
  };
  return CharacterMasterModel;
})();