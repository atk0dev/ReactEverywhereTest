export interface CanvasItem {
	id: string;
	controlName: string;
  controlType: string;
  publicProps?: Array<ItemPublicProp>;
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
  typeName: string;
  publicProps: Array<ItemPublicProp>;

}