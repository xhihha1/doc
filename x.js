const main = {
    topbar: {
      home: 'Home',
      setting: 'Setting',
      language: 'EN',
      user: 'User',
      systemSetting: 'System Setting',
      version: 'Version'
    },
    menu: {
      homepage: 'Home' // TODO: check if not in use/different page
    },
    user: {
      user: 'User',
      loginTime: 'Login Time', // TODO: check if not in use/different page
      logout: 'Logout',
      profile: 'Profile' // TODO: check if not in use/different page
    }
  };
  
  const systemSetting = {
    uiTheme: 'UI Theme',
    timeZone: 'Time Zone',
    about: 'About SaaS Composer',
    version: 'Version',
    newPwdNotSame: 'New password and confirmation password do not match', // TODO: check if not in use/different page
    changePwdSuccess: 'Password has been change successfully', // TODO: check if not in use/different page
    changePwdFailed: 'Password change failed', // TODO: check if not in use/different page
    oldPasswordError: 'Old password is incorrect', // TODO: check if not in use/different page
    passwordLengthErr: 'New password can not be empty and length should be between 8 to 20 characters', // TODO: check if not in use/different page
    passwordError: 'Password is incorrect', // TODO: check if not in use/different page
    passwordPolicyErr: 'New password does not meet the password policy requirements:<br/>' +
    'between 8 to 20 characters<br/>' +
    'at least 1 digit<br/>' +
    'at least 1 lower case letter<br/>' +
    'at least 1 upper case letter<br/>' +
    'at least 1 special character<br/>' +
    'except space or tab' // TODO: check if not in use/different page
  };
  
  const versionHistory = {
    VersionHistory: 'Version History',
    version: 'Version',
    date: 'Date',
    description: 'Description'
  }
  
  const userProfile = {
    username: 'Username', // TODO: check if not in use/different page
    email: 'User ID', // TODO: check if not in use/different page
    role: 'Role',
    changePassword: 'Change Password',
    oldPassword: 'Old password',
    newPassword: 'New password',
    confirmPassword: 'Confirm Password',
    cancel: 'Cancel',
    save: 'Save'
  };
  
  const orgList = {
    name: 'Org. Name',
    sketchboard: 'Sketchboard',
    dataSource: 'Data Source',
    createdBy: 'Created By',
    role: 'Role',
    user: 'User',
    search: 'Search organization',
    enterOrgName: 'Enter Org. name',
    add: '+ New Org.',
    view: 'View', // TODO: check if not in use/different page
    manage: 'Manage', // TODO: check if not in use/different page
    delete: 'Delete',
    save: 'Save',
    cancel: 'Cancel',
    alarm: 'Please type Org. name to delete or close this modal to cancel.',
    rename: 'Rename',
    remind: 'Confirmation',
    message: {
      emptyName: 'Org. name can not be empty',
      nameLengthLimit: 'Input length limitation of 64 characters',
      deleteSuccess: 'Delete Org. success',
      deleteFailed: 'Delete Org. failed',
      addSuccess: 'Add Org. success',
      addFailed: 'Add Org. failed',
      addFailedRepeatName: 'Org. name is being used, please enter a new name',
      modifySuccess: 'Modify Org. success',
      modifyFailed: 'Modify Org. failed',
      getDataError: 'Get Org. information failed',
      policyErr: 'Org. name does not meet the policy requirements'
    }
  };
  
  const dataSource = {
    chose: 'Please choose',
    name: 'Data Source Name',
    type: 'Data Source',
    search: 'Search data source',
    add: '+ New Data Source',
    advanced: 'Advanced',
    plugin: 'Plugin',
    importDataSource: 'Import Data Source',
    manage: 'Manage', // TODO: check if not in use/different page
    edit: 'Edit', // TODO: check if not in use/different page
    delete: 'Delete', // TODO: check if not in use/different page
    save: 'Save',
    confirm: 'Confirm',
    cancel: 'Cancel',
    alarm: 'Are you sure you want to delete this data source?',
    remind: 'Confirmation',
    nodeRed: 'Data-Director',
    importConfig: 'Import Configration',
    exportConfig: 'Export Configration',
    importPlugin: 'Import Data Source Plugin',
    more: 'More',
    message: {
      emptyName: 'Data source name can not be empty',
      deleteSuccess: 'Delete data source success',
      deleteFailed: 'Delete data source failed',
      addSuccess: 'Add data source success',
      addFailed: 'Add data source failed',
      modifySuccess: 'Modify data source success',
      modifyFailed: 'Modify data source failed',
      getDataError: 'Get data source information failed',
      policyErr: 'Org. name does not meet the policy requirements',
      emptyType: 'Data source type can not be empty',
      emptyUrl: 'Url can not be empty',
      repeatName: 'Data source name is being used, please enter a new name',
      connectSuccess: 'Data source connection success',
      connectFail: 'Data source connection failed',
      nameLengthLimit: 'Input length limitation of 64 characters',
      importPluginSuccess: 'Import plugin success',
      importPluginFailed: 'Import plugin field',
      deletePluginSuccess: 'Delete plugin success',
      deletePluginFailed: 'Delete plugin field',
      downloadPluginFailed: 'Download plugin field',
      existedPlugin: 'Plugin already existed',
      invalidPlugin: 'Invalid plugin',
      invalidZIPFile: 'Invalid ZIP file',
      invalidPluginContent: 'Invalid plugin content',
      PluginTooLarge: 'File too large',
      notEnableNodeRed: 'Data-Director service is not enable',
      importDataSourceSuccess: 'Import Data Source Configration success',
      importDataSourceFailed: 'Import Data Source Configration field',
      existedDataSourceName: 'Existed Data Source Name. Overlay?',
      emptyUser: 'User can not be empty',
      emptyPassword: 'Password can not be empty',
      emptyPort: 'Port can not be empty',
      emptyDatabase: 'Database can not be empty',
      emptySslMode: 'sslMode can not be empty',
      emptyIvsid: 'IVSID can not be empty',
      copySuccess: 'Copy type id success'
    }
  };
  
  const user = {
    addUserInfo: 'add user', // TODO: check if not in use/different page
    alarm: 'Are you sure you want to delete this user?',
    remind: 'Confirmation',
    name: 'User Name',
    type: 'Type',
    search: 'Search user',
    addUser: '+ New User',
    manage: 'Manage', // TODO: check if not in use/different page
    edit: 'Edit', // TODO: check if not in use/different page
    delete: 'Delete',
    save: 'Save',
    cancel: 'Cancel',
    email: 'User ID',
    select: 'Select',
    organization: 'Organization',
    addOrg: '+ Org.',
    selectOrg: 'Select Org.',
    selectRole: 'Select Role',
    enterEmail: 'Enter user ID',
    enterPassword: 'Enter Password', // TODO: check if not in use/different page
    enterPasswordAgain: 'Enter Password Again', // TODO: check if not in use/different page
    enterUserName: 'Enter user name',
    admin: 'Admin',
    password: 'Password',
    message: {
      repeatOrg: 'Repeat Org.',
      emptyOrg: 'Org. can not be null',
      emptyRole: 'Role can not be null',
      emptyEmail: ' User ID can not be null',
      emptyPassword: 'Empty Password', // TODO: check if not in use/different page
      inconsistentPassword: 'New password and confirmation password do not match', // TODO: check if not in use/different page
      deleteSuccess: 'Delete user success',
      deleteFailed: 'Delete user failed',
      addFailedRepeatName: 'Add Org. failed - User ID repeated',
      deleteFailedLastUser: 'At least an Admin user is required in an Organization',
      modifySuccess: 'Modify user success',
      modifyFailed: 'Modify user failed',
      addSuccess: 'Add user success',
      addFailed: 'Add user failed',
      duplicateKey: 'Add user failed - User already existed',
      unknownUser: 'Unable to find this user. Please add user to the User Management page first',
      getDataError: 'Get user information failed',
      getUserOrgDataError: 'Get user binding information failed',
      deleteSelf: 'You can not delete yourself',
      emptyUserNameEmail: 'User name and user ID can not be empty',
      emailPolicyErr: 'User ID does not meet the policy requirements',
      namePolicyErr: 'User name does not meet the policy requirements',
      nameLengthLimit: 'Input length limitation of 64 characters'
    }
  };
  
  const sketchboard = {
    search: 'Search sketchboard',
    add: '+ New Sketchboard',
    add3D: '+ New 3D Sketchboard',
    name: 'Sketchboard Name',
    displayType: 'Display Type',
    createdBy: 'Created By',
    view: 'View', // TODO: check if not in use/different page
    edit: 'Edit', // TODO: check if not in use/different page
    message: {
      getDataError: 'Get sketchboard information failed'
    }
  };
  
  const body = {
    home: 'Organization Management',
    organization: 'Organization',
    setting: 'Setting',
    orgList: 'Organization List',
    userManagement: 'User Management',
    sketchboard: 'Sketchboard',
    dataSource: 'Data Source',
    user: 'User',
    systemSetting: 'System Setting',
    userProfile: 'User Profile',
    version: 'Version',
    menu: 'menu'
  };
  
  const homePage = {
    title: 'Home/Organization' // TODO: check if not in use/different page
  };
  
  const glb = { // TODO: check if not in use/different page
    loading: 'Loading',
    header: 'Header',
    aside: 'Aside',
    main: 'Main',
    date: {
      timeQuantum: 'Time Quantum',
      to: 'To',
      startDate: 'Start date',
      endDate: 'End date'
    },
    search: 'Search',
    placeholder: 'Please Select',
    apply: 'Apply',
    cancel: 'Cancel'
  };
  
  const menu = {
    menuList: 'Menu list',
    viewPage: 'View',
    saveMenu: 'Save menu',
    addNode: 'Add node',
    selectLangDetail: 'Select language type & give your menu a name and URL link below',
    folder: 'Folder',
    file: 'File',
    menuName: 'Menu name',
    sketchboardLink: 'Sketchboard link',
    defaultOpen: 'Default',
    logo: 'Logo',
    logoImage: 'Image',
    logoSrc: 'Source Path',
    logoDescript: 'Description',
    menu: 'Menu',
    width: 'width',
    modify: 'Submit',
    cancel: 'Cancel',
    reset: 'Reset',
    openMenu: 'Default open',
    showIcon: 'Show icon',
    openSetting: 'Open setting',
    frameSetting: 'Frame setting',
    changeImage: 'Change',
    clearImage: 'Clear',
    language: 'Language',
    openLanguage: 'Language switch',
    defaultLang: 'Default language',
    view: 'View',
    openLayerView: 'Layers',
    message: {
      addSuccess: 'Save success',
      addFailed: 'Save failed',
      loadFailed: 'Load menu failed'
    }
  }
  
  const orgSetting = {
    bimEnable: 'Enable BIM',
    saveMenu: 'Save preference',
    message: {
      addSuccess: 'Save success',
      addFailed: 'Save preference failed',
      loadFailed: 'Load preference failed, use default setting'
    }
  }
