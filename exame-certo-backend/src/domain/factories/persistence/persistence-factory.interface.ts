export interface PersistenceFactory<TEntity, TDocument, TDomain> {
  createEntity(): TEntity;
  configurePersistence(persistence: TEntity, data: TDomain): TEntity;

  createDocument(): TDocument;
  configureDocument(document: TDocument, data: TDomain): TDocument;
}
