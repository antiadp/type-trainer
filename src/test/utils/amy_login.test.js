const fns = require('./amy_function');

describe('Amys Tests for Users in SideNav', () => {
    test('allUsers should return data', () => {
        expect.assertions(1);
		return fns.allUsers().then((data) => {
			expect(data).toBeDefined();
		});
    });
    test('allUsers should return an array containing objects',()=>{
        expect.assertions(1);
        return fns.allUsers().then(data=>{
            expect(typeof data[0]).toContain('object');
        })
    })
	test('Should get user by id and return amyloo', () => {
		expect.assertions(1);
		return fns.userById().then((user) => {
			expect(user[0].username).toBe('amyloo');
		});
    });
    test('Should return login data',()=>{
        expect.assertions(1);
        return fns.loggedIn().then(res=>{
            expect(res).toBeDefined();
        })
    });
    test('loggedIn should return an object',()=>{
        expect.assertions(1);
        return fns.loggedIn().then(res =>{
            expect(typeof res).toBe('object');
        })
    })
});
