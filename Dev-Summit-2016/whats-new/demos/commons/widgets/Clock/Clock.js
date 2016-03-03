(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.Clock = factory();
  }
}(this, function () {

  var DEG_PER_RAD = 180 / Math.PI;

  /* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in
    all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
    THE SOFTWARE. */
  var vec2 = {
    create: function() {
      return [0, 0];
    },
    cross: function(out, a, b) {
      var z = a[0] * b[1] - a[1] * b[0];
      out[0] = out[1] = 0;
      out[2] = z;
      return out;
    },
    dot: function (a, b) {
      return a[0] * b[0] + a[1] * b[1];
    },
    fromValues: function(x, y) {
      var out = [x, y];
      return out;
    },
    length: function (a) {
      var x = a[0],
          y = a[1];
      return Math.sqrt(x*x + y*y);
    },
    normalize: function(out, a) {
      var x = a[0];
      var y = a[1];
      var len = x*x + y*y;
      if (len > 0) {
        len = 1 / Math.sqrt(len);
        out[0] = a[0] * len;
        out[1] = a[1] * len;
      }
      return out;
    },
    set: function(out, x, y) {
      out[0] = x;
      out[1] = y;
      return out;
    },
    subtract: function(out, a, b) {
      out[0] = a[0] - b[0];
      out[1] = a[1] - b[1];
      return out;
    }
  };
  /****************/

  var angleBetween = (function() {
    var u = vec2.create();
    var v = vec2.create();
    var c = vec2.create();

    return function(anchor, a, b) {
      vec2.subtract(u, anchor, a);
      vec2.normalize(u, u);
      vec2.subtract(v, anchor, b);
      vec2.normalize(v, v);

      vec2.cross(c, u, v);
      
      // calculate the abs angle
      var angle = Math.acos(vec2.dot(u, v) / (vec2.length(u) * vec2.length(v))) * DEG_PER_RAD;

      // change the direction
      if (c[2] < 0) {
        angle = -angle;
      }

      if (isNaN(angle)) {
        angle = 0;
      }

      return angle;
    }
  })();

  var requestAnimationFrame = window.requestAnimationFrame || (function() {
    var raf = null;
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !raf; ++x) {
      raf = window[vendors[x]+'RequestAnimationFrame'];
    }
 
    if (!raf) {
      raf = function(callback, element) {
        var currTime = new Date().getTime();
        var timeToCall = Math.max(0, 16 - (currTime - lastTime));
        var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
          timeToCall);
        lastTime = currTime + timeToCall;
        return id;
      };
    }

    return raf.bind(window);
  }());

  var pointerBehavior = function(angleToMillisecsFn, evt) {
    var enabled = true;
    var svg = this.svg;
    var doc = this.el.ownerDocument;
    var bounds = this.skin.getBoundingClientRect();
    var mouseX = 0;
    var mouseY = 0;

    var enterFrame = function() {
      var deltaAngle = this._getDeltaAngle(mouseX, mouseY);
      if (deltaAngle !== 0) {
        this.mode = "manual";
        this.time += angleToMillisecsFn(deltaAngle);
      }
      if (enabled) {
        requestAnimationFrame(enterFrame);
      }
    }.bind(this);

    var mouseUp = function() {
      enabled = false;
      svg.removeEventListener("mouseup", mouseUp, true);
      doc.removeEventListener("mouseup", mouseUp, true);
      svg.removeEventListener("mousemove", mouseMove, true);
      doc.removeEventListener("mousemove", mouseMove, true);
    }.bind(this);

    var mouseMove = function(evt) {
      mouseX = evt.clientX + bounds.left;
      mouseY = evt.clientY + bounds.top;
    }
    // init the first values of mouseX/mouseY
    mouseMove(evt);

    svg.addEventListener("mouseup", mouseUp, true);
    doc.addEventListener("mouseup", mouseUp, true);
    doc.addEventListener("mousemove", mouseMove, true);
    svg.addEventListener("mousemove", mouseMove, true);

    // //systemManager.getSandboxRoot().addEventListener(MouseEvent.MOUSE_UP, pointerMouseUpHandler, false, 0, true);
    this._storeStartValues(bounds, evt);
    requestAnimationFrame(enterFrame);
  };

  var Clock = function(options) {
    this._raf = this._render.bind(this);
    this._liveButtonClick = function(evt) {
      this.mode = "live";
    }.bind(this);
    this._hoursMouseDown = pointerBehavior.bind(this, function(a) {
      // 30 degrees = 1 hour
      // 1 hour = 60 minutes
      // 60 minutes = 3,600,000 millisecs
      // 30 degrees = 3,600,000 millisecs
      // 1 degree = 3,600,000 / 30 = 120,000 millisecs
      return a * 120000;
    });
    this._minutesMouseDown = pointerBehavior.bind(this, function(a) {
      // 6 degrees = 1 minute
      // 1 minute = 60000 millisecs
      // 1 degree = 60000 / 6 = 10000 millisecs
      return a * 10000;
    });
    this._secondsMouseDown = pointerBehavior.bind(this, function(a) {
      // 6 degrees = 1 second
      // 1 second = 1000 millisecs
      // 1 degree = 1000 / 6 = 166 millisecs
      return a * 1000 / 6;
    });
    this._originVector = vec2.create();
    this._globalCenter = vec2.create();

    options = options || {};
    
    this.el = document.getElementById(options.el);
    options.skin = options.skin || "./src/clock.svg";

    var bounds = this.el.getBoundingClientRect();
    
    if (this.el) {
      var skin = this.skin = document.createElement('object');
      skin.setAttribute("type", "image/svg+xml");
      skin.setAttribute("data", options.skin);
      skin.setAttribute("width", bounds.width);
      skin.setAttribute("height", bounds.height);
      var loadHandler = function() {
        var svg = this.skin.getSVGDocument().firstChild;

        skin.removeEventListener("load", loadHandler);

        this.svg = svg;
        this.pointerHours = svg.getElementById("pointerHours");
        this.pointerMinutes = svg.getElementById("pointerMinutes");
        this.pointerSeconds = svg.getElementById("pointerSeconds");
        this.ampmLabel = svg.getElementById("ampmLabel");
        this.timeLabel = svg.getElementById("timeLabel");
        this.liveButton = svg.getElementById("liveButton");
      }.bind(this);
      skin.addEventListener("load", loadHandler);
      this.el.appendChild(skin);
    }

    this.mode = options.mode || "live";
    this.time = options.time || Date.now();
  };


  Clock.prototype = {
    _interval: -1,
    _bounds: null, 
    _pointerHours: null,
    _pointerMinutes: null,
    _pointerSeconds: null,

    on: function(event, fn) {
      var chain = this["on" + event];
      var next = null;
      if (!chain) {
        chain = function(data) {
          next = this.next;
          while (next) {
            next(data);
            next = next.next;
          }
        }
        this["on" + event] = chain.bind(chain);
        chain.next = fn;
        fn.prev = chain;
      }
      else {
        next = this.next;
        while (next.next) {
          next = next.next;
        }
        next.next = fn;
        fn.prev = next;
      }
      return {
        remove: function() {
          this.remove = function() {};
          fn.prev.next = fn.next;
          if (fn.next) {
            fn.next.prev = fn.prev;
          }
          fn.prev = null;
          fn.next = null;
        }
      };
    },

    emit: function(event, data) {
      var chain = this["on" + event];
      if (chain) {
        chain(data);
      }
    },

    _rerender: function() {
      if (!this._rafTimer) {
        this._rafTimer = requestAnimationFrame(this._raf);
      }
    },

    _render: function() {
      this._rafTimer = null;

      var pointerHours = this.pointerHours;
      var pointerMinutes = this.pointerMinutes;
      var pointerSeconds = this.pointerSeconds;
      var ampmLabel = this.ampmLabel;
      var timeLabel = this.timeLabel;
      if (!pointerHours || !pointerMinutes || !pointerSeconds) {
        this._rerender();
        return;
      }

      var date = new Date();
      date.setTime(this.time);

      this.svg.setAttribute("data-mode", this.mode);
      this.el.setAttribute("title", date.toLocaleString());
      this.el.setAttribute("aria-label", date.toLocaleString());

      var hours   = date.getHours();
      var minutes = date.getMinutes() + hours * 60;
      var seconds = date.getSeconds() + minutes * 60;
        
      var hoursAngle = (seconds / 120);
      var minutesAngle = seconds * 0.1;
      var secondsAngle = 6 * seconds;
        
      pointerHours.style.transform = "rotate(" + hoursAngle + "deg)";
      pointerMinutes.style.transform = "rotate(" + minutesAngle + "deg)";
      pointerSeconds.style.transform = "rotate(" + secondsAngle + "deg)";

      if (timeLabel) {
        timeLabel.innerHTML = (hours === 0 ? "12" : (hours > 12 ? hours % 12 : hours)) + ":" + (date.getMinutes() < 10 ? "0" : "") + date.getMinutes();
      }
      if (ampmLabel) {
        ampmLabel.innerHTML = date.getHours() < 12 ? "AM" : "PM";
      }
    },

    _hoursMouseDown: null,

    _minutesMouseDown: null,

    _secondsMouseDown: null,

    _liveButtonClick: null,

    _getDeltaAngle(mouseX, mouseY) {
      var deltaAngle = angleBetween(this._globalCenter, this._originVector, vec2.fromValues(mouseX, mouseY));
      vec2.set(this._originVector, mouseX, mouseY);
      return deltaAngle;
    },

    _storeStartValues: function(bounds, evt) {
      vec2.set(this._globalCenter, bounds.left + bounds.width * 0.5, bounds.top + bounds.height * 0.5);
      vec2.set(this._originVector, evt.clientX + bounds.left, evt.clientY + bounds.top);
    }
  };

  Object.defineProperties(Clock.prototype, {

    pointerHours: {
      get: function() {
        return this._pointerHours;
      },
      set: function(value) {
        if (this._pointerHours) {
          this._pointerHours.removeEventListener("mousedown", this._hoursMouseDown);
        }
        this._pointerHours = value;
        if (this._pointerHours) {
          this._pointerHours.addEventListener("mousedown", this._hoursMouseDown);
        }
      }
    },

    pointerMinutes: {
      get: function() {
        return this._pointerMinutes;
      },
      set: function(value) {
        if (this._pointerMinutes) {
          this._pointerMinutes.removeEventListener("mousedown", this._minutesMouseDown);
        }
        this._pointerMinutes = value;
        if (this._pointerMinutes) {
          this._pointerMinutes.addEventListener("mousedown", this._minutesMouseDown);
        }
      }
    },

    pointerSeconds: {
      get: function() {
        return this._pointerSeconds;
      },
      set: function(value) {
        if (this._pointerSeconds) {
          this._pointerSeconds.removeEventListener("mousedown", this._secondsMouseDown);
        }
        this._pointerSeconds = value;
        if (this._pointerSeconds) {
          this._pointerSeconds.addEventListener("mousedown", this._secondsMouseDown);
        }
      }
    },

    liveButton: {
      get: function() {
        return this._liveButton;
      },
      set: function(value) {
        if (this._liveButton) {
          this._liveButton.removeEventListener("click", this._liveButtonClick);
        }
        this._liveButton = value;
        if (this._liveButton) {
          this._liveButton.addEventListener("click", this._liveButtonClick);
        }
      }
    },

    mode: {
      get: function() {
        return this._mode;
      },
      set: function(value) {
        if (this._mode === value) { return; }
        this._mode = value;
        if (value === "manual" && this._interval !== -1) {
          clearInterval(this._interval);
          this._interval = -1;
        }
        else if (value === "live" && this._interval === -1) {
          this.time = Date.now();
          this._interval = setInterval(function() {
            this.time = Date.now();
          }.bind(this), 1000);
        }
      }
    },

    time: {
      get: function() {
        return this._time;
      },
      set: function(value) {
        if (this._time === value) { return; }
        this._time = value;
        this._rerender();
        this.emit("time-change", value);
      }
    }
  });

  return Clock;
}));