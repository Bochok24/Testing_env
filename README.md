# CitizenLink Field Test - Mobile Data Collection Platform

A modern, responsive web application for conducting structured field testing and data collection of citizen complaints. Built with vanilla JavaScript, Leaflet.js for interactive mapping, and a beautiful purple-themed UI with glassmorphism design. Features an integrated informed consent system and squad-based mission distribution for ethical data collection in research studies.

![Version](https://img.shields.io/badge/version-1.3.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Mobile](https://img.shields.io/badge/mobile-optimized-brightgreen.svg)
![Research](https://img.shields.io/badge/research-compliant-purple.svg)
![Last Updated](https://img.shields.io/badge/updated-Jan%202026-orange.svg)

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
- 👥 **Squad System** - Organized testing groups with mission distribution

### User Experience
- 🎨 **Modern UI** - Purple gradient theme with glassmorphism effects
- 🌙 **Dark Mode** - Automatic dark mode support based on system preferences
- ♿ **Accessibility** - WCAG compliant with keyboard navigation
- 📱 **Touch Optimized** - Large touch targets and gesture support
- 🔄 **Smooth Animations** - Fluid transitions and micro-interactions
- 🌐 **Landscape Mode** - Adaptive layout for landscape orientation
- 🔒 **Privacy-First** - User identification with no real-time tracking
- 🎯 **Squad-Based Access** - Missions filtered by assigned squad

### Data Collection
- 7 complaint categories with dynamic subcategories (including Noise Complaint)
- Priority levels (Low, Medium, High, Critical)
- Detailed description capture
- GPS coordinate logging
- Timestamp tracking
- Export functionality (JSON/CSV)
- User identification tracking (Tester ID, Full Name, Squad)

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
   - Click "START MISSION" to proceed

2. **Select Your Squad**
   - Choose your assigned testing squad (A, B, or C)
   - **Squad A**: 4 realistic scenario missions (Highway, Water Outage, Trash, Flooding)
   - **Squad B**: 2 stress test missions (Triple Split, Chain Link)
   - **Squad C**: 2 mixed missions (Random Noise, Trojan Horse)
   - Click "SELECT SQUAD X" to confirm your choice

3. Grant location permissions when prompted (for optimal experience)
4. Review your squad's mission list
5. Select a mission to begin field testing
6. Follow the mission instructions
7. Click on the map to mark complaint locations
8. Fill in the complaint form and submit

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

- **index.html** - Single-page application structure with semantic HTML5, consent modal, and squad selection
- **styles.css** - 2200+ lines of modern CSS with mobile optimizations, consent form, and squad selection styling
- **collector.js** - 1400+ lines of vanilla JavaScript with consent management and squad filtering
- **mission_config.json** - 8 missions with squad assignments (A: 4 missions, B: 2 missions, C: 2 missions)

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
  "squad": "A",
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
- `id`: Unique mission identifier (REAL-XX or STRESS-XX format)
- `squad`: Squad assignment ("A", "B", or "C")
- `title`: Zone-based mission name
- `instruction`: Detailed instructions for field testers
- `target`: GPS coordinates for mission center (`lat`, `lng`)
- `zoom`: Initial map zoom level
- `required_count`: Number of complaints required to complete
- `suggested_category`: Recommended complaint category
- `boundary_radius`: Allowed radius from center (meters)

### Squad Distribution

Missions are distributed across three squads:

- **Squad A**: REAL-01, REAL-02, REAL-03, REAL-04 (4 realistic scenarios)
- **Squad B**: STRESS-02, STRESS-03 (2 stress tests)
- **Squad C**: REAL-05, STRESS-01 (2 mixed scenarios)

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
   - Click "START MISSION" to continue

2. **Squad Selection**
   - Choose your assigned testing squad from the squad selection screen
   - **Squad A** - 4 realistic infrastructure scenarios
   - **Squad B** - 2 advanced stress test scenarios
   - **Squad C** - 2 mixed control and conflict scenarios
   - Click "SELECT SQUAD X" to access your missions
   - Your squad assignment will be saved for future sessions

3. **Browse Your Missions**
   - View missions assigned to your squad (missions are filtered automatically)
   - Progress tracker shows "Squad X: N / Total Complete"
   - Click on any mission card to begin

4. **Mark Locations**
   - Click anywhere on the map within the boundary circle
   - A marker will appear at your clicked location

5. **Fill Complaint Form**
   - Enter description (required)
   - Select category and subcategory
   - Choose priority level
   - Click "Submit Complaint"

6. **Track Progress**
   - View progress bar showing X/Y complaints
   - Mission completes when target is reached

7. **Undo/Redo**
   - Use toolbar buttons or keyboard shortcuts:
     - **Undo**: `Ctrl+Z` (Windows) / `Cmd+Z` (Mac)
     - **Redo**: `Ctrl+Shift+Z` or `Ctrl+Y`

8. **Switch Map Layers**
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

### Complaint Object (Current Format)
```javascript
{
  // Identification
  id: "uuid-v4",
  user_id: "TESTER-001",
  user_name: "John Doe",
  squad: "A",
  
  // Mission Tracking
  _mission_id: "REAL-01",
  _mission_title: "Zone A: The Deteriorating Highway",
  _entry_number: 1,
  
  // Complaint Data
  description: "Complaint description",
  latitude: 6.7386,
  longitude: 125.3576,
  category: "Infrastructure",
  subcategory: "Pothole",
  
  // Workflow Fields
  department_r: [],
  preferred_departments: [],
  workflow_status: "new",
  priority: "low",
  status: "pending",
  confirmation_status: "pending",
  is_duplicate: false,
  confirmed_by_citizen: false,
  all_responders_confirmed: false,
  
  // Timestamps
  timestamp: "2026-01-13T10:30:00.000Z",
  updated_at: "2026-01-13T10:30:00.000Z",
  last_activity_at: "2026-01-13T10:30:00.000Z",
  
  // Metadata
  _device_info: {
    userAgent: "...",
    screenWidth: 1536,
    screenHeight: 864,
    pixelRatio: 1.25,
    platform: "Win32",
    language: "en-US"
  },
  _collected_at: "2026-01-13T10:30:00.000Z"
}
```

### Export Formats

**JSON:**
```json
{
  "mission": "REAL-01",
  "squad": "A",
  "submissions": [/* complaints array */],
  "exportDate": "2026-01-13T10:30:00.000Z"
}
```

**CSV:**
```csv
ID,User_ID,User_Name,Squad,Mission,Timestamp,Latitude,Longitude,Description,Category,Subcategory,Priority
```

### Categories & Subcategories

1. **Infrastructure**: Pothole, Road Damage, Broken Sidewalk, Streetlight, Damaged Bridge, Drainage Issue, Others
2. **Utilities**: No Water, Low Water Pressure, Pipe Leak, Power Outage, Damaged Power Line, Internet Issue, Others
3. **Public Safety**: Fire, Crime, Stray Animals, Vandalism, Unsafe Structure, Missing Signage, Noise Complaint, Others
4. **Sanitation**: Garbage Collection, Illegal Dumping, Overflowing Trash, Clogged Drain, Bad Odor, Pest Infestation, Others
5. **Traffic**: Traffic Light Issue, Road Obstruction, Illegal Parking, Missing Road Signs, Traffic Congestion, Accident, Others
6. **Environment**: Flood, Fallen Tree, Air Pollution, Water Pollution, Soil Erosion, Illegal Burning, Others
7. **Others**: Others

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

### Squad Selection
- Squad choice persisted in localStorage across sessions
- Missions automatically filtered by selected squad
- Squad assignment included in all data exports
- Cannot change squad without clearing browser data (intentional for data integrity)

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

### Version 1.3.0 ✅ (Current - January 2026)
- [x] Updated data schema with standardized field names
- [x] Changed `descriptive_su` to `description` for clarity
- [x] Changed `submitted_at` to `timestamp` for consistency
- [x] Added "Noise Complaint" subcategory to Public Safety
- [x] Complete database schema alignment
- [x] Enhanced documentation with full schema details

### Version 1.2.0 ✅
- [x] Squad selection system (A, B, C)
- [x] Mission filtering by squad assignment
- [x] Squad-specific progress tracking
- [x] Squad data in exports and submissions
- [x] Beautiful squad selection UI with color coding

### Version 1.1.0 ✅
- [x] Digital Informed Consent Form
- [x] User identification system (Tester ID & Name)
- [x] Scroll-to-enable consent mechanism
- [x] Privacy-compliant data collection
- [x] 8 missions (5 realistic + 3 stress tests)

### Planned Features
- [ ] Offline mode with service workers
- [ ] Photo attachments for complaints
- [ ] Real-time collaboration
- [ ] Admin dashboard with squad analytics
- [ ] Data analytics and reporting
- [ ] Multi-language support
- [ ] Voice input for descriptions
- [ ] Export consent certificates

## 📜 Version History

### v1.3.0 (2026-01-13)
- **Schema Standardization**: Updated data schema field names for consistency
  - Changed `descriptive_su` to `description` for better clarity
  - Changed `submitted_at` to `timestamp` for database alignment
- **Category Enhancement**: Added "Noise Complaint" to Public Safety subcategories
- **Documentation**: Updated README and DOCUMENTATION with complete schema details
- **Data Structure**: Aligned collected data with backend database requirements

### v1.2.0 (2026-01-13)
- Added squad selection system with three testing groups (A, B, C)
- Implemented mission filtering based on selected squad
- Added squad assignment to mission_config.json
- Updated progress tracker to show squad-specific completion
- Included squad information in all data exports
- Added beautiful squad selection modal with color-coded cards
- Enhanced UI with squad-specific visual indicators
- Updated documentation with squad distribution details

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
