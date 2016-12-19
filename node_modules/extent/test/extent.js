var test = require('tap').test,
    Extent = require('../');

test('extent', function(t) {
    t.equal(Extent().bbox(), null, 'null');
    t.deepEqual(Extent()
        .include([0, 0]).bbox(),
            [0, 0, 0, 0], 'one point');
    t.deepEqual(Extent()
        .include([0, 0])
        .include([10, 10])
        .bbox(),
            [0, 0, 10, 10], 'two points');
    t.deepEqual(Extent()
        .include([0, 0])
        .include([10, 10])
        .include([-10, -10])
        .bbox(),
            [-10, -10, 10, 10], 'three points');
    t.deepEqual(Extent()
        .contains([0, 0]),
        null, 'contains - invalid');
    t.deepEqual(Extent()
        .include([0, 0])
        .contains([0, 0]),
        true, 'contains - true, zero size');
    t.deepEqual(Extent()
        .include([0, 0])
        .contains([0, 10]),
        false, 'contains - false, zero size');
    t.deepEqual(Extent()
        .include([0, 0])
        .include([10, 10])
        .contains([0, 10]),
        true, 'contains - true, has size');
    t.deepEqual(Extent()
        .include([0, 0])
        .include([10, 10])
        .contains([5, 5]),
        true, 'contains - true, has size');
    t.deepEqual(Extent()
        .include([0, 0])
        .include([10, 10])
        .contains([15, 15]),
        false, 'contains - false, has size');
    t.deepEqual(Extent()
        .include([0, 0])
        .include([10, 10])
        .include([-10, -10])
        .polygon(), {
            type: 'Polygon',
            coordinates: [[[-10,-10],[10,-10],[10,10],[-10,10],[-10,-10]]]
        }, 'polygon');
    t.end();
});
