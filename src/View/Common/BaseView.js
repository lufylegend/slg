var BaseView = (function() {
  function BaseView(properties) {
    var _this = this;
    LExtends(_this, AutoDisplayObject, []);
    _this._properties = properties;
    _this._initProperties();
  }
  return BaseView;
})();