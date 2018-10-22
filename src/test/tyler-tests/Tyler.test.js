const metrics=  require('./tyler_functions')

describe("Tyler's tests for DEM", function () {
    test('DEM returns correct numbers', function () {
        expect(metrics.DEM(500,2,100)).toBe((500-2)*100)
        expect(metrics.DEM(500,2,100)).toBe(49800)
    }),
    test('DEM returns correct numbers', function () {
        expect(metrics.DEM(460,15,75)).toBe((460-15)*75)
        expect(metrics.DEM(460,15,75)).toBe(33375)}),

    test('DEM returns correct numbers', function () {
        expect(metrics.DEM(370,22,82)).toBe((370-22)*82)
        expect(metrics.DEM(370,22,82)).toBe(28536)
    }),
    test('DEM returns correct numbers', function () {
        expect(metrics.DEM(50,29,45)).toBe((50-29)*45)
        expect(metrics.DEM(50,29,45)).toBe(945)
    })
})

describe("Tyler's tests for ACC", function(){
    test('ACC returns correct Accuracy', function(){
        // console.log('one',metrics.ACC(500,6))
        expect(metrics.ACC(500,6)).toBe(Math.round(((500-6)/500)*100))
        expect(metrics.ACC(500,6)).toBe(99)
    })
    test('ACC returns correct Accuracy', function(){
        // console.log('two',metrics.ACC(36,14))
        expect(metrics.ACC(36,14)).toBe(Math.round(((36-14)/36)*100))
        expect(metrics.ACC(36,14)).toBe(61)
    })
    test('ACC returns correct Accuracy', function(){
        // console.log('three',metrics.ACC(50,60))
        expect(metrics.ACC(50,60)).toBe(0)
    })
    test('ACC returns correct Accuracy', function(){
        // console.log('three',metrics.ACC(0,6))
        expect(metrics.ACC(0,6)).toBe(0)
    })
})


describe("Tyler's tests for CPM",function(){
    test('CPM returns correct Characters per minute', function(){
        // console.log('one',metrics.CPM(6,16))//160
        expect(metrics.CPM(6,16)).toBe(16/(6/60))
        expect(metrics.CPM(6,16)).toBe(160)
    })
    
    test('CPM returns correct Characters per minute', function(){
        // console.log('two',metrics.CPM(40,160))//240
        expect(metrics.CPM(40,160)).toBe(160/(40/60))
        expect(metrics.CPM(40,160)).toBe(240)
    })
        test('CPM returns correct Characters per minute', function(){
            // console.log('three',metrics.CPM(15,70))//280
            expect(metrics.CPM(15,70)).toBe(70/(15/60))
            expect(metrics.CPM(15,70)).toBe(280)
        })
        test('CPM returns correct Characters per minute', function(){
            // console.log('three',metrics.CPM(15,70))//280
            expect(metrics.CPM(0,65)).toBe(65)
        })
})