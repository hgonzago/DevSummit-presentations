export type tagName = "div" | "span" | "ol" | "li" | "table" | "tr" | "td" | "object";

export default class JSONMLElement {
  
  constructor(tagName: tagName) {
    this._attributes = {};
    this._jsonML = [tagName, this._attributes];
  }
  
  private _attributes: { [key: string]: any };
  private _jsonML: any[];
  
  appendChild(element: JSONMLElement) {
    this._jsonML.push(element.toJSONML());
    return element;
  }

  createChild(tagName: tagName) {
    return this.appendChild(new JSONMLElement(tagName));
  }

  createObjectTag(object: any) {
    let tag = this.createChild("object");
    tag.addAttribute("object", object);
    return tag;
  }

  setStyle(style: string) {
    this._attributes["style"] = style;
    return this;
  }

  addAttribute(key: string, value: any) {
    this._attributes[key] = value;
    return this;
  }

  createTextChild(text: any) {
    this._jsonML.push(text + "");
    return this;
  }

  toJSONML() {
    return this._jsonML; 
  }
}
