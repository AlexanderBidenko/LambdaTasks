const culcCostAndTime = require('../culcCostAndTime.js');

test('Украинский, doc, 1500', () => {
    expect(culcCostAndTime('ukr', 1500, 'doc')).toStrictEqual([75, 2.5])
});

test('Русский, other, 753', () => {
    expect(culcCostAndTime('ru', 753, 'other')).toStrictEqual([60, 1.7999999999999998])
});

test('Украинский, docx, 2500', () => {
    expect(culcCostAndTime('ukr', 2500, 'doc')).toStrictEqual([125, 2.5])
});

test('Английский, doc, 3000', () => {
    expect(culcCostAndTime('en', 3000, 'doc')).toStrictEqual([360, 10.5])
});

test('Английский, other, 10000', () => {
    expect(culcCostAndTime('en', 10000, 'other')).toStrictEqual([1440, 37.8])
});