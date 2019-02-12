import JSONMLElement from "./JSONMLElement";
import { Formatter } from "./interfaces";

export default class AccessorFormatter implements Formatter {
  
  accept(object: any): boolean {
    return object && typeof object.toRgba === "function";
  }
  
  preview(object: any): any {
    let element = new JSONMLElement("span");
    let [ r, g, b, a ] = object.toRgba();
    element.createChild("span").createTextChild(`[${r}, ${g}, ${b}, ${a}]`).setStyle("float: right");
    element.createChild("div").setStyle(`float: right; width: 10px; height: 10px; margin-top: 3px; margin-right: 4px; border: 1px solid black; background: ${object}`);
    return element;
  }
  
  hasChildren(object: any): boolean {
    return false;
  }
  
  children(object: any): { name: string, value: any }[] {
    return null;
  }
}
