var SurfaceManager = (function() {
  function SurfaceManager() {
    var _this = this;
    LExtends(_this, BaseMasterManager, [SurfaceMasterModel]);
  }
  
  return new SurfaceManager();
})();