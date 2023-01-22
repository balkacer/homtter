export default async function asyncExecute<T>(callback: () => T, delayTime: number): Promise<T> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(callback()), delayTime)
  });
}