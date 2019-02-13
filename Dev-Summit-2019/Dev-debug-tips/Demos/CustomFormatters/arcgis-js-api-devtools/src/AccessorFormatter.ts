import JSONMLElement from "./JSONMLElement";
import { Formatter } from "./interfaces";
import { className, propertyNames } from "./utils";

export default class AccessorFormatter implements Formatter {
  
  accept(object: any): boolean {
    return object && object.__accessor__ != null;
  }
  
  preview(object: any): any {
    let element = new JSONMLElement("span");
    element.createChild("span").createTextChild(className(object));
    return element;
  }
  
  hasChildren(object: any): boolean {
    return propertyNames(object).length > 0;  
  }
  
  children(object: any): { name: string, value: any }[] {
    let result: { name: string, value: any }[] = [];
    let names: string[] = propertyNames(object);
    for (let name of names) {
      result.push({
        name: name,
        value: object[name]
      });
    }
    return result;
  }
}
