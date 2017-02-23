const should = require('chai').should();
const expect = require('chai').expect;
const pq = require('../loader.js');

/**
 * @TODO: Move tests into seperate files
 */

describe('#Periodiq.loadElementDir', function() {
	it('reads a folder and returns found elements within it', function() {
		var elements = pq.loadElementDir(__dirname + '/../elements/');
		Object.keys(elements).length.should.not.equal(0);
	});
});
