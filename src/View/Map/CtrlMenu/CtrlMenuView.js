var CtrlMenuView = (function() {
  function CtrlMenuView() {
    var _this = this;
    var properties = {
      background: {
        data: 'frame01',
        type: 'LPanel',
        width: LGlobal.width - 200,
        height: 90
      },
      listView: {
        type: 'LListView',
        width: LGlobal.width - 220,
        height: 90,
        models: [],
        childView: 'CtrlMenuChildView',
        properties: {
          maxPerLine: 1,
          cellWidth: 60,
          cellHeight: 70,
          movement: LListView.Direction.Horizontal,
          arrangement: LListView.Direction.Vertical,
          x: 10,
          y: 10
        }
      },
    };
    LExtends(_this, BaseView, [properties]);
    
    _this.init();
  }
  CtrlMenuView.prototype.init = function() {
    var _this = this;
    _this.y = LGlobal.height;
    _this.visible = false;
  };
  CtrlMenuView.prototype.showCity = function(cityModel) {
    var _this = this;
    var models = [];
    models.push(new CtrlMenuModel({ type: 'out' }));
    _this.showMenu(models);
  };
  CtrlMenuView.prototype.showCharacter = function(chara) {
    var _this = this;
    var models = [];
    var data = GameManager.data[chara.y / 80 >> 0][chara.x / 80 >> 0][2];
    if (data.id === 0) {
      models.push(new CtrlMenuModel({ type: 'build' }));
    } else if (data.type === 'city') {
      models.push(new CtrlMenuModel({ type: 'in' }));
    } else {
      models.push(new CtrlMenuModel({ type: 'tear_down' }));
    }
    _this.showMenu(models);
  };
  CtrlMenuView.prototype.showMenu = function(models) {
    var _this = this;
    var items = [];
    models.forEach(function(model) {
      var childView = new CtrlMenuChildView(model);
      items.push(childView);
    });
    _this.listView.updateList(items);
    _this.visible = true;
    LTweenLite.to(_this, 0.3, { y: LGlobal.height - _this.background.getHeight() });
  };
  
  CtrlMenuView.prototype.hide = function() {
    var _this = this;
    LTweenLite.to(_this, 0.3, { y: LGlobal.height, onComplete: function() {
      _this.visible = false;
    } });
  };
  
  return CtrlMenuView;
})();