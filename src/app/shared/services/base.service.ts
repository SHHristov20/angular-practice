import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export abstract class BaseService<T extends { id: number }, Dto = Omit<T, 'id' | 'createdAt'>> {
  private readonly _items: T[] = [];

  constructor(items?: T[]) {
    if (items) {
      this._items.push(...items);
    }
  }

  getAll(): T[] {
    return this._items;
  }

  getById(id: number): T | undefined {
    return this._items.find((e: any) => e.id === id);
  }

  add(item: Dto) {
    const newItem = {
      id: this.generateId(),
      ...item,
    };
    this._items.push(newItem as unknown as T);
  }

  edit(id: number, updatedItem: Dto) {
    const itemIndex = this._items.findIndex((e: any) => e.id === id);
    if (itemIndex !== -1) {
      this._items[itemIndex] = {
        id,
        ...updatedItem,
      } as unknown as T;
    }
  }

  delete(id: number) {
    const itemIndex = this._items.findIndex((e: any) => e.id === id);
    if (itemIndex !== -1) {
      this._items.splice(itemIndex, 1);
    }
  }

  private generateId(): number {
    return this._items.length ? Math.max(...this._items.map((i) => i.id)) + 1 : 1;
  }
}
