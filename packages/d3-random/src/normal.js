import defaultSource from "./defaultSource";

export default (function sourceRandomNormal(source) {

  // 正态分布，分别为均值和方差。如果没有传递则默认为服从(0,1)的正态分布
  function randomNormal(mu, sigma) {
    var x, r;
    mu = mu == null ? 0 : +mu;
    sigma = sigma == null ? 1 : +sigma;


    return function() {
      var y;

      // If available, use the second previously-generated uniform random.
      if (x != null) {
        y = x, x = null;
      }

      // Otherwise, generate a new x and y.
      else do {
        x = source() * 2 - 1;
        y = source() * 2 - 1;
        r = x * x + y * y;
      } while (!r || r > 1);

      return mu + sigma * y * Math.sqrt(-2 * Math.log(r) / r);
    };
  }

  randomNormal.source = sourceRandomNormal;

  return randomNormal;
})(defaultSource);
