export function formatNamespace(namespace: string) {
  return namespace
    .replace(" ", "-")
    .replace(/[^A-Za-z0-9-]/g, "")
    .toLowerCase()
}
