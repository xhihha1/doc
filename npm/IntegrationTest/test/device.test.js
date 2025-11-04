import request from 'supertest';
import {
  expect
} from 'chai';
import jwt from 'jsonwebtoken';

describe('Device Tasks Tests', () => {
  before(() => {
    // ✅ 如果 global.testGlobals.org.id 不存在，從 TenantAdmin.accessToken 取得
    if (!global.testGlobals.org?.id) {
      const decoded = jwt.decode(global.testGlobals.TenantAdmin.accessToken);
      // expect(decoded.resource_access).to.be.an('object');

      // 取第一個 resource_access 的 key
      const firstOrgId = Object.keys(decoded.resource_access)[0];
      // expect(firstOrgId).to.be.a('string');

      // 更新 global.testGlobals.org.id
      if (!global.testGlobals.org) global.testGlobals.org = {};
      global.testGlobals.org.id = firstOrgId;
    }
  });

  it('should create an task', (done) => {
    const updatedTime = new Date().toISOString();
    const taskName = `Set upload interval to 2000 milliseconds ${updatedTime}`;
    request(global.dm_serverUrl)
      .post(`/api/v1/orgs/${global.testGlobals.org.id}/tasks`)
      .set('Authorization', `Bearer ${global.testGlobals.TenantAdmin.accessToken}`) // ✅ 使用 token
      .send({
        name: taskName,
        cmd: 'TelemetryConfiguration',
        payload: "{\"allInterval\":200,\"sensors\":[{\"resourceId\":\"783707f1-0659-4892-a872-8f506d225d7b\",\"enabled\":true,\"interval\":null}]}"
      })
      .expect(201)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.have.property('id').that.is.a('string');
        expect(res.body).to.have.property('name').that.equals(taskName);
        expect(res.body).to.have.property('orgId').that.equals(global.testGlobals.org.id);

        global.testGlobals.task.id = res.body.id;
        done();
      });
  });

  it('should get tasks list', (done) => {
    request(global.dm_serverUrl)
      .get(`/api/v1/orgs/${global.testGlobals.org.id}/tasks`)
      .set('Authorization', `Bearer ${global.testGlobals.TenantAdmin.accessToken}`)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.have.property('totalCount').that.is.a('number');
        expect(res.body).to.have.property('items').that.is.an('array');
        done();
      });
  });

  it('should get a task', (done) => {
    request(global.dm_serverUrl)
      .get(`/api/v1/orgs/${global.testGlobals.org.id}/tasks/${global.testGlobals.task.id}`)
      .set('Authorization', `Bearer ${global.testGlobals.TenantAdmin.accessToken}`)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        // console.log('📋 Org List:', res.body);
        expect(res.body).to.have.property('id').that.equals(global.testGlobals.task.id);
        expect(res.body).to.have.property('orgId').that.equals(global.testGlobals.org.id);
        done();
      });
  });

  it('should put task', (done) => {
    const updatedTime = new Date().toISOString();
    const taskName = `Set upload interval to 1000 milliseconds ${updatedTime}`;
    request(global.dm_serverUrl)
      .put(`/api/v1/orgs/${global.testGlobals.org.id}/tasks/${global.testGlobals.task.id}`)
      .set('Authorization', `Bearer ${global.testGlobals.TenantAdmin.accessToken}`)
      .send({
        name: taskName,
        cmd: 'TelemetryConfiguration',
        payload: "{\"allInterval\":200,\"sensors\":[{\"resourceId\":\"783707f1-0659-4892-a872-8f506d225d7b\",\"enabled\":true,\"interval\":null}]}"
      })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        // console.log('📋 Org List:', res.body);
        expect(res.body).to.have.property('name').that.equals(taskName);
        expect(res.body).to.have.property('id').that.equals(global.testGlobals.task.id);
        done();
      });
  });

});

