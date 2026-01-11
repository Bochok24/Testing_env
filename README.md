# CitizenLink Field Test - Mobile Data Collection Platform

A modern, responsive web application for conducting structured field testing and data collection of citizen complaints. Built with vanilla JavaScript, Leaflet.js for interactive mapping, and a beautiful purple-themed UI with glassmorphism design.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Mobile](https://img.shields.io/badge/mobile-optimized-brightgreen.svg)

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
- 🎯 **12 Test Scenarios** - Comprehensive field testing missions

### User Experience
- 🎨 **Modern UI** - Purple gradient theme with glassmorphism effects
- 🌙 **Dark Mode** - Automatic dark mode support based on system preferences
- ♿ **Accessibility** - WCAG compliant with keyboard navigation
- 📱 **Touch Optimized** - Large touch targets and gesture support
- 🔄 **Smooth Animations** - Fluid transitions and micro-interactions
- 🌐 **Landscape Mode** - Adaptive layout for landscape orientation

### Data Collection
- 7 complaint categories with dynamic subcategories
- Priority levels (Low, Medium, High, Critical)
- Detailed description capture
- GPS coordinate logging
- Timestamp tracking
- Export functionality (JSON/CSV)

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

1. Grant location permissions when prompted (for optimal experience)
2. Review the mission list on the main screen
3. Select a mission to begin field testing
4. Follow the mission instructions
5. Click on the map to mark complaint locations
6. Fill in the complaint form and submit

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

- **index.html** - Single-page application structure with semantic HTML5
- **styles.css** - 1400+ lines of modern CSS with mobile optimizations
- **collector.js** - 1000+ lines of vanilla JavaScript with no dependencies
- **mission_config.json** - 12 mission scenarios with boundaries and requirements

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
  "id": "S-01",
  "title": "Mission Title",
  "description": "Mission description",
  "target_count": 5,
  "boundary_radius": 50,
  "center": {
    "lat": 14.5995,
    "lng": 120.9842
  }
}
```

**Parameters:**
- `id`: Unique mission identifier
- `title`: Mission display name
- `description`: Instructions for testers
- `target_count`: Number of complaints required
- `boundary_radius`: Allowed radius from center (meters)
- `center`: GPS coordinates for mission center

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

1. **Select a Mission**
   - Open the app and browse available missions
   - Click on a mission card to start

2. **Mark Locations**
   - Click anywhere on the map within the boundary circle
   - A marker will appear at your clicked location

3. **Fill Complaint Form**
   - Enter description (required)
   - Select category and subcategory
   - Choose priority level
   - Click "Submit Complaint"

4. **Track Progress**
   - View progress bar showing X/Y complaints
   - Mission completes when target is reached

5. **Undo/Redo**
   - Use toolbar buttons or keyboard shortcuts:
     - **Undo**: `Ctrl+Z` (Windows) / `Cmd+Z` (Mac)
     - **Redo**: `Ctrl+Shift+Z` or `Ctrl+Y`

6. **Switch Map Layers**
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
  id: "unique-id",
  missionId: "S-01",
  timestamp: "2026-01-11T10:30:00.000Z",
  location: {
    lat: 14.5995,
    lng: 120.9842
  },
  description: "Complaint description",
  category: "Infrastructure",
  subcategory: "Damaged Roads",
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
ID,Mission,Timestamp,Latitude,Longitude,Description,Category,Subcategory,Priority
```

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

### Planned Features
- [ ] Offline mode with service workers
- [ ] Photo attachments for complaints
- [ ] Real-time collaboration
- [ ] Admin dashboard
- [ ] Data analytics and reporting
- [ ] Multi-language support
- [ ] Voice input for descriptions

---

**Made with ❤️ for efficient field testing**
