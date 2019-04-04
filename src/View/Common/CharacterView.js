var CharacterView = (function() {
  function CharacterView() {
    var _this = this;
    var properties = {
      backLayer: {
        type: 'LSprite'
      },
      bitmap: {
        parent: 'backLayer',
        type: 'LBitmap',
        data: null
      }
    };
    LExtends(_this, BaseView, [properties]);
    
    _this.init();
  }
  CharacterView.prototype.init = function() {
    
  };
  return CharacterView;
})();