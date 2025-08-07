
# React route  

| 比較項目                      | 第一種（`createBrowserRouter`） | 第二種（`<Routes>`） |
| ------------------------- | -------------------------- | --------------- |
| 📦 支援 `loader` / `action` | ✅ 有                        | ❌ 沒有            |
| 🧱 巢狀路由 + layout          | ✅ 好寫（清楚的層次）                | ⚠️ 可行但容易混亂      |
| 💥 錯誤頁處理 (`errorElement`) | ✅ 內建支援                     | ❌ 需要自處理         |
| ⚙️ 設計大型應用                 | ✅ 推薦使用                     | ⚠️ 較難維護         |
| 🧠 心智模型                   | ✅ 路由像資料結構                  | 🔁 像 HTML 版面    |


- loader / action 資料加載
- useNavigation() 等 hooks

```tsx
export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '', element: <HomePage /> },
      { path: 'about', element: <AboutPage /> },
      {
        path: 'setting',
        element: <Setting />,
        children: [
          { path: 'profile', element: <SettingProfile /> },
          { path: 'security', element: <SettingSecurity /> },
        ],
      },
    ],
  },
]);
```

```tsx
export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/" element={<Navigate to="/app" />} />
      <Route path="/srp" element={<Navigate to="/new" />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/new" element={<NewPage />} />
      <Route path="/signout-callback-oidc" element={<LogoutPage />} />
      <Route path="/error" element={<NotFound />} />
    </Routes>)
}
```

# 檢查是否有登陸 check login  

| 方式                      | 特點                             | 推薦情境       |
| ----------------------- | ------------------------------ | ---------- |
| `loader` + `redirect()` | 官方推薦做法，乾淨又支援 SSR/Future Router | 進階項目       |
| `<AuthGuard>` component | 自由控制邏輯，可顯示 loading 或自定跳轉       | 簡易實作或控制細節多 |

✅ 建議作法：使用 <Outlet /> + Loader + Redirect  
你可以利用 route 的 loader 做「進入頁面前的檢查」，如果未通過檢查則 throw redirect()。  

```tsx
// routes.tsx
import { createBrowserRouter, redirect } from 'react-router-dom';
import AuthLayout from './AuthLayout';
import Home from './Home';
import Login from './Login';

// 檢查登入狀態的 loader
const authLoader = async () => {
  const res = await fetch('/api/check-login', { credentials: 'include' });
  if (!res.ok) {
    throw redirect('/login');
  }
  return null;
};

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AuthLayout />, // 包含 <Outlet />
    loader: authLoader, // 判斷是否登入
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'setting',
        element: <Setting />,
        // 可以有更多 children
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
]);

```

# 預設子頁面  

```tsx
<Route path="/setting" element={<SettingLayout />}>
  <Route index element={<ProfileSetting />} />              // 預設子頁面 → /setting
  <Route path="profile" element={<ProfileSetting />} />     // /setting/profile
  <Route path="account" element={<AccountSetting />} />     // /setting/account
  <Route path="security" element={<SecuritySetting />} />   // /setting/security
</Route>

// 或是使用 redirect 預設子頁面 
<Route index element={<Navigate to="profile" replace />} />
```

❗補充注意：  
如果你 不設定 index: true，使用者進入 /setting 時會看到空白（因為沒有符合的子路由），這在多層巢狀結構很常見但也容易忽略。  

```tsx
{
  index: true,
  element: <Navigate to="your-default-subpage" />
}
```

```tsx
import { createBrowserRouter, Navigate } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: 'setting',
        element: <SettingLayout />,
        children: [
          {
            index: true, // 即 /setting
            element: <Navigate to="device" />
          },
          {
            path: 'device',
            element: <DeviceSetting />
          },
          {
            path: 'batch',
            element: <BatchSetting />
          }
        ]
      }
    ]
  }
]);

```

```tsx
{
  path: '/',
  element: <Layout />,
  children: [
    {
      index: true,
      element: <Navigate to="home" />
    },
    {
      path: 'home',
      element: <Home />
    }
  ]
}
```