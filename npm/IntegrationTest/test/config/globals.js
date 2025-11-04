import fs from 'fs';
import jwt from 'jsonwebtoken';
import {
  loadState,
  updateState
} from '../setup/state.js';

const globals = {
  iam_serverUrl: 'http://localhost:44382',
  dm_serverUrl: 'http://localhost:44327',
  SystemAdmin: {
    token: '',
    id: '',
    accessToken: '',
    refreshToken: '',
    role: ''
  },
  TenantAdmin: {
    token: '',
    id: '',
    accessToken: '',
    refreshToken: '',
    role: ''
  },
  TenantUser: {
    token: '',
    id: '',
    accessToken: '',
    refreshToken: '',
    role: ''
  },
  org: {
    id: '',
    name: ''
  },
  suborg: {
    id: '',
    name: ''
  },
  device: {
    id: ''
  },
  task: {
    id: ''
  },
  batch: {
    id: ''
  }
};

// ✅ 提供共用初始化函式
globals.init = () => {
  try {
    // 預先載入 Token（若已存在）
    if (fs.existsSync('./desk/token_TAdmin')) {
      const tokenAdmin = fs.readFileSync('./desk/token_TAdmin', 'utf8').trim();
      globals.TenantAdmin.token = tokenAdmin;
      const decoded = jwt.decode(tokenAdmin);
      globals.TenantAdmin.id = decoded?.sub || '';
      globals.TenantAdmin.role = decoded?.role || '';
      const adminId = globals.TenantAdmin.id;
      updateState({
        tokenAdmin,
        adminId,
      })
    }

    if (fs.existsSync('./desk/token_Tuser')) {
      const tokenUser = fs.readFileSync('./desk/token_Tuser', 'utf8').trim();
      globals.TenantUser.token = tokenUser;
      const decodedUser = jwt.decode(tokenUser);
      globals.TenantUser.id = decodedUser?.sub || '';
      globals.TenantUser.role = decodedUser?.role || '';
      const userId = globals.TenantUser.id;
      updateState({
        tokenUser,
        userId,
      })
    }

    console.log('✅ Globals initialized');
  } catch (err) {
    console.error('❌ Error initializing globals:', err);
  }
};

// 匯出給其他測試用
export default globals;