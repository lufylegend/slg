var BaseModel = (function() {
  function BaseModel(data) {
    this.data = data;
  }
  BaseModel.prototype.id = function() {
    return this.data.id;
  };
  BaseModel.prototype._dataValue = function(name, value, defaultValue, min, max) {
    if (typeof value !== UNDEFINED) {
      if (typeof min !== UNDEFINED && value < min) {
        value = min;
      }
      if (typeof max !== UNDEFINED && value > max) {
        value = max;
      }
      this.data[name] = value;
      return;
    }
    var res = typeof this.data[name] === UNDEFINED ? defaultValue : this.data[name];
    if (typeof min !== UNDEFINED && res < min) {
      res = min;
    } else if (typeof max !== UNDEFINED && res > max) {
      res = max;
    }
    return res;
  };
  BaseModel.prototype._models = function(key, modelClass) {
    var _this = this;
    var modelKey = key + 'Model';
    if (!_this.data[modelKey]) {
      _this.data[modelKey] = [];
      _this.data[key].forEach(function(child) {
        _this.data[modelKey].push(new modelClass(child));
      });
    }
    return _this.data[modelKey];
  };
  return BaseModel;
})();