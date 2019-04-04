var CharacterAction = {
  /**
	 * 站立
	 **/
  STAND: 'stand',
  /**
	 * 移动
	 **/
  MOVE: 'move',
  /**
	 * 攻击
	 **/
  ATTACK: 'attack',
  /**
	 * 攻击开始
	 **/
  ATTACK_START: 'attack_start',
  /**
	 * 挡格
	 **/
  BLOCK: 'block',
  /**
	 * 受伤
	 **/
  HERT: 'hert',
  /**
	 * 觉醒
	 **/
  WAKE: 'wake',
  /**
	 * 喘气
	 **/
  PANT: 'pant',
  /**
	 * 升级
	 **/
  LEVELUP: 'levelup',
  /**
	 * 法攻
	 **/
  MAGIC_ATTACK: 'magic_attack'
};
var CharacterDirection = {
  DOWN: 'down',
  LEFT: 'left',
  RIGHT: 'right',
  UP: 'up'
};
var CharacterBelong = {
  SELF: 'self',
  ENEMY: 'enemy',
  OPPONENT: 'opponent'
};
var CHARACTER_SIZE = 48;