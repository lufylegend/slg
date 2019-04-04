var CtrlMenuModel = (function() {
  function CtrlMenuModel(data) {
    LExtends(this, BaseModel, [data]);
  }
  CtrlMenuModel.prototype.type = function(v) {
    return this._dataValue('type', v);
  };
  CtrlMenuModel.prototype.name = function() {
    switch (this.type()) {
      case 'in':
        return '入城';
      case 'out':
        return '出城';
      case 'tear_down':
        return '拆除';
      default:
        return '建造';
    }
  };
  
  return CtrlMenuModel;
})();