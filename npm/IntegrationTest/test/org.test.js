import request from 'supertest';
import { expect } from 'chai';

import jwt from 'jsonwebtoken';

describe('Org CRUD Tests', () => {

  it('should create an org', (done) => {
    const updatedTime = new Date().toISOString();
    request(global.iam_serverUrl)
      .post('/api/v1/orgs')
      .set('Authorization', `Bearer ${global.testGlobals.TenantAdmin.accessToken}`) // ✅ 使用 token
      .send({
        name: `Test Org ${updatedTime}`
      })
      .expect(201)
      .end((err, res) => {
        if (err) return done(err);
        global.testGlobals.org.id = res.body.id;
        global.testGlobals.org.name = res.body.name;
        done();
      });
  });

  it('should return 400 when creating an org with a duplicate name', async () => {
    const res = await request(global.iam_serverUrl)
      .post('/api/v1/orgs')
      .set('Authorization', `Bearer ${global.testGlobals.TenantAdmin.accessToken}`) // ✅ 使用 token
      .send({
        name: `${global.testGlobals.org.name}`
      })
      .expect(400);
  });

  it('should create an sub-org', (done) => {
    request(global.iam_serverUrl)
      .post('/api/v1/orgs')
      .set('Authorization', `Bearer ${global.testGlobals.TenantAdmin.accessToken}`) // ✅ 使用 token
      .send({
        name: 'Test sub Org',
        parentId: global.testGlobals.org.id
      })
      .expect(201)
      .end((err, res) => {
        if (err) return done(err);
        // console.log('Create Org Response:', res.body);
        expect(res.body).to.have.property('id');
        global.testGlobals.suborg.id = res.body.id;
        global.testGlobals.suborg.name = res.body.name;
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

        global.testGlobals.TenantAdmin.accessToken = body.accessToken;
        global.testGlobals.TenantAdmin.refreshToken = body.refreshToken;

        const decoded = jwt.decode(body.accessToken);
        // ✅ 驗證基本欄位存在
        expect(decoded).to.have.property('role');
        expect(decoded.role).to.be.a('string').and.not.empty;
        expect(decoded).to.have.property('resource_access');
        expect(decoded.resource_access).to.be.an('object');
        // ✅ 驗證指定 global.testGlobals.org.id 是否存在於 resource_access
        const hasOrg = Object.keys(decoded.resource_access).includes(global.testGlobals.org.id);
        expect(hasOrg).to.be.true;
        // // ✅ 驗證 orgRole 存在且為 admin
        // const orgAccess = decoded.resource_access[global.testGlobals.org.id];
        // expect(orgAccess).to.have.property('orgRole');
        // expect(orgAccess.orgRole).to.equal('admin');

        // // ✅ 驗證 realm_access 也有角色
        // expect(decoded).to.have.nested.property('realm_access.roles').that.includes('admin');

        done();
      });
  });

  it('should get org list', (done) => {
    request(global.iam_serverUrl)
      .get('/api/v1/orgs')
      .set('Authorization', `Bearer ${global.testGlobals.TenantAdmin.accessToken}`)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        // console.log('📋 Org List:', res.body);
        expect(res.body).to.have.property('totalCount').that.is.a('number');
        expect(res.body).to.have.property('items').that.is.an('array');
        // const found = res.body.items.find(o => o.id === global.testGlobals.org.id);
        // expect(found, 'Created org should exist in list').to.not.be.undefined;
        done();
      });
  });

  it('should get org', (done) => {
    request(global.iam_serverUrl)
      .get(`/api/v1/orgs/${global.testGlobals.org.id}`)
      .set('Authorization', `Bearer ${global.testGlobals.TenantAdmin.accessToken}`)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        const body = res.body;
        // ✅ 驗證回傳 id 與我們的 global.testGlobals.org.id 一致
        expect(body).to.have.property('id').that.equals(global.testGlobals.org.id);
        expect(body).to.have.property('name').that.is.a('string');

        done();
      });
  });

  it('should update an sub-org', (done) => {
    const updatedTime = new Date().toISOString();
    request(global.iam_serverUrl)
      .put(`/api/v1/orgs/${global.testGlobals.suborg.id}`)
      .set('Authorization', `Bearer ${global.testGlobals.TenantAdmin.accessToken}`)
      .send({
        name: `Updated Org Name ${updatedTime}`,
        parentId: global.testGlobals.org.id
      })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        // console.log('✏️ Update Org Response:', res.body);
        expect(res.body).to.have.property('name').that.equals(`Updated Org Name ${updatedTime}`);
        expect(res.body).to.have.property('parentId').that.equals(global.testGlobals.org.id);
        done();
      });
  });

  it('should get org child', (done) => {
    request(global.iam_serverUrl)
      .get(`/api/v1/orgs/${global.testGlobals.org.id}/children`)
      .set('Authorization', `Bearer ${global.testGlobals.TenantAdmin.accessToken}`)
      .query({
        depth: 1
      })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        const body = res.body;
        // ✅ 驗證回傳 id 與我們的 global.testGlobals.org.id 一致
        expect(body).to.have.property('id').that.equals(global.testGlobals.org.id);
        expect(body).to.have.property('children').that.is.an('array');
        const found = res.body.children.find(o => o.id === global.testGlobals.suborg.id);
        expect(found, 'sub-org should exist in list').to.not.be.undefined;

        done();
      });
  });

  it('should get org parents', (done) => {
    request(global.iam_serverUrl)
      .get(`/api/v1/orgs/${global.testGlobals.suborg.id}/parents`)
      .set('Authorization', `Bearer ${global.testGlobals.TenantAdmin.accessToken}`)
      .query({
        depth: 1
      })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        const body = res.body;
        // ✅ 驗證回傳 id 與我們的 global.testGlobals.org.id 一致
        expect(body).to.have.property('id').that.equals(global.testGlobals.org.id);
        expect(body).to.have.property('children').that.is.an('array');
        const found = res.body.children.find(o => o.id === global.testGlobals.suborg.id);
        expect(found, 'sub-org should exist in list').to.not.be.undefined;

        done();
      });
  });

});