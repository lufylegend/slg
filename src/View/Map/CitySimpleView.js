var CitySimpleView = (function() {
  function CitySimpleView() {
    var _this = this;
    var properties = {
      background: {
        data: 'frame01',
        type: 'LPanel',
        width: 160,
        height: 200
      },
      title: {
        type: 'Label',
        properties: {
          text: '',
          textAlign: 'center',
          x: 80,
          y: 10
        }
      },
      characterCount: {
        type: 'Label',
        properties: {
          format: '武将:{0}',
          text: '武将:2',
          x: 10,
          y: 50
        }
      },
    };
    LExtends(_this, BaseView, [properties]);
    
    _this.init();
  }
  CitySimpleView.prototype.init = function() {
    var _this = this;
    _this._width = _this.background.getWidth();
    _this.x = -_this._width;
    _this.visible = false;
  };
  CitySimpleView.prototype.showCity = function(cityModel) {
    var _this = this;
    _this.model = cityModel;
    _this.title.text = cityModel.name();
    var num = 0;
    cityModel.characters().forEach(function(chara) {
      num += chara.out() ? 0 : 1;
    });
    _this.characterCount.text = String.format(_this.characterCount.format, num);
    _this.showMenu();
  };
  
  CitySimpleView.prototype.showMenu = function() {
    var _this = this;
    var items = [];
    
    _this.visible = true;
    LTweenLite.to(_this, 0.3, { x: 0 });
  };
  
  CitySimpleView.prototype.hide = function() {
    var _this = this;
    LTweenLite.to(_this, 0.3, { x: -_this._width, onComplete: function() {
      _this.visible = false;
    } });
  };
  
  return CitySimpleView;
})();