# CitizenLink Simulation & Verification Instrument (SVI)

A structured data injection platform designed to execute **Scenario-Based System Verification**. This tool facilitates the generation of calibrated dataset "missions" (Torture Tests) to validate the CitizenLink v3.6.3 Intelligence Engine's NLP, Clustering, and Scoring algorithms.

![Verification](https://img.shields.io/badge/Status-Validated-green.svg)
![Protocol](https://img.shields.io/badge/Protocol-Scenario__Based-blue.svg)
![Research](https://img.shields.io/badge/Thesis-Defense__Ready-purple.svg)

## 📋 Table of Contents

- [Validation Methodology](#-validation-methodology)
- [Data Integrity Features](#-data-integrity--simulation-features)
- [Verification Protocols](#-verification-protocols-the-8-missions)
- [Quick Start](#-quick-start)
- [Project Structure](#-project-structure)
- [Technology Stack](#-technology-stack)
- [Browser Support](#-browser-support)
- [Configuration](#️-configuration)
- [Usage Guide](#-usage-guide)
- [Data Schema](#-data-schema)
- [License](#-license)

## 🔬 Validation Methodology

This instrument is not designed for User Satisfaction (SUS). It is designed for **Operational Validity** and **Algorithm Stress Testing**.

1.  **Input:** Testers execute a script (e.g., *Mission B: "Report a Fire in Zone B using slang"*).
2.  **Processing:** The SVI captures the raw input with precise metadata and injects it into the backend.
3.  **Verification:** The resulting dataset is fed into `CitizenLink v3.6.3` to verify:
    * **NLP Nuance:** Did it detect the slang?
    * **Auto-Correction:** Did it override the tester's wrong category?
    * **Clustering:** Did it group the 5 separate reports into 1 event?
4.  **Success Metric:** Quantitative Pass/Fail rate of the algorithm (not tester satisfaction).

## 🛡️ Data Integrity & Simulation Features

### Scientific Controls
* **Geofenced Injection:** Enforces strict coordinate boundaries (Radius: 300m) to force specific "Cluster Overlap" events for algorithm testing.
* **Timestamp Synchronization:** Simulates "Burst Reporting" patterns to stress-test the Temporal Clustering logic.
* **Structured Taxonomy:** Enforces specific Category/Subcategory pairings to validate the Backend's "Mismatch Detection" (e.g., Pothole vs. Fire).
* **Metadata Tagging:** Automatically tags every submission with `Tester_ID`, `Group_ID`, and `Session_Hash` for audit trails.

### Operational Constraints
* **Mobile-First Field Entry:** Optimized for on-site data logging in variable network conditions.
* **Offline Persistence:** Uses LocalStorage to prevent data loss during network interruptions (common in disaster scenarios).
* **Protocol-Based Context:** Testers cannot submit random data; they are locked into specific "Scenarios" (e.g., Flood, Fire) to ensure dataset purity.

## 🧪 Verification Protocols (The 8 Missions)

The system enforces 8 distinct data generation protocols to stress-test specific backend logic:

* **Protocol A (Control Group):** Generates standard infrastructure reports to test baseline clustering.
* **Protocol B (Stress Test):**
    * *Scenario:* "The Chain Link" → Tests **Causal Chain Logic** (Fire causing Traffic).
    * *Scenario:* "Triple Split" → Tests **DBSCAN Density Handling** (Separating 3 close clusters).
* **Protocol C (Semantic Conflict):**
    * *Scenario:* "Metaphor Injection" → Forces inputs like "Flood of students" to validate **NLP Filtering**.
    * *Scenario:* "Priority Override" → Inputs "Pothole" category with "Fire" description to test **Severity Authority**.

### 👥 Data Stream Distribution (Groups)

To prevent data bias, testers are divided into isolated streams:

* **Group A (Realistic Baseline):** Generates high-volume, routine data to test database load.
* **Group B (Edge-Cases):** Dedicated group for "Torture Testing" (Metaphors, Slang, False Positives).
* **Group C (Control):** Random noise generation to test the system's "Context Suppression" filters.

### Data Collection Parameters
- 7 data categories with dynamic subcategories (including Noise Complaint)
- Priority levels (Low, Medium, High, Critical)
- Detailed description capture
- GPS coordinate logging with boundary enforcement
- Timestamp tracking for temporal analysis
- Export functionality (JSON/CSV)
- Tester identification tracking (Tester ID, Full Name, Group)

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
   - Enter your **Tester ID** (format: `TESTER-###-A/B/C`, e.g., `TESTER-001-A`)
   - Enter your **Nickname**
   - Check the consent agreement box
   - Click "START VERIFICATION" to proceed

2. **Select Your Group**
   - Choose your assigned testing group (A, B, or C)
   - **Group A**: 4 realistic scenario protocols (Highway, Water Outage, Trash, Flooding)
   - **Group B**: 2 stress test protocols (Triple Split, Chain Link)
   - **Group C**: 2 mixed protocols (Random Noise, Trojan Horse)
   - Click "SELECT GROUP" to confirm your assignment

3. Grant location permissions when prompted (required for geofenced verification)
4. Review your group's protocol list
5. Select a protocol to begin field verification
6. Follow the protocol instructions
7. Click on the map to mark data injection points
8. Complete the data entry form and submit

## 📁 Project Structure

```
DATA_COLLECTION/
├── index.html              # Main HTML structure
├── styles.css              # CSS styles with responsive design
├── collector.js            # Instrument logic and state management
├── mission_config.json     # Protocol definitions and configurations
├── README.md               # This file
└── DOCUMENTATION.md        # Detailed technical documentation
```

### File Descriptions

- **index.html** - Single-page instrument structure with semantic HTML5, consent modal, and group selection
- **styles.css** - 2200+ lines of CSS with field-optimized responsive design and group selection interface
- **collector.js** - 1400+ lines of vanilla JavaScript with consent management and group-based protocol filtering
- **mission_config.json** - 8 verification protocols with group assignments (A: 4 protocols, B: 2 protocols, C: 2 protocols)

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

### Interface Design
- CSS Variables for consistent theming
- Responsive breakpoints (380px, 768px, 1024px) for multi-device field deployment
- Safe area insets for modern mobile devices

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

### Protocol Configuration

Edit `mission_config.json` to customize verification protocols:

```json
{
  "id": "REAL-01",
  "group": "A",
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
- `id`: Unique protocol identifier (REAL-XX or STRESS-XX format)
- `group`: Group assignment ("A", "B", or "C")
- `title`: Zone-based protocol designation
- `instruction`: Detailed instructions for testers
- `target`: GPS coordinates for protocol center (`lat`, `lng`)
- `zoom`: Initial map zoom level
- `required_count`: Number of submissions required for completion
- `suggested_category`: Recommended category for protocol validation
- `boundary_radius`: Geofence radius from center (meters)

### Group Distribution

Protocols are distributed across three groups:

- **Group A**: REAL-01, REAL-02, REAL-03, REAL-04 (4 realistic baseline scenarios)
- **Group B**: STRESS-02, STRESS-03 (2 algorithm stress tests)
- **Group C**: REAL-05, STRESS-01 (2 mixed control scenarios)

### Customizing Data Taxonomy

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

### Interface Customization

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
   - Open the instrument in your browser
   - Read the Digital Informed Consent Form that appears
   - Scroll through the entire consent document (checkbox will enable once scrolled to bottom)
   - Enter your **Tester ID** (format: `TESTER-###-A/B/C`, e.g., `TESTER-001-A`)
   - Enter your **Nickname**
   - Check the "I AGREE TO PARTICIPATE" checkbox
   - Click "START VERIFICATION" to continue

2. **Group Selection**
   - Choose your assigned testing group from the selection screen
   - **Group A** - 4 realistic infrastructure scenarios (baseline control)
   - **Group B** - 2 advanced stress test scenarios (edge-case validation)
   - **Group C** - 2 mixed control and conflict scenarios (semantic testing)
   - Click "SELECT GROUP" to access your protocols
   - Your group assignment will be persisted for session continuity

3. **Browse Your Protocols**
   - View protocols assigned to your group (protocols are filtered automatically)
   - Progress tracker shows "Group X: N / Total Complete"
   - Click on any protocol card to begin

4. **Mark Injection Points**
   - Click anywhere on the map within the geofenced boundary circle
   - A marker will appear at your selected coordinate

5. **Complete Data Entry Form**
   - Enter description (required field)
   - Select category and subcategory per protocol instructions
   - Choose priority level as specified
   - Click "Submit Entry"

6. **Track Protocol Progress**
   - View progress bar showing X/Y submissions
   - Protocol completes when target count is reached

7. **Undo/Redo**
   - Use toolbar buttons or keyboard shortcuts:
     - **Undo**: `Ctrl+Z` (Windows) / `Cmd+Z` (Mac)
     - **Redo**: `Ctrl+Shift+Z` or `Ctrl+Y`

8. **Switch Map Layers**
   - Click layer buttons (bottom-left corner)
   - Choose between Streets, Satellite, or Terrain

### For Research Administrators

1. **Export Dataset**
   - Click the export button in the toolbar
   - Choose JSON or CSV format
   - Data includes all submissions with timestamps, coordinates, and metadata

2. **Review Verification Statistics**
   - Check protocol completion rates
   - Review submission timestamps for temporal analysis
   - Analyze category distributions for algorithm validation

3. **Manage Protocols**
   - Edit `mission_config.json`
   - Add/remove verification scenarios
   - Adjust geofence restrictions

## 🔑 Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl+Z` / `Cmd+Z` | Undo last submission |
| `Ctrl+Shift+Z` / `Ctrl+Y` | Redo submission |
| `Escape` | Clear form |
| `Tab` | Navigate form fields |
| `Enter` | Submit form (when focused on submit button) |

## 📱 Field Deployment Specifications

### Portrait Mode
- 56px compact header
- 45% bottom sheet (data entry area)
- Icon-only map layer switcher
- Optimized touch targets (40-44px minimum)

### Landscape Mode
- Side-by-side layout (50/50 split)
- Map on left, form on right
- Compact controls for field efficiency

### Small Screen Devices (<380px)
- Extra compact interface elements
- 50px header height
- Reduced spacing for maximum map visibility
- 48% bottom sheet height

## 🎨 Interface Specifications

### Visual Feedback
- Location markers with status indication
- Toast notifications for submission confirmation
- Progress visualization for protocol completion

### Display Modes
- Automatic system preference detection for light/dark modes
- Optimized contrast ratios for field visibility

## 🐛 Troubleshooting

### Map not loading
- Verify internet connection
- Check for browser extensions blocking map tiles
- Clear browser cache

### Location services not functioning
- Grant location permissions in browser settings
- Verify device location settings
- Ensure HTTPS or localhost connection

### Submissions not persisting
- Verify browser localStorage availability
- Confirm browser is not in private/incognito mode
- Clear localStorage if data corruption detected

### Performance degradation
- Reduce number of markers on map
- Clear completed protocol data
- Update browser to latest version

## 📊 Data Schema

### Submission Object (Current Format)
```javascript
{
  // Identification
  id: "uuid-v4",
  tester_id: "TESTER-001",
  tester_name: "John Doe",
  group: "A",
  
  // Protocol Tracking
  _protocol_id: "REAL-01",
  _protocol_title: "Zone A: The Deteriorating Highway",
  _entry_number: 1,
  
  // Submission Data
  description: "Submission description",
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
  "protocol": "REAL-01",
  "group": "A",
  "submissions": [/* submission array */],
  "exportDate": "2026-01-13T10:30:00.000Z"
}
```

**CSV:**
```csv
ID,Tester_ID,Tester_Name,Group,Protocol,Timestamp,Latitude,Longitude,Description,Category,Subcategory,Priority
```

### Data Taxonomy (Categories & Subcategories)

1. **Infrastructure**: Pothole, Road Damage, Broken Sidewalk, Streetlight, Damaged Bridge, Drainage Issue, Others
2. **Utilities**: No Water, Low Water Pressure, Pipe Leak, Power Outage, Damaged Power Line, Internet Issue, Others
3. **Public Safety**: Fire, Crime, Stray Animals, Vandalism, Unsafe Structure, Missing Signage, Noise Complaint, Others
4. **Sanitation**: Garbage Collection, Illegal Dumping, Overflowing Trash, Clogged Drain, Bad Odor, Pest Infestation, Others
5. **Traffic**: Traffic Light Issue, Road Obstruction, Illegal Parking, Missing Road Signs, Traffic Congestion, Accident, Others
6. **Environment**: Flood, Fallen Tree, Air Pollution, Water Pollution, Soil Erosion, Illegal Burning, Others
7. **Others**: Others

## 🔒 Privacy & Ethics

### Data Privacy
- **No Real-Time Tracking**: The instrument does NOT track device location or movement history
- **Manual Pin Drops Only**: Only the specific coordinates manually marked on the map are recorded
- **Tester Identification**: Tester ID and Nickname are stored with submissions for research audit trails
- **Local Storage**: All data is stored locally in the browser until export
- **Voluntary Participation**: Testers can terminate testing and close the browser at any time

### Research Ethics
- **Informed Consent**: Digital consent form presented before first use
- **Scroll-to-Enable**: Must read entire consent form before acceptance
- **Transparent Data Collection**: Clear explanation of what data is collected and why
- **Contact Information**: Researcher and adviser details provided in consent form

### Consent Management
- Consent status stored in browser localStorage
- Consent timestamp recorded for audit trails
- Re-opening instrument remembers consent status
- Clear browser data to reset consent status

### Group Assignment
- Group choice persisted in localStorage across sessions
- Protocols automatically filtered by assigned group
- Group assignment included in all data exports
- Cannot change group without clearing browser data (intentional for data integrity)

## 🤝 Contributing

Contributions are welcome for research purposes. Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/Enhancement`)
3. Commit your changes (`git commit -m 'Add Enhancement'`)
4. Push to the branch (`git push origin feature/Enhancement`)
5. Open a Pull Request

### Development Guidelines
- Follow existing code conventions
- Add comments for complex logic
- Test on multiple devices/browsers
- Update documentation accordingly

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- OpenStreetMap contributors for map data
- Leaflet.js team for the mapping library
- Esri for satellite imagery
- OpenTopoMap for terrain tiles

## 📞 Support

For technical issues, questions, or research inquiries:
- Create an issue on GitHub
- Contact the research team
- Refer to technical documentation at `DOCUMENTATION.md`

## 🗺️ Roadmap

### Version 1.4.0 ✅ (Current - January 2026)
- [x] Academic terminology rebranding for thesis defense presentation
- [x] Updated interface labels: "Submit Location" → "Inject Data Point"
- [x] Tester ID format validation (`TESTER-###-A/B/C` pattern enforcement)
- [x] Fixed header icon display (replaced emoji with cross-browser SVG)
- [x] Simplified terminology: "Cohort" → "Group", "Field Operator" → "Tester"
- [x] Updated all user-facing messages with clinical, academic tone
- [x] Enhanced consent form with algorithm validation context
- [x] Comprehensive README rebranding for Scientific Verification Instrument

### Version 1.3.0 ✅
- [x] Updated data schema with standardized field names
- [x] Changed `descriptive_su` to `description` for clarity
- [x] Changed `submitted_at` to `timestamp` for consistency
- [x] Added "Noise Complaint" subcategory to Public Safety
- [x] Complete database schema alignment for backend integration
- [x] Enhanced documentation with full schema specifications

### Version 1.2.0 ✅
- [x] Group selection system (A, B, C)
- [x] Protocol filtering by group assignment
- [x] Group-specific progress tracking
- [x] Group data in exports and submissions
- [x] Group selection interface with visual differentiation

### Version 1.1.0 ✅
- [x] Digital Informed Consent Form
- [x] Tester identification system (Tester ID & Name)
- [x] Scroll-to-enable consent mechanism
- [x] Privacy-compliant data collection
- [x] 8 verification protocols (5 realistic + 3 stress tests)

### Planned Features
- [ ] Offline mode with service workers
- [ ] Photo attachments for verification evidence
- [ ] Real-time collaboration between field operators
- [ ] Admin dashboard with group analytics
- [ ] Data analytics and algorithm performance reporting
- [ ] Multi-language support for field deployment
- [ ] Voice input for descriptions
- [ ] Export consent certificates

## 📜 Version History

### v1.4.0 (2026-01-16)
- **Academic Rebranding**: Complete terminology update for thesis defense presentation
  - Changed "Field Test" to "Simulation & Verification Instrument (SVI)"
  - Updated all interface labels with clinical, objective language
  - Replaced consumer-app terminology with scientific research terminology
- **Tester ID Validation**: Added regex pattern enforcement (`TESTER-###-A/B/C`)
- **UI Improvements**: Fixed header icon with cross-browser SVG, added input hints
- **Simplified Terminology**: Changed "Cohort" to "Group", "Field Operator" to "Tester"
- **Consent Form**: Updated context to reflect algorithm validation study purpose

### v1.3.0 (2026-01-13)
- **Schema Standardization**: Updated data schema field names for consistency
  - Changed `descriptive_su` to `description` for better clarity
  - Changed `submitted_at` to `timestamp` for database alignment
- **Category Enhancement**: Added "Noise Complaint" to Public Safety subcategories
- **Documentation**: Updated README and DOCUMENTATION with complete schema details
- **Data Structure**: Aligned collected data with backend database requirements

### v1.2.0 (2026-01-13)
- Added group selection system with three testing streams (A, B, C)
- Implemented protocol filtering based on assigned group
- Added group assignment to mission_config.json
- Updated progress tracker to show group-specific completion
- Included group information in all data exports
- Added group selection interface with stream differentiation
- Enhanced interface with group-specific visual indicators
- Updated documentation with group distribution details

### v1.1.0 (2026-01-13)
- Added Digital Informed Consent Form with research compliance
- Implemented scroll-to-enable consent mechanism
- Added tester identification (Tester ID & Full Name)
- Updated data schema to include tester identification
- Added 3 new stress test protocols (NLP Conflict, Triple Split, Chain Link)
- Enhanced privacy documentation
- Updated mission_config.json with new verification scenarios

### v1.0.0 (2026-01-11)
- Initial release
- 5 realistic zone-based verification protocols
- Interactive mapping with Leaflet.js
- Mobile-first field-optimized design
- Undo/redo functionality for data correction
- Data export (JSON/CSV)
- Multiple map layers for field navigation

---

**Developed for rigorous algorithm verification and thesis research validation**
