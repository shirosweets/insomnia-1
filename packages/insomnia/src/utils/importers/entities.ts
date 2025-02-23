import type * as Har from 'har-format';

export interface Comment {
  comment?: string;
}

export type Variable = `{{ ${string} }}`;

export interface Authentication extends Comment {
  authorizationUrl?: string;
  accessTokenUrl?: string;
  clientId?: string;
  clientSecret?: Variable;
  scope?: string;
  type?: 'basic' | 'oauth2';
  grantType?: 'authorization_code' | 'password' | 'client_credentials';
  disabled?: boolean;
  username?: string;
  password?: string;
}

export interface Parameter extends Comment {
  name: string;
  value?: string;
  filename?: string;
  fileName?: string;
  disabled?: boolean;
  type?: 'file' | string;
}

export type Body =
  | string
  | {
      mimeType?: string;
      text?: string;
      params?: Parameter[];
    };

export interface Cookie {
  name: string;
  value: string;
}

export interface Header extends Comment {
  name: 'Cookie' | 'Content-Type' | string;
  disabled?: boolean;
  value: any;
}

export interface QueryString extends Comment {
  name: string;
}

export type ImportRequestType =
  | 'environment'
  | 'request'
  | 'request_group'
  | 'workspace';

export interface ImportRequest<T extends {} = {}> extends Comment {
  _id?: string;
  // @TODO Fix me
  _type?: string;
  authentication?: Authentication;
  body?: Body;
  cookies?: Cookie[];
  environment?: {};
  headers?: Header[];
  httpVersion?: string;
  method?: string;
  name?: string;
  data?: T;
  description?: string;
  parameters?: Parameter[];
  parentId?: string | null;
  postData?: Har.PostData;
  variable?: any;
  queryString?: QueryString[];
  url?: string;
  preRequestScript?: string;
  afterResponseScript?: string;
  metaSortKey?: number;
  scope?: string;
  workspaceUuid?: string;
}

export type Converter<T extends {} = {}> = (
  rawData: string,
  extProp?: Record<string, any>,
) => ImportRequest<T>[] | Promise<ImportRequest<T>[] | null> | null;

export interface Importer {
  id: string;
  name: string;
  description: string;
  convert: Converter;
}
