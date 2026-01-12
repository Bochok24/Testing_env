/**
 * CitizenLink Field Test - Data Collector
 * Mobile-First Data Collection Web Interface
 * 
 * @author Senior Frontend UX Developer
 * @version 1.0.0
 */

(function() {
    'use strict';

    // =============================================
    // Application State
    // =============================================
    const AppState = {
        missions: [],
        collectedData: [],
        activeMission: null,
        currentEntries: 0,
        tempMarker: null,
        tempLatLng: null,
        targetCircle: null,
        submittedMarkers: [],
        isSheetExpanded: false,
        undoStack: [],
        redoStack: [],
        currentLayer: 'streets',
        mapTileLayer: null,
        // Measurement tool state
        measurementPoints: [],
        measurementLine: null,
        measurementMarkers: [],
        // User identification
        userId: null,
        userName: null
    };

    // =============================================
    // DOM Elements
    // =============================================
    const DOM = {
        map: null,
        measureBtn: document.getElementById('measureBtn'),
        downloadBtn: document.getElementById('downloadBtn'),
        undoBtn: document.getElementById('undoBtn'),
        redoBtn: document.getElementById('redoBtn'),
        dataBadge: document.getElementById('dataBadge'),
        bottomSheet: document.getElementById('bottomSheet'),
        sheetHandle: document.getElementById('sheetHandle'),
        missionListView: document.getElementById('missionListView'),
        activeMissionView: document.getElementById('activeMissionView'),
        missionList: document.getElementById('missionList'),
        overallProgress: document.getElementById('overallProgress'),
        backToList: document.getElementById('backToList'),
        activeMissionTitle: document.getElementById('activeMissionTitle'),
        instructionText: document.getElementById('instructionText'),
        progressBar: document.getElementById('progressBar'),
        progressCount: document.getElementById('progressCount'),
        descriptionInput: document.getElementById('descriptionInput'),
        categorySelect: document.getElementById('categorySelect'),
        subcategorySelect: document.getElementById('subcategorySelect'),
        prioritySelect: document.getElementById('prioritySelect'),
        submitBtn: document.getElementById('submitBtn'),
        hintText: document.getElementById('hintText'),
        toastContainer: document.getElementById('toastContainer'),
        // Consent form elements
        consentModal: document.getElementById('consentModal'),
        consentCheckbox: document.getElementById('consentCheckbox'),
        consentAcceptBtn: document.getElementById('consentAcceptBtn'),
        userIdInput: document.getElementById('userIdInput'),
        userNameInput: document.getElementById('userNameInput')
    };

    // =============================================
    // Map Configuration
    // =============================================
    const MapConfig = {
        defaultCenter: [6.7500, 125.3560], // Digos City
        defaultZoom: 16,
        actionZoneRadius: 20, // meters (default fallback)
        actionZoneStyle: {
            color: '#6366f1',
            weight: 3,
            opacity: 0.9,
            fillColor: '#6366f1',
            fillOpacity: 0.12,
            dashArray: '12, 8'
        },
        layers: {
            streets: {
                url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                maxZoom: 19
            },
            satellite: {
                url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
                attribution: '&copy; <a href="https://www.esri.com/">Esri</a>',
                maxZoom: 19
            },
            terrain: {
                url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
                attribution: '&copy; <a href="https://opentopomap.org/">OpenTopoMap</a> contributors',
                maxZoom: 17
            }
        }
    };

    // =============================================
    // Custom Marker Icons (Using L.divIcon with inline styles - CitizenLink approach)
    // =============================================
    const MarkerIcons = {
        temp: L.divIcon({
            html: `<div style="
                background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
                width: 30px;
                height: 30px;
                border-radius: 50%;
                border: 3px solid white;
                box-shadow: 0 2px 8px rgba(99, 102, 241, 0.5), 0 0 0 3px rgba(99, 102, 241, 0.3);
            "></div>`,
            className: 'temp-location-marker',
            iconSize: [30, 30],
            iconAnchor: [15, 15]
        }),
        submitted: L.divIcon({
            html: `<div style="
                background: linear-gradient(135deg, #10b981 0%, #059669 100%);
                width: 20px;
                height: 20px;
                border-radius: 50%;
                border: 2px solid white;
                box-shadow: 0 2px 6px rgba(16, 185, 129, 0.4);
            "></div>`,
            className: 'submitted-location-marker',
            iconSize: [20, 20],
            iconAnchor: [10, 10]
        })
    };

    // =============================================
    // Initialize Application
    // =============================================
    async function init() {
        // Check consent first
        if (!hasConsented()) {
            showConsentModal();
            return;
        }

        try {
            showLoading();
            initMap();
            await loadMissions();
            bindEvents();
            updateDataBadge();
            hideLoading();
            showToast('Ready to collect data!', 'success');
        } catch (error) {
            console.error('Initialization error:', error);
            showToast('Failed to initialize app. Please refresh.', 'error');
            hideLoading();
        }
    }

    // =============================================
    // Consent Management
    // =============================================
    function hasConsented() {
        return localStorage.getItem('citizenlink_consent') === 'true';
    }

    function showConsentModal() {
        DOM.consentModal.style.display = 'flex';
        
        // Disable checkbox initially
        DOM.consentCheckbox.disabled = true;
        const checkboxLabel = DOM.consentCheckbox.parentElement;
        checkboxLabel.classList.add('disabled');
        
        // Get the consent body element
        const consentBody = document.querySelector('.consent-body');
        
        // Function to check if scrolled to bottom
        function checkScrollPosition() {
            const scrollTop = consentBody.scrollTop;
            const scrollHeight = consentBody.scrollHeight;
            const clientHeight = consentBody.clientHeight;
            const scrolledToBottom = scrollTop + clientHeight >= scrollHeight - 10; // 10px threshold
            
            if (scrolledToBottom) {
                // Enable checkbox when scrolled to bottom
                DOM.consentCheckbox.disabled = false;
                checkboxLabel.classList.remove('disabled');
                consentBody.classList.add('scrolled');
                showToast('You can now accept the consent form', 'success');
                // Remove event listener once enabled
                consentBody.removeEventListener('scroll', checkScrollPosition);
            }
        }
        
        // Add scroll event listener
        consentBody.addEventListener('scroll', checkScrollPosition);
        
        // Check initial position (in case content is short enough)
        setTimeout(() => checkScrollPosition(), 100);
        
        // Enable/disable accept button based on checkbox
        DOM.consentCheckbox.addEventListener('change', function() {
            DOM.consentAcceptBtn.disabled = !this.checked;
        });

        // Handle accept button click
        DOM.consentAcceptBtn.addEventListener('click', acceptConsent);
    }

    function acceptConsent() {
        // Validate user identification fields
        const userId = DOM.userIdInput.value.trim();
        const userName = DOM.userNameInput.value.trim();
        
        if (!userId || !userName) {
            showToast('Please fill in your Tester ID and Full Name', 'warning');
            return;
        }
        
        // Store user identification in AppState
        AppState.userId = userId;
        AppState.userName = userName;
        
        // Save consent and user info to localStorage
        localStorage.setItem('citizenlink_consent', 'true');
        localStorage.setItem('citizenlink_consent_timestamp', new Date().toISOString());
        localStorage.setItem('citizenlink_user_id', userId);
        localStorage.setItem('citizenlink_user_name', userName);

        // Hide modal with animation
        DOM.consentModal.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            DOM.consentModal.style.display = 'none';
            // Initialize the app
            init();
        }, 300);
    }

    // =============================================
    // Map Initialization
    // =============================================
    function initMap() {
        DOM.map = L.map('map', {
            center: MapConfig.defaultCenter,
            zoom: MapConfig.defaultZoom,
            zoomControl: true,
            attributionControl: true
        });

        // Initialize with default layer (streets)
        const defaultLayer = MapConfig.layers[AppState.currentLayer];
        AppState.mapTileLayer = L.tileLayer(defaultLayer.url, {
            attribution: defaultLayer.attribution,
            maxZoom: defaultLayer.maxZoom
        }).addTo(DOM.map);

        // Move zoom control to top-right for better mobile UX
        DOM.map.zoomControl.setPosition('topright');

        // Add scale control
        L.control.scale({
            position: 'bottomleft',
            metric: true,
            imperial: false
        }).addTo(DOM.map);

        // Map click handler
        DOM.map.on('click', handleMapClick);

        // Invalidate size after a short delay to ensure proper coordinate calculation
        // This is crucial for mobile devices with safe-area insets
        setTimeout(() => {
            DOM.map.invalidateSize();
        }, 100);

        // Also invalidate on window resize/orientation change
        window.addEventListener('resize', () => {
            setTimeout(() => DOM.map.invalidateSize(), 100);
        });
    }

    // =============================================
    // Switch Map Layer
    // =============================================
    function switchMapLayer(layerName) {
        if (!MapConfig.layers[layerName]) return;

        // Remove current layer
        if (AppState.mapTileLayer) {
            DOM.map.removeLayer(AppState.mapTileLayer);
        }

        // Add new layer
        const newLayer = MapConfig.layers[layerName];
        AppState.mapTileLayer = L.tileLayer(newLayer.url, {
            attribution: newLayer.attribution,
            maxZoom: newLayer.maxZoom
        }).addTo(DOM.map);

        AppState.currentLayer = layerName;

        // Update button states
        document.querySelectorAll('.layer-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.layer === layerName);
        });

        showToast(`Switched to ${layerName.charAt(0).toUpperCase() + layerName.slice(1)} view`, 'success');
    }

    // =============================================
    // Load Missions from JSON
    // =============================================
    async function loadMissions() {
        try {
            const response = await fetch('mission_config.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const missions = await response.json();
            
            // Initialize mission status
            AppState.missions = missions.map(mission => ({
                ...mission,
                status: 'pending',
                entriesCollected: 0
            }));

            renderMissionList();
        } catch (error) {
            console.error('Error loading missions:', error);
            showEmptyState('Failed to load missions. Check that mission_config.json exists.');
            throw error;
        }
    }

    // =============================================
    // Render Mission List
    // =============================================
    function renderMissionList() {
        const completedCount = AppState.missions.filter(m => m.status === 'completed').length;
        DOM.overallProgress.textContent = `${completedCount} / ${AppState.missions.length} Complete`;

        DOM.missionList.innerHTML = AppState.missions.map(mission => `
            <li class="mission-item ${mission.status === 'completed' ? 'completed' : ''}" 
                data-mission-id="${mission.id}"
                tabindex="0"
                role="button"
                aria-label="${mission.title}, ${mission.status === 'completed' ? 'Completed' : 'Pending'}">
                <span class="mission-status ${mission.status === 'completed' ? 'status-done' : 'status-pending'}">
                    ${mission.status === 'completed' 
                        ? '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>'
                        : (AppState.missions.indexOf(mission) + 1)}
                </span>
                <div class="mission-info">
                    <span class="mission-title">${escapeHtml(mission.title)}</span>
                    <span class="mission-meta">${mission.entriesCollected} / ${mission.required_count} entries</span>
                </div>
                <span class="mission-arrow">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </span>
            </li>
        `).join('');

        // Add click handlers to mission items
        DOM.missionList.querySelectorAll('.mission-item').forEach(item => {
            item.addEventListener('click', () => selectMission(item.dataset.missionId));
            item.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    selectMission(item.dataset.missionId);
                }
            });
        });
    }

    // =============================================
    // Select Mission
    // =============================================
    function selectMission(missionId) {
        const mission = AppState.missions.find(m => m.id === missionId);
        if (!mission) return;

        AppState.activeMission = mission;
        AppState.currentEntries = mission.entriesCollected;

        // Clear any existing markers and circles
        clearMapElements();

        // Fly to target location
        DOM.map.flyTo(
            [mission.target.lat, mission.target.lng],
            mission.zoom || 19,
            { duration: 1.5 }
        );

        // Draw action zone circle (boundary where testers can place pins)
        const boundaryRadius = mission.boundary_radius || MapConfig.actionZoneRadius;
        AppState.targetCircle = L.circle(
            [mission.target.lat, mission.target.lng],
            {
                ...MapConfig.actionZoneStyle,
                radius: boundaryRadius
            }
        ).addTo(DOM.map);

        // Update UI
        DOM.activeMissionTitle.textContent = mission.title;
        DOM.instructionText.textContent = mission.instruction;
        
        // Set suggested category and subcategory
        const suggestedSubcat = mission.suggested_category || 'Others';
        const suggestedCat = mapSubcategoryToCategory(suggestedSubcat);
        DOM.categorySelect.value = suggestedCat;
        populateSubcategories(suggestedCat);
        DOM.subcategorySelect.value = suggestedSubcat;
        DOM.prioritySelect.value = 'low';
        
        // Clear form fields
        DOM.descriptionInput.value = '';
        clearValidationErrors();
        
        updateProgress();

        // Switch views
        DOM.missionListView.classList.add('hidden');
        DOM.activeMissionView.classList.remove('hidden');

        // Reset submit button state
        DOM.submitBtn.disabled = true;
        DOM.hintText.innerHTML = `<span class="hint-icon">💡</span> Tap within the highlighted area (${boundaryRadius}m radius) to place a pin.`;

        showToast(`Mission "${mission.title}" activated`, 'success');
    }

    // =============================================
    // Back to Mission List
    // =============================================
    function backToMissionList() {
        AppState.activeMission = null;
        clearMapElements();

        // Switch views
        DOM.activeMissionView.classList.add('hidden');
        DOM.missionListView.classList.remove('hidden');

        // Re-render mission list to update statuses
        renderMissionList();

        // Reset map view
        DOM.map.flyTo(MapConfig.defaultCenter, MapConfig.defaultZoom, { duration: 1 });
    }

    // =============================================
    // Handle Map Click
    // =============================================
    function handleMapClick(e) {
        // Regular left-click only - measurement now uses right-click
        if (!AppState.activeMission) return;

        const mission = AppState.activeMission;
        const boundaryRadius = mission.boundary_radius || MapConfig.actionZoneRadius;
        const targetLatLng = L.latLng(mission.target.lat, mission.target.lng);
        const clickDistance = targetLatLng.distanceTo(e.latlng);

        // Check if click is within the boundary
        if (clickDistance > boundaryRadius) {
            showToast(`Please place the pin within the marked area (${boundaryRadius}m radius)`, 'warning');
            return;
        }

        // Remove existing temp marker
        if (AppState.tempMarker) {
            DOM.map.removeLayer(AppState.tempMarker);
        }

        // Place new temp marker
        AppState.tempLatLng = e.latlng;
        AppState.tempMarker = L.marker(e.latlng, {
            icon: MarkerIcons.temp,
            draggable: true
        }).addTo(DOM.map);

        // Update marker position on drag end with boundary check
        // Using 'dragend' instead of 'drag' to prevent jittery behavior on mobile
        AppState.tempMarker.on('dragend', function(event) {
            const newLatLng = event.target.getLatLng();
            const newDistance = targetLatLng.distanceTo(newLatLng);
            
            if (newDistance > boundaryRadius) {
                // Constrain to boundary edge
                const bearing = Math.atan2(
                    newLatLng.lng - targetLatLng.lng,
                    newLatLng.lat - targetLatLng.lat
                );
                const constrainedLat = targetLatLng.lat + (boundaryRadius / 111320) * Math.cos(bearing);
                const constrainedLng = targetLatLng.lng + (boundaryRadius / (111320 * Math.cos(targetLatLng.lat * Math.PI / 180))) * Math.sin(bearing);
                
                event.target.setLatLng([constrainedLat, constrainedLng]);
                AppState.tempLatLng = L.latLng(constrainedLat, constrainedLng);
                showToast('Marker constrained to boundary', 'info');
            } else {
                AppState.tempLatLng = newLatLng;
            }
        });

        // Allow smooth dragging without continuous constraint checks
        AppState.tempMarker.on('drag', function(event) {
            // Just update the stored position during drag
            AppState.tempLatLng = event.target.getLatLng();
        });

        // Enable submit button
        DOM.submitBtn.disabled = false;
        DOM.hintText.innerHTML = '<span class="hint-icon">✓</span> Pin placed! Click "Submit Location" to save.';

        // Add pulse animation to marker
        const markerElement = AppState.tempMarker.getElement();
        if (markerElement) {
            markerElement.style.animation = 'pulse 1.5s ease-in-out infinite';
        }
        
        // Update hint text
        DOM.hintText.innerHTML = '<span class="hint-icon">✓</span> Pin placed! Fill out the form and click Submit.';
    }

    // =============================================
    // Submit Location
    // =============================================
    function submitLocation() {
        if (!AppState.activeMission || !AppState.tempLatLng) {
            showToast('Please place a pin on the map first', 'warning');
            return;
        }

        // Validate required fields
        const validationErrors = validateForm();
        if (validationErrors.length > 0) {
            showValidationErrors(validationErrors);
            showToast('Please fill in required fields', 'warning');
            return;
        }

        const mission = AppState.activeMission;
        
        // Get form values
        const description = DOM.descriptionInput.value.trim();
        const category = DOM.categorySelect.value;
        const subcategory = DOM.subcategorySelect.value;
        const priority = DOM.prioritySelect.value;

        // Create data entry matching database schema
        const entry = {
            // Unique identifier for this entry
            id: generateUUID(),
            
            // User identification
            user_id: AppState.userId,
            user_name: AppState.userName,
            
            // Mission tracking (for test purposes)
            _mission_id: mission.id,
            _mission_title: mission.title,
            _entry_number: mission.entriesCollected + 1,
            
            // Required complaint fields (matching DB schema)
            descriptive_su: description,
            
            // Location fields
            latitude: AppState.tempLatLng.lat,
            longitude: AppState.tempLatLng.lng,
            
            // Classification
            category: category,
            subcategory: subcategory,
            
            // Default values matching DB schema
            department_r: [],
            preferred_departments: [],
            workflow_status: 'new',
            priority: priority,
            status: 'pending',
            confirmation_status: 'pending',
            is_duplicate: false,
            confirmed_by_citizen: false,
            all_responders_confirmed: false,
            
            // Timestamps
            submitted_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            last_activity_at: new Date().toISOString(),
            
            // Metadata for test tracking
            _device_info: getDeviceInfo(),
            _collected_at: new Date().toISOString()
        };

        // Save to collected data
        AppState.collectedData.push(entry);

        // Update mission progress
        mission.entriesCollected++;
        AppState.currentEntries = mission.entriesCollected;

        // Convert temp marker to submitted marker
        if (AppState.tempMarker) {
            DOM.map.removeLayer(AppState.tempMarker);
        }

        const submittedMarker = L.marker(AppState.tempLatLng, {
            icon: MarkerIcons.submitted
        }).addTo(DOM.map);

        submittedMarker.bindPopup(`
            <strong>${escapeHtml(category)} → ${escapeHtml(subcategory)}</strong><br>
            <em>${escapeHtml(description.substring(0, 50))}${description.length > 50 ? '...' : ''}</em><br>
            <small>Priority: ${priority}</small><br>
            <small>${new Date().toLocaleTimeString()}</small>
        `);

        AppState.submittedMarkers.push(submittedMarker);

        // Add to undo stack and clear redo stack
        AppState.undoStack.push({
            entry: entry,
            marker: submittedMarker,
            missionId: mission.id,
            entryIndex: AppState.collectedData.length - 1
        });
        AppState.redoStack = []; // Clear redo stack on new action
        updateUndoRedoButtons();

        // Reset temp marker and form
        AppState.tempMarker = null;
        AppState.tempLatLng = null;
        DOM.submitBtn.disabled = true;
        DOM.hintText.innerHTML = '<span class="hint-icon">💡</span> Tap on the map to place a pin, then fill out the form.';
        
        // Clear form for next entry
        DOM.descriptionInput.value = '';
        clearValidationErrors();

        // Update UI
        updateProgress();
        updateDataBadge();

        // Check if mission is complete
        if (mission.entriesCollected >= mission.required_count) {
            mission.status = 'completed';
            showToast(`🎉 Mission "${mission.title}" completed!`, 'success');
            
            // Auto return to list after short delay
            setTimeout(() => {
                backToMissionList();
            }, 1500);
        } else {
            showToast(`Entry ${mission.entriesCollected}/${mission.required_count} saved!`, 'success');
        }
    }

    // =============================================
    // Update Progress UI
    // =============================================
    function updateProgress() {
        if (!AppState.activeMission) return;

        const mission = AppState.activeMission;
        const progress = (mission.entriesCollected / mission.required_count) * 100;

        DOM.progressCount.textContent = `${mission.entriesCollected} / ${mission.required_count}`;
        DOM.progressBar.style.width = `${progress}%`;
    }

    // =============================================
    // Update Data Badge
    // =============================================
    function updateDataBadge() {
        const count = AppState.collectedData.length;
        DOM.dataBadge.textContent = count;
        DOM.dataBadge.hidden = count === 0;
    }

    // =============================================
    // Update Undo/Redo Button States
    // =============================================
    function updateUndoRedoButtons() {
        DOM.undoBtn.disabled = AppState.undoStack.length === 0;
        DOM.redoBtn.disabled = AppState.redoStack.length === 0;
    }

    // =============================================
    // Undo Last Submission
    // =============================================
    function undoLastSubmission() {
        if (AppState.undoStack.length === 0) {
            showToast('Nothing to undo!', 'warning');
            return;
        }

        const lastAction = AppState.undoStack.pop();
        
        // Remove from collected data
        AppState.collectedData.splice(lastAction.entryIndex, 1);
        
        // Remove marker from map
        DOM.map.removeLayer(lastAction.marker);
        const markerIndex = AppState.submittedMarkers.indexOf(lastAction.marker);
        if (markerIndex > -1) {
            AppState.submittedMarkers.splice(markerIndex, 1);
        }
        
        // Decrease mission entry count
        const mission = AppState.missions.find(m => m.id === lastAction.missionId);
        if (mission) {
            mission.entriesCollected--;
            
            // Update status if was completed
            if (mission.status === 'completed' && mission.entriesCollected < mission.required_count) {
                mission.status = 'pending';
            }
            
            // Update progress if it's the active mission
            if (AppState.activeMission && AppState.activeMission.id === lastAction.missionId) {
                AppState.currentEntries = mission.entriesCollected;
                updateProgress();
            }
        }
        
        // Add to redo stack
        AppState.redoStack.push(lastAction);
        
        // Update UI
        updateDataBadge();
        updateUndoRedoButtons();
        renderMissionList();
        
        showToast('Entry undone!', 'success');
    }

    // =============================================
    // Redo Last Undo
    // =============================================
    function redoLastUndo() {
        if (AppState.redoStack.length === 0) {
            showToast('Nothing to redo!', 'warning');
            return;
        }

        const lastUndo = AppState.redoStack.pop();
        
        // Re-add to collected data
        AppState.collectedData.push(lastUndo.entry);
        
        // Re-add marker to map
        const marker = L.marker(
            [lastUndo.entry.latitude, lastUndo.entry.longitude],
            { icon: MarkerIcons.submitted }
        ).addTo(DOM.map);
        
        marker.bindPopup(`
            <strong>${escapeHtml(lastUndo.entry.category)} → ${escapeHtml(lastUndo.entry.subcategory)}</strong><br>
            <em>${escapeHtml(lastUndo.entry.descriptive_su.substring(0, 50))}${lastUndo.entry.descriptive_su.length > 50 ? '...' : ''}</em><br>
            <small>Priority: ${lastUndo.entry.priority}</small><br>
            <small>${new Date(lastUndo.entry.submitted_at).toLocaleTimeString()}</small>
        `);
        
        AppState.submittedMarkers.push(marker);
        
        // Increase mission entry count
        const mission = AppState.missions.find(m => m.id === lastUndo.missionId);
        if (mission) {
            mission.entriesCollected++;
            
            // Update status if now completed
            if (mission.entriesCollected >= mission.required_count) {
                mission.status = 'completed';
            }
            
            // Update progress if it's the active mission
            if (AppState.activeMission && AppState.activeMission.id === lastUndo.missionId) {
                AppState.currentEntries = mission.entriesCollected;
                updateProgress();
            }
        }
        
        // Add back to undo stack
        AppState.undoStack.push({
            entry: lastUndo.entry,
            marker: marker,
            missionId: lastUndo.missionId,
            entryIndex: AppState.collectedData.length - 1
        });
        
        // Update UI
        updateDataBadge();
        updateUndoRedoButtons();
        renderMissionList();
        
        showToast('Entry redone!', 'success');
    }

    // =============================================
    // Download Data
    // =============================================
    function downloadData() {
        if (AppState.collectedData.length === 0) {
            showToast('No data collected yet!', 'warning');
            return;
        }

        const exportData = {
            export_info: {
                exported_at: new Date().toISOString(),
                total_entries: AppState.collectedData.length,
                missions_completed: AppState.missions.filter(m => m.status === 'completed').length,
                total_missions: AppState.missions.length
            },
            mission_summary: AppState.missions.map(m => ({
                id: m.id,
                title: m.title,
                status: m.status,
                entries_collected: m.entriesCollected,
                required_count: m.required_count
            })),
            collected_data: AppState.collectedData
        };

        const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `citizenlink_data_${timestamp}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        showToast(`Downloaded ${AppState.collectedData.length} entries!`, 'success');
    }

    // =============================================
    // Clear Map Elements
    // =============================================
    function clearMapElements() {
        // Remove temp marker
        if (AppState.tempMarker) {
            DOM.map.removeLayer(AppState.tempMarker);
            AppState.tempMarker = null;
            AppState.tempLatLng = null;
        }

        // Remove target circle
        if (AppState.targetCircle) {
            DOM.map.removeLayer(AppState.targetCircle);
            AppState.targetCircle = null;
        }

        // Remove submitted markers
        AppState.submittedMarkers.forEach(marker => {
            DOM.map.removeLayer(marker);
        });
        AppState.submittedMarkers = [];
    }

    // =============================================
    // Bottom Sheet Handling
    // =============================================
    function initSheetGestures() {
        let startY = 0;
        let startHeight = 0;
        let isDragging = false;

        DOM.sheetHandle.addEventListener('touchstart', (e) => {
            isDragging = true;
            startY = e.touches[0].clientY;
            startHeight = DOM.bottomSheet.offsetHeight;
            DOM.bottomSheet.style.transition = 'none';
        }, { passive: true });

        document.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            
            const deltaY = startY - e.touches[0].clientY;
            const newHeight = Math.min(
                Math.max(80, startHeight + deltaY),
                window.innerHeight * 0.7
            );
            
            DOM.bottomSheet.style.height = `${newHeight}px`;
        }, { passive: true });

        document.addEventListener('touchend', () => {
            if (!isDragging) return;
            isDragging = false;
            
            DOM.bottomSheet.style.transition = '';
            const currentHeight = DOM.bottomSheet.offsetHeight;
            const threshold = window.innerHeight * 0.25;

            if (currentHeight < threshold) {
                DOM.bottomSheet.classList.add('collapsed');
                DOM.bottomSheet.classList.remove('expanded');
            } else if (currentHeight > window.innerHeight * 0.5) {
                DOM.bottomSheet.classList.add('expanded');
                DOM.bottomSheet.classList.remove('collapsed');
            } else {
                DOM.bottomSheet.classList.remove('collapsed', 'expanded');
            }
            
            DOM.bottomSheet.style.height = '';
        });

        // Double-tap to toggle
        let lastTap = 0;
        DOM.sheetHandle.addEventListener('click', () => {
            const now = Date.now();
            if (now - lastTap < 300) {
                DOM.bottomSheet.classList.toggle('expanded');
                DOM.bottomSheet.classList.remove('collapsed');
            }
            lastTap = now;
        });
    }

    // =============================================
    // Event Bindings
    // =============================================
    function bindEvents() {
        // Measure button - now clears measurements
        DOM.measureBtn.addEventListener('click', toggleMeasurementTool);

        // Right-click map to add measurement points
        DOM.map.on('contextmenu', handleMeasurementRightClick);

        // Download button
        DOM.downloadBtn.addEventListener('click', downloadData);

        // Undo button
        DOM.undoBtn.addEventListener('click', undoLastSubmission);

        // Redo button
        DOM.redoBtn.addEventListener('click', redoLastUndo);

        // Back to list button
        DOM.backToList.addEventListener('click', backToMissionList);

        // Submit button
        DOM.submitBtn.addEventListener('click', submitLocation);

        // Form input listeners - clear errors on input
        DOM.descriptionInput.addEventListener('input', () => {
            DOM.descriptionInput.classList.remove('error');
            const errorMsg = DOM.descriptionInput.parentNode.querySelector('.error-message');
            if (errorMsg) errorMsg.remove();
        });

        // Category change updates subcategories
        DOM.categorySelect.addEventListener('change', () => {
            populateSubcategories(DOM.categorySelect.value);
        });

        // Initialize subcategories on load
        populateSubcategories(DOM.categorySelect.value);

        // Map layer switcher buttons
        document.querySelectorAll('.layer-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                switchMapLayer(btn.dataset.layer);
            });
        });

        // Sheet gestures
        initSheetGestures();

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && AppState.activeMission) {
                backToMissionList();
            }
            if (e.key === 'Enter' && !DOM.submitBtn.disabled && AppState.activeMission) {
                submitLocation();
            }
            // Ctrl+Z or Cmd+Z for undo
            if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
                e.preventDefault();
                undoLastSubmission();
            }
            // Ctrl+Shift+Z or Cmd+Shift+Z for redo
            if ((e.ctrlKey || e.metaKey) && e.key === 'z' && e.shiftKey) {
                e.preventDefault();
                redoLastUndo();
            }
            // Ctrl+Y or Cmd+Y for redo (alternative)
            if ((e.ctrlKey || e.metaKey) && e.key === 'y') {
                e.preventDefault();
                redoLastUndo();
            }
        });

        // Resize handler
        window.addEventListener('resize', () => {
            DOM.map.invalidateSize();
        });
    }

    // =============================================
    // Utility Functions
    // =============================================
    function generateId() {
        return 'entry_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    // Generate UUID v4 (matches PostgreSQL gen_random_uuid())
    function generateUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    // Category to subcategories mapping
    const CATEGORY_SUBCATEGORIES = {
        'Infrastructure': ['Pothole', 'Road Damage', 'Broken Sidewalk', 'Streetlight', 'Damaged Bridge', 'Drainage Issue', 'Others'],
        'Utilities': ['No Water', 'Low Water Pressure', 'Pipe Leak', 'Power Outage', 'Damaged Power Line', 'Internet Issue', 'Others'],
        'Public Safety': ['Fire', 'Crime', 'Stray Animals', 'Vandalism', 'Unsafe Structure', 'Missing Signage', 'Others'],
        'Sanitation': ['Garbage Collection', 'Illegal Dumping', 'Overflowing Trash', 'Clogged Drain', 'Bad Odor', 'Pest Infestation', 'Others'],
        'Traffic': ['Traffic Light Issue', 'Road Obstruction', 'Illegal Parking', 'Missing Road Signs', 'Traffic Congestion', 'Accident', 'Others'],
        'Environment': ['Flood', 'Fallen Tree', 'Air Pollution', 'Water Pollution', 'Soil Erosion', 'Illegal Burning', 'Others'],
        'Others': ['Others']
    };

    // Populate subcategories based on selected category
    function populateSubcategories(category) {
        const subcategories = CATEGORY_SUBCATEGORIES[category] || CATEGORY_SUBCATEGORIES['Others'];
        DOM.subcategorySelect.innerHTML = subcategories
            .map(sub => `<option value="${sub}">${sub}</option>`)
            .join('');
    }

    // Map subcategory to parent category
    function mapSubcategoryToCategory(subcategory) {
        for (const [category, subcategories] of Object.entries(CATEGORY_SUBCATEGORIES)) {
            if (subcategories.includes(subcategory)) {
                return category;
            }
        }
        return 'Others';
    }

    // Form validation
    function validateForm() {
        const errors = [];
        
        const description = DOM.descriptionInput.value.trim();
        
        if (!description) {
            errors.push({ field: 'descriptionInput', message: 'Description is required' });
        } else if (description.length < 10) {
            errors.push({ field: 'descriptionInput', message: 'Description must be at least 10 characters' });
        }
        
        return errors;
    }

    // Show validation errors on form
    function showValidationErrors(errors) {
        clearValidationErrors();
        
        errors.forEach(error => {
            const field = document.getElementById(error.field);
            if (field) {
                field.classList.add('error');
                
                // Add error message
                const errorMsg = document.createElement('span');
                errorMsg.className = 'error-message';
                errorMsg.textContent = error.message;
                field.parentNode.appendChild(errorMsg);
            }
        });
    }

    // Clear validation errors
    function clearValidationErrors() {
        document.querySelectorAll('.form-input.error, .form-textarea.error').forEach(el => {
            el.classList.remove('error');
        });
        document.querySelectorAll('.error-message').forEach(el => el.remove());
    }

    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    function getDeviceInfo() {
        return {
            userAgent: navigator.userAgent,
            screenWidth: window.screen.width,
            screenHeight: window.screen.height,
            pixelRatio: window.devicePixelRatio || 1,
            platform: navigator.platform,
            language: navigator.language
        };
    }

    function showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `
            ${type === 'success' ? '✓' : type === 'warning' ? '⚠' : type === 'error' ? '✕' : 'ℹ'}
            <span>${escapeHtml(message)}</span>
        `;
        DOM.toastContainer.appendChild(toast);

        // Remove after animation
        setTimeout(() => {
            if (toast.parentNode) {
                toast.remove();
            }
        }, 3000);
    }

    function showLoading() {
        DOM.missionList.innerHTML = `
            <div class="loading">
                <div class="loading-spinner"></div>
                <span class="loading-text">Loading missions...</span>
            </div>
        `;
    }

    function hideLoading() {
        const loader = DOM.missionList.querySelector('.loading');
        if (loader) loader.remove();
    }

    function showEmptyState(message) {
        DOM.missionList.innerHTML = `
            <div class="empty-state">
                <span class="empty-state-icon">📋</span>
                <h3 class="empty-state-title">No Missions Available</h3>
                <p class="empty-state-text">${escapeHtml(message)}</p>
            </div>
        `;
    }

    // =============================================
    // Measurement Tool
    // =============================================
    function toggleMeasurementTool() {
        // Just clear measurements when button is clicked
        if (AppState.measurementPoints.length > 0) {
            clearMeasurements();
            showToast('Measurements cleared', 'warning');
        } else {
            showToast('Right-click on map to start measuring distances', 'success');
        }
    }

    function handleMeasurementRightClick(e) {
        // Prevent default context menu
        L.DomEvent.stopPropagation(e);
        
        const pointIndex = AppState.measurementPoints.length;
        AppState.measurementPoints.push(e.latlng);

        // Add draggable marker at clicked point
        const marker = L.marker(e.latlng, {
            icon: L.divIcon({
                html: '<div class="measurement-marker"></div>',
                className: '',
                iconSize: [10, 10]
            }),
            draggable: true
        }).addTo(DOM.map);

        // Handle marker drag
        marker.on('drag', function(dragEvent) {
            const newLatLng = dragEvent.target.getLatLng();
            AppState.measurementPoints[pointIndex] = newLatLng;
            updateMeasurementLine();
        });

        marker.on('dragend', function() {
            showToast('Measurement point updated', 'success');
        });

        // Allow right-click on marker to remove it
        marker.on('contextmenu', function(markerEvent) {
            L.DomEvent.stopPropagation(markerEvent);
            removeMeasurementPoint(pointIndex);
        });

        AppState.measurementMarkers.push(marker);
        updateMeasurementLine();

        // Show hint on first point
        if (AppState.measurementPoints.length === 1) {
            showToast('Right-click again to add more points. Drag points to adjust.', 'success');
        }
    }

    function updateMeasurementLine() {
        // Remove old line and tooltip if exists
        if (AppState.measurementLine) {
            DOM.map.removeLayer(AppState.measurementLine);
        }

        // Remove old tooltip
        const oldTooltip = AppState.measurementMarkers.find(m => m instanceof L.Tooltip);
        if (oldTooltip) {
            DOM.map.removeLayer(oldTooltip);
            const index = AppState.measurementMarkers.indexOf(oldTooltip);
            if (index > -1) {
                AppState.measurementMarkers.splice(index, 1);
            }
        }

        // Need at least 2 points to draw line
        if (AppState.measurementPoints.length < 2) return;

        // Calculate total distance
        let totalDistance = 0;
        for (let i = 1; i < AppState.measurementPoints.length; i++) {
            totalDistance += AppState.measurementPoints[i-1].distanceTo(AppState.measurementPoints[i]);
        }

        // Draw polyline
        AppState.measurementLine = L.polyline(AppState.measurementPoints, {
            color: '#6366f1',
            weight: 3,
            opacity: 0.8,
            dashArray: '10, 5'
        }).addTo(DOM.map);

        // Format distance
        const distanceText = totalDistance < 1000 
            ? `${totalDistance.toFixed(1)} m`
            : `${(totalDistance / 1000).toFixed(2)} km`;

        // Add tooltip at the last point
        const lastPoint = AppState.measurementPoints[AppState.measurementPoints.length - 1];
        const tooltip = L.tooltip({
            permanent: true,
            direction: 'top',
            className: 'measurement-tooltip'
        })
            .setLatLng(lastPoint)
            .setContent(`<strong>Distance: ${distanceText}</strong>`)
            .addTo(DOM.map);

        AppState.measurementMarkers.push(tooltip);

        // Update button badge to show number of points
        updateMeasurementButton();
    }

    function removeMeasurementPoint(index) {
        // Remove the marker
        const marker = AppState.measurementMarkers[index];
        if (marker && marker instanceof L.Marker) {
            DOM.map.removeLayer(marker);
        }

        // Remove from arrays
        AppState.measurementPoints.splice(index, 1);
        AppState.measurementMarkers.splice(index, 1);

        // Reindex remaining markers' point indices
        AppState.measurementMarkers.forEach((m, i) => {
            if (m instanceof L.Marker) {
                m.off('contextmenu');
                m.on('contextmenu', function(markerEvent) {
                    L.DomEvent.stopPropagation(markerEvent);
                    removeMeasurementPoint(i);
                });
            }
        });

        updateMeasurementLine();
        showToast('Measurement point removed', 'warning');
    }

    function updateMeasurementButton() {
        const pointCount = AppState.measurementPoints.length;
        if (pointCount > 0) {
            DOM.measureBtn.classList.add('active');
            DOM.measureBtn.setAttribute('title', `Clear ${pointCount} measurement point${pointCount > 1 ? 's' : ''}`);
        } else {
            DOM.measureBtn.classList.remove('active');
            DOM.measureBtn.setAttribute('title', 'Measure Distance');
        }
    }

    function clearMeasurements() {
        // Remove all markers and lines
        AppState.measurementMarkers.forEach(marker => {
            DOM.map.removeLayer(marker);
        });
        
        if (AppState.measurementLine) {
            DOM.map.removeLayer(AppState.measurementLine);
            AppState.measurementLine = null;
        }

        AppState.measurementPoints = [];
        AppState.measurementMarkers = [];
        updateMeasurementButton();
    }

    // =============================================
    // Add Custom CSS Animation for Markers
    // =============================================
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(26, 95, 122, 0.7); }
            50% { transform: scale(1.1); box-shadow: 0 0 0 10px rgba(26, 95, 122, 0); }
        }
    `;
    document.head.appendChild(style);

    // =============================================
    // Initialize on DOM Ready
    // =============================================
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
