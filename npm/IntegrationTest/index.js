import request from 'supertest'; // 使用 ES 模塊語法導入
import {
  expect
} from 'chai';
// const fs = require('fs');
import fs from 'fs';
import jwt from 'jsonwebtoken';
import {
  loadState,
  updateState
} from './test/setup/state.js';

const serverUrl = 'http://localhost:44382'; // 替換為你要測試的服務器的 URL
const token = fs.readFileSync('./desk/token_TAdmin', 'utf8').trim();
const tokenTUser = fs.readFileSync('./desk/token_Tuser', 'utf8').trim();
// 取第二段 payload
const decoded = jwt.decode(token);
const decodedTuser = jwt.decode(tokenTUser);
// console.log('JWT payload:', decoded);
// console.log(data);

let userId = decoded.sub;
let tUserId = decodedTuser.sub;

updateState({
  userId,
  tUserId
})

let accessToken = '';
let refreshToken = '';
let tUserAccessToken = '';
let tUserRefreshToken = '';
let orgId = '';
let orgName = '';
let subOrgId = '';
let state;

describe('API Authentication Requests', () => {

  it('should access API with Bearer token', (done) => {
    request(serverUrl)
      .post('/api/v1/auth/tokens') // 呼叫 /login API
      .set('Authorization', `Bearer ${token}`)
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

        // ✅ 將 accessToken 存入檔案，供其他測試使用
        // fs.writeFileSync('./desk/token_Tuser', body.accessToken);
        accessToken = body.accessToken;
        refreshToken = body.refreshToken;
        fs.writeFileSync('./iam/access_TAdmin', accessToken);
        fs.writeFileSync('./iam/refresh_TAdmin', refreshToken);
        updateState({
          accessToken,
          refreshToken,
        });

        done();
      });
  });


  it('should access protected API using stored Bearer token', (done) => {
    request(serverUrl)
      .post('/api/v1/auth/tokens')
      // .set('Authorization', `Bearer ${token}`)
      .send({
        token: tokenTUser
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
        // expect(res.body).to.have.property('errCode').that.equals(0);
        tUserAccessToken = body.accessToken;
        tUserRefreshToken = body.refreshToken;
        updateState({
          tUserAccessToken,
          tUserRefreshToken,
        });
        fs.writeFileSync('./iam/access_Tuser', tUserAccessToken);
        fs.writeFileSync('./iam/refresh_Tuser', tUserRefreshToken);
        done();
      });
  });

  it('should refresh access token using refreshToken', (done) => {
    request(serverUrl)
      .post('/api/v1/auth/tokens')
      .query({
        grant_type: 'refresh_token'
      }) // ✅ 加上 query string
      .send({
        refreshToken
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
        accessToken = body.accessToken;
        refreshToken = body.refreshToken;
        fs.writeFileSync('./iam/access_TAdmin', accessToken);
        fs.writeFileSync('./iam/refresh_TAdmin', refreshToken);
        updateState({
          accessToken,
          refreshToken,
        });
        done();
      });
  });

  it('should get user', (done) => {
    request(serverUrl)
      .get(`/api/v1/users/${userId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        const body = res.body;
        // ✅ 驗證回傳 id 與我們的 orgId 一致
        expect(body).to.have.property('id').that.equals(userId);
        expect(body).to.have.property('role').that.equals(decoded.role);

        done();
      });
  });

  it('should get users list', (done) => {
    request(serverUrl)
      .get('/api/v1/users')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.have.property('totalCount').that.is.a('number');
        expect(res.body).to.have.property('items').that.is.an('array');
        done();
      });
  });
});

describe('Org CRUD Tests', () => {
  before(() => {
    state = loadState();
    if (!accessToken) {
      accessToken = state.accessToken;
    }
  });

  it('should create an org', (done) => {
    const updatedTime = new Date().toISOString();
    request(serverUrl)
      .post('/api/v1/orgs')
      .set('Authorization', `Bearer ${accessToken}`) // ✅ 使用 token
      .send({
        name: `Test Org ${updatedTime}`
      })
      .expect(201)
      .end((err, res) => {
        if (err) return done(err);
        // console.log('Create Org Response:', res.body);
        orgId = res.body.id;
        orgName = res.body.name;
        expect(res.body).to.have.property('id');
        updateState({
          orgId,
          orgName,
        });
        done();
      });
  });

  it('should return 400 when creating an org with a duplicate name', async () => {
    const res = await request(serverUrl)
      .post('/api/v1/orgs')
      .set('Authorization', `Bearer ${accessToken}`) // ✅ 使用 token
      .send({
        name: `${orgName}`
      })
      .expect(400);
  });

  it('should create an sub-org', (done) => {
    request(serverUrl)
      .post('/api/v1/orgs')
      .set('Authorization', `Bearer ${accessToken}`) // ✅ 使用 token
      .send({
        name: 'Test sub Org',
        parentId: orgId
      })
      .expect(201)
      .end((err, res) => {
        if (err) return done(err);
        // console.log('Create Org Response:', res.body);
        subOrgId = res.body.id;
        expect(res.body).to.have.property('id');
        updateState({
          subOrgId,
        });
        done();
      });
  });

  it('should refresh access token using refreshToken', (done) => {
    request(serverUrl)
      .post('/api/v1/auth/tokens')
      .query({
        grant_type: 'refresh_token'
      }) // ✅ 加上 query string
      .send({
        refreshToken
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
        accessToken = body.accessToken;
        refreshToken = body.refreshToken;
        fs.writeFileSync('./iam/access_TAdmin', accessToken);
        fs.writeFileSync('./iam/refresh_TAdmin', refreshToken);
        updateState({
          accessToken,
          refreshToken,
        });

        const decoded = jwt.decode(body.accessToken);
        // ✅ 驗證基本欄位存在
        expect(decoded).to.have.property('role');
        expect(decoded.role).to.be.a('string').and.not.empty;
        expect(decoded).to.have.property('resource_access');
        expect(decoded.resource_access).to.be.an('object');
        // ✅ 驗證指定 orgId 是否存在於 resource_access
        const hasOrg = Object.keys(decoded.resource_access).includes(orgId);
        expect(hasOrg).to.be.true;
        // // ✅ 驗證 orgRole 存在且為 admin
        // const orgAccess = decoded.resource_access[orgId];
        // expect(orgAccess).to.have.property('orgRole');
        // expect(orgAccess.orgRole).to.equal('admin');

        // // ✅ 驗證 realm_access 也有角色
        // expect(decoded).to.have.nested.property('realm_access.roles').that.includes('admin');

        done();
      });
  });

  it('should get org list', (done) => {
    request(serverUrl)
      .get('/api/v1/orgs')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        // console.log('📋 Org List:', res.body);
        expect(res.body).to.have.property('totalCount').that.is.a('number');
        expect(res.body).to.have.property('items').that.is.an('array');
        // const found = res.body.items.find(o => o.id === orgId);
        // expect(found, 'Created org should exist in list').to.not.be.undefined;
        done();
      });
  });

  it('should get org', (done) => {
    request(serverUrl)
      .get(`/api/v1/orgs/${orgId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        const body = res.body;
        // ✅ 驗證回傳 id 與我們的 orgId 一致
        expect(body).to.have.property('id').that.equals(orgId);
        expect(body).to.have.property('name').that.is.a('string');

        done();
      });
  });

  // it('should update an same name org', async () => {
  //   const res = await request(serverUrl)
  //     .put(`/api/v1/orgs/${orgId}`)
  //     .set('Authorization', `Bearer ${accessToken}`)
  //     .send({
  //       name: 'Test sub Org'
  //     })
  //     .expect(400);
  // });

  it('should update an sub-org', (done) => {
    const updatedTime = new Date().toISOString();
    request(serverUrl)
      .put(`/api/v1/orgs/${subOrgId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        name: `Updated Org Name ${updatedTime}`,
        parentId: orgId
      })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        // console.log('✏️ Update Org Response:', res.body);
        expect(res.body).to.have.property('name').that.equals(`Updated Org Name ${updatedTime}`);
        expect(res.body).to.have.property('parentId').that.equals(orgId);
        done();
      });
  });

  it('should get org child', (done) => {
    request(serverUrl)
      .get(`/api/v1/orgs/${orgId}/children`)
      .set('Authorization', `Bearer ${accessToken}`)
      .query({
        depth: 1
      })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        const body = res.body;
        // ✅ 驗證回傳 id 與我們的 orgId 一致
        expect(body).to.have.property('id').that.equals(orgId);
        expect(body).to.have.property('children').that.is.an('array');
        const found = res.body.children.find(o => o.id === subOrgId);
        expect(found, 'sub-org should exist in list').to.not.be.undefined;

        done();
      });
  });

  it('should get org parents', (done) => {
    request(serverUrl)
      .get(`/api/v1/orgs/${subOrgId}/parents`)
      .set('Authorization', `Bearer ${accessToken}`)
      .query({
        depth: 1
      })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        const body = res.body;
        // ✅ 驗證回傳 id 與我們的 orgId 一致
        expect(body).to.have.property('id').that.equals(orgId);
        expect(body).to.have.property('children').that.is.an('array');
        const found = res.body.children.find(o => o.id === subOrgId);
        expect(found, 'sub-org should exist in list').to.not.be.undefined;

        done();
      });
  });

});

describe('Org user CRUD Tests', () => {
  before(() => {
    state = loadState();
    if (!orgId) {
      orgId = state.orgId;
    }
    if (!accessToken) {
      accessToken = state.accessToken;
    }
    if (!userId) {
      userId = state.userId;
    }
    if (!tUserId) {
      tUserId = state.tUserId;
    }
  });
  it('should create an org user', (done) => {
    request(serverUrl)
      .post(`/api/v1/orgs/${orgId}/users`)
      .set('Authorization', `Bearer ${accessToken}`) // ✅ 使用 token
      .send({
        userId: tUserId,
        orgRole: 'admin'
      })
      .expect(201)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.have.property('userId').that.equals(tUserId);
        expect(res.body).to.have.property('orgRole').that.equals('admin');
        done();
      });
  });

  it('should get org user list', (done) => {
    request(serverUrl)
      .get(`/api/v1/orgs/${orgId}/users`)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.have.property('totalCount').that.is.a('number');
        expect(res.body).to.have.property('items').that.is.an('array');
        done();
      });
  });

  it('should patch org user', (done) => {
    request(serverUrl)
      .patch(`/api/v1/orgs/${orgId}/users/${tUserId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        orgRole: 'viewer'
      })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        // console.log('📋 Org List:', res.body);
        expect(res.body).to.have.property('userId').that.equals(tUserId);
        expect(res.body).to.have.property('orgRole').that.equals('viewer');
        done();
      });
  });

  it('should return 400 when patching org user with invalid role', async () => {
    const res = await request(serverUrl)
      .patch(`/api/v1/orgs/${orgId}/users/${tUserId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        orgRole: 'aaa'
      })
      .expect(400);
  });

  it('should get an org user', (done) => {
    request(serverUrl)
      .get(`/api/v1/orgs/${orgId}/users/${tUserId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        // console.log('📋 Org List:', res.body);
        expect(res.body).to.have.property('userId').that.equals(tUserId);
        expect(res.body).to.have.property('orgRole').that.equals('viewer');
        done();
      });
  });

  it('should delete an org user', (done) => {
    request(serverUrl)
      .delete(`/api/v1/orgs/${orgId}/users/${tUserId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(204)
      .end((err, res) => {
        if (err) return done(err);
        // console.log('🗑️ Delete Org Response:', res.body);
        done();
      });
  });
});

describe('Org Delete Tests', () => {
  before(() => {
    state = loadState();
    if (!orgId) {
      orgId = state.orgId;
    }
    if (!subOrgId) {
      subOrgId = state.subOrgId;
    }
    if (!accessToken) {
      accessToken = state.accessToken;
    }
  });

  it('should fail to delete parent org when sub-org exists', async () => {
    const res = await request(serverUrl)
      .delete(`/api/v1/orgs/${orgId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(403);

    // console.log('Attempt delete parent org with sub-org:', res.body);
  });

  it('should delete sub-org successfully', async () => {
    const res = await request(serverUrl)
      .delete(`/api/v1/orgs/${subOrgId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(204); // No Content

    // console.log('Deleted sub-org successfully');
  });

  it('should delete parent org successfully after sub-org deleted', async () => {
    const res = await request(serverUrl)
      .delete(`/api/v1/orgs/${orgId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(204);

    // console.log('Deleted parent org successfully');
  });

});