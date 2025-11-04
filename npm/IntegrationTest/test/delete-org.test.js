
import request from 'supertest';
import { expect } from 'chai';

describe('Org Delete Tests', () => {
  it('should fail to delete parent org when sub-org exists', async () => {
    const res = await request(global.iam_serverUrl)
      .delete(`/api/v1/orgs/${global.testGlobals.org.id}`)
      .set('Authorization', `Bearer ${global.testGlobals.TenantAdmin.accessToken}`)
      .expect(403);

    // console.log('Attempt delete parent org with sub-org:', res.body);
  });

  it('should delete sub-org successfully', async () => {
    const res = await request(global.iam_serverUrl)
      .delete(`/api/v1/orgs/${global.testGlobals.suborg.id}`)
      .set('Authorization', `Bearer ${global.testGlobals.TenantAdmin.accessToken}`)
      .expect(204); // No Content

    // console.log('Deleted sub-org successfully');
  });

  it('should delete parent org successfully after sub-org deleted', async () => {
    const res = await request(global.iam_serverUrl)
      .delete(`/api/v1/orgs/${global.testGlobals.org.id}`)
      .set('Authorization', `Bearer ${global.testGlobals.TenantAdmin.accessToken}`)
      .expect(204);

    // console.log('Deleted parent org successfully');
  });

});