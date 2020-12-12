
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export interface IQuery {
    itemCategories(): ItemCategory[] | Promise<ItemCategory[]>;
    itemCategory(itemCategoryId: string): ItemCategory | Promise<ItemCategory>;
    items(): Item[] | Promise<Item[]>;
    item(itemId: string): Item | Promise<Item>;
}

export interface IMutation {
    createItemCategory(title: string): ItemCategory | Promise<ItemCategory>;
    updateItemCategory(itemCategoryId: string, title: string): ItemCategory | Promise<ItemCategory>;
    deleteItemCategory(itemCategoryId: string): boolean | Promise<boolean>;
    createItem(name: string, price: number): Item | Promise<Item>;
    updateItem(itemId: string, name: string, price: number): Item | Promise<Item>;
    deleteItem(itemId: string): boolean | Promise<boolean>;
}

export interface ItemCategory {
    id: string;
    title: string;
}

export interface Item {
    id: string;
    name: string;
    price: number;
}