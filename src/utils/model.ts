export function UniqueModels<T extends { id: string; }>(models: T[]): T[] {
  return Array.from(
    new Map(models.map((model: { id: string }) => [model.id, model])).values(),
  ) as T[];
}

export const GroupBy = <K, V>(
  array: readonly V[],
  getKey: (cur: V, idx: number, src: readonly V[]) => K,
): [K, V[]][] =>
  Array.from(
    array.reduce((map, cur, idx, src) => {
      const key = getKey(cur, idx, src);
      const list = map.get(key);
      if (list) list.push(cur);
      else map.set(key, [cur]);
      return map;
    }, new Map<K, V[]>()),
  );
