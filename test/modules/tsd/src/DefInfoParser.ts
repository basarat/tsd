/// <reference path="../../../globals.ts" />
/// <reference path="../../../tsdHelper.ts" />
/// <reference path="../../../../src/xm/file.ts" />
/// <reference path="../helper/HeaderHelper.ts" />


describe('DefInfoParser', () => {
	'use strict';

	var fs = require('fs');
	var path = require('path');
	var assert:Chai.Assert = require('chai').assert;

	var data:helper.HeaderAssert[];
	var filter:string[]; // = ['async', 'expect.js'];

	before((done:(err?) => void) => {
		// use old tsd-deftools loader
		helper.loadHeaderFixtures(path.resolve(__dirname, '..', 'fixtures', 'headers')).done((res:helper.HeaderAssert[]) => {
			assert.operator(res.length, '>', 0);
			data = res;
			if (filter) {
				data = data.filter((value:helper.HeaderAssert) => {
					return filter.indexOf(value.name) > -1;
				});
			}
			done();
		}, done);
	});

	after(() => {
		data = null;
		filter = null;
	});

	describe('loop', () => {
		it('data ok', () => {
			assert.operator(data.length, '>', 0, 'data.length');
		});
		it('parse test data', () => {

			var actuals = [];
			var expecteds = [];

			function testProp(item:helper.HeaderAssert, actual:Object, expected:Object, data:Object, parsed:Object, prop:string):void {
				actual[prop] = parsed[prop];
				expected[prop] = data[prop];
			}

			data.forEach((item:helper.HeaderAssert) => {
				assert.ok(item, item.key + ' ok');

				var actual:any = {
					key:item.key
				};
				var expected:any = {
					key:item.key
				};

				var data = new tsd.DefInfo();
				var parser = new tsd.DefInfoParser(false);
				parser.parse(data, item.header);

				var parsed = item.fields.parsed;

				assert.ok(parsed, item.key + ' parsed (test fixture)');

				if (item.fields.fields) {
					item.fields.fields.forEach((field:string) => {
						testProp(item, actual, expected, data, parsed, field);
					});
				}
				else {
					testProp(item, actual, expected, data, parsed, 'name');
					testProp(item, actual, expected, data, parsed, 'projectUrl');
					testProp(item, actual, expected, data, parsed, 'reposUrl');

					actual.authors = data.authors.map((author) => {
						return author.toJSON();
					});
					expected.authors = parsed.authors;
				}
				actuals.push(actual);
				expecteds.push(expected);
			});




			assert.deepEqual(actuals, expecteds);
		});
	});
});
