var SeigniorManager = (function() {
  function SeigniorManager() {
    var _this = this;
    LExtends(_this, BaseMasterManager, [SeigniorMasterModel]);
  }
  SeigniorManager.prototype.init = function() {
    var _this = this;
    _this.masterArray.forEach(function(seignior) {
      _this.initSeignior(seignior);
    });
  };
  SeigniorManager.prototype.initSeignior = function(seignior) {
    var _this = this;
    seignior.citys().forEach(function(city) {
      city.seigniorId(seignior.id());
      _this.initCity(city);
    });
  };
  SeigniorManager.prototype.initCity = function(city) {
    var _this = this;
    CityManager.setCityModel(city);
    var data = GameManager.data[city.y()][city.x()][2];
    data.id = city.id();
    data.seigniorId = city.seigniorId();
    data.type = 'city';
    city.characters().forEach(function(character) {
      character.seigniorId(city.seigniorId());
      _this.initCharacter(character);
    });
  };
  SeigniorManager.prototype.initCharacter = function(character) {
    var _this = this;
    if (character.out() === 0) {
      return;
    }
    var e = new LEvent(CommonEvent.ADD_CHARACTER);
    e.character = character;
    CommonEvent.dispatchEvent(e);
  };
  return new SeigniorManager();
})();