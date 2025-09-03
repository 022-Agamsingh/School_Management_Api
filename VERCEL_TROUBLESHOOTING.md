# 🚨 Vercel Backend Deployment Troubleshooting

## Current Issue: "Internal server error" on signup

### ✅ Immediate Fixes Applied:

1. **Updated CORS configuration** to allow Vercel domains
2. **Added detailed error logging** for better debugging
3. **Fixed syntax error** in signup function

### 🔧 Required Environment Variables on Vercel

Go to your Vercel project dashboard → Settings → Environment Variables and add:

```
MONGODB_URI=mongodb+srv://2002agamsingh:agam@week-7.hwe9ccb.mongodb.net/SchoolDB
JWT_SECRET_KEY=Singh1147
NODE_ENV=production
```

### 🔍 Debug Steps:

1. **Check Vercel Function Logs**:

   - Go to Vercel Dashboard → Your Project → Functions
   - Look for error logs when you test the signup endpoint

2. **Test with minimal payload** in Postman:

   ```json
   {
     "name": "Test User",
     "email": "test@example.com",
     "password": "password123"
   }
   ```

3. **Check MongoDB Connection**:
   - Verify your MongoDB Atlas allows connections from anywhere (0.0.0.0/0)
   - Or add Vercel IP ranges to whitelist

### 🎯 Common Vercel Backend Issues:

#### 1. **Environment Variables Not Set**

- Solution: Add all required env vars in Vercel dashboard

#### 2. **MongoDB Connection Issues**

- Check if MongoDB Atlas allows connections from Vercel
- IP Whitelist: Add 0.0.0.0/0 in MongoDB Atlas Network Access

#### 3. **Module Import Issues**

- Ensure all relative paths are correct
- Check that all dependencies are in package.json

#### 4. **Serverless Function Timeout**

- Vercel has 10s timeout for hobby plan
- Optimize database queries

### 🧪 Test Endpoints:

1. **Root endpoint** (should work):

   ```
   GET https://school-management-api-flame.vercel.app/
   ```

2. **Signup endpoint**:

   ```
   POST https://school-management-api-flame.vercel.app/signup
   Content-Type: application/json

   {
       "name": "Test User",
       "email": "test@example.com",
       "password": "password123"
   }
   ```

### 📋 Checklist:

- [ ] Environment variables set on Vercel
- [ ] MongoDB Atlas allows Vercel connections
- [ ] All dependencies in package.json
- [ ] Root endpoint returns success
- [ ] Check Vercel function logs for specific errors

### 🔄 Next Steps:

1. **Deploy the updated code** (with CORS and logging fixes)
2. **Set environment variables** on Vercel
3. **Test root endpoint** first
4. **Check Vercel logs** for specific error messages
5. **Test signup with simple payload**

---

**After deploying these fixes, the detailed error logs should help identify the exact issue!**
