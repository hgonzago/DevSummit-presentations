const snippet = document.getElementById("code-snippet");
const btn = document.getElementById("toggle-snippet");
const width = snippet.clientWidth;
const margin = -width;
const increment = 1;
const inSine = (t) => (
  -Math.cos(t * Math.PI / 2) + 1
);

function animate(options) {
  options = options || {};

  // defaults
  const duration = options.duration || 500,
        ease = options.easing || (a => a),
        onProgress = options.onProgress || (_ => _),
        onComplete = options.onComplete || (_ => _),
        from = options.from || {},
        to = options.to || {};

  // runtime variables
  const startTime = Date.now();

  function update() {
    let deltaTime = Date.now() - startTime,
          progress = Math.min(deltaTime / duration, 1),
          factor = ease(progress),
          values = {},
          property;

    for(property in from) {
      if(from.hasOwnProperty(property) && to.hasOwnProperty(property)) {
        values[property] = from[property] + (to[property] - from[property]) * factor;
      }
    }

    onProgress(values);

    if(progress === 1) {
      onComplete(deltaTime);
    } else {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

function expand() {
  animate({
    easing: inSine,
    onProgress({a}) {
      snippet.style.marginLeft = `${a}px`;
    },
    onComplete() {
      btn.removeEventListener("click", expand);
      btn.addEventListener("click", collapse);
    },
    from: { a: margin },
    to: { a: 0 }
  });
}

function collapse() {
  animate({
    easing: inSine,
    onProgress({a}) {
      snippet.style.marginLeft = `${a}px`;
    },
    onComplete() {
      btn.removeEventListener("click", collapse);
      btn.addEventListener("click", expand);
    },
    from: { a: 0 },
    to: { a: margin }
  });
}

// add event listener
btn.addEventListener("click", expand);
