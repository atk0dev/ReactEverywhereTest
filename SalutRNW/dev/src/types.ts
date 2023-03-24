export interface CanvasItem {
	id: string;
}

export interface ToolboxItem {
	id: string;
	typeName: string;
  publicProps: Array<ItemPublicProp>;
}

export interface ItemPublicProp {
  name: string;
  type: string;
  value: any;
}


export interface CreateControlResult {
  control: any;
  publicProps: Array<ItemPublicProp>;
}

export interface PropertyChangedResult {
  controlId: string;
  propertyName: string;
  propertyValue: string;

}