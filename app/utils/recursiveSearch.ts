export default function recursiveSearch<T>(obj: T, recursiveKey: keyof T, searchKey: keyof T, callback: (obj: T) => Boolean): any {
  if (callback(obj)) {
    return obj[searchKey]
  }

  if (Array.isArray(obj[recursiveKey])) {
    const childResults: any = (obj[recursiveKey] as T[]).reduce((value, current) => {
      if (value) {
        return value
      }

      if (callback(current)) {
        return current[searchKey];
      }

      if (Array.isArray(current[recursiveKey])) {
        return recursiveSearch(current, recursiveKey, searchKey, callback)
      }
    }, undefined);

    return childResults || null;
  }

  return recursiveSearch(obj[recursiveKey] as T, recursiveKey, searchKey, callback);
}