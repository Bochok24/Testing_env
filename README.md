# CitizenLink Field Test - Mobile Data Collection Platform

A modern, responsive web application for conducting structured field testing and data collection of citizen complaints. Built with vanilla JavaScript, Leaflet.js for interactive mapping, and a beautiful purple-themed UI with glassmorphism design. Features an integrated informed consent system for ethical data collection in research studies.

![Version](https://img.shields.io/badge/version-1.1.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Mobile](https://img.shields.io/badge/mobile-optimized-brightgreen.svg)
![Research](https://img.shields.io/badge/research-compliant-purple.svg)

## 📋 Table of Contents

- [Features](#features)
- [Demo](#demo)
- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [Technology Stack](#technology-stack)
- [Browser Support](#browser-support)
- [Configuration](#configuration)
- [Usage Guide](#usage-guide)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

### Core Functionality
- 📱 **Mobile-First Design** - Fully responsive with optimized mobile and tablet views
- 🗺️ **Interactive Mapping** - Multiple map layers (Streets, Satellite, Terrain)
- 📍 **Geolocation Support** - Boundary-restricted location marking
- ↩️ **Undo/Redo** - Complete undo/redo functionality with keyboard shortcuts
- 💾 **Local Storage** - Persistent data storage for offline capability
- 📊 **Progress Tracking** - Real-time mission progress visualization
- 🎯 **8 Field Zones** - Realistic zone-based data collection missions including stress tests
- 📋 **Informed Consent** - Digital consent form with scroll-to-enable functionality

### User Experience
- 🎨 **Modern UI** - Purple gradient theme with glassmorphism effects
- 🌙 **Dark Mode** - Automatic dark mode support based on system preferences
- ♿ **Accessibility** - WCAG compliant with keyboard navigation
- 📱 **Touch Optimized** - Large touch targets and gesture support
- 🔄 **Smooth Animations** - Fluid transitions and micro-interactions
- 🌐 **Landscape Mode** - Adaptive layout for landscape orientation
- 🔒 **Privacy-First** - User identification with no real-time tracking

### Data Collection
- 7 complaint categories with dynamic subcategories
- Priority levels (Low, Medium, High, Critical)
- Detailed description capture
- GPS coordinate logging
- Timestamp tracking
- Export functionality (JSON/CSV)
- User identification tracking (Tester ID & Full Name)

## 🚀 Quick Start

### Prerequisites
- Modern web browser (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)
- Python 3.x (for local server) or any HTTP server
- Internet connection (for map tiles)

### Installation

1. **Clone or download the project**
   ```bash
   cd DATA_COLLECTION
   ```

2. **Start a local server**
   
   **Option A: Python**
   ```bash
   python -m http.server 8080
   ```
   
   **Option B: Node.js (http-server)**
   ```bash
   npx http-server -p 8080
   ```
   
   **Option C: PHP**
   ```bash
   php -S localhost:8080
   ```

3. **Open in browser**
   ```
   http://localhost:8080
   ```

### First Time Setup

1. **Review Informed Consent Form**
   - Read the Digital Informed Consent Form carefully
   - Scroll to the bottom to enable the acceptance checkbox
   - Enter your Tester ID and Full Name
   - Check the consent agreement box
   - Click "START MISSION" to begin

2. Grant location permissions when prompted (for optimal experience)
3. Review the mission list on the main screen
4. Select a mission to begin field testing
5. Follow the mission instructions
6. Click on the map to mark complaint locations
7. Fill in the complaint form and submit

## 📁 Project Structure

```
DATA_COLLECTION/
├── index.html              # Main HTML structure
├── styles.css              # CSS styles with responsive design
├── collector.js            # Application logic and state management
├── mission_config.json     # Mission definitions and configurations
├── README.md               # This file
└── DOCUMENTATION.md        # Detailed technical documentation
```

### File Descriptions

- **index.html** - Single-page application structure with semantic HTML5 and consent modal
- **styles.css** - 1900+ lines of modern CSS with mobile optimizations and consent form styling
- **collector.js** - 1200+ lines of vanilla JavaScript with consent management
- **mission_config.json** - 8 missions including realistic zones and stress test scenarios

## 🛠️ Technology Stack

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Custom properties, Grid, Flexbox, Animations
- **JavaScript (ES6+)** - Modules, async/await, destructuring

### Libraries
- **Leaflet.js v1.9.4** - Interactive maps
- **OpenStreetMap** - Street map tiles
- **Esri World Imagery** - Satellite imagery
- **OpenTopoMap** - Terrain visualization

### Design System
- CSS Variables for theming
- Purple gradient primary colors (#6366f1, #8b5cf6, #a855f7)
- Glassmorphism effects with backdrop-filter
- Responsive breakpoints (380px, 768px, 1024px)
- Safe area insets for notched devices

## 🌐 Browser Support

| Browser | Version | Status |
|---------|---------|--------|
| Chrome  | 90+     | ✅ Fully Supported |
| Firefox | 88+     | ✅ Fully Supported |
| Safari  | 14+     | ✅ Fully Supported |
| Edge    | 90+     | ✅ Fully Supported |
| Opera   | 76+     | ✅ Fully Supported |

### Mobile Browsers
- iOS Safari 14+
- Chrome Mobile 90+
- Firefox Mobile 88+
- Samsung Internet 14+

## ⚙️ Configuration

### Mission Configuration

Edit `mission_config.json` to customize missions:

```json
{
  "id": "REAL-01",
  "title": "Zone A: The Deteriorating Highway",
  "instruction": "Simulate a bad road section. Walk/Scroll along the street. Submit 5-8 'Pothole' reports spread out every 20-50 meters along the line.",
  "target": { "lat": 6.7386, "lng": 125.3576 },
  "zoom": 17,
  "required_count": 6,
  "suggested_category": "Pothole",
  "boundary_radius": 300
}
```

**Parameters:**
- `id`: Unique mission identifier (REAL-XX format)
- `title`: Zone-based mission name
- `instruction`: Detailed instructions for field testers
- `target`: GPS coordinates for mission center (`lat`, `lng`)
- `zoom`: Initial map zoom level
- `required_count`: Number of complaints required to complete
- `suggested_category`: Recommended complaint category
- `boundary_radius`: Allowed radius from center (meters)

### Customizing Categories

In `collector.js`, modify the `CATEGORY_SUBCATEGORIES` object:

```javascript
const CATEGORY_SUBCATEGORIES = {
    'Infrastructure': [
        'Damaged Roads',
        'Broken Streetlights',
        // Add more...
    ],
    // Add more categories...
};
```

### Styling Customization

Edit CSS variables in `styles.css`:

```css
:root {
    --primary-color: #6366f1;
    --success-color: #10b981;
    --warning-color: #f59e0b;
    /* Customize colors */
}
```

## 📖 Usage Guide

### For Testers

1. **First-Time Access & Consent**
   - Open the application in your browser
   - Read the Digital Informed Consent Form that appears
   - Scroll through the entire consent document (checkbox will enable once scrolled to bottom)
   - Enter your **Tester ID** (e.g., TESTER-001)
   - Enter your **Full Name**
   - Check the "I AGREE TO PARTICIPATE" checkbox
   - Click "START MISSION" to begin testing

2. **Select a Mission**
   - Browse available missions (5 realistic zones + 3 stress tests)
   - Click on a mission card to start

3. **Mark Locations**
   - Click anywhere on the map within the boundary circle
   - A marker will appear at your clicked location

4. **Fill Complaint Form**
   - Enter description (required)
   - Select category and subcategory
   - Choose priority level
   - Click "Submit Complaint"

5. **Track Progress**
   - View progress bar showing X/Y complaints
   - Mission completes when target is reached

6. **Undo/Redo**
   - Use toolbar buttons or keyboard shortcuts:
     - **Undo**: `Ctrl+Z` (Windows) / `Cmd+Z` (Mac)
     - **Redo**: `Ctrl+Shift+Z` or `Ctrl+Y`

7. **Switch Map Layers**
   - Click layer buttons (bottom-left corner)
   - Choose between Streets, Satellite, or Terrain

### For Administrators

1. **Export Data**
   - Click the export button in the toolbar
   - Choose JSON or CSV format
   - Data includes all submissions with timestamps and coordinates

2. **View Statistics**
   - Check mission completion rates
   - Review submission timestamps
   - Analyze complaint distributions

3. **Manage Missions**
   - Edit `mission_config.json`
   - Add/remove scenarios
   - Adjust boundary restrictions

## 🔑 Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl+Z` / `Cmd+Z` | Undo last submission |
| `Ctrl+Shift+Z` / `Ctrl+Y` | Redo submission |
| `Escape` | Clear form |
| `Tab` | Navigate form fields |
| `Enter` | Submit form (when focused on submit button) |

## 📱 Mobile Optimizations

### Portrait Mode
- 56px compact header
- 45% bottom sheet (form area)
- Icon-only map layer switcher
- Optimized touch targets (40-44px)

### Landscape Mode
- Side-by-side layout (50/50 split)
- Map on left, form on right
- Hidden sheet handle
- Compact controls

### Small Screens (<380px)
- Extra compact elements
- 50px header height
- Reduced spacing and fonts
- 48% bottom sheet height

## 🎨 Design Features

### Glassmorphism
- Frosted glass effects using backdrop-filter
- Semi-transparent backgrounds
- Layered depth with shadows

### Animations
- Smooth page transitions
- Pulsing markers
- Toast notifications
- Hover effects and transforms

### Dark Mode
- Automatic system preference detection
- Adjusted color variables
- Optimized contrast ratios

## 🐛 Troubleshooting

### Map not loading
- Check internet connection
- Verify no browser extensions blocking tiles
- Clear browser cache

### Location not working
- Grant location permissions
- Check browser location settings
- Ensure HTTPS or localhost

### Submissions not saving
- Check browser localStorage availability
- Verify browser not in private/incognito mode
- Clear localStorage if corrupted

### Performance issues
- Reduce number of markers on map
- Clear old mission data
- Update browser to latest version

## 📊 Data Schema

### Complaint Object
```javascript
{
  id: "uuid-v4",
  user_id: "TESTER-001",
  user_name: "John Doe",
  missionId: "REAL-01",
  timestamp: "2026-01-13T10:30:00.000Z",
  location: {
    lat: 6.7386,
    lng: 125.3576
  },
  description: "Complaint description",
  category: "Infrastructure",
  subcategory: "Pothole",
  priority: "High"
}
```

### Export Formats

**JSON:**
```json
{
  "mission": "S-01",
  "submissions": [/* complaints array */],
  "exportDate": "2026-01-11T10:30:00.000Z"
}
```

**CSV:**
```csv
ID,User_ID,User_Name,Mission,Timestamp,Latitude,Longitude,Description,Category,Subcategory,Priority
```

## 🔒 Privacy & Ethics

### Data Privacy
- **No Real-Time Tracking**: The application does NOT track your device location or movement history
- **Manual Pin Drops Only**: Only the specific points you manually mark on the map are recorded
- **User Identification**: Tester ID and Full Name are stored with submissions for research tracking
- **Local Storage**: All data is stored locally in your browser until export
- **Voluntary Participation**: You can stop testing and close the browser at any time

### Research Ethics
- **Informed Consent**: Digital consent form presented before first use
- **Scroll-to-Enable**: Must read entire consent form before acceptance
- **Transparent Data Collection**: Clear explanation of what data is collected and why
- **Contact Information**: Researcher and adviser details provided in consent form

### Consent Management
- Consent status stored in browser localStorage
- Consent timestamp recorded for audit trails
- Re-opening application remembers consent status
- Clear browser data to reset consent status

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines
- Follow existing code style
- Add comments for complex logic
- Test on multiple devices/browsers
- Update documentation as needed

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- OpenStreetMap contributors for map data
- Leaflet.js team for the mapping library
- Esri for satellite imagery
- OpenTopoMap for terrain tiles

## 📞 Support

For issues, questions, or suggestions:
- Create an issue on GitHub
- Contact the development team
- Check documentation at `DOCUMENTATION.md`

## 🗺️ Roadmap

### Version 1.1.0 ✅ (Current)
- [x] Digital Informed Consent Form
- [x] User identification system (Tester ID & Name)
- [x] Scroll-to-enable consent mechanism
- [x] Privacy-compliant data collection
- [x] 8 missions (5 realistic + 3 stress tests)

### Planned Features
- [ ] Offline mode with service workers
- [ ] Photo attachments for complaints
- [ ] Real-time collaboration
- [ ] Admin dashboard
- [ ] Data analytics and reporting
- [ ] Multi-language support
- [ ] Voice input for descriptions
- [ ] Export consent certificates

## 📜 Version History

### v1.1.0 (2026-01-13)
- Added Digital Informed Consent Form with research compliance
- Implemented scroll-to-enable consent mechanism
- Added user identification (Tester ID & Full Name)
- Updated data schema to include user identification
- Added 3 new stress test missions (NLP Conflict, Triple Split, Chain Link)
- Enhanced privacy documentation
- Updated mission_config.json with new scenarios

### v1.0.0 (2026-01-11)
- Initial release
- 5 realistic zone-based missions
- Interactive mapping with Leaflet.js
- Mobile-first responsive design
- Undo/redo functionality
- Data export (JSON/CSV)
- Multiple map layers

---

**Made with ❤️ for efficient field testing**
