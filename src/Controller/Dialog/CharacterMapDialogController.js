var CharacterMapDialogController = (function() {
  function CharacterMapDialogController(request) {
    var _this = this;
    var buildings = BuildingManager.masterArray;
    var properties = {
      listView: {
        type: 'LListView',
        parent: 'layer',
        width: request.width - 40,
        height: request.height - 40,
        models: buildings,
        childView: 'BuildChildView',
        properties: {
          maxPerLine: 1,
          cellWidth: 100,
          cellHeight: 100,
          movement: LListView.Direction.Horizontal,
          arrangement: LListView.Direction.Vertical,
          x: 20,
          y: 20
        }
      },
    };
    LExtends(_this, DialogController, [request, properties]);
  }
  CharacterMapDialogController.prototype.onLoad = function(request) {
    var _this = this;
    
  };
  
  return CharacterMapDialogController;
})();