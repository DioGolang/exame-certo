type Entity = { id: string | number };
type CID10 = { cod: string };
type Medicine = { name: string };

export class EntityUtils {
  static addToCollection<T extends Entity>(
    collection: T[],
    item: T,
    checkFn: (item: T) => void,
  ): void {
    checkFn(item);
    collection.push(item);
  }

  static addToCollectionCID10<T extends CID10>(
    collection: T[],
    item: T,
    checkFn: (item: T) => void,
  ): void {
    checkFn(item);
    collection.push(item);
  }

  static addToCollectionMedicine<T extends Medicine>(
    collection: T[],
    item: T,
    checkFn: (item: T) => void,
  ): void {
    checkFn(item);
    collection.push(item);
  }

  static checkDuplicate<T extends Entity>(
    item: T,
    collection: T[],
    itemType: string,
    ExceptionType: new (message: string) => Error,
  ): void {
    if (!item) throw new ExceptionType(`${itemType} is required`);
    if (collection.some((c) => c.id === item.id)) {
      throw new ExceptionType(`${itemType} already added.`);
    }
  }

  static checkDuplicateCID10<T extends CID10>(
    item: T,
    collection: T[],
    itemType: string,
    ExceptionType: new (message: string) => Error,
  ): void {
    if (!item) throw new ExceptionType(`${itemType} is required`);
    if (collection.some((c) => c.cod === item.cod)) {
      throw new ExceptionType(`${itemType} already added.`);
    }
  }

  static checkDuplicateMedicine<T extends Medicine>(
    item: T,
    collection: T[],
    itemType: string,
    ExceptionType: new (message: string) => Error,
  ): void {
    if (!item) throw new ExceptionType(`${itemType} is required`);
    if (collection.some((m) => m.name === m.name)) {
      throw new ExceptionType(`${itemType} already added.`);
    }
  }

  static removeFromCollection<T extends Entity>(
    collection: T[],
    item: T,
    ExceptionType: new (message: string) => Error,
    notFoundMessage: string,
  ): void {
    const index = collection.indexOf(item);
    if (index === -1) {
      throw new ExceptionType(notFoundMessage);
    }
    collection.splice(index, 1);
  }

  static isAssociatedWith<T extends Entity>(collection: T[], item: T): boolean {
    return collection.includes(item);
  }
}
