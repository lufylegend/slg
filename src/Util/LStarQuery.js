function LStarQuery(data, charaMap) {
  var self = this;
  self._data = data;
  self._map = {};//地图
  self._w = self._data[0].length;//地图的宽
  self._h = self._data.length;//地图的高
  self._open = [];//开放列表
  self._starPoint = null;//起点
  self._endPoint = null;//目标点
  self._path = [];//计算出的路径
  self.queryType = 1;//寻路方式[0：八方向，1：上下四方向，2：斜角四方向]
}
LStarQuery.prototype = {
  drawPath: function(node) {
    var self = this;
    var pathNode = node;
    //倒过来得到路径
    while (pathNode !== self._starPoint) {
      self._path.unshift(pathNode);
      pathNode = pathNode.nodeparent;
    }
  },
  setStart: function() {
    var self = this;
    self._map = {};
    self._open = [];
  },
  /*计算每个节点*/
  count: function(neighboringNode, centerNode, eight) {
    var self = this;
    //是否已经检测过
    if (neighboringNode.isChecked) return;
    var g = eight ? centerNode.value_g + 14 : centerNode.value_g + 10;
    //不在关闭列表里才开始判断
    if (neighboringNode.open) {
      //如果该节点已经在开放列表里
      if (neighboringNode.value_g >= g) {
        //如果新G值小于或者等于旧值，则表明该路更优，更新其值
        neighboringNode.value_g = g;
        self.ghf(neighboringNode);
        neighboringNode.nodeparent = centerNode;
        self.setOpen(neighboringNode);
      }
    } else {
      //如果该节点未在开放列表里
      //计算GHF值
      neighboringNode.value_g = g;
      self.ghf(neighboringNode);
      neighboringNode.nodeparent = centerNode;
      //添加至列表
      self.setOpen(neighboringNode, true);
    }
  },
  /*计算ghf各值*/
  ghf: function(node) {
    var self = this;
    var dx = Math.abs(node.x - self._endPoint.x);
    var dy = Math.abs(node.y - self._endPoint.y);
    node.value_h = 10 * (dx + dy);
    node.value_f = node.value_g + node.value_h;
  },
  /*加入开放列表*/
  setOpen: function(newNode, newFlg) {
    var self = this;
    var new_index;
    if (newFlg) {
      //self._data[newNode.y][newNode.x][2] = 3;
      newNode.open = true;
      var new_f = newNode.value_f;
      self._open.push(newNode);
      new_index = self._open.length - 1;
    } else {
      new_index = newNode.index;
    }
    while (true) {
      //找到父节点
      var f_note_index = new_index * 0.5 >>> 0;
      if (f_note_index <= 0) break;
      //如果父节点的F值较大，则与父节点交换
      if (self._open[new_index].value_f >= self._open[f_note_index].value_f) break;
      var obj_note = self._open[f_note_index];
      self._open[f_note_index] = self._open[new_index];
      self._open[new_index] = obj_note;
      self._open[f_note_index].index = f_note_index;
      self._open[new_index].index = new_index;
      new_index = f_note_index;
    }
  },
  /*取开放列表里的最小值*/
  getOpen: function() {
    var self = this;
    var change_note;
    //将第一个节点，即F值最小的节点取出，最后返回
    var obj_note = self._open[1];
    self._open[1] = self._open[self._open.length - 1];
    self._open[1].index = 1;
    self._open.pop();
    var this_index = 1;
    while (true) {
      var left_index = this_index * 2;
      var right_index = this_index * 2 + 1;
      if (left_index >= self._open.length) break;
      if (left_index === self._open.length - 1) {
        //当二叉树只存在左节点时，比较左节点和父节点的F值，若父节点较大，则交换
        if (self._open[this_index].value_f <= self._open[left_index].value_f) break;
        change_note = self._open[left_index];
        self._open[left_index] = self._open[this_index];
        self._open[this_index] = change_note;
        self._open[left_index].index = left_index;
        self._open[this_index].index = this_index;
        this_index = left_index;
      } else if (right_index < self._open.length) {
        //找到左节点和右节点中的较小者
        if (self._open[left_index].value_f <= self._open[right_index].value_f) {
          //比较左节点和父节点的F值，若父节点较大，则交换
          if (self._open[this_index].value_f <= self._open[left_index].value_f) break;
          change_note = self._open[left_index];
          self._open[left_index] = self._open[this_index];
          self._open[this_index] = change_note;
          self._open[left_index].index = left_index;
          self._open[this_index].index = this_index;
          this_index = left_index;
        } else {
          //比较右节点和父节点的F值，若父节点较大，则交换
          if (self._open[this_index].value_f <= self._open[right_index].value_f) break;
          change_note = self._open[right_index];
          self._open[right_index] = self._open[this_index];
          self._open[this_index] = change_note;
          self._open[right_index].index = right_index;
          self._open[this_index].index = this_index;
          this_index = right_index;
        }
      }
    }
    return obj_note;
  },
  /*开始寻路*/
  queryPath: function(chara, star, end) {
    var self = this;
    self.chara = chara;
    self._path = [];
    if (end.x >= self._data[0].length)end.x = self._data[0].length - 2;
    if (end.y >= self._data.length)end.y = self._data.length - 2;
    if (star.x === end.x && star.y === end.y) return self._path;
    self.setStart();
    self._endPoint = self.getNode(end.x, end.y);
    if (!self.isWay(self._endPoint)) return self._path;
    self._starPoint = self.getNode(star.x, star.y);
    self._open = [];
    self._open.push(null);
    var isOver = false;
    var thisPoint = self._starPoint;
    while (!isOver) {
      thisPoint.isChecked = true;
      var checkList = [];
      if (thisPoint.y > 0) {
        checkList.push(self.getNode(thisPoint.x, thisPoint.y - 1));
      }
      if (thisPoint.x > 0) {
        checkList.push(self.getNode(thisPoint.x - 1, thisPoint.y));
      }
      if (thisPoint.x < self._w - 1) {
        checkList.push(self.getNode(thisPoint.x + 1, thisPoint.y));
      }
      if (thisPoint.y < self._h - 1) {
        checkList.push(self.getNode(thisPoint.x, thisPoint.y + 1));
      }
      //检测开始
      var startIndex = checkList.length;
      for (var i = 0; i < startIndex; i++) {
        //周围的每一个节点
        var checkPoint = checkList[i];
        console.log(checkPoint.x, checkPoint.y, self.isWay(checkPoint, thisPoint));
        if (self.isWay(checkPoint, thisPoint)) {
          //如果坐标可以通过，则首先检查是不是目标点
          if (checkPoint === self._endPoint) {
            //如果搜索到目标点，则结束搜索
            checkPoint.nodeparent = thisPoint;
            isOver = true;
            break;
          }
          self.count(checkPoint, thisPoint);
        } 
      }
      if (! isOver) {
        //如果未到达指定地点则取出f值最小的点作为循环点
        if (self._open.length > 1) {
          thisPoint = self.getOpen();
        } else {
          console.log('开发列表为空，寻路失败');
          //开发列表为空，寻路失败
          return [];
        }
      }
    }
    //路径做成
    self.drawPath(self._endPoint);
    return self._path;
  
  },
  /*判断是否可通过*/
  isWay: function(checkPoint, thisPoint) {
    if (this._endPoint.x === checkPoint.x && this._endPoint.y === checkPoint.y) {
      return true;
    }
    var v = this.getNode(checkPoint.x, checkPoint.y).value;
    if (v.id > 0 && v.seigniorId !== this.chara.seigniorId()) {
      return false;
    }
    var chara = CharacterManager.hashMap[checkPoint.x + '_' + checkPoint.y];
    if (chara && chara.model.seigniorId() !== this.chara.seigniorId()) {
      return false;
    }
    return true;
  },
  getNode: function(x, y) {
    var self = this;
    var key = x + ',' + y;
    if (!self._map[key]) {
      self._map[key] = new LNode(x, y, self._data[y][x]);
    }
    return self._map[key];
  }
};
function LNode(_x, _y, _v) {
  var self = this;
  self.x = _x;
  self.y = _y;
  self.value = _v[2];
  self.init();
}
LNode.prototype = {
  init: function() {
    var self = this;
    self.open = false;
    self.isChecked = false;
    self.value_g = 0;
    self.value_h = 0;
    self.value_f = 0;
    self.nodeparent = null;
    self.index = -1;
  }
};