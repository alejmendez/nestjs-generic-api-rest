import { INestApplication } from '@nestjs/common';
import * as supertest from 'supertest';
import { initServer } from './server';

let appInstance: INestApplication;
let requestInstance: supertest.SuperTest<supertest.Test>;
let headersByDefault: { [key: string]: string } = {};

const setHeadersToRequest = (request: supertest.Test): supertest.Test => {
  Object.entries(headersByDefault).map(([index, value]) => {
    request.set(index, value);
  });
  return request;
};

export const startServer = async (): Promise<void> => {
  setServer(await initServer());
};

export const setServer = async (app: INestApplication): Promise<void> => {
  appInstance = app;
  requestInstance = supertest(app.getHttpServer());
};

export const closeServer = async () => {
  await appInstance.close();
};

export const setHeaders = (headers: { [key: string]: string }) => {
  headersByDefault = headers;
};

export const get = (url: string, cb?: supertest.CallbackHandler) => {
  return setHeadersToRequest(requestInstance.get(url, cb));
};

export const post = (
  url: string,
  data?: any,
  cb?: supertest.CallbackHandler,
) => {
  return setHeadersToRequest(requestInstance.post(url, cb).send(data));
};

export const put = (
  url: string,
  data?: any,
  cb?: supertest.CallbackHandler,
) => {
  return setHeadersToRequest(requestInstance.put(url, cb).send(data));
};

export const patch = (
  url: string,
  data?: any,
  cb?: supertest.CallbackHandler,
) => {
  return setHeadersToRequest(requestInstance.patch(url, cb).send(data));
};

export const del = (url: string, cb?: supertest.CallbackHandler) => {
  return setHeadersToRequest(requestInstance.del(url, cb));
};
