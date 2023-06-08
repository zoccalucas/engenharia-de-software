import { MongoClient, Collection } from 'mongodb';

export const MongoHelper = {
  client: null as MongoClient | null,
  uri: null as unknown as string,

  async connect(uri: string): Promise<void> {
    this.uri = uri;
    this.client = await MongoClient.connect(uri);
  },

  async disconnect(): Promise<void> {
    if (this.client) {
      await this.client.close();
      this.client = null;
    }
  },

  async getCollection(name: string): Promise<Collection> {
    if (!this.client?.isConnected()) {
      await this.connect(this.uri);
    }

    if (!this.client) {
      throw new Error('MongoDB client is not connected');
    }

    return this.client.db().collection(name);
  },

  map: (collection: any): any => {
    const { _id, ...collectionWithoutId } = collection;
    return Object.assign({}, collectionWithoutId, { id: _id });
  },

  mapCollection: (collection: any[]): any[] => {
    return collection.map(c => MongoHelper.map(c));
  }
};
