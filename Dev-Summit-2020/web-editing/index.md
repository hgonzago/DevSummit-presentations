<!-- .slide: data-background="../reveal.js/img/bg-1.png" -->
<!-- .slide: class="title" -->
</br>
</br>
### ArcGIS API for JavaScript: 
### Web Editing in 2D and 3D

#### Jonathan Uihlein, Heather Gonzago, and David Koerner

### <small>Slides & demos: https://bit.ly/2PKX5Mx </small>

---

### **Overview**

- Web Editing
- API widget editing
- 2d editing workflows
- 3d editing workflows

---

### **Editing in a feature service**

</br>

- <a href="https://developers.arcgis.com/rest/services-reference/feature-service.htm" target="_blank">Editable</a>
- One or more feature layers
- Users can draw, update, and/or create features

---

### 👉 **Set constraints at the service level** 👈

</br>

- Can be set **but not enforced** in web clients
- Consistent behavior across all clients

---

### **Setting the feature layer's editable settings in AGO/Portal**

<img src="./images/feature-layer-settings.png" height="600" style="margin-left:10px; margin-right: 10px;"/>

---

### **Edit a feature layer**

</br>
* <a href="https://developers.arcgis.com/rest/services-reference/feature-service.htm" target="_blank">ArcGIS REST API</a>
* <a href="https://doc.arcgis.com/en/arcgis-online/manage-data/edit-features.htm" target="_blank">ArcGIS Online</a>
* <a href="https://developers.arcgis.com/python/guide/editing-features/" target="_blank">ArcGIS API for Python</a>
* <a href="https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Editor.html" target="_blank">ArcGIS API for JavaScript</a>

---

### **ArcGIS API for JavaScript**

</br>

🔑 Configurable widgets

<hr style="width: 20%;">

⌨️ Granular APIs

---

### **Configurable Widgets**

</br>

- <a href="https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Editor.html" target="_blank">Editor</a>
  - Geometry: <a href="https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Sketch.html" target="_blank">Sketch</a>
  - Fields/attributes: <a href="https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-FeatureForm.html" target="_blank">FeatureForm</a>
  - <a href="https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-FeatureTemplates.html" target="_blank">FeatureTemplates</a>

---

### **Granular APIs**

</br>

- <a href="https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Sketch-SketchViewModel.html" target="_blank">SketchViewModel</a>
- <a href="https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-GraphicsLayer.html" target="_blank">GraphicsLayer</a>
- <a href="http://developers.arcgis.com/javascript/latest/api-reference/esri-layers-FeatureLayer.html#applyEdits" target="_blank">FeatureLayer.applyEdits</a>
- <a href="https://developers.arcgis.com/javascript/latest/api-reference/esri-geometry-geometryEngine.html" target="_blank">GeometryEngine</a>

---

### **[Editor](https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Editor.html) widget**

<a href="https://developers.arcgis.com/javascript/latest/sample-code/widgets-editor-basic/index.html" target="_blank">
  <img style="float: center;" src="images/editor-in-action.gif">
</a>

---

</br>
</br>
## **2d editing workflows**

---

### **Recap: Configurable Widgets**

</br>

- <a href="https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Editor.html" target="_blank">Editor</a>
  - Comprised of other widgets
    - <a href="https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-FeatureForm.html" target="_blank">FeatureForm</a> - Form based editing
    - <a href="https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Sketch.html" target="_blank">Sketch</a> - Geometry based editing
  - Responsible for applying updates to the FeatureLayer
    - FeatureForm and Sketch are _client-side_

---

### **Form-based**

[<img src="images/ff-in-action.gif" height="600" style="margin-left:10px; margin-right: 10px;"/>](https://developers.arcgis.com/javascript/latest/sample-code/editing-groupedfeatureform/index.html)

☝ `FeatureForm`

---

## [FeatureForm](https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-FeatureForm.html)

</br>
* Renders input fields from fields & attributes
* Configurable
  * Field order
  * Label/description
  * Groups
  * Visibility expression

---

### **FeatureForm demo**

[<img src="images/ff-demo.png" height="600" style="margin-left:10px; margin-right: 10px;"/>](Demos/feature-form/index.html)

---

### **Geometry-based**

<a href="https://developers.arcgis.com/javascript/latest/sample-code/sketch-geometries/index.html"><img src="images/sketch-basic-updating.png" height="600" style="margin-left:10px; margin-right: 10px;"/></a>

☝ `Sketch`

---

### [Sketch](https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Sketch.html)

- Used to modify feature geometries
- Provides two major workflows (or operations)
  - create
  - update (includes delete)
- Configurable options for both workflows
- Manages user interactions with the view internally
  - Can be disabled to provide more control directly to developers

---

### **Geometry-based Demos**

- [Hello Sketch](https://developers.arcgis.com/javascript/latest/sample-code/sketch-geometries/index.html)
- [Using applyEdits with SketchViewModel](Demos/sketch-applyEdits-create-polygon/applyEdits-create-polygon.html)
- [Creating custom tools using SketchViewModel](Demos/sketch-custom-tools/sketch-custom-tools.html)

---

</br>
</br>
## **3d editing workflows**

---

## David Koerner

---

### **\* David adds his section specific to 3d stuff**

---

<!-- .slide: data-background="../reveal.js/img/bg-4.png" -->
</br>

## Questions?

</br>
</br>
👉Slides & demos: https://bit.ly/2PKX5Mx 👈

---

---

<!-- .slide: data-background="../reveal.js/img/bg-rating.png" -->
