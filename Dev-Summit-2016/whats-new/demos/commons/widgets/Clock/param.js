// view-source:http://www.w3.org/TR/SVGParamPrimer/param.js

var svgns = "http://www.w3.org/2000/svg";
var xlinkns = "http://www.w3.org/1999/xlink";

GetParams();

function GetParams() {
  var uids = [];

  var paramArray = [];
  if ( document.defaultView.frameElement ) {
     var params = document.defaultView.frameElement.getElementsByTagName("param");
     for ( var i = 0, iLen = params.length; iLen > i; i++ ) {
        var eachParam = params[ i ];
        var name = eachParam.getAttribute( "name" );
        var value = eachParam.getAttribute( "value" );

        paramArray[ name ] = value;
     }
  }

  var href = document.defaultView.location.href;
  if ( -1 != href.indexOf("?") ) {
    var paramList = href.split("?")[1].split(/&|;/);
    for ( var p = 0, pLen = paramList.length; pLen > p; p++ ) {
       var eachParam = paramList[ p ];
       var valList = eachParam.split("=");
       var name = unescape(valList[0]);
       var value = unescape(valList[1]);
       paramArray[ name ] = value;
     }
  }

  var hasTime = paramArray.indexOf("time") !== -1;
  var time = Date.now();
  if (hasTime) {
    time = paramArray[paramArray.indexOf("time")];
  }
  
  var date = new Date();

  date.time = time;

  var hours = date.getHours();
  var minutes = date.getMinutes();
  var seconds = date.getSeconds();

  var pointerHours = document.getElementById("pointerHours");
  var pointerMinutes = document.getElementById("pointerMinutes");

  pointerHours.setAttributeNS(null, "transform", ["rotate(", 360 / 12 * hours ,", 0, 0)"].join(""));
  pointerMinutes.setAttributeNS(null, "transform", ["rotate(", 360 / 60 * minutes,", 0, 0)"].join(""));
  // SetElementValues( paramArray, uids );
}
