# Deployment Guide - AdTalk Event Solutions Website

This guide explains how to deploy the AdTalk Event Solutions React application to cPanel hosting.

## Prerequisites

- Access to your cPanel account
- Node.js and npm installed locally
- FTP client (optional, for large uploads)
- Domain configured in cPanel

## Step 1: Prepare Your Application

### 1.1 Install Dependencies

```bash
npm install
```

### 1.2 Test Locally

```bash
npm run dev
```

Visit `http://localhost:5173` to ensure everything works correctly.

### 1.3 Build Production Version

```bash
npm run build
```

This creates a `dist` folder containing optimized production files:
- `index.html` - Main HTML file
- `assets/` - Minified JavaScript, CSS, and images
- Other static assets

## Step 2: Access cPanel

1. Log in to your cPanel account at: `https://yourdomain.com/cpanel`
2. Navigate to **File Manager** in the Files section
3. Click **Settings** (top right) and ensure "Show Hidden Files" is enabled

## Step 3: Prepare the Directory

### 3.1 Locate Your Domain Directory

- For main domain: Navigate to `public_html/`
- For subdomain: Navigate to `public_html/subdomain/`
- For addon domain: Navigate to `public_html/addondomain/`

### 3.2 Backup Existing Files (if any)

1. Select all existing files
2. Click **Compress** to create a backup
3. Download the backup or move it to a backup folder
4. Delete old files from the directory

## Step 4: Upload Your Files

### Method A: File Manager Upload (Recommended for smaller projects)

1. In File Manager, navigate to your target directory (`public_html`)
2. Click **Upload** button (top menu)
3. Select all files and folders from your local `dist` folder
4. Wait for upload to complete

**Note**: File Manager may have upload size/count limits. For large projects, use Method B.

### Method B: ZIP Upload (Recommended for faster deployment)

1. On your local computer, compress the contents of `dist` folder into a ZIP file
   - **Important**: Compress the CONTENTS, not the dist folder itself
2. In cPanel File Manager, click **Upload**
3. Upload the ZIP file
4. After upload completes, go back to File Manager
5. Right-click the ZIP file and select **Extract**
6. Delete the ZIP file after extraction

### Method C: FTP Upload (For advanced users)

1. Open your FTP client (FileZilla, WinSCP, etc.)
2. Connect using your cPanel FTP credentials:
   - Host: `ftp.yourdomain.com` or your server IP
   - Username: Your cPanel username
   - Password: Your cPanel password
   - Port: 21
3. Navigate to the target directory
4. Upload all files from `dist` folder

## Step 5: Configure URL Rewriting

React Router requires proper URL rewriting to handle client-side routing.

### 5.1 Create .htaccess File

1. In File Manager, navigate to your domain directory (`public_html`)
2. Click **+ File** button
3. Name it `.htaccess`
4. Right-click the file and select **Edit**
5. Add the following code:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteCond %{REQUEST_FILENAME} !-l
  RewriteRule . /index.html [L]
</IfModule>

# Browser Caching
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
  ExpiresByType application/pdf "access plus 1 month"
  ExpiresByType image/x-icon "access plus 1 year"
</IfModule>

# Gzip Compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html
  AddOutputFilterByType DEFLATE text/css
  AddOutputFilterByType DEFLATE text/javascript
  AddOutputFilterByType DEFLATE application/javascript
  AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>
```

6. Save the file

### 5.2 Verify File Permissions

Ensure `.htaccess` has correct permissions:
- Right-click `.htaccess`
- Select **Change Permissions**
- Set to `644` (Owner: Read/Write, Group: Read, World: Read)

## Step 6: Configure for Subdirectory (Optional)

If deploying to a subdirectory instead of root domain:

### 6.1 Update vite.config.js

Before building, update your `vite.config.js`:

```javascript
export default {
  base: '/subdirectory/', // Replace with your subdirectory name
}
```

### 6.2 Update .htaccess

Change `RewriteBase` in `.htaccess`:

```apache
RewriteBase /subdirectory/
```

## Step 7: Test Your Deployment

### 7.1 Basic Testing

1. Visit your domain: `https://yourdomain.com`
2. Check if homepage loads correctly
3. Navigate through all pages using the menu
4. Test direct URL access to internal pages (e.g., `/services`, `/contact`)
5. Refresh browser on internal pages to verify routing works

