/**
 * 对连续型定义域进行离散化处理，即进行线性采样
 * @param {*} range 
 */
export default function(range) {
  var n = range.length;
  
  return function(t) {
    return range[Math.max(0, Math.min(n - 1, Math.floor(t * n)))];
  };
}