describe('Device Batches Tests', () => {
  it('should create an Batche', (done) => {
    const updatedTime = new Date().toISOString();
    const batchName = `Set ${updatedTime}`;
    request(global.dm_serverUrl)
      .post(`/api/v1/orgs/${global.testGlobals.org.id}/batches`)
      .set('Authorization', `Bearer ${global.testGlobals.TenantAdmin.accessToken}`) // ✅ 使用 token
      .send({
        "name": batchName,
        "cronExpression": "0 0/5 * * * ?",
        "isEnabled": false,
        "runOnStartup": true,
        "actions": [{
          "deviceId": "74fe488d5d35",
          "taskId": global.testGlobals.task.id
        }]
      })
      .expect(201)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.have.property('id').that.is.a('string');
        expect(res.body).to.have.property('name').that.equals(batchName);
        expect(res.body).to.have.property('orgId').that.equals(global.testGlobals.org.id);
        expect(res.body).to.have.property('cronExpression').that.is.a('string');
        expect(res.body).to.have.property('isEnabled').that.is.a('boolean');
        expect(res.body).to.have.property('runOnStartup').that.is.a('boolean');
        global.testGlobals.batch.id = res.body.id;
        done();
      });
  });

  it('should get batches list', (done) => {
    request(global.dm_serverUrl)
      .get(`/api/v1/orgs/${global.testGlobals.org.id}/batches`)
      .set('Authorization', `Bearer ${global.testGlobals.TenantAdmin.accessToken}`)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.have.property('totalCount').that.is.a('number');
        expect(res.body).to.have.property('items').that.is.an('array');
        done();
      });
  });

  it('should get a batch', (done) => {
    request(global.dm_serverUrl)
      .get(`/api/v1/orgs/${global.testGlobals.org.id}/batches/${global.testGlobals.batch.id}`)
      .set('Authorization', `Bearer ${global.testGlobals.TenantAdmin.accessToken}`)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        // console.log('📋 Org List:', res.body);
        expect(res.body).to.have.property('id').that.equals(global.testGlobals.batch.id);
        expect(res.body).to.have.property('orgId').that.equals(global.testGlobals.org.id);
        expect(res.body).to.have.property('cronExpression').that.is.a('string');
        expect(res.body).to.have.property('isEnabled').that.is.a('boolean');
        expect(res.body).to.have.property('runOnStartup').that.is.a('boolean');
        expect(res.body).to.have.property('actions').that.is.an('array').with.lengthOf(1);
        done();
      });
  });

  it('should patch batch', (done) => {
    request(global.dm_serverUrl)
      .patch(`/api/v1/orgs/${global.testGlobals.org.id}/batches/${global.testGlobals.batch.id}`)
      .set('Authorization', `Bearer ${global.testGlobals.TenantAdmin.accessToken}`)
      .send({
        "actions": [{
            "deviceId": "74fe488d5d35",
            "taskId": global.testGlobals.task.id
          },
          {
            "deviceId": "84aa1234ccff",
            "taskId": global.testGlobals.task.id
          }
        ]
      })
      .expect(201)
      .end((err, res) => {
        if (err) return done(err);
        // console.log('📋 Org List:', res.body);
        expect(res.body).to.have.property('name').that.is.a('string');
        expect(res.body).to.have.property('id').that.equals(global.testGlobals.batch.id);
        expect(res.body).to.have.property('cronExpression').that.is.a('string');
        expect(res.body).to.have.property('isEnabled').that.is.a('boolean');
        expect(res.body).to.have.property('runOnStartup').that.is.a('boolean');
        expect(res.body).to.have.property('actions').that.is.an('array').with.lengthOf(2);
        done();
      });
  });

  it('should put batch', (done) => {
    const updatedTime = new Date().toISOString();
    const batchName = `Set ${updatedTime}`;
    request(global.dm_serverUrl)
      .put(`/api/v1/orgs/${global.testGlobals.org.id}/batches/${global.testGlobals.batch.id}`)
      .set('Authorization', `Bearer ${global.testGlobals.TenantAdmin.accessToken}`)
      .send({
        "name": batchName,
        "cronExpression": "0 0/5 * * * ?",
        "isEnabled": false,
        "runOnStartup": true,
        "actions": [{
          "deviceId": "74fe488d5d35",
          "taskId": global.testGlobals.task.id
        }]
      })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        // console.log('📋 Org List:', res.body);
        expect(res.body).to.have.property('name').that.equals(batchName);
        expect(res.body).to.have.property('id').that.equals(global.testGlobals.batch.id);
        expect(res.body).to.have.property('cronExpression').that.is.a('string');
        expect(res.body).to.have.property('isEnabled').that.is.a('boolean');
        expect(res.body).to.have.property('runOnStartup').that.is.a('boolean');
        expect(res.body).to.have.property('actions').that.is.an('array').with.lengthOf(1);
        done();
      });
  });

  it('should put batch status', (done) => {
    const updatedTime = new Date().toISOString();
    const batchName = `Set ${updatedTime}`;
    request(global.dm_serverUrl)
      .put(`/api/v1/orgs/${global.testGlobals.org.id}/batches/${global.testGlobals.batch.id}/status`)
      .set('Authorization', `Bearer ${global.testGlobals.TenantAdmin.accessToken}`)
      .send({
        "isEnabled": true
      })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.have.property('isEnabled').that.equals(true);
        done();
      });
  });

});

