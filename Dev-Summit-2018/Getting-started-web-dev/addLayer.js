
<script>
  require(["esri/layers/FeatureLayer"], 
    function(FeatureLayer) {

    var map = new Map({
      basemap: "hybrid"
    });

    var featureLayer = new FeatureLayer({
      url: "http://sampleserver6.arcgisonline.com/.../MapServer/1"
    });

    map.add(featureLayer);

  });
</script>




