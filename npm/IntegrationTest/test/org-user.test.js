import request from 'supertest';
import { expect } from 'chai';

describe('Org user CRUD Tests', () => {
  it('should create an org user', (done) => {
    request(global.iam_serverUrl)
      .post(`/api/v1/orgs/${global.testGlobals.org.id}/users`)
      .set('Authorization', `Bearer ${global.testGlobals.TenantAdmin.accessToken}`) // ✅ 使用 token
      .send({
        userId: global.testGlobals.TenantUser.id,
        orgRole: 'admin'
      })
      .expect(201)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.have.property('userId').that.equals(global.testGlobals.TenantUser.id);
        expect(res.body).to.have.property('orgRole').that.equals('admin');
        done();
      });
  });

  it('should get org user list', (done) => {
    request(global.iam_serverUrl)
      .get(`/api/v1/orgs/${global.testGlobals.org.id}/users`)
      .set('Authorization', `Bearer ${global.testGlobals.TenantAdmin.accessToken}`)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.have.property('totalCount').that.is.a('number');
        expect(res.body).to.have.property('items').that.is.an('array');
        done();
      });
  });

  it('should patch org user', (done) => {
    request(global.iam_serverUrl)
      .patch(`/api/v1/orgs/${global.testGlobals.org.id}/users/${global.testGlobals.TenantUser.id}`)
      .set('Authorization', `Bearer ${global.testGlobals.TenantAdmin.accessToken}`)
      .send({
        orgRole: 'viewer'
      })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        // console.log('📋 Org List:', res.body);
        expect(res.body).to.have.property('userId').that.equals(global.testGlobals.TenantUser.id);
        expect(res.body).to.have.property('orgRole').that.equals('viewer');
        done();
      });
  });

  it('should return 400 when patching org user with invalid role', async () => {
    const res = await request(global.iam_serverUrl)
      .patch(`/api/v1/orgs/${global.testGlobals.org.id}/users/${global.testGlobals.TenantUser.id}`)
      .set('Authorization', `Bearer ${global.testGlobals.TenantAdmin.accessToken}`)
      .send({
        orgRole: 'aaa'
      })
      .expect(400);
  });

  it('should get an org user', (done) => {
    request(global.iam_serverUrl)
      .get(`/api/v1/orgs/${global.testGlobals.org.id}/users/${global.testGlobals.TenantUser.id}`)
      .set('Authorization', `Bearer ${global.testGlobals.TenantAdmin.accessToken}`)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        // console.log('📋 Org List:', res.body);
        expect(res.body).to.have.property('userId').that.equals(global.testGlobals.TenantUser.id);
        expect(res.body).to.have.property('orgRole').that.equals('viewer');
        done();
      });
  });

  it('should delete an org user', (done) => {
    request(global.iam_serverUrl)
      .delete(`/api/v1/orgs/${global.testGlobals.org.id}/users/${global.testGlobals.TenantUser.id}`)
      .set('Authorization', `Bearer ${global.testGlobals.TenantAdmin.accessToken}`)
      .expect(204)
      .end((err, res) => {
        if (err) return done(err);
        // console.log('🗑️ Delete Org Response:', res.body);
        done();
      });
  });
});