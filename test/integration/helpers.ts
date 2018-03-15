import supertest from 'supertest';
import * as chai from "chai";

interface GlobalIntegrationType {
  expect: (any) => any,
  app: any,
  require: any
}

declare const global:GlobalIntegrationType;

//global.app = app;

// A express app
// global.request = supertest(app)
// "test:unit": "mocha --opts ./test/unit/mocha.opts ./test/unit/**/*.spec.js",

global.expect = chai.expect;
