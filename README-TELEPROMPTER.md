# Voice-Controlled Teleprompter

A web-based teleprompter that automatically scrolls as you speak, using speech recognition to track your position in the script.

## Features

- **Voice-Controlled Scrolling**: Automatically follows along as you speak
- **Real-time Speech Recognition**: Uses Web Speech API to understand what you're saying
- **Smart Word Matching**: Fuzzy matching algorithm to handle variations in speech
- **Visual Feedback**: Current word is highlighted, read words are greyed out
- **Adjustable Font Size**: +/- buttons to customize text size
- **Script Editor**: Edit your script directly in the app
- **Mobile-Friendly**: Optimized for phone use with large touch targets
- **Offline Storage**: Saves your script to localStorage

## How to Use

### On Your Phone

1. **Open the file**: Transfer `teleprompter.html` to your phone and open it in a browser (Chrome/Safari)
   - Or host it on a simple web server and access via your phone's browser
   
2. **Grant Microphone Permission**: When prompted, allow the browser to access your microphone

3. **Start Reading**:
   - Tap "Start Listening" 
   - Begin reading your script aloud
   - The app will automatically scroll and highlight as you speak
   - The current word is highlighted in green
   - Words you've already read turn grey

4. **Controls**:
   - **Start Listening**: Begin voice recognition
   - **Stop**: Pause voice recognition
   - **Reset**: Return to the beginning of the script
   - **Edit Script**: Modify or replace your script
   - **+ / -**: Adjust font size (bottom right)

### Tips for Best Results

1. **Speak Clearly**: Enunciate words clearly for better recognition
2. **Natural Pace**: Speak at a normal conversational pace
3. **Quiet Environment**: Minimize background noise for better accuracy
4. **Grant Permissions**: Make sure your browser has microphone access
5. **Use Chrome on Android**: Best speech recognition support
6. **Use Safari on iOS**: Native speech recognition on Apple devices

### Browser Compatibility

- **Chrome/Edge** (Desktop & Android): Full support
- **Safari** (iOS/macOS): Full support
- **Firefox**: Limited speech recognition support

### Hosting Options

#### Option 1: Direct File Access
Simply open `teleprompter.html` in your phone's browser

#### Option 2: Quick Local Server
```bash
# Python 3
python3 -m http.server 8000

# Then open: http://localhost:8000/teleprompter.html
# Or use your computer's IP address to access from phone
```

#### Option 3: Deploy to Web
Upload to any static hosting service:
- GitHub Pages
- Netlify
- Vercel
- Firebase Hosting

## Technical Details

### How It Works

1. **Speech Recognition**: Uses Web Speech API (continuous mode with interim results)
2. **Word Matching**: Implements fuzzy string matching using bigram similarity
3. **Smart Tracking**: Looks ahead and behind current position to handle speech variations
4. **Auto-Scrolling**: Smoothly scrolls to keep current word in the upper third of screen
5. **State Persistence**: Saves your custom scripts to browser localStorage

### Customization

You can customize the app by editing these variables in the HTML:

- `fontSize`: Initial font size (default: 24px)
- `recognition.lang`: Language for speech recognition (default: 'en-US')
- Similarity threshold: Currently set to 0.7 (70% match required)

## Troubleshooting

**Speech recognition not working?**
- Check microphone permissions in browser settings
- Try using Chrome/Safari (best support)
- Ensure you're on HTTPS or localhost (required for microphone access)

**Words not highlighting?**
- Speak more clearly and at a moderate pace
- Reduce background noise
- Check that "Listening..." appears in the status bar

**Script not saving?**
- Ensure browser localStorage is enabled
- Check browser privacy settings

## Privacy

- All processing happens locally in your browser
- No data is sent to external servers
- Your script is stored only in your browser's localStorage

## License

Free to use and modify for personal or commercial use.
