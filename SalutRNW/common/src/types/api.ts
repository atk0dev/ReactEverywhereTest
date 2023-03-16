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