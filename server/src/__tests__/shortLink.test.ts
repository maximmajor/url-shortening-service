import request from 'supertest';
import createServer from '../utils/server';
import { expect, beforeAll, afterAll } from '@jest/globals';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
const app = createServer();


describe('Short Link Controller', () => {
    let mongoServer: MongoMemoryServer;

    beforeAll(async () => {
        mongoServer = await MongoMemoryServer.create();
        const mongoUri = mongoServer.getUri();
        await mongoose.connect(mongoUri);
    });

    afterAll(async () => {
        await new Promise<void>(resolve => setTimeout(() => resolve(), 500)); // Wait for connections to close
        await mongoose.disconnect();
        await mongoServer.stop();
    });


    describe('POST /encode', () => {
        it('Should Encodes a URL to a shortened URL', async () => {
            const res = await request(app)
                .post('/encode')
                .send({ originalUrl: 'https://indicina.co' });
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('shortUrl');
        });
        it('should return an error if originalUrl is missing', async () => {
            const response = await request(app)
                .post('/encode')
                .send({});
            expect(response.status).toBe(400);
            expect(response.body.error).toBe('Original URL is required');
        });
    });

    describe('POST /decode', () => {
        it('Should Decodes a shortened URL to its original URL', async () => {
            const encodeRes = await request(app)
                .post('/encode')
                .send({ originalUrl: 'https://indicina.co' });
            const res = await request(app)
                .post('/decode')
                .send({ shortUrl: encodeRes.body.shortUrl });
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('originalUrl', 'https://indicina.co');
        });
        it('should return an error if shortUrl is missing', async () => {
            const response = await request(app)
                .post('/decode')
                .send({});
            expect(response.status).toBe(400);
            expect(response.body.error).toBe('Short URL is required');
        });
        it('should return an error if shortUrl is not found', async () => {
            const response = await request(app)
                .post('/decode')
                .send({ shortUrl: 'http://localhost:3000/notfound' });
            expect(response.status).toBe(404);
            expect(response.body.error).toBe('Short URL not found');
        });
    });

    describe('GET /statistic/:urlPath', () => {
        it('Should Return basic statistic of a short URL path.', async () => {
            const encodeResponse = await request(app)
                .post('/encode')
                .send({ originalUrl: 'https://indicina.co' });
            const response = await request(app)
                .get(`/statistic/${encodeResponse.body.shortUrl.split('/').pop()}`);
            expect(response.status).toBe(200);
            expect(response.body.originalUrl).toBe('https://indicina.co');
            expect(response.body.shortUrl).toBe(encodeResponse.body.shortUrl);
            expect(response.body.shortUrlPath).toBeDefined();
            expect(response.body.createdAt).toBeDefined();
            expect(response.body.updatedAt).toBeDefined();
        });
        it('should return an error if urlPath is missing', async () => {
            const response = await request(app).get('/statistic/');

            expect(response.status).toBe(400);
            expect(response.body.error).toBe('URL path is required');
        });
        it('should return an error if shortUrl is not found', async () => {
            const response = await request(app)
                .get('/statistic/notfound');
            expect(response.status).toBe(404);
            expect(response.body.error).toBe('Short URL not found');
        });
    });

    describe('GET /:urlPath', () => {
        it('should redirect to the original URL', async () => {
            const response = await request(app)
                .post('/encode')
                .send({ originalUrl: 'https://indicina.co' });
            const shortUrl = response.body.shortUrl;
            const redirectResponse = await request(app)
                .get(`/${shortUrl.split('/').pop()}`)
                .expect(302);
            expect(redirectResponse.header.location).toBe('https://indicina.co');
        });

        it('should return a 404 error for an invalid short URL', async () => {
            const response = await request(app)
                .get('/non-existent-short-url')
            expect(response.status).toBe(404);
            expect(response.body.error).toBe('Short URL not found');
        });

        it('should return a 400 error for a missing URL path parameter', async () => {
            const response = await request(app).get('/');
            expect(response.status).toBe(400);
            expect(response.body.error).toBe('URL path is required');
        });
    });
});