/** Turn a Mongoose document into plain JSON the UI can safely render. */
export function serialize<T>(doc: unknown): T {
  return JSON.parse(JSON.stringify(doc)) as T;
}
