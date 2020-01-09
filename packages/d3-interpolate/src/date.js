/**
 * 时间插值
 * @param {*} a 
 * @param {*} b 
 */
export default function(a, b) {
  var d = new Date;
  return a = +a, b -= a, function(t) {
    return d.setTime(a + b * t), d;
  };
}
