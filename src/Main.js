var VERSION = '1.0.0';
var loadingLayer;
var dataList;
var rootLayer;
var dialogLayer;

window.setting = window.setting || {};
var loadFristData = [
  { name: 'tile_0', path: 'resources/images/map/tile_0.png' },
  { name: 'tile_1', path: 'resources/images/map/tile_1.png' },
  { name: 'tile_2', path: 'resources/images/map/tile_2.png' },
  { name: 'tile_3', path: 'resources/images/map/tile_3.png' },
  { name: 'tree', path: 'resources/images/map/tree.png' },
  { name: 'stone', path: 'resources/images/map/stone.png' },
  { name: 'city', path: 'resources/images/map/city.png' },
  { name: 'farmland', path: 'resources/images/map/farmland.png' },
  { name: 'institute', path: 'resources/images/map/institute.png' },
  { name: 'trainingground', path: 'resources/images/map/trainingground.png' },
  { name: 'focus', path: 'resources/images/map/focus.png' },
  { name: 'translucent', path: 'resources/images/ui/translucent.png' },
  { name: 'frame01', path: 'resources/images/ui/frame01.png' },
  { name: 'frame02', path: 'resources/images/ui/frame02.png' },
  { name: 'frame06', path: 'resources/images/ui/frame06.png' },
  { name: 'frame07', path: 'resources/images/ui/frame07.png' },
  { name: 'btn01', path: 'resources/images/ui/btn01.png' },
  { name: 'btn03', path: 'resources/images/ui/btn03.png' },
  { name: 'btn06', path: 'resources/images/ui/btn06.png' },
  { name: 'action_over', path: 'resources/images/ui/action_over.png' },
  { type: 'js', path: 'resources/configs/citySettingConfig.js' },
  { type: 'js', path: 'resources/configs/mapSettingConfig.js' },
  { type: 'js', path: 'resources/configs/buildingSettingConfig.js' },
  { type: 'js', path: 'resources/configs/characterSettingConfig.js' },
  { type: 'js', path: 'resources/configs/seigniorSettingConfig.js' },
  { type: 'js', path: 'src/Core/AutoDisplayObject.js' },
  { type: 'js', path: 'src/Util/LStarQuery.js' },
  { type: 'js', path: 'src/Util/CommonEvent.js' },
  { type: 'js', path: 'src/Util/Common.js' },
  { type: 'js', path: 'src/Config/CharacterConfig.js' },
  
  { type: 'js', path: 'src/Controller/BaseController.js' },
  { type: 'js', path: 'src/Controller/GameController.js' },
  { type: 'js', path: 'src/Controller/LogoController.js' },
  { type: 'js', path: 'src/Controller/Dialog/DialogController.js' },
  { type: 'js', path: 'src/Controller/Dialog/AlertDialogController.js' },
  { type: 'js', path: 'src/Controller/Dialog/CharacterMapDialogController.js' },
  { type: 'js', path: 'src/Controller/Dialog/CharacterListDialogController.js' },
  
  { type: 'js', path: 'src/Model/BaseModel.js' },
  { type: 'js', path: 'src/Model/CityModel.js' },
  { type: 'js', path: 'src/Model/CharacterModel.js' },
  { type: 'js', path: 'src/Model/CtrlMenuModel.js' },
  { type: 'js', path: 'src/Model/Master/CityMasterModel.js' },
  { type: 'js', path: 'src/Model/Master/SeigniorMasterModel.js' },
  { type: 'js', path: 'src/Model/Master/CharacterMasterModel.js' },
  { type: 'js', path: 'src/Model/Master/BuildingMasterModel.js' },
  
  { type: 'js', path: 'src/View/Common/BaseView.js' },
  { type: 'js', path: 'src/View/Map/CitySimpleView.js' },
  { type: 'js', path: 'src/View/Map/TilemapView.js' },
  { type: 'js', path: 'src/View/Map/MapInputView.js' },
  { type: 'js', path: 'src/View/Map/CharacterMapView.js' },
  { type: 'js', path: 'src/View/Map/MapView.js' },
  { type: 'js', path: 'src/View/Map/CtrlMenu/CtrlMenuView.js' },
  { type: 'js', path: 'src/View/Map/CtrlMenu/CtrlMenuChildView.js' },
  { type: 'js', path: 'src/View/Character/BattleCharacterView.js' },
  { type: 'js', path: 'src/View/Character/CharacterListChildView.js' },
  { type: 'js', path: 'src/View/Build/BuildChildView.js' },
  
  { type: 'js', path: 'src/Manager/BaseMasterManager.js' },
  { type: 'js', path: 'src/Manager/BuildingManager.js' },
  { type: 'js', path: 'src/Manager/CharacterManager.js' },
  { type: 'js', path: 'src/Manager/SeigniorManager.js' },
  { type: 'js', path: 'src/Manager/CityManager.js' },
  { type: 'js', path: 'src/Manager/GameManager.js' },

];
var loadData = [

  //{ type: 'sound', name: 'se_click', path: 'resources/sound/se_click.wav' }
];
var delayLoadContainer = {};

LGlobal.aspectRatio = PORTRAIT;
var width = 480;
var height = window.innerHeight * width / window.innerWidth;
LInit(1000 / 30, 'legend', width, height, main);
function main() {
  LGlobal.setDebug(true);
  LGlobal.stageScale = LStageScaleMode.SHOW_ALL;
  LSystem.screen(LStage.FULL_SCREEN);
  loadingLayer = new LoadingSample4();
  addChild(loadingLayer);
  LLoadManage.load(loadFristData, function(progress) {
  
  }, dataFristLoadComplete);
}
function dataFristLoadComplete(data) {
  dataList = data;
  loadingLayer.remove();
  rootLayer = new LSprite();
  addChild(rootLayer);
  dialogLayer = new LSprite();
  addChild(dialogLayer);
  BuildingManager.setMasters(buildingSettingConfig.buildings);
  CharacterManager.setMasters(characterSettingConfig.characters);
  SeigniorManager.setMasters(seigniorSettingConfig.seigniors);
  CityManager.setMasters(citySettingConfig.citys);
  Common.changeScene('LogoController', { });
}
