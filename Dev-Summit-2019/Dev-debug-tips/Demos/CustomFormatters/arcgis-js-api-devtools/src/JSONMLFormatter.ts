import JSONMLElement from "./JSONMLElement";

import { Formatter } from "./interfaces";

type Config = { preview?: JSONMLElement };

export default class JSONMLFormatter {

  constructor(formatter: Formatter) {
    this._formatter = formatter;
  }

  private _formatter: Formatter;

  header(object: any, config: Config): string | any[] {
    if (!this._formatter.accept(object)) {
      return null;
    }
    
    let child = this._formatter.preview(object);
    
    let preview = config && config.preview;
    let header = new JSONMLElement("span");
    if (preview) {
      header.appendChild(preview);
    }
    
    if (child && typeof child === "string") {
      header.createTextChild(child);
    }
    else {
      header.appendChild(child);
    }

    return header.toJSONML();
  }

  hasBody(object: any, config: Config) {
    return this._formatter.hasChildren(object);
  }

  body(object: any) {
    let formatter = this._formatter;
    let body = new JSONMLElement("ol");
    body.setStyle("list-style-type: none; padding: 0; margin: 0 0 0 12px; font-style: normal");
    
    let children = formatter.children(object);
    
    for (let child of children) {
      
      let li = body.createChild("li");
      
      let nameSpan = new JSONMLElement("span");
      nameSpan.createTextChild(`${child.name}: `);
      nameSpan.setStyle("color: rgb(136, 19, 145);");
      
      if (formatter.accept(child.value)) {
        // expandable arrow
        let objectTag = li.createObjectTag(child.value);
        objectTag.addAttribute("config", { preview: nameSpan });
        
        if (!formatter.hasChildren(child.value)) {
          li.setStyle("padding-left: 13px;");
        }
      }
      else {
        li.appendChild(nameSpan);
        li.setStyle("padding-left: 13px;");
        
        // special treatement if the value is undefined
        if (child.value === undefined) {
          let valueSpan = new JSONMLElement("span");
          valueSpan.createTextChild("undefined");
          valueSpan.setStyle("color: #777");
          li.appendChild(valueSpan);
        }
        else {
          // else let chrome rendering the value
          li.createObjectTag(child.value);
        }
      }
    }
    
    return body.toJSONML();
  }

}
