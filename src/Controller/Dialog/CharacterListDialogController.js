var CharacterListDialogController = (function() {
  function CharacterListDialogController(request) {
    var _this = this;
    var properties = {
      listView: {
        type: 'LListView',
        parent: 'layer',
        width: request.width - 40,
        height: request.height - 80,
        //models: [1,2,1],
        //childView: "BuildChildView",
        properties: {
          maxPerLine: 1,
          cellWidth: 278,
          cellHeight: 56,
          movement: LListView.Direction.Vertical,
          arrangement: LListView.Direction.Horizontal,
          x: 20,
          y: 60
        }
      },
    };
    LExtends(_this, DialogController, [request, properties]);
  }
  CharacterListDialogController.prototype.onLoad = function(request) {
    var _this = this;
    var characters = request.characters;
    var items = [];
    characters.forEach(function(chara) {
      var item = new CharacterListChildView(chara);
      items.push(item);
    });
    _this.listView.updateList(items);
  };
  
  return CharacterListDialogController;
})();