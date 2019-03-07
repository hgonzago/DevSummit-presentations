<!-- .slide: data-background="../reveal.js/img/bg-1.png" -->
<!-- .slide: class="title" -->
</br>
</br>
## Better UX with the ArcGIS API for JavaScript
Heather Gonzago and Kelly Hutchins

----
<!-- .slide: data-background="../reveal.js/img/bg-3.png" -->
### **Overview**

- SDK
- PopupTemplate/Content elements/Formatting
- Popup widget
- Feature widget
- Styling/Sass

----

### References

- [API Reference](https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Popup.html)
- [Samples](https://developers.arcgis.com/javascript/latest/sample-code/index.html?search=Popup)
- [Styling](https://developers.arcgis.com/javascript/latest/guide/styling/index.html)

----

### Popup Template

- [API Reference](https://developers.arcgis.com/javascript/latest/api-reference/esri-PopupTemplate.html)
- [Content Elements](https://developers.arcgis.com/javascript/latest/api-reference/esri-support-ContentElement-ContentElement.html)

----
### Popup Template : Media

* <a href="https://developers.arcgis.com/javascript/latest/api-reference/esri-support-ContentElement-Media.html" target="_blank">API Reference</a>
* <a href="demos/Media.html" target="_blank">Media popup sample</a>

----
### Popup Template : Fields

* <a href="https://developers.arcgis.com/javascript/latest/api-reference/esri-support-ContentElement-Fields.html" target="_blank">API Reference</a>
* <a href="demos/Fields.html" target="_blank">Fields popup sample</a>

----

### Popup Template : Attachments
* <a href="https://developers.arcgis.com/javascript/latest/api-reference/esri-support-ContentElement-Attachments.html" target="_blank">API Reference</a>
* <a href="demos/Attachments.html" target="_blank">Attachments popup sample</a>


----
### Popup Template: Formatting

- [Formatting](https://developers.arcgis.com/javascript/latest/api-reference/esri-support-FieldInfo-Format.html)

```
{fieldName: 'PROMINENCE_ft',
  label: 'Prominence (feet)',
  format: {
    places: 0,
    digitSeparator: true
  }
  },{
    fieldName: 'Recorded',
    label: 'Recorded Date',
    format: {
      dateFormat: 'short-date'
    }
```

----
### Popup widget

- [API Reference](https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Popup.html)
- [Responsive](https://developers.arcgis.com/javascript/latest/guide/styling/index.html#view-size-css-classes)
* <a href="demos/Responsive.html" target="_blank">Responsive sample</a>
[Actions](https://developers.arcgis.com/javascript/latest/sample-code/popup-custom-action/index.html)
* <a href="demos/CustomPopupActions.html" target="_blank">Custom actions sample</a>
----

### Feature widget

- [API Reference](https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Feature.html)
- [Demo](https://developers.arcgis.com/javascript/latest/sample-code/highlight-point-features/index.html)
  

----

### Styling

- [Guide](https://developers.arcgis.com/javascript/latest/guide/styling/index.html)
- [Preset Themes](https://codepen.io/kellyhutchins/full/Lqebdm)

----

### Sass

- CSS Extension language
- SASS
- [Theme Utility](https://github.com/jcfranco/jsapi-styles)


<aside class="notes">Demo Franco's SASS utility (npm install and show code)</aside

----

### Author content in Online

- Formatting
- Attachments
- Media
- Arcade
- [Demo Map](https://jsapi.maps.arcgis.com/home/webmap/viewer.html?webmap=1add0bb044974d558f263ea468710aad)
- [Demo App](https://codepen.io/kellyhutchins/full/eXgoMm)

----

<!-- .slide: data-background="../reveal.js/img/bg-final.jpg" -->

## Questions?

**Help us to improve** by filling out the survey

![Survey](images/survey-slide.png)

----
