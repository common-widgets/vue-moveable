let count = 0
export function useCount() {
  return ++count
}
export function getMaxCount(add: number) {
  return count + add
}