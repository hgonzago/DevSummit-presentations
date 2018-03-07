export interface Formatter {
  accept(object: any): boolean;
  preview(object: any): any;
  hasChildren(object: any): boolean;
  children(object: any): { name: string, value: any }[];
}
