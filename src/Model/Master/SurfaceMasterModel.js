var SurfaceMasterModel = (function() {
  function SurfaceMasterModel(data) {
    LExtends(this, BaseModel, [data]);
    this._iconIndex = 0;
    this._iconSpeed = 10;
    this._iconSpeedIndex = 0;
    this._tweenObj = {'x':0,'y':0,'visible':1,'visiblePre':1};
    if(!this.tween()){
      return;
    }
    var tweens = this.tween();
    var tweenObj = null;
    for(var i=0;i<tweens.length;i++){
      tweenObj = tweenObj || LTweenLite;
      var obj = {x: tweens[i].x, y: tweens[i].y, visiblePre:tweens[i].visible};
      obj.onComplete=function(event){
        event.target.visible = event.target.visiblePre;
      };
      if(i===0){
        obj.loop = true;
      }
      tweenObj = tweenObj.to(this._tweenObj, tweens[i].time, obj);
    }
  }
  SurfaceMasterModel.prototype.name = function() {
    return this.data.name;
  };
  SurfaceMasterModel.prototype.tween = function() {
    return this.data.tween;
  };
  SurfaceMasterModel.prototype.x = function() {
    return this._tweenObj.x;
  };
  SurfaceMasterModel.prototype.y = function() {
    return this._tweenObj.y;
  };
  SurfaceMasterModel.prototype.visible = function() {
    return this._tweenObj.visible === 1;
  };
  SurfaceMasterModel.prototype.iconIndex = function(v) {
    if(this._iconSpeedIndex++ > this._iconSpeed){
      this._iconIndex += v;
      this._iconSpeedIndex = 0;
    }
    if(this._iconIndex > this.count() - 1){
      this._iconIndex = 0;
    }
    return this._iconIndex;
  };
  SurfaceMasterModel.prototype.icon = function(v) {
    if(this.count() == 1){
      return this.data.icon;
    }else{
      return this.data.icon + "_" + this.iconIndex(v);
    }
  };
  SurfaceMasterModel.prototype.count = function() {
    return this.data.count;
  };
  
  return SurfaceMasterModel;
})();