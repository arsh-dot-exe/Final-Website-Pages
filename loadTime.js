function loadTime() {
  var loadTime = performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart;
  console.log(loadTime);
}
