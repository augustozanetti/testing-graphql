import { startStandaloneServer } from '@apollo/server/standalone';

import request from 'supertest';
// this is the query for our test
const queryData = {
    query: `
    query users($limit: Int) {
        listUsers(limit: $limit) {
            id
        }
    }
    `,
    variables: { limit: 2 },
};



describe('e2e demo', () => {
    let server, url;
    beforeAll(async () => {

        ({ url } = await startStandaloneServer(server));
    });

    it('return users by limit', async () => {
        // send our request to the url of the test server
        const response = await request(url).post('/').send(queryData);
        expect(response.errors).toBeUndefined();
        expect(response.body.data?.listUsers).toHaveLength(2);
    });

    it('return all users when limit is not passed', async () => {
        const response = await request(url).post('/').send({
            ...queryData,
            variables: { limit: null },
        });
        expect(response.errors).toBeUndefined();
        expect(response.body.data?.listUsers).toHaveLength(4);
    });

    it('return user by id', async () => {
        const response = await request(url).post('/').send({
            query: `
        query user($id: ID!) {
            getUser(id: $id) {
                id
            }
        }
        `,
            variables: { id: "1" },
        });
        expect(response.errors).toBeUndefined();
        expect(response.body.data?.getUser.id).toBe("1");
    }
});