### 7.2 Check for Common Issues

- **Images not loading**: Check browser console for 404 errors
- **Blank page**: Open browser console (F12) to check for JavaScript errors
- **404 on refresh**: Verify `.htaccess` is configured correctly
- **Styling issues**: Check if CSS files are loading in Network tab

### 7.3 Mobile Testing

Test on mobile devices or use browser DevTools:
- Chrome: F12 → Toggle device toolbar
- Test responsiveness
- Check touch interactions

## Step 8: Enable HTTPS (Recommended)

### 8.1 Install SSL Certificate

1. In cPanel, go to **SSL/TLS Status**
2. Select your domain
3. Click **Run AutoSSL** (if using cPanel AutoSSL)
4. Or install Let's Encrypt certificate from **SSL/TLS** section

### 8.2 Force HTTPS Redirect

Add to top of `.htaccess`:

```apache
# Force HTTPS
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
```

## Troubleshooting

### Issue: Blank White Page

**Solution:**
- Check browser console (F12) for JavaScript errors
- Verify all files uploaded correctly
- Check file permissions (files: 644, folders: 755)
- Ensure `index.html` exists in root directory

### Issue: 404 Errors on Page Refresh

**Solution:**
- Verify `.htaccess` exists and is configured correctly
- Check if mod_rewrite is enabled (contact hosting provider)
- Ensure `.htaccess` permissions are set to 644

### Issue: Assets Not Loading (Images, CSS, JS)

**Solution:**
- Check Network tab in browser DevTools
- Verify asset paths are relative, not absolute
- Ensure all files from `dist/assets` folder were uploaded
- Check if file names match exactly (case-sensitive)

### Issue: Contact Form Not Working

**Solution:**
- Verify form submission logic
- Check if backend API is configured correctly
- Review CORS settings if using external API

### Issue: Slow Loading Speed

**Solution:**
- Enable Gzip compression (see `.htaccess` above)
- Enable browser caching (included in `.htaccess` example)
- Use cPanel's **Optimize Website** feature
- Consider using CDN for static assets

## Updating Your Website

When making changes:

1. Make changes locally
2. Test with `npm run dev`
3. Build production version: `npm run build`
4. Upload ONLY changed files or upload entire `dist` folder
5. Clear browser cache: Ctrl + Shift + R (Windows) or Cmd + Shift + R (Mac)

## Performance Optimization Tips

1. **Enable Gzip Compression**: Already included in `.htaccess` example
2. **Browser Caching**: Already included in `.htaccess` example
3. **Optimize Images**: Use compressed images before building
4. **Minimize Redirects**: Ensure proper URL structure
5. **Use CDN**: Consider Cloudflare for additional performance

## Security Best Practices

1. **Keep Dependencies Updated**: Regularly run `npm update`
2. **Use HTTPS**: Always use SSL certificate
3. **Set Proper Permissions**:
   - Files: 644
   - Folders: 755
   - .htaccess: 644
4. **Hide Sensitive Files**: Add to `.htaccess`:

```apache
# Prevent access to sensitive files
<FilesMatch "^\.">
  Order allow,deny
  Deny from all
</FilesMatch>
```

## Maintenance Checklist

### Before Each Deployment
- [ ] Test locally
- [ ] Build production version
- [ ] Backup current live files
- [ ] Check for broken links
- [ ] Test on multiple browsers

### After Deployment
- [ ] Test all pages
- [ ] Check mobile responsiveness
- [ ] Verify forms work
- [ ] Test navigation and routing
- [ ] Check browser console for errors
- [ ] Verify SSL certificate

## Support Resources

- **cPanel Documentation**: https://docs.cpanel.net/
- **Vite Documentation**: https://vitejs.dev/guide/
- **React Router**: https://reactrouter.com/

## Quick Reference Commands

```bash
# Install dependencies
npm install

# Development server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

---

**Last Updated**: November 27, 2025  
**Version**: 1.0  
**Contact**: mail@adtalk.com.ph
