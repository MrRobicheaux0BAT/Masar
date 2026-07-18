# Thieves' Guild Quest Tracker

A themed web application to track your progress on Thieves' Guild extra jobs in Skyrim.

## About

In Skyrim's Thieves' Guild questline, you need to complete special jobs (burglary, numbers, shill, sweep, and heist) in different cities to restore the guild to its former glory. Completing 5 quests in each city unlocks a special merchant and vendor services.

This tracker helps you keep count of how many jobs you've completed in each city.

## Features

- **Track quests for 4 cities**: Whiterun, Windhelm, Markarth, and Solitude
- **One-click increment**: Easily add completed quests with a single click
- **Progress bars**: Visual indication of progress toward the 5-quest requirement for each city
- **Total counter**: See your overall quest completion count
- **Automatic saving**: Your progress is saved automatically in your browser
- **Reset options**: Reset individual cities or all progress with confirmation dialogs
- **Thieves' Guild themed design**: Dark, atmospheric interface with medieval styling

## How to Use

1. **Open the tracker**: Simply open `thieves-guild-tracker.html` in any modern web browser (Chrome, Firefox, Safari, Edge, etc.)

2. **Add quests**: Click the "Add Quest" button next to a city name each time you complete a job for that city

3. **Monitor progress**: Watch the progress bar fill up as you complete jobs. You need 5 jobs per city to unlock the special merchant

4. **View total**: Your total quest count across all cities is displayed at the bottom

5. **Reset if needed**: 
   - Click "Reset" next to a city to reset that city's count
   - Click "Reset All Progress" to start over completely

## Requirements

The tracker shows you need **5 quests per city** to unlock special merchants:
- **Whiterun**: Unlocks Eorlund Gray-Mane as a fence
- **Windhelm**: Unlocks Niranye as a fence
- **Markarth**: Unlocks Endon as a fence
- **Solitude**: Unlocks Gulum-Ei as a fence

## Technical Details

- No installation required
- No internet connection needed after initial load
- Works on desktop and mobile devices
- Data is stored locally in your browser (localStorage)
- Pure HTML/CSS/JavaScript - no frameworks or dependencies

## Browser Compatibility

Works with all modern browsers:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Opera (latest)

## Tips

- The tracker will remember your progress even if you close the browser
- If you want to start fresh, use the "Reset All Progress" button
- The progress bars will show 100% once you reach 5 quests per city
- Your data is stored locally and not sent anywhere

## Lore Note

*"I used to be an adventurer like you, then I took an arrow in the knee."* - Guard

This tracker follows the canonical requirements from The Elder Scrolls V: Skyrim, where Delvin Mallory provides special jobs in the four major holds to help restore the Thieves' Guild's influence across Skyrim.

---

**Shadow hide you.** 🗡️
