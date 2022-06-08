import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { SuperTest, Test } from 'supertest';
import { initServer } from './server';

let appInstance: INestApplication;
let requestInstance: SuperTest<Test>;
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
export const get = (url: string, callback?: request.CallbackHandler) => {
  return requestInstance.get(url, callback);
};
export const post = (url: string, callback?: request.CallbackHandler) => {
  return requestInstance.post(url, callback);
};
export const put = (url: string, callback?: request.CallbackHandler) => {
  return requestInstance.put(url, callback);
};
export const patch = (url: string, callback?: request.CallbackHandler) => {
  return requestInstance.patch(url, callback);
};
export const del = (url: string, callback?: request.CallbackHandler) => {
  return requestInstance.del(url, callback);
};
