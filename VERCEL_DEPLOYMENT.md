# Vercel Deployment Guide for School Management API

## ⚠️ Important Database Considerations

**Vercel is a serverless platform**, which means:
- It doesn't support traditional MySQL connections directly
- Your local MySQL database won't be accessible from Vercel
- You need a cloud database for production deployment

## 🌐 Database Options for Vercel Deployment

### Option 1: PlanetScale (Recommended - Free Tier Available)
1. **Sign up at:** [https://planetscale.com](https://planetscale.com)
2. **Create a new database**
3. **Get connection string** from the dashboard
4. **Update environment variables** in Vercel

### Option 2: Railway MySQL
1. **Sign up at:** [https://railway.app](https://railway.app)
2. **Deploy MySQL database**
3. **Get connection details**
4. **Update environment variables**

### Option 3: AWS RDS, Google Cloud SQL, or Azure Database
- More enterprise solutions
- Require cloud provider accounts

## 🚀 Step-by-Step Vercel Deployment

### Step 1: Prepare Your Repository
```bash
# Add and commit all changes
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
```

### Step 2: Deploy to Vercel

#### Option A: Using Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel
```

#### Option B: Using Vercel Dashboard
1. **Go to:** [https://vercel.com](https://vercel.com)
2. **Sign in** with GitHub
3. **Import** your repository
4. **Configure** environment variables
5. **Deploy**

### Step 3: Configure Environment Variables in Vercel

In your Vercel project dashboard, add these environment variables:

```env
HOST=your_cloud_database_host
USER=your_cloud_database_username  
PASSWORD=your_cloud_database_password
DATABASE=your_cloud_database_name
NODE_ENV=production
```

## 📝 Environment Variables Setup

### For PlanetScale:
```env
HOST=gateway01.us-east-1.prod.aws.planetscale.com
USER=your_planetscale_username
PASSWORD=your_planetscale_password
DATABASE=your_database_name
NODE_ENV=production
```

### For Railway:
```env
HOST=containers-us-west-xxx.railway.app
USER=root
PASSWORD=your_railway_password
DATABASE=railway
NODE_ENV=production
```

## 🔧 Files Added for Vercel Deployment

### 1. `vercel.json`
```json
{
  "version": 2,
  "builds": [
    {
      "src": "index.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "index.js"
    }
  ]
}
```

### 2. Updated `index.js`
- Changed from single connection to connection pool
- Added export for Vercel serverless environment
- Conditional server listening for local development

### 3. Updated `database.js`
- Uses connection pool instead of single connection
- Better error handling for serverless environment
- Automatic table creation

## 🌍 Testing Your Deployed API

After deployment, your API will be available at:
```
https://your-project-name.vercel.app
```

### Test Endpoints:
```bash
# Add a school
curl -X POST https://your-project-name.vercel.app/addSchool \
  -H "Content-Type: application/json" \
  -d '{"name":"Test School","address":"123 Main St","latitude":40.7128,"longitude":-74.0060}'

# List schools  
curl "https://your-project-name.vercel.app/listSchools?latitude=40.7589&longitude=-73.9851"
```

## 🔍 Troubleshooting

### Common Issues:

1. **Database Connection Error**
   - Verify environment variables in Vercel dashboard
   - Ensure cloud database is running and accessible
   - Check connection string format

2. **Function Timeout**
   - Vercel has a 10-second timeout for free plans
   - Optimize database queries
   - Consider upgrading Vercel plan

3. **CORS Issues**
   - Add CORS middleware if needed for frontend access
   ```javascript
   app.use((req, res, next) => {
     res.header('Access-Control-Allow-Origin', '*');
     res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
     res.header('Access-Control-Allow-Headers', 'Content-Type');
     next();
   });
   ```

## 📊 Local Development vs Production

### Local Development:
```bash
npm run dev
# Uses local MySQL database
# Runs on http://localhost:3001
```

### Production (Vercel):
```bash
# Automatically deployed on push to main branch
# Uses cloud database
# Runs on https://your-project-name.vercel.app
```

## 🎯 Quick Setup with PlanetScale (Recommended)

1. **Create PlanetScale account:** [https://planetscale.com](https://planetscale.com)
2. **Create database:** `school-management-db`
3. **Create branch:** `main`
4. **Get connection string**
5. **Add to Vercel environment variables**
6. **Deploy to Vercel**
7. **Test your API**

## ✅ Deployment Checklist

- [ ] Cloud database setup (PlanetScale/Railway)
- [ ] Environment variables configured in Vercel
- [ ] Repository pushed to GitHub
- [ ] Vercel project created and connected
- [ ] API endpoints tested on production URL
- [ ] Postman collection updated with production URL

## 🔗 Useful Links

- **Vercel Documentation:** [https://vercel.com/docs](https://vercel.com/docs)
- **PlanetScale Docs:** [https://docs.planetscale.com](https://docs.planetscale.com)
- **Railway Docs:** [https://docs.railway.app](https://docs.railway.app)

---

**Your API is now ready for production! 🚀**
