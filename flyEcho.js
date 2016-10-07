/**
 * @author doodlewind
 * @licence MIT
 */
(function() {
  Function.prototype.before = function(fn) {
    var _this = this;
    return function() {
      if (fn.apply(this, arguments) === false) {
        return false;
      }
      return _this.apply(this, arguments);
    }
  };

  Function.prototype.after = function(fn) {
    var _this = this;
    return function() {
      var ret = _this.apply(this, arguments);
      if (ret === false) {
        return false;
      }
      fn.apply(this, arguments);
      return ret;
    }
  }

  var flyHubHref = document.getElementById('fly-echo').src.replace(/flyEcho(\.min)*\.js/, 'log');
  var reportFlyHub = function(type, data) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', flyHubHref);
    xhr.send(JSON.stringify({ type: type, data: data }));
  }

  console.log = console.log.before(function() {
    reportFlyHub('log', { src: window.location.host, content: [].slice.call(arguments) });
  });

  window.onerror = function(message, source, lineNo) {
    reportFlyHub('error', { content: message, src: source, lineNo: lineNo });
  };

  var getPerformanceTiming = function() {
    var performance = window.performance;
    if (!performance) {
      console.log('performance API not supported');
      return;
    }

    var t = performance.timing;
    var times = {};
    times.loadFullPage = t.loadEventEnd - t.navigationStart;       // full page load time
    times.domReady = t.domComplete - t.responseEnd;                // DOM parse time
    times.redirect = t.redirectEnd - t.redirectStart;              // URL redirect time
    times.lookupDomain = t.domainLookupEnd - t.domainLookupStart;  // DNS query time
    times.ttfb = t.responseStart - t.navigationStart;              // time to first byte
    times.request = t.responseEnd - t.requestStart;                // response time since request start
    times.loadEvent = t.loadEventEnd - t.loadEventStart;           // window.onload execution time

    return times;
  }

  window.onload = (window.onload || function() {}).after(function() {
    // run after window.onload returns to get correct timing
    setTimeout(function() {
      var times = getPerformanceTiming();
      reportFlyHub('performance', { src: window.location.host, content: times });
    }, 0);
  });

})();
