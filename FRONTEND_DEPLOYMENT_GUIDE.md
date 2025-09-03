# 🚀 Frontend Deployment Guide for Vercel

## ✅ Configuration Complete!

Your frontend is now configured to connect to your backend:

- **Backend URL**: `https://school-management-api-flame.vercel.app`
- **Frontend configured** to use the backend API
- **CORS enabled** on backend for all Vercel domains

## 📋 Step-by-Step Deployment

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Go to [Vercel Dashboard](https://vercel.com/dashboard)**
2. **Click "New Project"**
3. **Import your frontend repository** or upload the frontend folder
4. **Configure the project**:

   - Framework Preset: **Vite**
   - Root Directory: **frontend** (if you're deploying from the main repo)
   - Build Command: `npm run build`
   - Output Directory: `dist`

5. **Set Environment Variables**:

   - Variable: `VITE_API_BASE_URL`
   - Value: `https://school-management-api-flame.vercel.app`

6. **Deploy!**

### Option 2: Deploy via Vercel CLI

If you have Vercel CLI installed:

```powershell
# Navigate to frontend directory
cd "C:\Users\2002a\Desktop\project\school managemnt api\frontend"

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

## 🔧 Environment Variables for Frontend

In Vercel Dashboard → Your Frontend Project → Settings → Environment Variables:

```
VITE_API_BASE_URL=https://school-management-api-flame.vercel.app
```

## 🧪 Testing After Deployment

Once deployed, test these features:

1. **User Registration** (signup)
2. **User Login**
3. **Add Schools**
4. **View Schools List**
5. **Profile Management**

## 🔗 Expected URLs

- **Frontend**: `https://your-frontend-name.vercel.app`
- **Backend**: `https://school-management-api-flame.vercel.app` ✅

## 🎯 What's Already Configured

✅ **Frontend Environment**: Points to your backend
✅ **API Configuration**: All components use API_BASE_URL
✅ **Backend CORS**: Allows all Vercel domains
✅ **Vercel Config**: Frontend routing configured
✅ **Build Settings**: Optimized for Vite

## 🚨 If You Get Errors

### CORS Error:

- Ensure your frontend URL is allowed in backend CORS
- Check that credentials are being sent

### API Connection Error:

- Verify VITE_API_BASE_URL is set correctly in Vercel
- Check backend is responsive at https://school-management-api-flame.vercel.app

### Build Errors:

- Check all dependencies are in package.json
- Ensure all imports are correct

## 📱 After Successful Deployment

1. **Test all functionality**
2. **Update backend CORS** with your specific frontend URL for better security
3. **Monitor both frontend and backend logs**

---

## 🎉 Ready to Deploy!

Your frontend is fully configured and ready for deployment. The API calls will automatically connect to your working backend once deployed!

**Next Steps:**

1. Deploy frontend to Vercel
2. Set the environment variable
3. Test the full application
4. Share your live URLs! 🚀
