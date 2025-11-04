import globals from './globals.js';

global.iam_serverUrl = globals.iam_serverUrl;
global.dm_serverUrl = globals.dm_serverUrl;
global.testGlobals = globals;


// 共用初始化（例如先讀 token）
// before(async () => {
//   console.log('🔧 Setting up global test context...');
//   globals.init();
// });

// after(() => {
//   console.log('🧹 Global teardown completed.');
// });

export const mochaHooks = {
  async beforeAll() {
    console.log('🔧 Setting up global test context...');
    globals.init();
  },
  afterAll() {
    console.log('🧹 Global teardown completed.');
  }
};