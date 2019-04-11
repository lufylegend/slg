var ActionManager = (function() {
  function ActionManager() {
  }
  ActionManager.prototype.attackStart = function(chara, target) {
    var _this = this;
    chara.target = target;
    target.target = chara;
    _this.attackCount(chara, target)
      .then(function() {
        chara.setActionOver(true);
      });
  };
  ActionManager.prototype.attackCount = function(chara, target) {
    var _this = this;
    var direction = CharacterManager.getDirectionFromTarget(chara, target);
    chara.setActionDirection(chara.action, direction);
    //TODO::攻击次数计算
    var count = 1;
    if (chara.model.seigniorId() === GameManager.currentSeigniorId()) {
      count = 1;
    } else {
      count = 1;
    }
    return _this.attackStartRun(chara, target, count);
  };
  ActionManager.prototype.attackStartRun = function(chara, target, count) {
    var _this = this;
    count--;
    //TODO::愤怒一击判断
    var angry = chara.model.seigniorId() === GameManager.currentSeigniorId();
    var promise = Promise.resolve();
    if (angry) {
      chara.angry = true;
      var e = new LEvent(CommonEvent.MAP_ZOOM);
      e.x = chara.x;
      e.y = chara.y;
      e.scale = 1.5;
      CommonEvent.dispatchEvent(e);
      promise = promise.then(function() {
        return Common.wait(function() {
          return GameManager.noRunningObjects();
        });
      }).then(function() {
        return chara.attackAngryExec();
      });
    }
    promise = promise.then(function() {
      chara.setActionDirection(CharacterAction.ATTACK, chara.direction);
    });
    promise = promise.then(function() {
      return Common.wait(function() {
        return GameManager.noRunningObjects();
      });
    }).then(function() {
      chara.angry = false;
      if (count > 0) {
        return _this.attackStartRun(chara, target, count);
      } else {
        return _this.attackEnd(chara, target);
      }
    });
    return promise;
  };
  ActionManager.prototype.attackEnd = function(chara, target) {
    var _this = this;
    if (!chara.target) {
      return Promise.resolve();
    }
    if (chara.model.seigniorId() !== GameManager.currentSeigniorId()) {
      return Promise.resolve();
    }
    return _this.attackCount(target, chara);
  };
  
  return new ActionManager();
})();