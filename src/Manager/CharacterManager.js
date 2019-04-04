var CharacterManager = (function() {
  function CharacterManager() {
    var _this = this;
    LExtends(_this, BaseMasterManager, [CharacterMasterModel]);
    _this.hashMap = {};
  }
  CharacterManager.prototype.getAnimationData = function() {
    // 1792 x 64
    var list = LGlobal.divideCoordinate(1792, 64, 1, 28);
    var data = [
      [list[0][0], list[0][1], list[0][2], list[0][3], list[0][3]], //ATTACK 0
      [list[0][4], list[0][5], list[0][6], list[0][7], list[0][7]], //ATTACK 1
      [list[0][8], list[0][9], list[0][10], list[0][11], list[0][11]], //ATTACK 2
      [list[0][12], list[0][13]], //MOVE 3
      [list[0][14], list[0][15]], //MOVE 4
      [list[0][16], list[0][17]], //MOVE 5
      [list[0][18]], //STAND 6
      [list[0][19]], //STAND 7
      [list[0][20]], //STAND 8
      [list[0][21], list[0][22]], //PANT 9
      [list[0][23], list[0][23]], //BLOCK 10
      [list[0][24], list[0][24]], //BLOCK 11
      [list[0][25], list[0][25]], //BLOCK 12
      [list[0][26], list[0][26]], //HERT 13
      [list[0][27]], //WAKE 14
      [list[0][18], list[0][23], list[0][18], list[0][23], list[0][27], list[0][27], list[0][27]], //LEVELUP 15
      [list[0][19], list[0][24], list[0][19], list[0][24], list[0][27], list[0][27], list[0][27]], //LEVELUP 16
      [list[0][20], list[0][25], list[0][20], list[0][25], list[0][27], list[0][27], list[0][27]], //LEVELUP 17
      [list[0][0]], //MAGIC_ATTACK 18
      [list[0][4]], //MAGIC_ATTACK 19
      [list[0][8]], //MAGIC_ATTACK 20
    ];
    return data;
  };
  CharacterManager.prototype.setAnimationLabel = function(anime) {
    //ATTACK
    anime.setLabel(String.format('{0}-{1}', CharacterAction.ATTACK, CharacterDirection.DOWN), 0, 0, 1, false);
    anime.setLabel(String.format('{0}-{1}', CharacterAction.ATTACK, CharacterDirection.UP), 1, 0, 1, false);
    anime.setLabel(String.format('{0}-{1}', CharacterAction.ATTACK, CharacterDirection.LEFT), 2, 0, 1, false);
    anime.setLabel(String.format('{0}-{1}', CharacterAction.ATTACK, CharacterDirection.RIGHT), 2, 0, 1, true);
        
    anime.setLabel(String.format('{0}-{1}', CharacterAction.ATTACK_START, CharacterDirection.DOWN), 0, 3, 1, false);
    anime.setLabel(String.format('{0}-{1}', CharacterAction.ATTACK_START, CharacterDirection.UP), 1, 3, 1, false);
    anime.setLabel(String.format('{0}-{1}', CharacterAction.ATTACK_START, CharacterDirection.LEFT), 2, 3, 1, false);
    anime.setLabel(String.format('{0}-{1}', CharacterAction.ATTACK_START, CharacterDirection.RIGHT), 2, 3, 1, true);
    //MOVE
    anime.setLabel(String.format('{0}-{1}', CharacterAction.MOVE, CharacterDirection.DOWN), 3, 0, 1, false);
    anime.setLabel(String.format('{0}-{1}', CharacterAction.MOVE, CharacterDirection.UP), 4, 0, 1, false);
    anime.setLabel(String.format('{0}-{1}', CharacterAction.MOVE, CharacterDirection.LEFT), 5, 0, 1, false);
    anime.setLabel(String.format('{0}-{1}', CharacterAction.MOVE, CharacterDirection.RIGHT), 5, 0, 1, true);
    //STAND
    anime.setLabel(String.format('{0}-{1}', CharacterAction.STAND, CharacterDirection.DOWN), 6, 0, 1, false);
    anime.setLabel(String.format('{0}-{1}', CharacterAction.STAND, CharacterDirection.UP), 7, 0, 1, false);
    anime.setLabel(String.format('{0}-{1}', CharacterAction.STAND, CharacterDirection.LEFT), 8, 0, 1, false);
    anime.setLabel(String.format('{0}-{1}', CharacterAction.STAND, CharacterDirection.RIGHT), 8, 0, 1, true);
    //PANT
    anime.setLabel(String.format('{0}-{1}', CharacterAction.PANT, CharacterDirection.DOWN), 9, 0, 1, false);
    anime.setLabel(String.format('{0}-{1}', CharacterAction.PANT, CharacterDirection.UP), 9, 0, 1, false);
    anime.setLabel(String.format('{0}-{1}', CharacterAction.PANT, CharacterDirection.LEFT), 9, 0, 1, false);
    anime.setLabel(String.format('{0}-{1}', CharacterAction.PANT, CharacterDirection.RIGHT), 9, 0, 1, false);
    //BLOCK
    anime.setLabel(String.format('{0}-{1}', CharacterAction.BLOCK, CharacterDirection.DOWN), 10, 0, 1, false);
    anime.setLabel(String.format('{0}-{1}', CharacterAction.BLOCK, CharacterDirection.UP), 11, 0, 1, false);
    anime.setLabel(String.format('{0}-{1}', CharacterAction.BLOCK, CharacterDirection.LEFT), 12, 0, 1, false);
    anime.setLabel(String.format('{0}-{1}', CharacterAction.BLOCK, CharacterDirection.RIGHT), 12, 0, 1, true);
    //HERT
    anime.setLabel(String.format('{0}-{1}', CharacterAction.HERT, CharacterDirection.DOWN), 13, 0, 1, false);
    anime.setLabel(String.format('{0}-{1}', CharacterAction.HERT, CharacterDirection.UP), 13, 0, 1, false);
    anime.setLabel(String.format('{0}-{1}', CharacterAction.HERT, CharacterDirection.LEFT), 13, 0, 1, false);
    anime.setLabel(String.format('{0}-{1}', CharacterAction.HERT, CharacterDirection.RIGHT), 13, 0, 1, false);
    //LEVELUP
    anime.setLabel(String.format('{0}-{1}', CharacterAction.WAKE, CharacterDirection.DOWN), 14, 0, 1, false);
    anime.setLabel(String.format('{0}-{1}', CharacterAction.WAKE, CharacterDirection.UP), 14, 0, 1, false);
    anime.setLabel(String.format('{0}-{1}', CharacterAction.WAKE, CharacterDirection.LEFT), 14, 0, 1, false);
    anime.setLabel(String.format('{0}-{1}', CharacterAction.WAKE, CharacterDirection.RIGHT), 14, 0, 1, false);
    //LEVELUP
    anime.setLabel(String.format('{0}-{1}', CharacterAction.LEVELUP, CharacterDirection.DOWN), 15, 0, 1, false);
    anime.setLabel(String.format('{0}-{1}', CharacterAction.LEVELUP, CharacterDirection.UP), 16, 0, 1, false);
    anime.setLabel(String.format('{0}-{1}', CharacterAction.LEVELUP, CharacterDirection.LEFT), 17, 0, 1, false);
    anime.setLabel(String.format('{0}-{1}', CharacterAction.LEVELUP, CharacterDirection.RIGHT), 17, 0, 1, true);
    //MAGIC_ATTACK
    anime.setLabel(String.format('{0}-{1}', CharacterAction.MAGIC_ATTACK, CharacterDirection.DOWN), 18, 0, 1, false);
    anime.setLabel(String.format('{0}-{1}', CharacterAction.MAGIC_ATTACK, CharacterDirection.UP), 19, 0, 1, false);
    anime.setLabel(String.format('{0}-{1}', CharacterAction.MAGIC_ATTACK, CharacterDirection.LEFT), 20, 0, 1, false);
    anime.setLabel(String.format('{0}-{1}', CharacterAction.MAGIC_ATTACK, CharacterDirection.RIGHT), 20, 0, 1, true);
  };
  CharacterManager.prototype.getCheckDirection = function() {
    var check_directions = {};
    check_directions[CharacterDirection.DOWN] = CharacterDirection.UP;
    check_directions[CharacterDirection.UP] = CharacterDirection.DOWN;
    check_directions[CharacterDirection.LEFT] = CharacterDirection.RIGHT;
    check_directions[CharacterDirection.RIGHT] = CharacterDirection.LEFT;
    return check_directions;
  };
  return new CharacterManager();
})();