// D3可以处理DOM节点的结构、样式、属性等信息
function htmlRemove() {
  this.innerHTML = "";
}

function htmlConstant(value) {
  return function() {
    this.innerHTML = value;
  };
}

function htmlFunction(value) {
  return function() {
    var v = value.apply(this, arguments);
    this.innerHTML = v == null ? "" : v;
  };
}

export default function(value) {
  return arguments.length
    ? this.each(
        value == null
          ? htmlRemove
          : (typeof value === "function" ? htmlFunction : htmlConstant)(value)
      )
    : this.node().innerHTML;
}