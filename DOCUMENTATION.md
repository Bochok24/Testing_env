# CitizenLink Field Test - Technical Documentation

Comprehensive technical documentation for developers, administrators, and advanced users.

## 📚 Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Core Components](#core-components)
3. [State Management](#state-management)
4. [Data Flow](#data-flow)
5. [API Reference](#api-reference)
6. [Map Integration](#map-integration)
7. [Styling System](#styling-system)
8. [Local Storage](#local-storage)
9. [Mission System](#mission-system)
10. [Form Validation](#form-validation)
11. [Undo/Redo System](#undoredo-system)
12. [Mobile Responsiveness](#mobile-responsiveness)
13. [Performance Optimization](#performance-optimization)
14. [Security Considerations](#security-considerations)
15. [Testing Guide](#testing-guide)
16. [Deployment](#deployment)

---

## 🏗️ Architecture Overview

### Application Type
**Single Page Application (SPA)** with vanilla JavaScript, no framework dependencies.

### Architecture Pattern
**Component-Based Architecture** with:
- Separation of concerns (HTML structure, CSS presentation, JS behavior)
- Event-driven programming
- State management through centralized AppState object
- Functional programming patterns

### Technology Stack

```
┌─────────────────────────────────────┐
│         Presentation Layer          │
│   (HTML5 + CSS3 + Glassmorphism)   │
└─────────────────────────────────────┘
              ↕️
┌─────────────────────────────────────┐
│         Application Layer           │
│  (Vanilla JavaScript ES6+)         │
│  - Event Handlers                   │
│  - State Management                 │
│  - Business Logic                   │
└─────────────────────────────────────┘
              ↕️
┌─────────────────────────────────────┐
│           Data Layer                │
│  - LocalStorage API                 │
│  - Mission Configuration            │
│  - JSON/CSV Export                  │
└─────────────────────────────────────┘
              ↕️
┌─────────────────────────────────────┐
│          External Services          │
│  - Leaflet.js Mapping               │
│  - OpenStreetMap Tiles              │
│  - Esri Satellite Imagery           │
└─────────────────────────────────────┘
```

---

## 🧩 Core Components

### 1. Application Shell (`index.html`)

**Structure:**
```html
<body>
  <div class="top-bar">          <!-- Fixed header with actions -->
  <div class="map-container">    <!-- Leaflet map -->
  <div class="map-layer-control"> <!-- Layer switcher -->
  <div class="bottom-sheet">     <!-- Collapsible form sheet -->
  <div class="toast-container">  <!-- Notification system -->
</body>
```

**Key Elements:**
- **Top Bar**: Application title, undo/redo, export buttons
- **Map Container**: Interactive Leaflet map with markers
- **Bottom Sheet**: Adaptive panel with mission list and form
- **Layer Control**: Map layer switcher (Streets/Satellite/Terrain)
- **Toast Container**: Notification messages

### 2. State Management (`collector.js`)

**AppState Object:**
```javascript
const AppState = {
    currentMission: null,           // Active mission object
    missions: [],                   // All missions from config
    submissions: [],                // All submitted complaints
    currentMarker: null,           // Temporary map marker
    selectedLocation: null,        // Selected GPS coordinates
    boundaryCircle: null,          // Mission boundary visualization
    undoStack: [],                 // Undo history
    redoStack: [],                 // Redo history
    currentLayer: 'streets',       // Active map layer
    mapTileLayer: null,            // Current tile layer
    isFormSubmitting: false        // Submission state flag
};
```

### 3. Mapping System

**Leaflet.js Integration:**
- Base map initialization with zoom controls
- Multiple tile layer providers
- Custom marker icons with animations
- Boundary circle restrictions
- Click event handling

---

## 🔄 State Management

### State Transitions

```
INITIAL STATE
     ↓
MISSION SELECTION
     ↓
MISSION ACTIVE
     ↓
LOCATION SELECTED
     ↓
FORM FILLED
     ↓
SUBMISSION
     ↓
UPDATE STATE → PERSIST → RENDER
```

### State Updates

**Pattern:**
```javascript
// 1. Update state
AppState.currentMission = mission;

// 2. Persist to localStorage
saveMissionState();

// 3. Update UI
renderUI();

// 4. Notify user
showToast('Success!');
```

### State Persistence

**LocalStorage Keys:**
- `citizenlink_missions` - Mission progress
- `citizenlink_submissions` - All complaints
- `citizenlink_current_mission` - Active mission ID

---

## 📊 Data Flow

### Mission Flow

```
Load mission_config.json
        ↓
Parse missions
        ↓
Check localStorage for progress
        ↓
Merge server + local data
        ↓
Render mission list
        ↓
User selects mission
        ↓
Load mission details
        ↓
Initialize map boundaries
        ↓
Wait for user interaction
```

### Submission Flow

```
User clicks map
        ↓
Validate location (within boundary)
        ↓
Place temporary marker
        ↓
Enable form
        ↓
User fills form
        ↓
Validate form data
        ↓
Create submission object
        ↓
Add to undoStack
        ↓
Clear redoStack
        ↓
Save to AppState.submissions
        ↓
Persist to localStorage
        ↓
Update mission progress
        ↓
Convert marker to permanent
        ↓
Show success toast
        ↓
Clear form
        ↓
Check mission completion
```

---

## 🔌 API Reference

### Core Functions

#### `initializeApp()`
**Description:** Application entry point, loads missions and initializes UI.

```javascript
async function initializeApp() {
    await loadMissions();
    initializeMap();
    loadMissionState();
    renderMissionList();
    setupEventListeners();
}
```

#### `loadMissions()`
**Description:** Fetches and parses mission configuration.

```javascript
async function loadMissions() {
    const response = await fetch('mission_config.json');
    const data = await response.json();
    AppState.missions = data.missions;
}
```

**Returns:** `Promise<void>`

#### `selectMission(missionId)`
**Description:** Activates a mission and sets up map boundaries.

```javascript
function selectMission(missionId) {
    const mission = AppState.missions.find(m => m.id === missionId);
    AppState.currentMission = mission;
    setupMapBoundary(mission);
    renderMissionDetails();
}
```

**Parameters:**
- `missionId` (string) - Unique mission identifier

**Returns:** `void`

#### `handleMapClick(e)`
**Description:** Processes map click events and validates location.

```javascript
function handleMapClick(e) {
    const { lat, lng } = e.latlng;
    
    if (!isWithinBoundary(lat, lng)) {
        showToast('Location outside mission boundary', 'warning');
        return;
    }
    
    placeTemporaryMarker(lat, lng);
}
```

**Parameters:**
- `e` (LeafletMouseEvent) - Leaflet click event

**Returns:** `void`

#### `submitComplaint(formData)`
**Description:** Processes and saves complaint submission.

```javascript
async function submitComplaint(formData) {
    const submission = {
        id: generateUniqueId(),
        missionId: AppState.currentMission.id,
        timestamp: new Date().toISOString(),
        location: AppState.selectedLocation,
        ...formData
    };
    
    AppState.undoStack.push({ type: 'submission', data: submission });
    AppState.redoStack = [];
    AppState.submissions.push(submission);
    
    saveToLocalStorage();
    updateMissionProgress();
    convertToPermamentMarker();
}
```

**Parameters:**
- `formData` (Object) - Form input data

**Returns:** `Promise<void>`

#### `undoLastSubmission()`
**Description:** Reverts the most recent submission.

```javascript
function undoLastSubmission() {
    if (AppState.undoStack.length === 0) {
        showToast('Nothing to undo', 'warning');
        return;
    }
    
    const lastAction = AppState.undoStack.pop();
    AppState.redoStack.push(lastAction);
    
    removeSubmission(lastAction.data.id);
    removeMarkerFromMap(lastAction.data.id);
    updateUI();
}
```

**Returns:** `void`

#### `redoLastUndo()`
**Description:** Restores the most recently undone submission.

```javascript
function redoLastUndo() {
    if (AppState.redoStack.length === 0) {
        showToast('Nothing to redo', 'warning');
        return;
    }
    
    const action = AppState.redoStack.pop();
    AppState.undoStack.push(action);
    
    restoreSubmission(action.data);
    restoreMarkerOnMap(action.data);
    updateUI();
}
```

**Returns:** `void`

---

## 🗺️ Map Integration

### Leaflet Configuration

```javascript
const map = L.map('map', {
    center: [14.5995, 120.9842],  // Manila coordinates
    zoom: 15,
    zoomControl: true,
    attributionControl: true,
    minZoom: 10,
    maxZoom: 19
});
```

### Tile Layers

#### 1. Streets Layer (OpenStreetMap)
```javascript
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
    maxZoom: 19
});
```

#### 2. Satellite Layer (Esri)
```javascript
L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Esri',
    maxZoom: 19
});
```

#### 3. Terrain Layer (OpenTopoMap)
```javascript
L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: 'OpenTopoMap',
    maxZoom: 17
});
```

### Custom Markers

#### Temporary Marker (During Selection)
```javascript
const tempMarkerIcon = L.divIcon({
    className: 'temp-marker',
    iconSize: [24, 24],
    iconAnchor: [12, 12]
});
```

**Styling:**
- Purple gradient background
- Pulsing animation
- White border with shadow glow

#### Permanent Marker (After Submission)
```javascript
const submittedMarkerIcon = L.divIcon({
    className: 'submitted-marker',
    iconSize: [20, 20],
    iconAnchor: [10, 10]
});
```

**Styling:**
- Green gradient background
- Smaller size (20x20)
- Solid appearance

### Boundary Circle

```javascript
L.circle([lat, lng], {
    color: '#6366f1',
    fillColor: '#6366f1',
    fillOpacity: 0.1,
    radius: missionBoundaryRadius,
    weight: 2,
    dashArray: '5, 10'
}).addTo(map);
```

### Distance Calculation

**Haversine Formula Implementation:**
```javascript
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371e3; // Earth's radius in meters
    const φ1 = lat1 * Math.PI/180;
    const φ2 = lat2 * Math.PI/180;
    const Δφ = (lat2-lat1) * Math.PI/180;
    const Δλ = (lon2-lon1) * Math.PI/180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    return R * c; // Distance in meters
}
```

---

## 🎨 Styling System

### CSS Architecture

**Structure:**
1. CSS Variables (Design tokens)
2. Reset & Base styles
3. Layout components
4. UI components
5. Responsive media queries
6. Accessibility features

### CSS Variables

```css
:root {
    /* Colors */
    --primary-color: #6366f1;
    --primary-dark: #4f46e5;
    --primary-light: #818cf8;
    --primary-gradient: linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%);
    --success-color: #10b981;
    --warning-color: #f59e0b;
    --danger-color: #ef4444;
    
    /* Typography */
    --text-primary: #0f172a;
    --text-secondary: #64748b;
    --text-light: #94a3b8;
    
    /* Backgrounds */
    --bg-primary: #ffffff;
    --bg-secondary: #f8fafc;
    --bg-tertiary: #e2e8f0;
    --bg-glass: rgba(255, 255, 255, 0.8);
    
    /* Borders & Shadows */
    --border-color: #e2e8f0;
    --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.04);
    --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.08);
    --shadow-lg: 0 12px 24px rgba(0, 0, 0, 0.12);
    
    /* Spacing */
    --radius-sm: 8px;
    --radius-md: 12px;
    --radius-lg: 20px;
    --touch-target: 48px;
    
    /* Transitions */
    --transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);
    --transition-normal: 250ms cubic-bezier(0.4, 0, 0.2, 1);
    --transition-slow: 400ms cubic-bezier(0.4, 0, 0.2, 1);
}
```

### Responsive Breakpoints

```css
/* Small screens */
@media (max-width: 380px) { /* Extra small phones */ }

/* Mobile portrait (default) */
/* 381px - 767px */

/* Mobile landscape */
@media (max-width: 767px) and (orientation: landscape) { }

/* Tablet */
@media (min-width: 768px) { }

/* Desktop */
@media (min-width: 1024px) { }
```

### Glassmorphism Effect

```css
.glass-element {
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}
```

---

## 💾 Local Storage

### Storage Schema

#### Missions Storage
**Key:** `citizenlink_missions`

```json
[
  {
    "id": "S-01",
    "completed": false,
    "progress": 3,
    "target": 5,
    "submissions": ["sub-1", "sub-2", "sub-3"]
  }
]
```

#### Submissions Storage
**Key:** `citizenlink_submissions`

```json
[
  {
    "id": "166acb86-26a2-44a6-925d-c82ca63de4f2",
    "user_id": "TESTER-001-A",
    "user_name": "Josh",
    "squad": "A",
    "_mission_id": "REAL-02",
    "_mission_title": "Zone B: The Subdivision Water Outage",
    "_entry_number": 4,
    "description": "walang tubig dito sa amin",
    "latitude": 6.756098613218311,
    "longitude": 125.3598725795746,
    "category": "Utilities",
    "subcategory": "No Water",
    "department_r": [],
    "preferred_departments": [],
    "workflow_status": "new",
    "priority": "low",
    "status": "pending",
    "confirmation_status": "pending",
    "is_duplicate": false,
    "confirmed_by_citizen": false,
    "all_responders_confirmed": false,
    "timestamp": "2026-01-13T04:56:15.878Z",
    "updated_at": "2026-01-13T04:56:15.878Z",
    "last_activity_at": "2026-01-13T04:56:15.878Z",
    "_device_info": {
      "userAgent": "Mozilla/5.0...",
      "screenWidth": 1536,
      "screenHeight": 864,
      "pixelRatio": 1.25,
      "platform": "Win32",
      "language": "en-US"
    },
    "_collected_at": "2026-01-13T04:56:15.878Z"
  }
]
```

#### Current Mission Storage
**Key:** `citizenlink_current_mission`

```json
{
  "missionId": "S-01",
  "startedAt": "2026-01-11T09:00:00.000Z"
}
```

### Storage Functions

```javascript
// Save data
function saveToLocalStorage() {
    localStorage.setItem('citizenlink_missions', 
        JSON.stringify(AppState.missions));
    localStorage.setItem('citizenlink_submissions', 
        JSON.stringify(AppState.submissions));
}

// Load data
function loadFromLocalStorage() {
    const missions = localStorage.getItem('citizenlink_missions');
    if (missions) {
        AppState.missions = JSON.parse(missions);
    }
}

// Clear data
function clearLocalStorage() {
    localStorage.removeItem('citizenlink_missions');
    localStorage.removeItem('citizenlink_submissions');
    localStorage.removeItem('citizenlink_current_mission');
}
```

---

## 🎯 Mission System

### Mission Object Structure

```javascript
{
    id: "S-01",                    // Unique identifier
    title: "Urban Density Test",   // Display name
    description: "Test in high-density urban area...",
    target_count: 5,               // Required submissions
    boundary_radius: 50,           // Meters from center
    center: {
        lat: 14.5995,              // Center latitude
        lng: 120.9842              // Center longitude
    },
    completed: false,              // Completion status
    progress: 0,                   // Current submission count
    submissions: []                // Array of submission IDs
}
```

### Mission Categories

1. **Urban Density** (S-01, S-02, S-03)
2. **Temporal Patterns** (S-05, S-06, S-07)
3. **Data Quality** (S-08, S-09, S-10)
4. **Performance Testing** (S-11, S-13, S-14)
5. **Edge Cases** (S-16, S-17, S-18)

### Mission Lifecycle

```javascript
// 1. Load missions
loadMissions() 

// 2. Select mission
selectMission(id)

// 3. Initialize
setupMapBoundary()
renderMissionDetails()

// 4. Track progress
updateMissionProgress()

// 5. Complete mission
checkMissionCompletion()
markMissionComplete()
```

---

## ✅ Form Validation

### Validation Rules

```javascript
const VALIDATION_RULES = {
    description: {
        required: true,
        minLength: 10,
        maxLength: 500,
        pattern: /^[a-zA-Z0-9\s.,!?-]+$/
    },
    category: {
        required: true,
        validOptions: Object.keys(CATEGORY_SUBCATEGORIES)
    },
    subcategory: {
        required: true,
        dependsOn: 'category'
    },
    priority: {
        required: true,
        validOptions: ['Low', 'Medium', 'High', 'Critical']
    },
    location: {
        required: true,
        withinBoundary: true
    }
};
```

### Validation Functions

```javascript
function validateForm(formData) {
    const errors = [];
    
    // Description validation
    if (!formData.description || formData.description.trim().length < 10) {
        errors.push('Description must be at least 10 characters');
    }
    
    // Category validation
    if (!formData.category) {
        errors.push('Please select a category');
    }
    
    // Subcategory validation
    if (!formData.subcategory) {
        errors.push('Please select a subcategory');
    }
    
    // Priority validation
    if (!formData.priority) {
        errors.push('Please select a priority level');
    }
    
    // Location validation
    if (!AppState.selectedLocation) {
        errors.push('Please select a location on the map');
    }
    
    return {
        valid: errors.length === 0,
        errors: errors
    };
}
```

### Real-time Validation

```javascript
// Add input event listeners
document.getElementById('description').addEventListener('input', (e) => {
    validateField('description', e.target.value);
});

function validateField(fieldName, value) {
    const rule = VALIDATION_RULES[fieldName];
    const fieldElement = document.getElementById(fieldName);
    
    if (rule.minLength && value.length < rule.minLength) {
        fieldElement.classList.add('error');
        showFieldError(fieldName, `Minimum ${rule.minLength} characters`);
    } else {
        fieldElement.classList.remove('error');
        clearFieldError(fieldName);
    }
}
```

---

## ↩️ Undo/Redo System

### Stack-Based Implementation

**Data Structure:**
```javascript
AppState.undoStack = [
    { type: 'submission', data: {...}, timestamp: Date },
    { type: 'submission', data: {...}, timestamp: Date }
];

AppState.redoStack = [
    { type: 'submission', data: {...}, timestamp: Date }
];
```

### Undo Operation

```javascript
function undoLastSubmission() {
    // 1. Check if undo is possible
    if (AppState.undoStack.length === 0) {
        return showToast('Nothing to undo', 'warning');
    }
    
    // 2. Pop from undo stack
    const action = AppState.undoStack.pop();
    
    // 3. Push to redo stack
    AppState.redoStack.push(action);
    
    // 4. Remove submission
    const index = AppState.submissions.findIndex(s => s.id === action.data.id);
    AppState.submissions.splice(index, 1);
    
    // 5. Remove marker
    removeMarkerById(action.data.id);
    
    // 6. Update mission progress
    const mission = getCurrentMission();
    mission.progress--;
    mission.submissions = mission.submissions.filter(id => id !== action.data.id);
    
    // 7. Persist changes
    saveToLocalStorage();
    
    // 8. Update UI
    updateProgressBar();
    updateUndoRedoButtons();
    
    // 9. Notify user
    showToast('Submission undone', 'success');
}
```

### Redo Operation

```javascript
function redoLastUndo() {
    // 1. Check if redo is possible
    if (AppState.redoStack.length === 0) {
        return showToast('Nothing to redo', 'warning');
    }
    
    // 2. Pop from redo stack
    const action = AppState.redoStack.pop();
    
    // 3. Push back to undo stack
    AppState.undoStack.push(action);
    
    // 4. Restore submission
    AppState.submissions.push(action.data);
    
    // 5. Restore marker
    addMarkerToMap(action.data);
    
    // 6. Update mission progress
    const mission = getCurrentMission();
    mission.progress++;
    mission.submissions.push(action.data.id);
    
    // 7. Persist changes
    saveToLocalStorage();
    
    // 8. Update UI
    updateProgressBar();
    updateUndoRedoButtons();
    
    // 9. Notify user
    showToast('Submission restored', 'success');
}
```

### Keyboard Shortcuts

```javascript
document.addEventListener('keydown', (e) => {
    // Undo: Ctrl+Z (Windows) or Cmd+Z (Mac)
    if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        undoLastSubmission();
    }
    
    // Redo: Ctrl+Shift+Z or Ctrl+Y
    if ((e.ctrlKey || e.metaKey) && (
        (e.shiftKey && e.key === 'z') || e.key === 'y'
    )) {
        e.preventDefault();
        redoLastUndo();
    }
});
```

---

## 📱 Mobile Responsiveness

### Viewport Configuration

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
```

### Safe Area Support

```css
body {
    padding-top: env(safe-area-inset-top);
    padding-bottom: env(safe-area-inset-bottom);
    padding-left: env(safe-area-inset-left);
    padding-right: env(safe-area-inset-right);
}
```

### Touch Optimization

```css
/* Prevent double-tap zoom */
html {
    -webkit-tap-highlight-color: transparent;
    touch-action: manipulation;
}

/* Smooth scrolling on iOS */
.sheet-content {
    -webkit-overflow-scrolling: touch;
}

/* Touch-friendly targets */
.btn-icon {
    min-width: 44px;
    min-height: 44px;
}
```

### Responsive Layouts

#### Mobile Portrait (Default)
- Vertical stack layout
- Bottom sheet at 45% height
- Icon-only layer switcher
- Compact header (56px)

#### Mobile Landscape
- Split-screen layout (50/50)
- Map on left, form on right
- Hidden sheet handle
- Reduced header (48px)

#### Tablet (768px+)
- Fixed sidebar (380px)
- Full-screen map
- Expanded controls
- Larger typography

#### Desktop (1024px+)
- Wider sidebar (440px)
- More spacing
- Larger touch targets
- Enhanced animations

---

## ⚡ Performance Optimization

### Best Practices Implemented

1. **Lazy Loading**
   - Mission config loaded on demand
   - Map tiles loaded as needed

2. **Debouncing**
   ```javascript
   function debounce(func, wait) {
       let timeout;
       return function executedFunction(...args) {
           clearTimeout(timeout);
           timeout = setTimeout(() => func(...args), wait);
       };
   }
   
   // Usage
   const handleResize = debounce(() => {
       updateMapSize();
   }, 250);
   ```

3. **Event Delegation**
   ```javascript
   // Instead of multiple listeners
   document.querySelector('.missions-grid').addEventListener('click', (e) => {
       const card = e.target.closest('.mission-card');
       if (card) {
           selectMission(card.dataset.missionId);
       }
   });
   ```

4. **RequestAnimationFrame**
   ```javascript
   function smoothScroll(element, duration) {
       const start = performance.now();
       
       function animate(currentTime) {
           const elapsed = currentTime - start;
           const progress = Math.min(elapsed / duration, 1);
           
           element.scrollTop = easeInOutCubic(progress) * targetScroll;
           
           if (progress < 1) {
               requestAnimationFrame(animate);
           }
       }
       
       requestAnimationFrame(animate);
   }
   ```

5. **CSS Containment**
   ```css
   .mission-card {
       contain: layout style paint;
   }
   ```

### Performance Metrics

**Target Metrics:**
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3.0s
- Lighthouse Performance Score: > 90
- Lighthouse Accessibility Score: > 95

---

## 🔒 Security Considerations

### Input Sanitization

```javascript
function sanitizeInput(input) {
    // Remove HTML tags
    let sanitized = input.replace(/<[^>]*>/g, '');
    
    // Escape special characters
    sanitized = sanitized
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;')
        .replace(/\//g, '&#x2F;');
    
    return sanitized.trim();
}
```

### XSS Prevention

```javascript
// Use textContent instead of innerHTML
element.textContent = userInput;

// Or use DOMPurify library
const clean = DOMPurify.sanitize(userInput);
```

### CORS Configuration

```javascript
// For local development
const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST',
    'Access-Control-Allow-Headers': 'Content-Type'
};
```

### Data Validation

```javascript
function validateGPSCoordinates(lat, lng) {
    // Check valid ranges
    if (lat < -90 || lat > 90) return false;
    if (lng < -180 || lng > 180) return false;
    
    // Check if numbers
    if (isNaN(lat) || isNaN(lng)) return false;
    
    return true;
}
```

---

## 🧪 Testing Guide

### Manual Testing Checklist

#### Functionality
- [ ] Mission list loads correctly
- [ ] Mission selection activates proper mission
- [ ] Map click places marker
- [ ] Boundary restrictions work
- [ ] Form validation triggers correctly
- [ ] Submission creates entry
- [ ] Progress bar updates
- [ ] Mission completion detected
- [ ] Undo removes last submission
- [ ] Redo restores submission
- [ ] Export generates correct data
- [ ] Layer switcher changes tiles

#### Responsiveness
- [ ] Mobile portrait layout
- [ ] Mobile landscape layout
- [ ] Tablet layout
- [ ] Desktop layout
- [ ] Small screen (<380px)
- [ ] Touch targets adequate size
- [ ] Bottom sheet draggable

#### Browser Compatibility
- [ ] Chrome/Edge (Chromium)
- [ ] Firefox
- [ ] Safari (macOS/iOS)
- [ ] Samsung Internet

#### Accessibility
- [ ] Keyboard navigation
- [ ] Screen reader compatibility
- [ ] Focus indicators visible
- [ ] Color contrast ratios
- [ ] ARIA labels present

### Automated Testing Setup

**Recommended Tools:**
- Jest for unit testing
- Cypress for E2E testing
- Lighthouse CI for performance

**Example Jest Test:**
```javascript
describe('Distance Calculation', () => {
    test('should calculate correct distance between two points', () => {
        const distance = calculateDistance(
            14.5995, 120.9842,
            14.6000, 120.9850
        );
        expect(distance).toBeCloseTo(97.4, 1);
    });
});
```

---

## 🚀 Deployment

### Pre-Deployment Checklist

- [ ] Test on all target browsers
- [ ] Verify mobile responsiveness
- [ ] Check console for errors
- [ ] Validate all links and resources
- [ ] Test with slow network
- [ ] Verify localStorage functionality
- [ ] Check map tile loading
- [ ] Test export functionality
- [ ] Verify form validation
- [ ] Test undo/redo thoroughly

### Hosting Options

#### 1. GitHub Pages
```bash
# Enable GitHub Pages in repository settings
# Set source to main branch
# Access at: https://username.github.io/repo-name
```

#### 2. Netlify
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --dir=. --prod
```

#### 3. Vercel
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

#### 4. Traditional Web Server
```nginx
# Nginx configuration
server {
    listen 80;
    server_name citizenlink.example.com;
    root /var/www/citizenlink;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|svg|ico)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

### Environment Configuration

Create `.env` file (not tracked in git):
```env
MAPBOX_ACCESS_TOKEN=your_token_here
API_ENDPOINT=https://api.example.com
```

### Build Process

```bash
# 1. Minify CSS
npx cssnano styles.css styles.min.css

# 2. Minify JavaScript
npx terser collector.js -o collector.min.js

# 3. Update HTML references
# Change:
# <link rel="stylesheet" href="styles.css">
# To:
# <link rel="stylesheet" href="styles.min.css">
```

---

## 📊 Monitoring & Analytics

### Error Tracking

```javascript
window.addEventListener('error', (event) => {
    console.error('Global error:', event.error);
    
    // Send to analytics
    logError({
        message: event.message,
        filename: event.filename,
        line: event.lineno,
        column: event.colno,
        stack: event.error?.stack
    });
});
```

### Performance Monitoring

```javascript
// Measure page load time
window.addEventListener('load', () => {
    const perfData = performance.timing;
    const loadTime = perfData.loadEventEnd - perfData.navigationStart;
    
    console.log(`Page load time: ${loadTime}ms`);
});

// Measure specific operations
performance.mark('submission-start');
submitComplaint(data);
performance.mark('submission-end');
performance.measure('submission', 'submission-start', 'submission-end');
```

---

## 🐛 Troubleshooting

### Common Issues

#### Map Not Loading
**Symptoms:** Blank map area, no tiles

**Solutions:**
1. Check internet connection
2. Verify tile URL is correct
3. Check browser console for CORS errors
4. Clear browser cache
5. Try different tile provider

#### Submissions Not Saving
**Symptoms:** Data lost on refresh

**Solutions:**
1. Check localStorage is enabled
2. Verify not in private/incognito mode
3. Check storage quota (5-10MB limit)
4. Clear localStorage and retry
5. Check browser console for errors

#### Location Not Working
**Symptoms:** Can't click map, no marker

**Solutions:**
1. Grant location permissions
2. Check if HTTPS or localhost
3. Verify mission is selected
4. Check if within boundary
5. Refresh page

#### Performance Issues
**Symptoms:** Slow, laggy interface

**Solutions:**
1. Clear old mission data
2. Reduce number of markers
3. Update browser
4. Disable browser extensions
5. Check device specifications

---

## 📝 Version History

### v1.3.0 (2026-01-13) - Current
**Schema Standardization & Category Enhancement**
- Updated data schema field names:
  - `descriptive_su` → `description` (clarity improvement)
  - `submitted_at` → `timestamp` (database consistency)
- Added "Noise Complaint" subcategory to Public Safety
- Enhanced documentation with complete field definitions
- Full database schema alignment for backend integration
- Updated all code references to use standardized field names

### v1.2.0 (2026-01-13)
**Squad System Implementation**
- Squad selection system (A, B, C)
- Mission filtering by squad assignment
- Squad-specific progress tracking
- Squad data in exports
- Beautiful squad selection UI

### v1.1.0 (2026-01-13)
**Research Compliance & Ethics**
- Digital Informed Consent Form
- User identification (Tester ID & Full Name)
- Scroll-to-enable consent mechanism
- Privacy-compliant data collection
- 8 missions (5 realistic + 3 stress tests)

### v1.0.0 (2026-01-11)
**Initial Release**
- 5 realistic zone-based missions
- Mobile-optimized UI
- Undo/redo functionality
- Multiple map layers
- Boundary restrictions
- Local storage persistence
- Export functionality

### Planned Updates

#### v1.4.0
- Offline mode with service workers
- Photo attachment support
- Enhanced analytics

#### v2.0.0
- Backend API integration
- User authentication
- Cloud storage

---

## 🤝 Contributing

See main README.md for contribution guidelines.

## 📞 Support

For technical issues:
1. Check this documentation
2. Review console errors
3. Test in different browser
4. Clear cache and localStorage
5. Create detailed issue report

---

**Last Updated:** January 11, 2026  
**Version:** 1.0.0  
**Maintainer:** Development Team
