# Fresh Vercel Deployment Setup

## Why This Is Needed
Your production URL (`https://task-management-systems-sigma.vercel.app`) is redirecting to preview deployments. This indicates a configuration issue that's best resolved by creating a fresh deployment.

## Step-by-Step Instructions

### Step 1: Delete the Current Vercel Project

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click on your project: `task-management-systems`
3. Click **Settings** (top navigation)
4. Scroll down to **"Delete Project"**
5. Type the project name to confirm
6. Click **Delete**

### Step 2: Create a New Vercel Project

1. Go back to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"Add New..."** → **"Project"**
3. Find your GitHub repository: `task-management-system-new`
4. Click **Import**

### Step 3: Configure the Project

**IMPORTANT: Configure these settings BEFORE deploying:**

#### Root Directory
- Click **"Edit"** next to Root Directory
- Enter: `frontend`
- Click **Continue**

#### Framework Preset
- Should auto-detect as **Vite**
- If not, select **Vite** from the dropdown

#### Build and Output Settings
- **Build Command:** `npm run build` (should be auto-filled)
- **Output Directory:** `dist` (should be auto-filled)
- **Install Command:** `npm install` (should be auto-filled)

#### Environment Variables
Click **"Add Environment Variable"**

Add this variable:
- **Name:** `VITE_API_BASE_URL`
- **Value:** `https://task-management-system-new-production.up.railway.app/api`
- **Environments:** Check **ALL** (Production, Preview, Development)

Click **Add**

### Step 4: Deploy

1. Click **"Deploy"**
2. Wait for the deployment to complete (2-3 minutes)
3. Once it says **"Congratulations!"**, click **"Continue to Dashboard"**

### Step 5: Verify the Deployment

1. Click **"Visit"** to open your site
2. **Check the URL** - it should stay as `https://[your-project-name].vercel.app` (NOT redirect to a preview URL)
3. Open **Developer Tools** (F12) → **Console**
4. You should see:
   ```
   DEBUG ENV: https://task-management-system-new-production.up.railway.app/api
   DEBUG API_BASE_URL: https://task-management-system-new-production.up.railway.app/api
   ```
5. At the bottom of the login screen, you should see:
   ```
   API: https://task-management-system-new-production.up.railway.app/api
   ```

### Step 6: Test on Mobile

1. Open the production URL on your phone
2. Try to **Register** a new account
3. If successful, you're done!

## What to Do If It Still Doesn't Work

If you still see `localhost` in the console or errors:

1. **Check the .env.production file is in the repository:**
   ```bash
   git ls-files frontend/.env.production
   ```
   Should return: `frontend/.env.production`

2. **Verify the file content:**
   ```bash
   cat frontend/.env.production
   ```
   Should show: `VITE_API_BASE_URL=https://task-management-system-new-production.up.railway.app/api`

3. **If the file is missing or wrong, it means the latest code wasn't pushed:**
   ```bash
   git add .
   git commit -m "Ensure production env file is committed"
   git push origin main
   ```
   Then go to Vercel → Deployments → Redeploy

## Expected Result

After following these steps:
- ✅ Production URL stays on `https://[your-project-name].vercel.app`
- ✅ Console shows Railway API URL
- ✅ Login screen shows Railway API URL at bottom
- ✅ Registration and login work on both desktop and mobile
- ✅ No CORS errors
