import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { SuperTest, Test } from 'supertest';
import { initServer } from './server';

let appInstance: INestApplication;
let requestInstance: SuperTest<Test>;
let headersByDefault: any = {};

const setHeadersToRequest = (request) => {
  Object.entries(headersByDefault).map(([index, value]) => {
    request.set(index, value);
  });
  return request;
};

export const startServer = async () => {
  setServer(await initServer());
};

export const setServer = async (app: INestApplication) => {
  appInstance = app;
  requestInstance = request(app.getHttpServer());
};

export const closeServer = async () => {
  await appInstance.close();
};

export const setHeaders = (headers: any) => {
  headersByDefault = headers;
};

export const get = (url: string, callback?: request.CallbackHandler) => {
  return setHeadersToRequest(requestInstance.get(url, callback));
};

export const post = (url: string, callback?: request.CallbackHandler) => {
  return setHeadersToRequest(requestInstance.post(url, callback));
};

export const put = (url: string, callback?: request.CallbackHandler) => {
  return setHeadersToRequest(requestInstance.put(url, callback));
};

export const patch = (url: string, callback?: request.CallbackHandler) => {
  return setHeadersToRequest(requestInstance.patch(url, callback));
};

export const del = (url: string, callback?: request.CallbackHandler) => {
  return setHeadersToRequest(requestInstance.del(url, callback));
};
