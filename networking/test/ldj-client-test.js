'use strict';

const assert = require('assert');
const EventEmitter = require('events').EventEmitter;
const LDJClient = require('../lib/ldj-client.js');

describe ('LDJClient', () => {
  let stream = null;
  let client = null;

  beforeEach(() => {
    stream = new EventEmitter();
    client = new LDJClient(stream);
  });

  it('should emit a message event from multiple data events', done => {
    client.on('message', message => {
      assert.deepEqual(message, {foo: 'bar'});
      done();
    });

    process.env.MESSAGE.forEach((argument) => {
      stream.emit('data', argument);
    });
  });

  it('should emit a message event from a single data event', done => {
    client.on('message', message => {
      assert.deepEqual(message, {foo: 'bar'});
      done();
    });

    stream.emit('data', '{"foo":"bar"}\n');
  });

  it('should emit a message event from a split data events', done => {
    client.on('message', message => {
      assert.deepEqual(message, {foo: 'bar'});
      done();
    });

    stream.emit('data', '{"foo":');

    process.nextTick(() => stream.emit('data', '"bar"}\n'));
  });

  it('should finish within 5 seconds', done => {
    setTimeout(done, 4500);
  }).timeout(5000);
});

