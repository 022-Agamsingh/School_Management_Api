# 🚀 Vercel Deployment Connection Guide

## 📋 Complete Steps to Connect Frontend and Backend

### 1. Environment Variables Setup

#### Backend Environment Variables on Vercel:

Add these environment variables in your **backend** Vercel project settings:

```
MONGODB_URI=mongodb+srv://2002agamsingh:agam@week-7.hwe9ccb.mongodb.net/SchoolDB
JWT_SECRET_KEY=Singh1147
PORT=3000
NODE_ENV=production
```

#### Frontend Environment Variables on Vercel:

Add this environment variable in your **frontend** Vercel project settings:

```
VITE_API_BASE_URL=https://school-management-api-3hr2.vercel.app
```

### 2. Your Vercel URLs

✅ **Backend URL**: `https://school-management-api-3hr2.vercel.app`
🔄 **Frontend URL**: `https://your-frontend-name.vercel.app` (Get this after deploying frontend)

### 3. Update Configuration Files

#### ✅ Frontend .env file (Already Updated):

```env
VITE_API_BASE_URL=https://school-management-api-3hr2.vercel.app
```

#### Update Backend CORS in index.js:

```javascript
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "http://localhost:3001",
      "https://your-frontend-app-name.vercel.app",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
```

### 4. Redeploy Both Applications

1. **Backend**: Push changes to your backend repository
2. **Frontend**: Push changes to your frontend repository
3. Vercel will automatically redeploy both

### 5. Vercel Environment Variables Setup

#### For Backend Project:

1. Go to Vercel Dashboard → Your Backend Project → Settings → Environment Variables
2. Add:
   - `MONGODB_URI` = `mongodb+srv://2002agamsingh:agam@week-7.hwe9ccb.mongodb.net/SchoolDB`
   - `JWT_SECRET_KEY` = `Singh1147`
   - `NODE_ENV` = `production`

#### For Frontend Project:

1. Go to Vercel Dashboard → Your Frontend Project → Settings → Environment Variables
2. Add:
   - `VITE_API_BASE_URL` = `https://your-backend-app-name.vercel.app`

### 6. Test the Connection

1. Open your frontend Vercel URL
2. Try to signup/login
3. Check if data is being saved and retrieved properly

### 🔧 Troubleshooting

#### Common Issues:

1. **CORS Error**: Make sure your frontend URL is added to backend CORS origins
2. **Environment Variables**: Ensure all environment variables are set correctly in Vercel
3. **API Base URL**: Make sure VITE_API_BASE_URL points to your backend URL
4. **Cookies**: Ensure `credentials: true` is set in both CORS and fetch requests

#### Check Vercel Logs:

1. Go to Vercel Dashboard → Your Project → Functions (for serverless logs)
2. Check the logs for any errors

### 📞 Final Checklist

- [ ] Backend deployed to Vercel with environment variables
- [ ] Frontend deployed to Vercel with API_BASE_URL
- [ ] CORS configured with frontend URL
- [ ] All API calls use API_BASE_URL
- [ ] Both applications redeployed after changes
- [ ] Test signup, login, and all features

### 🎯 Next Steps

1. Replace placeholder URLs with your actual Vercel URLs
2. Test all functionality
3. Monitor Vercel logs for any issues
4. Consider adding error handling for production

---

**Important**: Replace all instances of:

- `your-backend-app-name.vercel.app` with your actual backend Vercel URL
- `your-frontend-app-name.vercel.app` with your actual frontend Vercel URL
