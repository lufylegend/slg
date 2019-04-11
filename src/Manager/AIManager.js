var AIManager = (function() {
  function AIManager() {
  }
  AIManager.prototype.start = function() {
    var _this = this;
    //AI行动
    if(GameManager.currentSeigniorId() !== GameManager.seigniorId()){
      Common.delay(100)
      .then(function(){
        CommonEvent.dispatchEvent(CommonEvent.TAN_END);
      });
    }
  };
  
  return new AIManager();
})();