describe('Delete Batches Tasks Tests', () => {
  it('should fail to delete an task before task removed from batch', (done) => {
    request(global.dm_serverUrl)
      .delete(`/api/v1/orgs/${global.testGlobals.org.id}/tasks/${global.testGlobals.task.id}`)
      .set('Authorization', `Bearer ${global.testGlobals.TenantAdmin.accessToken}`)
      .expect(403)
      .end((err, res) => {
        if (err) return done(err);
        // console.log('🗑️ Delete Org Response:', res.body);
        done();
      });
  });

  it('should fail to delete an batch when it is enabled', (done) => {
    request(global.dm_serverUrl)
      .delete(`/api/v1/orgs/${global.testGlobals.org.id}/batches/${global.testGlobals.batch.id}`)
      .set('Authorization', `Bearer ${global.testGlobals.TenantAdmin.accessToken}`)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        // console.log('🗑️ Delete Org Response:', res.body);
        done();
      });
  });

  it('should put batch status equal false', (done) => {
    const updatedTime = new Date().toISOString();
    const batchName = `Set ${updatedTime}`;
    request(global.dm_serverUrl)
      .put(`/api/v1/orgs/${global.testGlobals.org.id}/batches/${global.testGlobals.batch.id}/status`)
      .set('Authorization', `Bearer ${global.testGlobals.TenantAdmin.accessToken}`)
      .send({
        "isEnabled": false
      })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.have.property('isEnabled').that.equals(false);
        done();
      });
  });

  it('should delete an batch', (done) => {
    request(global.dm_serverUrl)
      .delete(`/api/v1/orgs/${global.testGlobals.org.id}/batches/${global.testGlobals.batch.id}`)
      .set('Authorization', `Bearer ${global.testGlobals.TenantAdmin.accessToken}`)
      .expect(204)
      .end((err, res) => {
        if (err) return done(err);
        // console.log('🗑️ Delete Org Response:', res.body);
        done();
      });
  });

  it('should delete an task', (done) => {
    request(global.dm_serverUrl)
      .delete(`/api/v1/orgs/${global.testGlobals.org.id}/tasks/${global.testGlobals.task.id}`)
      .set('Authorization', `Bearer ${global.testGlobals.TenantAdmin.accessToken}`)
      .expect(204)
      .end((err, res) => {
        if (err) return done(err);
        // console.log('🗑️ Delete Org Response:', res.body);
        done();
      });
  });


});