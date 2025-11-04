import request from 'supertest';
import { expect } from 'chai';

describe('API Authentication Requests', () => {

  it('should access API with Bearer token', (done) => {
    request(global.iam_serverUrl)
      .post('/api/v1/auth/tokens') // 呼叫 /login API
      .set('Authorization', `Bearer ${global.testGlobals.TenantAdmin.token}`)
      // .send({
      //   username: 'admin',
      //   password: 'admin'
      // }) // 替換為實際的用戶名和密碼
      .expect(201) // 檢查登錄狀態碼
      .end((err, res) => {
        if (err) return done(err);

        const body = res.body;
        // console.log('Response:', body);

        // ✅ 驗證回傳格式
        expect(body).to.have.property('accessToken').that.is.a('string');
        expect(body).to.have.property('refreshToken').that.is.a('string');
        expect(body).to.have.property('expiresIn').that.is.a('number');
        expect(body).to.have.property('tokenType').that.equals('Bearer');

        global.testGlobals.TenantAdmin.accessToken = body.accessToken;
        global.testGlobals.TenantAdmin.refreshToken = body.refreshToken;

        done();
      });
  });


  it('should access protected API using stored Bearer token', (done) => {
    request(global.iam_serverUrl)
      .post('/api/v1/auth/tokens')
      // .set('Authorization', `Bearer ${token}`)
      .send({
        token: global.testGlobals.TenantUser.token
      })
      .expect(201)
      .end((err, res) => {
        if (err) return done(err);

        const body = res.body;
        // console.log('Response:', body);
        expect(body).to.have.property('accessToken').that.is.a('string');
        expect(body).to.have.property('refreshToken').that.is.a('string');
        expect(body).to.have.property('expiresIn').that.is.a('number');
        expect(body).to.have.property('tokenType').that.equals('Bearer');

        global.testGlobals.TenantUser.accessToken = body.accessToken;
        global.testGlobals.TenantUser.refreshToken = body.refreshToken;
        done();
      });
  });

  it('should refresh access token using refreshToken', (done) => {
    request(global.iam_serverUrl)
      .post('/api/v1/auth/tokens')
      .query({
        grant_type: 'refresh_token'
      }) // ✅ 加上 query string
      .send({
        refreshToken: global.testGlobals.TenantAdmin.refreshToken
      }) // body 帶 refreshToken
      .expect(201)
      .end((err, res) => {
        if (err) return done(err);

        const body = res.body;
        // console.log('Response:', body);
        expect(body).to.have.property('accessToken').that.is.a('string');
        expect(body).to.have.property('refreshToken').that.is.a('string');
        expect(body).to.have.property('expiresIn').that.is.a('number');
        expect(body).to.have.property('tokenType').that.equals('Bearer');
        // expect(res.body).to.have.property('errCode').that.equals(0);
        global.testGlobals.TenantAdmin.accessToken = body.accessToken;
        global.testGlobals.TenantAdmin.refreshToken = body.refreshToken;
        done();
      });
  });

  it('should get user', (done) => {
    request(global.iam_serverUrl)
      .get(`/api/v1/users/${global.testGlobals.TenantAdmin.id}`)
      .set('Authorization', `Bearer ${global.testGlobals.TenantAdmin.accessToken}`)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        const body = res.body;
        // ✅ 驗證回傳 id 與我們的 orgId 一致
        expect(body).to.have.property('id').that.equals(global.testGlobals.TenantAdmin.id);
        expect(body).to.have.property('role').that.equals(global.testGlobals.TenantAdmin.role);

        done();
      });
  });

  it('should get users list', (done) => {
    request(global.iam_serverUrl)
      .get('/api/v1/users')
      .set('Authorization', `Bearer ${global.testGlobals.TenantAdmin.accessToken}`)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.have.property('totalCount').that.is.a('number');
        expect(res.body).to.have.property('items').that.is.an('array');
        done();
      });
  });
});