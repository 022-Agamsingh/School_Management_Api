# 🔧 Frontend API Connection Debug Guide

## ✅ Fixed Issues:

- Updated all components to use `API_BASE_URL` instead of hardcoded localhost
- Backend is confirmed working at: `https://school-management-api-flame.vercel.app`
- CORS is properly configured for Vercel domains

## 🧪 Testing Steps:

### 1. Verify Environment Variable

Check that your `.env` file contains:

```
VITE_API_BASE_URL=https://school-management-api-flame.vercel.app
```

### 2. Test Locally

```powershell
cd frontend
npm run dev
```

### 3. Check Browser Console

1. Open browser dev tools (F12)
2. Go to Console tab
3. Look for any API-related errors
4. Check Network tab for failed requests

### 4. Manual API Test

Open browser console and run:

```javascript
fetch("https://school-management-api-flame.vercel.app/")
  .then((r) => r.json())
  .then((d) => console.log(d));
```

## 🚨 Common Issues & Solutions:

### Issue: "Network error. Please try again."

**Causes:**

1. ❌ Environment variable not loaded
2. ❌ CORS blocking requests
3. ❌ Backend not responding

**Solutions:**

1. ✅ Restart dev server after changing .env
2. ✅ Check backend CORS settings
3. ✅ Verify backend URL is correct

### Issue: Login fails silently

**Check:**

- Browser Network tab for 400/500 errors
- Backend logs for validation errors
- CORS headers in response

### Issue: Cookies not working

**Check:**

- `credentials: 'include'` in fetch requests
- Backend CORS `credentials: true`
- Same-site cookie policies

## 🔍 Debug Checklist:

- [ ] `.env` file has correct VITE_API_BASE_URL
- [ ] Restarted dev server after .env changes
- [ ] All components import and use API_BASE_URL
- [ ] Backend responds to GET /
- [ ] CORS headers present in API responses
- [ ] No console errors in browser
- [ ] Network tab shows requests to correct URL

## 📱 Test Endpoints:

1. **Root**: `GET https://school-management-api-flame.vercel.app/`
2. **Signup**: `POST https://school-management-api-flame.vercel.app/signup`
3. **Login**: `POST https://school-management-api-flame.vercel.app/login`

## 🎯 Next Steps:

1. **Restart your frontend dev server**
2. **Clear browser cache**
3. **Test login with valid credentials**
4. **Check browser console for detailed errors**

---

**Your backend is working perfectly! The issue was hardcoded localhost URLs in your frontend components, which have now been fixed.** 🚀
