import { Formatter } from "./interfaces";
import { className } from "./utils";
import JSONMLElement from './JSONMLElement';

export default class CollectionFormatter implements Formatter {
  
  accept(object: any): boolean {
    return object && object.__accessor__ != null && Array.isArray(object._items);
  }
  
  preview(object: any): any {
    let element = new JSONMLElement("span");
    element.createChild("span").createTextChild(className(object));
    element.createChild("span").createTextChild(`[${object.length}]`);
    return element;
  }
  
  hasChildren(object: any): boolean {
    return object.length > 0;
  }
  
  children(object: any): { name: string, value: any }[] {
    let result: { name: string, value: any }[] = [];
    let elements: any[] = object.toArray();
    for (let i = 0; i < elements.length; ++i) {
        result.push({name: i + "", value: elements[i]});
    }
    return result;
  }
}
