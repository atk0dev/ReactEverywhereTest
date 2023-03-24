export interface CanvasItem {
	id: string;
	content: string;
  controlName: string;
  controlType: string;
  publicProps?: Array<ItemPublicProp>;
}

export interface ToolboxItem {
	id: string;
	content: string;
	typeName: string;
  publicProps: Array<ItemPublicProp>;
}

export interface ItemPublicProp {
  name: string;
  type: string;
  value?: any;
}


export interface CreateControlResult {
  control: any;
  publicProps: Array<ItemPublicProp>;
}