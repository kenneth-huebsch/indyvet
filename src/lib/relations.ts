export function isPopulatedDoc<T extends { id: number }>(
  value: number | T | null | undefined,
): value is T {
  return typeof value === 'object' && value !== null && 'id' in value
}

export function populatedDocs<T extends { id: number }>(
  values: (number | T)[] | null | undefined,
): T[] {
  if (!values?.length) {
    return []
  }

  return values.filter(isPopulatedDoc)
}
