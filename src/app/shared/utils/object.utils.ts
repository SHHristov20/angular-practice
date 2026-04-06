import { formatDate } from '@angular/common';

function sort<T>(items: T[], sortBy: keyof T, direction: 'asc' | 'desc'): T[] {
  return items.sort((a, b) => {
    const left = a[sortBy];
    const right = b[sortBy];

    let result = 0;

    if (typeof left === 'number' && typeof right === 'number') {
      result = left - right;
    } else if (left instanceof Date && right instanceof Date) {
      result = left.getTime() - right.getTime();
    } else {
      result = String(left).localeCompare(String(right));
    }

    return direction === 'asc' ? result : -result;
  });
}

function filter<T>(items: T[], filter: { property: keyof T; value: string }): T[] {
  return items.filter((item) => {
    const itemValue = String(item[filter.property]).toLowerCase();
    return itemValue.includes(filter.value.toLowerCase());
  });
}

function getDetails<T>(item: T, excluded?: (keyof T)[]): { label: string; value: string }[] {
  const details: { label: string; value: string }[] = [];

  for (const key in item) {
    if (excluded && excluded.includes(key as keyof T)) {
      continue;
    }
    const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());
    const value =
      item[key] instanceof Date ? formatDate(item[key], 'MM/dd/yyyy', 'en-US') : String(item[key]);
    details.push({ label, value });
  }

  return details;
}

export { sort, filter, getDetails };
