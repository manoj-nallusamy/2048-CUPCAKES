# Google Analytics Setup Guide for 2048 Cupcakes

## Step 1: Create a Google Analytics Property

1. Go to [Google Analytics](https://analytics.google.com/)
2. Sign in with your Google account
3. Click **Admin** (gear icon) in the bottom left
4. In the **Account** column, select your account or create a new one
5. In the **Property** column, click **Create Property**
6. Fill in:
   - Property name: "2048 Cupcakes" (or your preferred name)
   - Reporting time zone: Your timezone
   - Currency: Your currency
7. Click **Next**
8. Select **Web** as your platform
9. Enter your website URL (e.g., `https://yourdomain.com`)
10. Click **Create stream**

## Step 2: Get Your Measurement ID

1. After creating the stream, you'll see your **Measurement ID**
2. It looks like: `G-XXXXXXXXXX` (starts with G-)
3. Copy this ID

## Step 3: Add Measurement ID to Your Site

1. Open `index.html`
2. Find these two lines (around line 40 and 45):
   ```html
   <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
   ```
   and
   ```javascript
   gtag('config', 'G-XXXXXXXXXX', {
   ```
3. Replace `G-XXXXXXXXXX` with your actual Measurement ID in **both places**

## Step 4: Verify It's Working

### Method 1: Real-Time Reports
1. Go to Google Analytics → **Reports** → **Real-time**
2. Visit your website
3. You should see yourself as an active user within 30 seconds

### Method 2: Browser DevTools
1. Open your site in a browser
2. Open DevTools (F12)
3. Go to **Network** tab
4. Filter by "google-analytics" or "gtag"
5. You should see requests being sent

### Method 3: Test Events
1. Play the game (start a new game)
2. Check Real-Time → **Events** in GA
3. You should see `game_start` event appear

## Events Being Tracked

Your game automatically tracks these events:

| Event Name | When It Fires | Data Included |
|------------|---------------|---------------|
| `game_start` | User clicks "New Game" | - |
| `game_over` | Board fills up, game ends | score, points |
| `game_won` | Player reaches 2048 tile | score, points |
| `milestone_reached` | Player reaches 512, 1024, 2048, 4096, or 8192 | tile value, score, points |

## Viewing Your Data

### In Google Analytics:

1. **Real-Time Reports**: See live activity
   - Reports → Real-time → Overview
   - Reports → Real-time → Events

2. **Events Report**: See all game events
   - Reports → Engagement → Events
   - Look for events: `game_start`, `game_over`, `game_won`, `milestone_reached`

3. **Custom Reports** (Optional):
   - Create custom reports to analyze:
     - Average score per game
     - Win rate (game_won / game_start)
     - Most common milestones reached
     - Player retention

## Important Notes

- **Data may take 24-48 hours** to appear in standard reports (Real-time works immediately)
- **IP anonymization is enabled** for privacy compliance
- **No personal data** is collected - only game events and scores
- Events are sent even if the user is offline (they'll queue and send when online)

## Troubleshooting

### Events not showing up?
1. Check browser console for errors (F12 → Console)
2. Verify your Measurement ID is correct (both places in index.html)
3. Check if ad blockers are blocking GA
4. Verify the site is using HTTPS (GA requires HTTPS in production)

### Want to test without affecting real data?
- Use Google Analytics DebugView
- Or create a separate GA property for testing

## Next Steps

1. Set up **Goals** in GA to track conversions (e.g., reaching 2048)
2. Create **Custom Dimensions** for deeper analysis
3. Set up **Alerts** for unusual activity
4. Connect to **Google Ads** if you plan to run ads

