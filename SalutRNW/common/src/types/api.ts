export type LoginResponse = {
  token: string;
  userID: string;
  success: boolean;
  message: string;
};

export type ContentResponse = {
  configurationId: string;
  contentItems: ContentItem[];
}

export type ContentItem = {
  itemId: string;
  contentType: string;
  title: string;
  contents: string;
}

export type ProjectResponse = {
  id: string;
  name: string;
  owner: string;
  description: string;
  components: ComponentResponse[];
}

export type ComponentResponse = {
  id: string;
  typeName: string;
  publicProps: PublicPropResponse[];
}

export type PublicPropResponse = {
  name: string;
  type: string;
  value: string;
}
