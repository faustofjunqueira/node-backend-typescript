import * as chai from "chai";
import * as td from 'testdouble';
import * as tdChai from 'testdouble-chai';

interface GlobalIntegrationType {
  expect: (any) => any,
  td: any
}

declare const global:GlobalIntegrationType;

chai.use(tdChai(td));

//global.app = app;

// A express app
// global.request = supertest(app)
// "test:unit": "mocha --opts ./test/unit/mocha.opts ./test/unit/**/*.spec.js",

global.expect = chai.expect;
global.td = td;
