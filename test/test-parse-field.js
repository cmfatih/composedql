/* jslint node: true */
/* global describe: false, it: false */
'use strict';

var cql    = require('../lib/composedql'),
    expect = require('chai').expect;

// Tests

describe('parseField', function() {

  it('should parse field - field', function(done) {
    var query = cql.parseField('test');

    expect(query).to.be.a('object');
    expect(query).to.deep.equal({name: 'test', type: 'field', source: 'test'});

    query = cql.parseField('test', 'property');
    expect(query).to.be.a('object');
    expect(query).to.deep.equal({name: 'test', type: 'property'});

    query = cql.parseField('test.foo');
    expect(query).to.be.a('object');
    expect(query).to.deep.equal({
      name: 'test',
      type: 'field',
      source: 'test.foo',
      properties: [{name: 'foo', type: 'property'}]
    });

    query = cql.parseField('test.foo.bar');

    expect(query).to.be.a('object');
    expect(query).to.deep.equal({
      name: 'test',
      type: 'field',
      source: 'test.foo.bar',
      properties: [
        {name: 'foo', type: 'property'},
        {name: 'bar', type: 'property'}
      ]
    });

    done();
  });

  it('should parse field - resource field', function(done) {
    var query = cql.parseField('~test');

    expect(query).to.be.a('object');
    expect(query).to.deep.equal({name: 'test', type: 'resource', source: '~test'});
    done();
  });

  it('should parse field - trim fields', function(done) {
    var query = cql.parseField(' test ');

    expect(query).to.be.a('object');
    expect(query).to.deep.equal({name: 'test', type: 'field', source: 'test'});
    done();
  });

  it('should parse field - missing field', function(done) {
    expect(cql.parseField()).to.be.a('undefined');
    done();
  });

});