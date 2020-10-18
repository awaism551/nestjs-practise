export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type Query = {
  __typename?: 'Query';
  itemCategories?: Maybe<Array<Maybe<ItemCategory>>>;
  itemCategory?: Maybe<ItemCategory>;
};


export type QueryItemCategoryArgs = {
  itemCategoryId: Scalars['ID'];
};

export type ItemCategory = {
  __typename?: 'ItemCategory';
  id: Scalars['ID'];
  title: Scalars['String'];
};

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}
