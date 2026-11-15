/* ==========================================================================
   AUW CAMPUS AMONG US — RETRO PIXEL ARCADE EDITION (script.js)
   Complete Reconstructed Vanilla JavaScript Engine • 100% Offline-First
   ========================================================================== */

(() => {
    "use strict";

    // ======================================================================
    // 1. EXACT 16-COLOUR PALETTE & CONFIGURATION CONSTANTS
    // ======================================================================
    const PALETTE = {
        ink: "#16171a",
        wine: "#7f0622",
        rust: "#d62411",
        orange: "#ff8426",
        yellow: "#ffd100",
        paper: "#fafdff",
        pinkSoft: "#ff80a4",
        pink: "#ff2674",
        plum: "#94216a",
        purple: "#430067",
        blue: "#234975",
        sky: "#68aed4",
        lime: "#bfff3c",
        green: "#10d275",
        teal: "#007899",
        navy: "#002859"
    };

    const COUNTRIES = [
        { id: "BD", name: "Bangladesh", flag: "🇧🇩" },
        { id: "AF", name: "Afghanistan", flag: "🇦🇫" },
        { id: "BT", name: "Bhutan", flag: "🇧🇹" },
        { id: "IN", name: "India", flag: "🇮🇳" },
        { id: "ID", name: "Indonesia", flag: "🇮🇩" },
        { id: "MM", name: "Myanmar", flag: "🇲🇲" },
        { id: "NP", name: "Nepal", flag: "🇳🇵" },
        { id: "PK", name: "Pakistan", flag: "🇵🇰" },
        { id: "LK", name: "Sri Lanka", flag: "🇱🇰" },
        { id: "VN", name: "Vietnam", flag: "🇻🇳" }
    ];

    const CHAR_COLORS = [
        { id: "pinkSoft", name: "Pastel Pink", hex: PALETTE.pinkSoft, trim: PALETTE.pink },
        { id: "sky", name: "Sky Blue", hex: PALETTE.sky, trim: PALETTE.teal },
        { id: "lime", name: "Neon Lime", hex: PALETTE.lime, trim: PALETTE.green },
        { id: "yellow", name: "Solar Gold", hex: PALETTE.yellow, trim: PALETTE.orange },
        { id: "orange", name: "Sunset Orange", hex: PALETTE.orange, trim: PALETTE.rust },
        { id: "rust", name: "Crimson Red", hex: PALETTE.rust, trim: PALETTE.wine },
        { id: "plum", name: "Royal Plum", hex: PALETTE.plum, trim: PALETTE.purple },
        { id: "green", name: "Emerald Mint", hex: PALETTE.green, trim: PALETTE.teal }
    ];

    const CHAR_ACCESSORIES = [
        { id: "headphones", name: "Headphones", icon: "🎧" },
        { id: "cap", name: "Grad Cap", icon: "🎓" },
        { id: "crown", name: "Gold Crown", icon: "👑" },
        { id: "glasses", name: "Smart Glasses", icon: "👓" },
        { id: "bow", name: "Ribbon Bow", icon: "🎀" },
        { id: "flower", name: "Campus Hibiscus", icon: "🌺" }
    ];

    // 9 Connected AUW Campus Zones (3x3 Grid Layout)
    const WORLD_WIDTH = 2800;
    const WORLD_HEIGHT = 1800;

    const ROOMS = [
        {
            id: "RESIDENTIAL",
            name: "RESIDENTIAL HALL",
            short: "RESIDENTIAL",
            x: 140, y: 120, w: 680, h: 420,
            floorDark: "#232533", floorLight: "#dce6f2",
            accent: PALETTE.pinkSoft,
            ventId: "VENT_NW",
            camId: "CAM 01"
        },
        {
            id: "LIBRARY",
            name: "LIBRARY & ARCHIVES",
            short: "LIBRARY",
            x: 1060, y: 120, w: 680, h: 420,
            floorDark: "#1f2a38", floorLight: "#d8ecf4",
            accent: PALETTE.sky,
            ventId: null,
            camId: "CAM 02"
        },
        {
            id: "SCIENCELAB",
            name: "SCIENCE & BIO LAB",
            short: "SCIENCE LAB",
            x: 1980, y: 120, w: 680, h: 420,
            floorDark: "#1c2d2c", floorLight: "#d7f4ea",
            accent: PALETTE.green,
            ventId: "VENT_NE",
            camId: "CAM 03"
        },
        {
            id: "HEALTHCENTER",
            name: "WELLNESS & CLINIC",
            short: "HEALTH CENTER",
            x: 140, y: 690, w: 680, h: 420,
            floorDark: "#2b2232", floorLight: "#eee0f5",
            accent: PALETTE.pink,
            ventId: null,
            camId: "CAM 04"
        },
        {
            id: "CAFETERIA",
            name: "AUW CENTRAL CAFETERIA",
            short: "CAFETERIA",
            x: 1060, y: 690, w: 680, h: 420,
            floorDark: "#292822", floorLight: "#f6efd8",
            accent: PALETTE.yellow,
            ventId: "VENT_CENTER",
            camId: "CAM 05"
        },
        {
            id: "COMPUTERLAB",
            name: "IT & AI SERVER LAB",
            short: "IT LAB",
            x: 1980, y: 690, w: 680, h: 420,
            floorDark: "#1b263b", floorLight: "#dae6fa",
            accent: PALETTE.teal,
            ventId: null,
            camId: "CAM 06"
        },
        {
            id: "COURTYARD",
            name: "GARDEN COURTYARD",
            short: "COURTYARD",
            x: 140, y: 1260, w: 680, h: 420,
            floorDark: "#1d2c22", floorLight: "#dcf5e1",
            accent: PALETTE.lime,
            ventId: "VENT_SW",
            camId: "CAM 07"
        },
        {
            id: "AUDITORIUM",
            name: "GRAND AUDITORIUM",
            short: "AUDITORIUM",
            x: 1060, y: 1260, w: 680, h: 420,
            floorDark: "#2d1f26", floorLight: "#f7dce2",
            accent: PALETTE.orange,
            ventId: null,
            camId: "CAM 08"
        },
        {
            id: "SECURITY",
            name: "SECURITY & POWER HUB",
            short: "SECURITY",
            x: 1980, y: 1260, w: 680, h: 420,
            floorDark: "#28222b", floorLight: "#eae2f0",
            accent: PALETTE.rust,
            ventId: "VENT_SE",
            camId: "CAM 09"
        }
    ];

   // Walkable Corridors linking the 3x3 grid of rooms (deep overlap so doorways never block)
    const CORRIDORS = [
        // Row 1 Horizontal
        { x: 760, y: 260, w: 360, h: 140 },
        { x: 1680, y: 260, w: 360, h: 140 },
        // Row 2 Horizontal
        { x: 760, y: 830, w: 360, h: 140 },
        { x: 1680, y: 830, w: 360, h: 140 },
        // Row 3 Horizontal
        { x: 760, y: 1400, w: 360, h: 140 },
        { x: 1680, y: 1400, w: 360, h: 140 },
        // Col 1 Vertical
        { x: 410, y: 480, w: 140, h: 270 },
        { x: 410, y: 1050, w: 140, h: 270 },
        // Col 2 Vertical
        { x: 1330, y: 480, w: 140, h: 270 },
        { x: 1330, y: 1050, w: 140, h: 270 },
        // Col 3 Vertical
        { x: 2250, y: 480, w: 140, h: 270 },
        { x: 2250, y: 1050, w: 140, h: 270 }
    ];

    // 9 Interactive Campus Missions (1 per Room)
    const TASKS_CONFIG = [
        {
            id: "TASK_RESIDENTIAL",
            roomId: "RESIDENTIAL",
            roomName: "RESIDENTIAL HALL",
            title: "DORMITORY DOOR UNLOCK",
            icon: "🔐",
            desc: "Fill in the missing numbers (1-5) so no number repeats in any row or column.",
            x: 310, y: 230,
            points: 150,
            type: "SUDOKU5"
        },
        {
            id: "TASK_LIBRARY",
            roomId: "LIBRARY",
            roomName: "LIBRARY & ARCHIVES",
            title: "ARCHIVE DEWEY SORTING",
            icon: "📚",
            desc: "Click the AUW Archive Call Numbers in ascending numerical order from lowest to highest.",
            x: 1540, y: 220,
            points: 120,
            type: "SORTING"
        },
        {
            id: "TASK_SCIENCELAB",
            roomId: "SCIENCELAB",
            roomName: "SCIENCE & BIO LAB",
            title: "REAGENT PH CALIBRATION",
            icon: "🧪",
            desc: "Adjust the 3 chemical burette valves so each beaker matches its target pH reading.",
            x: 2470, y: 230,
            points: 140,
            type: "SLIDERS"
        },
        {
            id: "TASK_HEALTHCENTER",
            roomId: "HEALTHCENTER",
            roomName: "WELLNESS & CLINIC",
            title: "FIRST-AID BIOSCAN SYNC",
            icon: "🩺",
            desc: "Memorize and repeat the 4-pulse medical scanner sequence to verify student vitals.",
            x: 290, y: 880,
            points: 130,
            type: "MEMORY"
        },
        {
            id: "TASK_CAFETERIA",
            roomId: "CAFETERIA",
            roomName: "AUW CENTRAL CAFETERIA",
            title: "ESPRESSO & TEA DISPENSER",
            icon: "☕",
            desc: "Select each requested campus beverage thermal level to serve the study group.",
            x: 1190, y: 790,
            points: 110,
            type: "BEVERAGE"
        },
        {
            id: "TASK_COMPUTERLAB",
            roomId: "COMPUTERLAB",
            roomName: "IT & AI SERVER LAB",
            title: "CAMPUS FIREWALL PATCH",
            icon: "💻",
            desc: "Connect each colour-coded fiber optic port on the left to its matching server node on the right.",
            x: 2490, y: 880,
            points: 140,
            type: "WIRES"
        },
        {
            id: "TASK_COURTYARD",
            roomId: "COURTYARD",
            roomName: "GARDEN COURTYARD",
            title: "SOLAR CANOPY ALIGNMENT",
            icon: "☀️",
            desc: "Toggle the solar array mirrors until all 9 photovoltaic cells are energized.",
            x: 320, y: 1510,
            points: 130,
            type: "SOLAR"
        },
        {
            id: "TASK_AUDITORIUM",
            roomId: "AUDITORIUM",
            roomName: "GRAND AUDITORIUM",
            title: "STAGE ACOUSTIC MIXER",
            icon: "🎛️",
            desc: "Lock all 4 stage spotlight and microphone frequencies to the green resonance band.",
            x: 1550, y: 1520,
            points: 120,
            type: "ACOUSTIC"
        },
        {
            id: "TASK_SECURITY",
            roomId: "SECURITY",
            roomName: "SECURITY & POWER HUB",
            title: "MAIN BREAKER DIAGNOSTIC",
            icon: "⚡",
            desc: "Flip the 5 high-voltage campus relays into the CLOSED (ON) state to stabilize the grid.",
            x: 2460, y: 1510,
            points: 150,
            type: "BREAKER"
        }
    ];

    const VENTS = [
        { id: "VENT_NW", roomId: "RESIDENTIAL", x: 690, y: 440, links: ["VENT_CENTER", "VENT_SW"] },
        { id: "VENT_NE", roomId: "SCIENCELAB", x: 2100, y: 440, links: ["VENT_CENTER", "VENT_SE"] },
        { id: "VENT_CENTER", roomId: "CAFETERIA", x: 1620, y: 1010, links: ["VENT_NW", "VENT_NE", "VENT_SW", "VENT_SE"] },
        { id: "VENT_SW", roomId: "COURTYARD", x: 690, y: 1350, links: ["VENT_NW", "VENT_CENTER"] },
        { id: "VENT_SE", roomId: "SECURITY", x: 2100, y: 1350, links: ["VENT_NE", "VENT_CENTER"] }
    ];

    const CLUE_LOCATIONS = [
        { id: "CLUE_1", roomId: "LIBRARY", x: 1220, y: 430, text: "Dropped ID lanyard near the rare books shelf" },
        { id: "CLUE_2", roomId: "SCIENCELAB", x: 2260, y: 430, text: "Tampered chemical cabinet access log" },
        { id: "CLUE_3", roomId: "HEALTHCENTER", x: 620, y: 980, text: "Muddy footprints leading toward the corridor" },
        { id: "CLUE_4", roomId: "COMPUTERLAB", x: 2240, y: 990, text: "Unauthorized USB key left in Server Rack B" },
        { id: "CLUE_5", roomId: "AUDITORIUM", x: 1220, y: 1550, text: "Encrypted walkie-talkie frequency note" }
    ];

    const EMERGENCY_TABLE = {
        x: 1400,
        y: 900,
        radius: 64,
        roomId: "CAFETERIA"
    };

    const CCTV_TERMINAL = {
        x: 2220,
        y: 1540,
        radius: 56,
        roomId: "SECURITY"
    };

    const SABOTAGE_TERMINAL = {
        x: 2330,
        y: 1380,
        radius: 58,
        roomId: "SECURITY"
    };

    const WEATHER_TYPES = [
        { id: "CLEAR", label: "✨ CLEAR NIGHT", lightLabel: "☀️ SUNNY DAY" },
        { id: "CLOUDY", label: "☁️ CLOUDY", lightLabel: "⛅ BREEZY" },
        { id: "MONSOON", label: "🌧️ MONSOON RAIN", lightLabel: "🌦️ CHITTAGONG RAIN" }
    ];

    // ======================================================================
    // 2. SINGLE AUTHORITATIVE GAME STATE
    // ======================================================================
    const state = {
        screen: "SECURITY_ALERT", // SECURITY_ALERT | SETUP | PLAYING | MEETING | GAMEOVER
        theme: "dark",
        playMode: "OFFLINE",
        roomCode: "AUW-2026",

        // Player Setup Profile
        selectedCountry: COUNTRIES[0],
        selectedColor: CHAR_COLORS[0],
        selectedAccessory: CHAR_ACCESSORIES[0],
        selectedRole: "CREWMATE",
        previewAnim: "idle",
        previewTick: 0,

        // Audio
        soundEnabled: true,
        musicEnabled: false,
        audioCtx: null,
        musicTimer: null,

        // Active Match State
        running: false,
        lastFrameTime: 0,
        elapsedTime: 0,
        weatherIndex: 1,
        weatherTimer: 0,
        checklistCollapsed: false,

        // Entities
        player: null,
        bots: [],
        allCharacters: [],
        tasks: [],
        clues: [],
        deadBodies: [],
        particles: [],

        // Impostor & Sabotage Mechanics
        killCooldown: 0,
        sabotageCooldown: 0,
        disguiseCooldown: 0,
        disguiseTimer: 0,
        sabotageActive: false,
        sabotageTimer: 0,

        // Camera & Input
        camera: { x: 0, y: 0 },
        keys: { up: false, down: false, left: false, right: false },
        nearbyInteractable: null,
        activeTaskModalId: null,
        activeCctvRoomIndex: 4, // Default Cafeteria

        // Meeting & Voting State
        meetingType: "EMERGENCY",
        meetingCaller: null,
        meetingBodyVictim: null,
        meetingTimeLeft: 20,
        meetingInterval: null,
        playerVoteCast: null,
        votes: {},
        meetingResolved: false,

        // Score & Progression
        score: 0,
        cluesFound: 0,
        meetingsCalled: 0,
        impostorKills: 0,
        wireSelectedLeft: null,
        memoryState: null
    };

    // ======================================================================
    // 3. WEB AUDIO SYNTHESIZER (100% OFFLINE RETRO ARCADE SFX & AMBIENCE)
    // ======================================================================
    function getAudioContext() {
        if (!state.audioCtx) {
            const AudioContextClass = window.AudioContext || window.webkitAudioContext;
            if (AudioContextClass) {
                state.audioCtx = new AudioContextClass();
            }
        }
        if (state.audioCtx && state.audioCtx.state === "suspended") {
            state.audioCtx.resume().catch(() => {});
        }
        return state.audioCtx;
    }

    function playTone(freq, duration = 0.12, type = "square", volume = 0.08, slideTo = null) {
        if (!state.soundEnabled) return;
        const ctx = getAudioContext();
        if (!ctx) return;

        try {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = type;
            osc.frequency.setValueAtTime(freq, ctx.currentTime);
            if (slideTo !== null) {
                osc.frequency.linearRampToValueAtTime(slideTo, ctx.currentTime + duration);
            }
            gain.gain.setValueAtTime(volume, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start();
            osc.stop(ctx.currentTime + duration);
        } catch (_) {}
    }

    function playSfx(effect) {
        if (!state.soundEnabled) return;
        switch (effect) {
            case "click":
                playTone(580, 0.06, "square", 0.06, 740);
                break;
            case "alert":
                playTone(620, 0.18, "sawtooth", 0.1, 880);
                setTimeout(() => playTone(880, 0.22, "sawtooth", 0.1, 520), 190);
                break;
            case "taskDone":
                playTone(523.25, 0.1, "square", 0.08);
                setTimeout(() => playTone(659.25, 0.1, "square", 0.08), 100);
                setTimeout(() => playTone(783.99, 0.18, "square", 0.09), 200);
                setTimeout(() => playTone(1046.5, 0.25, "triangle", 0.1), 310);
                break;
            case "error":
                playTone(220, 0.16, "sawtooth", 0.09, 150);
                break;
            case "kill":
                playTone(190, 0.25, "sawtooth", 0.14, 75);
                setTimeout(() => playTone(120, 0.2, "square", 0.12, 55), 120);
                break;
            case "vent":
                playTone(310, 0.14, "triangle", 0.09, 180);
                break;
            case "report":
                playTone(740, 0.15, "square", 0.11);
                setTimeout(() => playTone(740, 0.15, "square", 0.11), 160);
                setTimeout(() => playTone(987, 0.35, "square", 0.12), 320);
                break;
            case "sabotage":
                playTone(280, 0.3, "sawtooth", 0.1, 140);
                break;
            case "win":
                [523, 659, 784, 1046].forEach((n, idx) => {
                    setTimeout(() => playTone(n, 0.18, "square", 0.09), idx * 130);
                });
                break;
            case "lose":
                [392, 349, 311, 261].forEach((n, idx) => {
                    setTimeout(() => playTone(n, 0.22, "sawtooth", 0.09), idx * 160);
                });
                break;
        }
    }

    function updateAmbienceMusic() {
        if (state.musicTimer) {
            clearInterval(state.musicTimer);
            state.musicTimer = null;
        }
        if (!state.musicEnabled) return;

        const notes = [146.83, 164.81, 174.61, 196.00, 164.81, 146.83, 130.81, 146.83];
        let step = 0;
        state.musicTimer = setInterval(() => {
            if (!state.musicEnabled || state.screen !== "PLAYING") return;
            const freq = state.sabotageActive ? notes[step % notes.length] * 1.25 : notes[step % notes.length];
            playTone(freq, 0.32, "triangle", 0.03);
            step++;
        }, 480);
    }

    // ======================================================================
    // 4. DOM HELPERS & UI INITIALIZATION
    // ======================================================================
    const $ = (id) => document.getElementById(id);

    function showAnnouncement(message, duration = 4200) {
        const bar = $("pa-announcement-bar");
        const text = $("pa-announcement-text");
        if (!bar || !text) return;
        text.textContent = message;
        bar.classList.remove("hidden");
        clearTimeout(showAnnouncement._timer);
        showAnnouncement._timer = setTimeout(() => {
            bar.classList.add("hidden");
        }, duration);
    }

    function showTaskCompletedToast(subtitle) {
        const toast = $("toast-task-done");
        const sub = $("toast-task-sub");
        if (!toast || !sub) return;
        sub.textContent = subtitle;
        toast.classList.remove("hidden");
        clearTimeout(showTaskCompletedToast._timer);
        showTaskCompletedToast._timer = setTimeout(() => {
            toast.classList.add("hidden");
        }, 3000);
    }

    function triggerBodyDiscoveryBanner(victimName) {
        const overlay = $("body-discovery-overlay");
        const sub = $("body-discovery-sub");
        if (!overlay || !sub) return;
        sub.textContent = `${victimName} was found unconscious! Press R or REPORT immediately!`;
        overlay.classList.remove("hidden");
        clearTimeout(triggerBodyDiscoveryBanner._timer);
        triggerBodyDiscoveryBanner._timer = setTimeout(() => {
            overlay.classList.add("hidden");
        }, 2200);
    }

    // ======================================================================
    // 5. SETUP SCREEN: COUNTRY, CUSTOMIZER & ROLE SELECTION
    // ======================================================================
    function renderCountryGrid() {
        const grid = $("country-grid");
        if (!grid) return;
        grid.innerHTML = "";

        COUNTRIES.forEach((c) => {
            const active = state.selectedCountry.id === c.id;
            const btn = document.createElement("button");
            btn.type = "button";
            btn.className = `p-2 rounded-xl border-2 text-left transition flex items-center gap-2 cursor-pointer ${
                active
                    ? "border-cyan-400 bg-cyan-950/70 scale-105"
                    : "border-slate-700 bg-slate-900/80 hover:border-cyan-400"
            }`;
            btn.innerHTML = `
                <span class="text-lg shrink-0">${c.flag}</span>
                <span class="text-xs font-bold text-white truncate">${c.name}</span>
            `;
            btn.addEventListener("click", () => {
                playSfx("click");
                state.selectedCountry = c;
                updateSetupBadges();
                renderCountryGrid();
            });
            grid.appendChild(btn);
        });
    }

    function renderCustomizerGrids() {
        const colorGrid = $("char-color-grid");
        const accGrid = $("char-acc-grid");
        if (colorGrid) {
            colorGrid.innerHTML = "";
            CHAR_COLORS.forEach((col) => {
                const active = state.selectedColor.id === col.id;
                const btn = document.createElement("button");
                btn.type = "button";
                btn.title = col.name;
                btn.className = `w-7 h-7 rounded-lg border-2 transition cursor-pointer ${
                    active ? "border-white scale-110" : "border-slate-700 opacity-80"
                }`;
                btn.style.backgroundColor = col.hex;
                btn.addEventListener("click", () => {
                    playSfx("click");
                    state.selectedColor = col;
                    updateSetupBadges();
                    renderCustomizerGrids();
                });
                colorGrid.appendChild(btn);
            });
        }

        if (accGrid) {
            accGrid.innerHTML = "";
            CHAR_ACCESSORIES.forEach((acc) => {
                const active = state.selectedAccessory.id === acc.id;
                const btn = document.createElement("button");
                btn.type = "button";
                btn.className = `px-2.5 py-1 rounded-lg border text-xs font-bold transition cursor-pointer flex items-center gap-1 ${
                    active
                        ? "border-amber-400 bg-amber-950/60 text-amber-200"
                        : "border-slate-700 bg-slate-900 text-slate-300 hover:border-cyan-400"
                }`;
                btn.innerHTML = `<span>${acc.icon}</span><span>${acc.name}</span>`;
                btn.addEventListener("click", () => {
                    playSfx("click");
                    state.selectedAccessory = acc;
                    updateSetupBadges();
                    renderCustomizerGrids();
                });
                accGrid.appendChild(btn);
            });
        }
    }

    function updateSetupBadges() {
        const countryBadge = $("selected-country-badge");
        const charBadge = $("selected-char-badge");
        const startBtnCountry = $("start-btn-country");

        if (countryBadge) {
            countryBadge.textContent = `${state.selectedCountry.flag} ${state.selectedCountry.name}`;
        }
        if (charBadge) {
            charBadge.textContent = `${state.selectedColor.name} • ${state.selectedAccessory.name}`;
        }
        if (startBtnCountry) {
            startBtnCountry.textContent = `${state.selectedCountry.flag} ${state.selectedCountry.name.toUpperCase()}`;
        }
    }

    function acknowledgeSecurityAlert() {
        playSfx("alert");
        const alertModal = $("modal-security-alert");
        const roleModal = $("modal-role-select");
        if (alertModal) alertModal.classList.add("hidden");
        if (roleModal) roleModal.classList.remove("hidden");
        state.screen = "SETUP";
        renderCountryGrid();
        renderCustomizerGrids();
        updateSetupBadges();
    }

    function setPreviewAnim(anim) {
        playSfx("click");
        state.previewAnim = anim;
    }

    function selectRole(role) {
        playSfx("click");
        state.selectedRole = role === "IMPOSTOR" ? "IMPOSTOR" : "CREWMATE";
        const btnCrew = $("btn-pick-crewmate");
        const btnImp = $("btn-pick-impostor");
        if (btnCrew && btnImp) {
            if (state.selectedRole === "CREWMATE") {
                btnCrew.className = "p-3 rounded-2xl border-4 border-cyan-400 bg-cyan-950/70 text-center transition cursor-pointer";
                btnImp.className = "p-3 rounded-2xl border-4 border-slate-700 bg-slate-950/70 text-center transition cursor-pointer";
            } else {
                btnCrew.className = "p-3 rounded-2xl border-4 border-slate-700 bg-slate-950/70 text-center transition cursor-pointer";
                btnImp.className = "p-3 rounded-2xl border-4 border-red-500 bg-red-950/70 text-center transition cursor-pointer";
            }
        }
    }

    function selectPlayMode(mode) {
        playSfx("click");
        state.playMode = mode === "ONLINE" ? "ONLINE" : "OFFLINE";
        const pill = $("network-status-pill");
        const badge = $("hud-connection-badge");
        if (pill) {
            pill.textContent = state.playMode === "ONLINE" ? "🌐 LOCAL LOBBY READY" : "📴 OFFLINE SOLO READY";
        }
        if (badge) {
            badge.textContent = state.playMode === "ONLINE" ? `🌐 ${state.roomCode}` : "📴 OFFLINE";
        }
    }

    function generateRoomCode() {
        playSfx("click");
        const code = "AUW-" + Math.floor(1000 + Math.random() * 9000);
        state.roomCode = code;
        const input = $("online-room-code");
        if (input) input.value = code;
    }

    function downloadOfflineGame() {
        playSfx("click");
        const htmlContent = document.documentElement.outerHTML;
        const blob = new Blob([htmlContent], { type: "text/html;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "AUW_Campus_Among_Us_Snapshot.html";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    // ======================================================================
    // 6. CHIBI PIXEL CHARACTER DRAWING ENGINE (PREVIEW & MAIN CANVAS)
    // ======================================================================
    function drawChibiCharacter(ctx, char, x, y, scale = 1, animState = "idle", tick = 0) {
        ctx.save();
        ctx.translate(x, y);
        ctx.scale(scale, scale);

        const isMoving = animState === "walk";
        const isCelebrating = animState === "celebrate";
        const bob = isMoving
            ? Math.sin(tick * 0.25) * 3
            : isCelebrating
            ? -Math.abs(Math.sin(tick * 0.35)) * 6
            : Math.sin(tick * 0.08) * 1.5;

        const displayColor = char.disguisedAs ? char.disguisedAs.color : char.color;
        const displayAcc = char.disguisedAs ? char.disguisedAs.accessory : char.accessory;

        // Ground shadow
        ctx.fillStyle = "rgba(22, 23, 26, 0.45)";
        ctx.beginPath();
        ctx.ellipse(0, 22, 16, 6, 0, 0, Math.PI * 2);
        ctx.fill();

        // Legs
        const leftLegOffset = isMoving ? Math.sin(tick * 0.25) * 5 : 0;
        const rightLegOffset = isMoving ? -Math.sin(tick * 0.25) * 5 : 0;

        ctx.fillStyle = PALETTE.ink;
        ctx.fillRect(-10, 10 + leftLegOffset, 8, 11);
        ctx.fillRect(2, 10 + rightLegOffset, 8, 11);

        ctx.fillStyle = displayColor.trim;
        ctx.fillRect(-9, 10 + leftLegOffset, 6, 9);
        ctx.fillRect(3, 10 + rightLegOffset, 6, 9);

        // Backpack
        ctx.fillStyle = PALETTE.ink;
        ctx.fillRect(-18, -10 + bob, 6, 20);
        ctx.fillStyle = displayColor.trim;
        ctx.fillRect(-17, -8 + bob, 4, 16);

        // Main Suit Body (Pixelated Crewmate / Student Chibi)
        ctx.fillStyle = PALETTE.ink;
        ctx.fillRect(-14, -18 + bob, 28, 30);

        ctx.fillStyle = displayColor.hex;
        ctx.fillRect(-12, -16 + bob, 24, 26);

        // Lower shading
        ctx.fillStyle = displayColor.trim;
        ctx.fillRect(-12, 2 + bob, 24, 8);

        // AUW Sash / Badge
        ctx.fillStyle = PALETTE.yellow;
        ctx.fillRect(-4, -1 + bob, 8, 4);

        // Visor / Cute Eyes
        ctx.fillStyle = PALETTE.ink;
        ctx.fillRect(-8, -12 + bob, 18, 10);

        ctx.fillStyle = PALETTE.sky;
        ctx.fillRect(-6, -10 + bob, 14, 6);

        // Visor Glint
        ctx.fillStyle = PALETTE.paper;
        ctx.fillRect(-4, -9 + bob, 5, 2);

        // Accessory
        const accId = displayAcc ? displayAcc.id : "headphones";
        if (accId === "headphones") {
            ctx.fillStyle = PALETTE.ink;
            ctx.fillRect(-15, -20 + bob, 30, 4);
            ctx.fillStyle = PALETTE.pink;
            ctx.fillRect(-16, -14 + bob, 4, 10);
            ctx.fillRect(12, -14 + bob, 4, 10);
        } else if (accId === "cap") {
            ctx.fillStyle = PALETTE.navy;
            ctx.fillRect(-16, -22 + bob, 32, 4);
            ctx.fillRect(-10, -26 + bob, 20, 4);
            ctx.fillStyle = PALETTE.yellow;
            ctx.fillRect(10, -20 + bob, 3, 7);
        } else if (accId === "crown") {
            ctx.fillStyle = PALETTE.yellow;
            ctx.fillRect(-10, -25 + bob, 20, 7);
            ctx.fillStyle = PALETTE.rust;
            ctx.fillRect(-2, -23 + bob, 4, 3);
        } else if (accId === "glasses") {
            ctx.fillStyle = PALETTE.yellow;
            ctx.fillRect(-9, -11 + bob, 19, 3);
        } else if (accId === "bow") {
            ctx.fillStyle = PALETTE.pink;
            ctx.fillRect(-8, -23 + bob, 16, 5);
            ctx.fillStyle = PALETTE.paper;
            ctx.fillRect(-2, -23 + bob, 4, 5);
        } else if (accId === "flower") {
            ctx.fillStyle = PALETTE.orange;
            ctx.fillRect(6, -23 + bob, 8, 7);
            ctx.fillStyle = PALETTE.yellow;
            ctx.fillRect(8, -21 + bob, 4, 3);
        }

        ctx.restore();
    }

    function updatePreviewCanvas() {
        const canvas = $("preview-character");
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        state.previewTick++;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Retro grid backdrop
        ctx.fillStyle = "#16171a";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = "#234975";
        ctx.lineWidth = 1;
        for (let gx = 0; gx < canvas.width; gx += 14) {
            ctx.beginPath();
            ctx.moveTo(gx, 0);
            ctx.lineTo(gx, canvas.height);
            ctx.stroke();
        }
        for (let gy = 0; gy < canvas.height; gy += 14) {
            ctx.beginPath();
            ctx.moveTo(0, gy);
            ctx.lineTo(canvas.width, gy);
            ctx.stroke();
        }

        drawChibiCharacter(
            ctx,
            {
                color: state.selectedColor,
                accessory: state.selectedAccessory
            },
            canvas.width / 2,
            canvas.height / 2 + 8,
            1.35,
            state.previewAnim,
            state.previewTick
        );
    }

    // ======================================================================
    // 7. GAME INITIALIZATION & ENTITY CREATION
    // ======================================================================
    function initGame() {
        playSfx("click");
        const roleModal = $("modal-role-select");
        const gameOverModal = $("modal-gameover");
        const meetingModal = $("modal-meeting");
        if (roleModal) roleModal.classList.add("hidden");
        if (gameOverModal) gameOverModal.classList.add("hidden");
        if (meetingModal) meetingModal.classList.add("hidden");

        state.screen = "PLAYING";
        state.running = true;
        state.elapsedTime = 0;
        state.score = 0;
        state.cluesFound = 0;
        state.meetingsCalled = 0;
        state.impostorKills = 0;

        state.killCooldown = state.selectedRole === "IMPOSTOR" ? 10 : 0;
        state.sabotageCooldown = 0;
        state.disguiseCooldown = 0;
        state.disguiseTimer = 0;
        state.sabotageActive = false;
        state.sabotageTimer = 0;
        state.deadBodies = [];
        state.particles = [];

        // Initialize 9 Missions
        state.tasks = TASKS_CONFIG.map((t) => ({
            ...t,
            completed: false
        }));

        // Initialize 5 Campus Mystery Clues
        state.clues = CLUE_LOCATIONS.map((c) => ({
            ...c,
            collected: false
        }));

        // Create Player in Cafeteria
        state.player = {
            id: "PLAYER",
            isPlayer: true,
            country: state.selectedCountry,
            name: state.selectedCountry.name,
            flag: state.selectedCountry.flag,
            color: state.selectedColor,
            accessory: state.selectedAccessory,
            role: state.selectedRole,
            x: 1400,
            y: 990,
            vx: 0,
            vy: 0,
            speed: 235,
            alive: true,
            inVent: false,
            currentVentId: null,
            disguisedAs: null,
            animTick: 0
        };

        // Create 9 AI Student Bots from the remaining 9 AUW Countries
        const remainingCountries = COUNTRIES.filter((c) => c.id !== state.selectedCountry.id);
        const botImpostorIndex = state.selectedRole === "CREWMATE"
            ? Math.floor(Math.random() * remainingCountries.length)
            : -1;

        state.bots = remainingCountries.map((country, idx) => {
            const room = ROOMS[idx % ROOMS.length];
            const color = CHAR_COLORS[(idx + 1) % CHAR_COLORS.length];
            const acc = CHAR_ACCESSORIES[(idx + 1) % CHAR_ACCESSORIES.length];
            return {
                id: `BOT_${country.id}`,
                isPlayer: false,
                country,
                name: country.name,
                flag: country.flag,
                color,
                accessory: acc,
                role: idx === botImpostorIndex ? "IMPOSTOR" : "CREWMATE",
                x: room.x + room.w / 2 + (Math.random() * 120 - 60),
                y: room.y + room.h / 2 + (Math.random() * 80 - 40),
                vx: 0,
                vy: 0,
                speed: 155 + (idx % 3) * 12,
                alive: true,
                targetX: room.x + room.w / 2,
                targetY: room.y + room.h / 2,
                waitTimer: 1 + Math.random() * 2,
                killTimer: 16 + Math.random() * 8,
                animTick: Math.floor(Math.random() * 100)
            };
        });

        state.allCharacters = [state.player, ...state.bots];

        // Configure HUD & Role Buttons
        updateHudProfileAndTasks();
        configureRoleActionButtons();
        buildMapQuickNav();
        buildCctvTabs();
        resizeMainCanvas();

        showAnnouncement(
            state.selectedRole === "IMPOSTOR"
                ? `🕵️‍♀️ IMPOSTOR MODE: Sabotage AUW Campus or eliminate students without being caught!`
                : `🎓 CREWMATE MODE: Complete all 9 AUW Campus Missions and watch out for the Intruder!`
        );
    }

    function configureRoleActionButtons() {
        const isImp = state.player && state.player.role === "IMPOSTOR";
        const btnKill = $("btn-kill");
        const btnVent = $("btn-vent");
        const btnSabotage = $("btn-sabotage");
        const btnDisguise = $("btn-disguise");

        if (btnKill) btnKill.classList.toggle("hidden", !isImp);
        if (btnVent) btnVent.classList.toggle("hidden", !isImp);
        if (btnSabotage) btnSabotage.classList.toggle("hidden", !isImp);
        if (btnDisguise) btnDisguise.classList.toggle("hidden", !isImp);
    }

    function updateHudProfileAndTasks() {
        if (!state.player) return;

        const profileEl = $("hud-player-profile");
        const roleEl = $("hud-role-label");
        const countEl = $("hud-task-count");
        const barEl = $("hud-task-bar");
        const listEl = $("hud-task-list");

        if (profileEl) {
            const disguiseNote = state.player.disguisedAs
                ? ` (🎭 ${state.player.disguisedAs.flag})`
                : "";
            profileEl.textContent = `${state.player.flag} ${state.player.name}${disguiseNote}`;
        }

        if (roleEl) {
            roleEl.textContent = state.player.role;
            roleEl.className = state.player.role === "IMPOSTOR"
                ? "text-red-400 shrink-0"
                : "text-cyan-400 shrink-0";
        }

        const completedCount = state.tasks.filter((t) => t.completed).length;
        const totalCount = state.tasks.length;
        const pct = Math.round((completedCount / totalCount) * 100);

        if (countEl) {
            countEl.textContent = `${completedCount}/${totalCount} • ${state.score} PTS`;
        }
        if (barEl) {
            barEl.style.width = `${pct}%`;
        }

        if (listEl) {
            listEl.innerHTML = "";
            state.tasks.forEach((task) => {
                const item = document.createElement("div");
                item.className = `flex items-center justify-between gap-1 px-2 py-1 rounded border cursor-pointer transition ${
                    task.completed
                        ? "bg-emerald-950/50 border-emerald-500/60 text-emerald-300 line-through"
                        : "bg-slate-950/70 border-slate-800 text-slate-200 hover:border-cyan-400"
                }`;
                item.innerHTML = `
                    <span class="truncate">${task.icon} ${task.roomName}: ${task.title}</span>
                    <span class="font-mono-code text-[10px] shrink-0">${task.completed ? "DONE" : `+${task.points}`}</span>
                `;
                item.addEventListener("click", () => {
                    // Quick-focus camera hint or open task if nearby
                    if (!task.completed && state.nearbyInteractable && state.nearbyInteractable.task && state.nearbyInteractable.task.id === task.id) {
                        openTaskModal(task);
                    } else {
                        showAnnouncement(`📍 Mission Location: ${task.roomName} — ${task.title}`, 2600);
                    }
                });
                listEl.appendChild(item);
            });
        }
    }

    function toggleChecklist() {
        playSfx("click");
        state.checklistCollapsed = !state.checklistCollapsed;
        const listEl = $("hud-task-list");
        const btn = $("btn-toggle-list");
        if (listEl) listEl.classList.toggle("hidden", state.checklistCollapsed);
        if (btn) btn.textContent = state.checklistCollapsed ? "◀" : "▼";
    }

    // ======================================================================
    // 8. CAMPUS GEOMETRY, COLLISION DETECTION & ROOM LOOKUP
    // ======================================================================
    function isPointWalkable(px, py) {
        const pad = 16;
        // Check Corridors FIRST so doorways between rooms and corridors are 100% passable
        for (let i = 0; i < CORRIDORS.length; i++) {
            const c = CORRIDORS[i];
            if (px >= c.x && px <= c.x + c.w && py >= c.y + pad && py <= c.y + c.h - pad) {
                return true;
            }
            if (py >= c.y && py <= c.y + c.h && px >= c.x + pad && px <= c.x + c.w - pad) {
                return true;
            }
        }
        // Check Rooms
        for (let i = 0; i < ROOMS.length; i++) {
            const r = ROOMS[i];
            if (px >= r.x + pad && px <= r.x + r.w - pad && py >= r.y + pad && py <= r.y + r.h - pad) {
                return true;
            }
        }
        return false;
    }

    function getRoomAt(px, py) {
        for (let i = 0; i < ROOMS.length; i++) {
            const r = ROOMS[i];
            if (px >= r.x && px <= r.x + r.w && py >= r.y && py <= r.y + r.h) {
                return r;
            }
        }
        return null;
    }

    function moveEntityWithCollision(entity, dx, dy) {
        if (dx !== 0 && isPointWalkable(entity.x + dx, entity.y)) {
            entity.x += dx;
        }
        if (dy !== 0 && isPointWalkable(entity.x, entity.y + dy)) {
            entity.y += dy;
        }
    }

    function dist(x1, y1, x2, y2) {
        return Math.hypot(x2 - x1, y2 - y1);
    }

    // ======================================================================
    // 9. PLAYER & AI NPC SIMULATION LOOP
    // ======================================================================
    function updateGame(dt) {
        if (!state.running || state.screen !== "PLAYING" || !state.player) return;

        state.elapsedTime += dt;
        state.weatherTimer += dt;
        if (state.weatherTimer > 35) {
            state.weatherTimer = 0;
            state.weatherIndex = (state.weatherIndex + 1) % WEATHER_TYPES.length;
            updateWeatherBadge();
        }

        // Update Cooldowns
        if (state.killCooldown > 0) state.killCooldown = Math.max(0, state.killCooldown - dt);
        if (state.sabotageCooldown > 0) state.sabotageCooldown = Math.max(0, state.sabotageCooldown - dt);
        if (state.disguiseCooldown > 0) state.disguiseCooldown = Math.max(0, state.disguiseCooldown - dt);

        if (state.disguiseTimer > 0) {
            state.disguiseTimer = Math.max(0, state.disguiseTimer - dt);
            if (state.disguiseTimer === 0 && state.player) {
                state.player.disguisedAs = null;
                updateHudProfileAndTasks();
                showAnnouncement("🎭 Your Impostor disguise has worn off!", 2500);
            }
        }

        if (state.sabotageActive) {
            state.sabotageTimer = Math.max(0, state.sabotageTimer - dt);
            if (state.sabotageTimer === 0) {
                state.sabotageActive = false;
                showAnnouncement("💡 Backup generators restored campus lighting automatically.", 3000);
            }
        }

        // Player Movement (when not inside a task modal or vent)
        if (!state.player.inVent && !state.activeTaskModalId) {
            let mvX = 0;
            let mvY = 0;
            if (state.keys.up) mvY -= 1;
            if (state.keys.down) mvY += 1;
            if (state.keys.left) mvX -= 1;
            if (state.keys.right) mvX += 1;

            if (mvX !== 0 || mvY !== 0) {
                const len = Math.hypot(mvX, mvY);
                mvX /= len;
                mvY /= len;
                moveEntityWithCollision(state.player, mvX * state.player.speed * dt, mvY * state.player.speed * dt);
                state.player.vx = mvX;
                state.player.vy = mvY;
                state.player.animTick += dt * 45;
            } else {
                state.player.vx = 0;
                state.player.vy = 0;
                state.player.animTick += dt * 20;
            }
        }

        // Update AI Student Bots
        updateBots(dt);

        // Check Clues Collection
        state.clues.forEach((clue) => {
            if (!clue.collected && dist(state.player.x, state.player.y, clue.x, clue.y) < 48) {
                clue.collected = true;
                state.cluesFound++;
                state.score += 75;
                playSfx("taskDone");
                showTaskCompletedToast(`🔍 Clue Found (+75 PTS): ${clue.text}`);
                updateHudProfileAndTasks();
            }
        });

        // Update Current Room HUD & Nearby Interactables
        const currentRoom = getRoomAt(state.player.x, state.player.y);
        const roomNameText = currentRoom ? currentRoom.short : "CORRIDOR";
        const hudRoom = $("hud-room-name");
        const miniRoom = $("minimap-room-tag");
        const fullMapLabel = $("fullmap-loc-label");
        if (hudRoom) hudRoom.textContent = roomNameText;
        if (miniRoom) miniRoom.textContent = roomNameText;
        if (fullMapLabel) fullMapLabel.textContent = currentRoom ? currentRoom.name : "Campus Corridor";

        evaluateProximityInteractions();
    }

    function updateBots(dt) {
        state.bots.forEach((bot) => {
            if (!bot.alive) return;
            bot.animTick += dt * 35;

            if (bot.waitTimer > 0) {
                bot.waitTimer -= dt;
                bot.vx = 0;
                bot.vy = 0;
                if (bot.waitTimer <= 0) {
                    // Pick a new destination room or corridor waypoint
                    const targetRoom = ROOMS[Math.floor(Math.random() * ROOMS.length)];
                    bot.targetX = targetRoom.x + 120 + Math.random() * (targetRoom.w - 240);
                    bot.targetY = targetRoom.y + 110 + Math.random() * (targetRoom.h - 220);
                }
                return;
            }

            const d = dist(bot.x, bot.y, bot.targetX, bot.targetY);
            if (d < 28) {
                bot.waitTimer = 1.8 + Math.random() * 3.2;
                // Crewmate bots occasionally help complete tasks if player is Impostor
                if (bot.role === "CREWMATE" && state.player.role === "IMPOSTOR" && Math.random() < 0.24) {
                    const incomplete = state.tasks.filter((t) => !t.completed);
                    if (incomplete.length > 0) {
                        const randomTask = incomplete[Math.floor(Math.random() * incomplete.length)];
                        randomTask.completed = true;
                        updateHudProfileAndTasks();
                        checkWinConditions();
                    }
                }
            } else {
                // Pathfind smoothly via central corridors if in different room
                let waypointX = bot.targetX;
                let waypointY = bot.targetY;
                const botRoom = getRoomAt(bot.x, bot.y);
                const destRoom = getRoomAt(bot.targetX, bot.targetY);

                if (botRoom && destRoom && botRoom.id !== destRoom.id) {
                    // Guide toward room center axes (x: 480, 1400, 2320 | y: 330, 900, 1470)
                    const rowY = Math.abs(bot.y - 330) < 220 ? 330 : Math.abs(bot.y - 900) < 220 ? 900 : 1470;
                    const colX = Math.abs(bot.x - 480) < 350 ? 480 : Math.abs(bot.x - 1400) < 350 ? 1400 : 2320;
                    if (Math.abs(bot.y - rowY) > 45 && Math.abs(bot.x - colX) > 45) {
                        waypointX = colX;
                        waypointY = rowY;
                    } else if (Math.abs(bot.x - destRoom.x - destRoom.w / 2) > 250) {
                        waypointY = rowY;
                    } else {
                        waypointX = colX;
                    }
                }

                const angle = Math.atan2(waypointY - bot.y, waypointX - bot.x);
                const stepX = Math.cos(angle) * bot.speed * dt;
                const stepY = Math.sin(angle) * bot.speed * dt;
                const prevX = bot.x;
                const prevY = bot.y;

                moveEntityWithCollision(bot, stepX, stepY);
                bot.vx = Math.cos(angle);
                bot.vy = Math.sin(angle);

                // Unstick if blocked by wall corner
                if (Math.hypot(bot.x - prevX, bot.y - prevY) < 0.3) {
                    bot.targetX = 1400;
                    bot.targetY = 900;
                }
            }

            // AI Impostor logic (when Player is Crewmate)
            if (bot.role === "IMPOSTOR" && state.player.role === "CREWMATE") {
                bot.killTimer -= dt;
                if (bot.killTimer <= 0) {
                    // Look for isolated crewmate bot or player
                    const potentialVictims = state.allCharacters.filter(
                        (c) => c.alive && c.id !== bot.id && dist(bot.x, bot.y, c.x, c.y) < 95
                    );
                    const witnesses = state.allCharacters.filter(
                        (c) => c.alive && c.id !== bot.id && dist(bot.x, bot.y, c.x, c.y) < 260
                    );

                    if (potentialVictims.length === 1 && witnesses.length <= 1) {
                        const victim = potentialVictims[0];
                        bot.killTimer = 22;
                        performElimination(bot, victim);
                    }
                }
            }

            // AI Crewmate Body Discovery
            if (bot.role === "CREWMATE" && state.deadBodies.length > 0) {
                for (let i = 0; i < state.deadBodies.length; i++) {
                    const body = state.deadBodies[i];
                    if (!body.discovered && dist(bot.x, bot.y, body.x, body.y) < 110) {
                        body.discovered = true;
                        triggerBodyDiscoveryBanner(`${body.flag} ${body.name}`);
                    }
                }
            }
        });
    }

    function performElimination(killer, victim) {
        if (!victim.alive) return;
        victim.alive = false;
        playSfx("kill");

        state.deadBodies.push({
            id: victim.id,
            name: victim.name,
            flag: victim.flag,
            color: victim.color,
            x: victim.x,
            y: victim.y,
            roomId: (getRoomAt(victim.x, victim.y) || { short: "CORRIDOR" }).short,
            discovered: false
        });

        // If player was eliminated by AI Impostor
        if (victim.isPlayer) {
            endGame(false, `You were eliminated by the disguised Intruder (${killer.flag} ${killer.name})!`);
            return;
        }

        checkWinConditions();
    }

    // ======================================================================
    // 10. PROXIMITY INTERACTIONS & ACTION BUTTONS (USE, REPORT, KILL, VENT)
    // ======================================================================
    function evaluateProximityInteractions() {
        const p = state.player;
        if (!p || !p.alive) return;

        let nearest = null;
        let minDistance = Infinity;

        // 1. Check Tasks
        state.tasks.forEach((task) => {
            if (task.completed) return;
            const d = dist(p.x, p.y, task.x, task.y);
            if (d < 85 && d < minDistance) {
                minDistance = d;
                nearest = {
                    type: "TASK",
                    icon: task.icon,
                    title: `PRESS E • ${task.title}`,
                    sub: `${task.roomName} Mission (+${task.points} PTS)`,
                    task
                };
            }
        });

        // 2. Check Sabotage Repair Terminal if Lights Sabotaged
        if (state.sabotageActive) {
            const dSab = dist(p.x, p.y, SABOTAGE_TERMINAL.x, SABOTAGE_TERMINAL.y);
            if (dSab < 95 && dSab < minDistance) {
                minDistance = dSab;
                nearest = {
                    type: "REPAIR_LIGHTS",
                    icon: "💡",
                    title: "PRESS E • RESTORE CAMPUS LIGHTS",
                    sub: "Emergency Power Grid Override"
                };
            }
        }

        // 3. Check CCTV Security Terminal
        const dCctv = dist(p.x, p.y, CCTV_TERMINAL.x, CCTV_TERMINAL.y);
        if (dCctv < 85 && dCctv < minDistance) {
            minDistance = dCctv;
            nearest = {
                type: "CCTV",
                icon: "🎥",
                title: "PRESS E • SECURITY CCTV MONITOR",
                sub: "View Live 9-Room Campus Feeds"
            };
        }

        // 4. Check Emergency Meeting Table in Cafeteria
        const dTable = dist(p.x, p.y, EMERGENCY_TABLE.x, EMERGENCY_TABLE.y);
        if (dTable < 92 && dTable < minDistance) {
            minDistance = dTable;
            nearest = {
                type: "EMERGENCY_TABLE",
                icon: "🚨",
                title: "PRESS E • CALL EMERGENCY MEETING",
                sub: "AUW Central Cafeteria Council Table"
            };
        }

        state.nearbyInteractable = nearest;

        // Update Interaction Banner & USE Button
        const banner = $("interaction-banner");
        const iconEl = $("interact-icon");
        const titleEl = $("interact-title");
        const subEl = $("interact-sub");
        const btnUse = $("btn-use");

        if (nearest) {
            if (banner) banner.classList.remove("hidden");
            if (iconEl) iconEl.textContent = nearest.icon;
            if (titleEl) titleEl.textContent = nearest.title;
            if (subEl) subEl.textContent = nearest.sub;
            if (btnUse) btnUse.disabled = false;
        } else {
            if (banner) banner.classList.add("hidden");
            if (btnUse) btnUse.disabled = true;
        }

        // Check Dead Bodies for Report Button
        let nearbyBody = null;
        for (let i = 0; i < state.deadBodies.length; i++) {
            const b = state.deadBodies[i];
            if (dist(p.x, p.y, b.x, b.y) < 115) {
                nearbyBody = b;
                if (!b.discovered) {
                    b.discovered = true;
                    triggerBodyDiscoveryBanner(`${b.flag} ${b.name}`);
                }
                break;
            }
        }

        const btnReport = $("btn-report");
        if (btnReport) {
            btnReport.disabled = !(nearbyBody || dTable < 95);
        }

        // Impostor Controls: Kill, Vent, Sabotage, Disguise
        if (p.role === "IMPOSTOR") {
            const btnKill = $("btn-kill");
            const btnVent = $("btn-vent");
            const btnSabotage = $("btn-sabotage");
            const btnDisguise = $("btn-disguise");

            // Nearest living bot for Kill
            const targetVictim = state.bots.find((b) => b.alive && dist(p.x, p.y, b.x, b.y) < 95);
            if (btnKill) {
                if (state.killCooldown > 0) {
                    btnKill.disabled = true;
                    btnKill.textContent = `🔪 KILL (${Math.ceil(state.killCooldown)}s)`;
                } else {
                    btnKill.disabled = !targetVictim;
                    btnKill.textContent = "🔪 KILL (Q)";
                }
            }

            // Nearest Vent
            const nearVent = VENTS.find((v) => dist(p.x, p.y, v.x, v.y) < 75);
            if (btnVent) {
                btnVent.disabled = !(nearVent || p.inVent);
                btnVent.textContent = p.inVent ? "🕳️ NEXT VENT (V)" : "🕳️ VENT (V)";
            }

            if (btnSabotage) {
                btnSabotage.disabled = state.sabotageActive || state.sabotageCooldown > 0;
                btnSabotage.textContent = state.sabotageActive
                    ? "⚡ BLACKOUT ACTIVE"
                    : state.sabotageCooldown > 0
                    ? `⚡ SABOTAGE (${Math.ceil(state.sabotageCooldown)}s)`
                    : "⚡ SABOTAGE";
            }

            if (btnDisguise) {
                btnDisguise.disabled = state.disguiseCooldown > 0;
                btnDisguise.textContent = state.disguiseTimer > 0
                    ? `🎭 DISGUISED (${Math.ceil(state.disguiseTimer)}s)`
                    : state.disguiseCooldown > 0
                    ? `🎭 DISGUISE (${Math.ceil(state.disguiseCooldown)}s)`
                    : "🎭 DISGUISE (F)";
            }
        }
    }

    function interactWithNearby() {
        if (!state.nearbyInteractable || state.screen !== "PLAYING") return;
        playSfx("click");

        const item = state.nearbyInteractable;
        if (item.type === "TASK") {
            openTaskModal(item.task);
        } else if (item.type === "CCTV") {
            openCctvModal();
        } else if (item.type === "EMERGENCY_TABLE") {
            startEmergencyMeeting("EMERGENCY", state.player, null);
        } else if (item.type === "REPAIR_LIGHTS") {
            state.sabotageActive = false;
            state.sabotageTimer = 0;
            state.score += 100;
            playSfx("taskDone");
            showTaskCompletedToast("💡 Campus Power Restored (+100 PTS)!");
            updateHudProfileAndTasks();
        }
    }

    function attemptKill() {
        const p = state.player;
        if (!p || p.role !== "IMPOSTOR" || state.killCooldown > 0 || state.screen !== "PLAYING") return;

        const victim = state.bots.find((b) => b.alive && dist(p.x, p.y, b.x, b.y) < 95);
        if (!victim) return;

        state.killCooldown = 14;
        state.impostorKills++;
        state.score += 200;
        p.x = victim.x;
        p.y = victim.y;
        performElimination(p, victim);
        updateHudProfileAndTasks();
    }

    function useVent() {
        const p = state.player;
        if (!p || p.role !== "IMPOSTOR" || state.screen !== "PLAYING") return;

        if (!p.inVent) {
            const nearVent = VENTS.find((v) => dist(p.x, p.y, v.x, v.y) < 75);
            if (!nearVent) return;
            playSfx("vent");
            p.inVent = true;
            p.currentVentId = nearVent.id;
            p.x = nearVent.x;
            p.y = nearVent.y;
            showAnnouncement("🕳️ Inside Campus Vent Network! Press V to cycle vents or move to exit.", 2800);
        } else {
            // Cycle to next linked vent
            const currentVent = VENTS.find((v) => v.id === p.currentVentId) || VENTS[0];
            const nextVentId = currentVent.links[Math.floor(Math.random() * currentVent.links.length)];
            const nextVent = VENTS.find((v) => v.id === nextVentId) || VENTS[0];
            playSfx("vent");
            p.currentVentId = nextVent.id;
            p.x = nextVent.x;
            p.y = nextVent.y;
            p.inVent = false;
        }
    }

    function triggerSabotage() {
        const p = state.player;
        if (!p || p.role !== "IMPOSTOR" || state.sabotageActive || state.sabotageCooldown > 0) return;

        playSfx("sabotage");
        state.sabotageActive = true;
        state.sabotageTimer = 30;
        state.sabotageCooldown = 40;
        showAnnouncement("⚡ CAMPUS BLACKOUT SABOTAGE! Visibility reduced — repair at Security Hub!", 4000);
    }

    function activateImpostorDisguise() {
        const p = state.player;
        if (!p || p.role !== "IMPOSTOR" || state.disguiseCooldown > 0) return;

        const livingBots = state.bots.filter((b) => b.alive);
        if (livingBots.length === 0) return;

        const sample = livingBots[Math.floor(Math.random() * livingBots.length)];
        playSfx("vent");
        p.disguisedAs = {
            name: sample.name,
            flag: sample.flag,
            color: sample.color,
            accessory: sample.accessory
        };
        state.disguiseTimer = 12;
        state.disguiseCooldown = 25;
        updateHudProfileAndTasks();
        showAnnouncement(`🎭 Disguised as ${sample.flag} ${sample.name} for 12 seconds!`, 3000);
    }

    function reportBodyOrEmergency() {
        const p = state.player;
        if (!p || state.screen !== "PLAYING") return;

        const nearbyBody = state.deadBodies.find((b) => dist(p.x, p.y, b.x, b.y) < 115);
        if (nearbyBody) {
            startEmergencyMeeting("BODY", p, nearbyBody);
            return;
        }

        const dTable = dist(p.x, p.y, EMERGENCY_TABLE.x, EMERGENCY_TABLE.y);
        if (dTable < 95) {
            startEmergencyMeeting("EMERGENCY", p, null);
        }
    }

    // ======================================================================
    // 11. INTERACTIVE 9-MISSION TASK MODAL ENGINE
    // ======================================================================
    function openTaskModal(task) {
        state.activeTaskModalId = task.id;
        const modal = $("modal-task");
        const icon = $("task-modal-icon");
        const room = $("task-modal-room");
        const title = $("task-modal-title");
        const desc = $("task-modal-desc");
        const body = $("task-modal-body");
        const feedback = $("task-modal-feedback");

        if (!modal || !body) return;

        if (icon) icon.textContent = task.icon;
        if (room) room.textContent = task.roomName;
        if (title) title.textContent = task.title;
        if (desc) desc.textContent = task.desc;
        if (feedback) {
            feedback.classList.add("hidden");
            feedback.innerHTML = "";
        }

        body.innerHTML = "";
        buildTaskMinigameUI(task, body);
        modal.classList.remove("hidden");
    }

    function closeTaskModal() {
        playSfx("click");
        state.activeTaskModalId = null;
        const modal = $("modal-task");
        if (modal) modal.classList.add("hidden");
    }

    function showTaskFeedback(isSuccess, message) {
        const feedback = $("task-modal-feedback");
        if (!feedback) return;
        feedback.classList.remove("hidden");
        feedback.className = `px-4 py-2.5 border-t text-xs font-bold flex items-center justify-between gap-2 ${
            isSuccess
                ? "bg-emerald-950/95 border-emerald-400 text-emerald-200"
                : "bg-red-950/70 border-red-500 text-red-200"
        }`;
        feedback.innerHTML = `<span>${message}</span>`;
    }

    function completeActiveTask(task) {
        if (task.completed) return;
        task.completed = true;
        state.score += task.points;
        playSfx("taskDone");

        // If player is Impostor faking tasks, still award sabotage infiltration points
        showTaskFeedback(true, `✅ MISSION VERIFIED! +${task.points} Campus Points Awarded!`);
        updateHudProfileAndTasks();

        setTimeout(() => {
            closeTaskModal();
            showTaskCompletedToast(`${task.icon} ${task.title} (+${task.points} PTS)`);
            checkWinConditions();
        }, 700);
    }

    function buildTaskMinigameUI(task, container) {
        switch (task.type) {
            case "SUDOKU5":
                buildSudoku5Minigame(task, container);
                break;
            case "SORTING":
                buildSortingMinigame(task, container);
                break;
            case "SLIDERS":
                buildSlidersMinigame(task, container);
                break;
            case "MEMORY":
                buildMemoryMinigame(task, container);
                break;
            case "BEVERAGE":
                buildBeverageMinigame(task, container);
                break;
            case "WIRES":
                buildWiresMinigame(task, container);
                break;
            case "SOLAR":
                buildSolarMinigame(task, container);
                break;
            case "ACOUSTIC":
                buildAcousticMinigame(task, container);
                break;
            case "BREAKER":
            default:
                buildBreakerMinigame(task, container);
                break;
        }
    }

    // 1. RESIDENTIAL HALL: 5x5 Latin Square / Sudoku Door Unlock
    function buildSudoku5Minigame(task, container) {
        const solution = [
            [1, 2, 3, 4, 5],
            [2, 3, 4, 5, 1],
            [3, 4, 5, 1, 2],
            [4, 5, 1, 2, 3],
            [5, 1, 2, 3, 4]
        ];
        const missingCoords = [
            "0,2", "1,4", "2,1", "3,3", "4,0"
        ];
        const userValues = {};

        const wrap = document.createElement("div");
        wrap.className = "flex flex-col items-center gap-3";

        const grid = document.createElement("div");
        grid.className = "grid grid-cols-5 gap-2 max-w-xs w-full";

        for (let r = 0; r < 5; r++) {
            for (let c = 0; c < 5; c++) {
                const key = `${r},${c}`;
                const isMissing = missingCoords.includes(key);
                if (!isMissing) {
                    const cell = document.createElement("div");
                    cell.className = "h-11 rounded-xl bg-slate-800 border-2 border-slate-600 flex items-center justify-center font-mono-code font-black text-base text-slate-300";
                    cell.textContent = solution[r][c];
                    grid.appendChild(cell);
                } else {
                    userValues[key] = 1;
                    const btn = document.createElement("button");
                    btn.type = "button";
                    btn.className = "h-11 rounded-xl bg-cyan-950 border-2 border-cyan-400 flex items-center justify-center font-mono-code font-black text-base text-amber-300 cursor-pointer";
                    btn.textContent = "1";
                    btn.addEventListener("click", () => {
                        playSfx("click");
                        userValues[key] = (userValues[key] % 5) + 1;
                        btn.textContent = String(userValues[key]);
                    });
                    grid.appendChild(btn);
                }
            }
        }

        const hint = document.createElement("p");
        hint.className = "text-xs text-slate-300 text-center";
        hint.textContent = "Tap the highlighted cyan keypads to cycle numbers (1–5), then press VERIFY KEYCODE.";

        const verifyBtn = document.createElement("button");
        verifyBtn.type = "button";
        verifyBtn.className = "au-btn-green px-6 py-2.5 rounded-xl font-orbitron font-black text-xs";
        verifyBtn.textContent = "🔓 VERIFY DORMITORY KEYCODE";
        verifyBtn.addEventListener("click", () => {
            const allMatch = missingCoords.every((k) => {
                const [r, c] = k.split(",").map(Number);
                return userValues[k] === solution[r][c];
            });
            if (allMatch) {
                completeActiveTask(task);
            } else {
                playSfx("error");
                showTaskFeedback(false, "❌ Keycode conflict! Check each row & column so numbers 1–5 do not repeat.");
            }
        });

        wrap.appendChild(grid);
        wrap.appendChild(hint);
        wrap.appendChild(verifyBtn);
        container.appendChild(wrap);
    }

    // 2. LIBRARY: Archive Dewey Call Number Sorting
    function buildSortingMinigame(task, container) {
        const numbers = [104, 218, 309, 452, 610, 895];
        const shuffled = [...numbers].sort(() => Math.random() - 0.5);
        let nextIndex = 0;

        const wrap = document.createElement("div");
        wrap.className = "space-y-3 text-center";

        const grid = document.createElement("div");
        grid.className = "grid grid-cols-3 gap-2.5 max-w-md m-auto";

        shuffled.forEach((num) => {
            const btn = document.createElement("button");
            btn.type = "button";
            btn.className = "au-btn py-4 rounded-xl font-mono-code font-black text-base text-cyan-300";
            btn.textContent = `AUW-${num}`;
            btn.addEventListener("click", () => {
                if (num === numbers[nextIndex]) {
                    playSfx("click");
                    btn.disabled = true;
                    btn.className = "py-4 rounded-xl bg-emerald-950 border-2 border-emerald-400 font-mono-code font-black text-base text-emerald-300";
                    nextIndex++;
                    if (nextIndex === numbers.length) {
                        completeActiveTask(task);
                    }
                } else {
                    playSfx("error");
                    showTaskFeedback(false, `❌ Out of order! Find AUW-${numbers[nextIndex]} next.`);
                }
            });
            grid.appendChild(btn);
        });

        wrap.appendChild(grid);
        container.appendChild(wrap);
    }

    // 3. SCIENCE LAB: Reagent pH Calibration Sliders
    function buildSlidersMinigame(task, container) {
        const targets = [4, 7, 9];
        const current = [2, 5, 6];

        const wrap = document.createElement("div");
        wrap.className = "space-y-3 max-w-md m-auto";

        targets.forEach((tVal, idx) => {
            const row = document.createElement("div");
            row.className = "bg-slate-950 border border-slate-700 p-3 rounded-xl flex items-center justify-between gap-3";
            const label = document.createElement("span");
            label.className = "font-mono-code text-xs font-bold text-amber-300 w-28";
            label.textContent = `BEAKER #${idx + 1} (pH ${tVal})`;

            const valSpan = document.createElement("span");
            valSpan.className = "font-mono-code text-sm font-black text-cyan-300 w-14 text-right";
            valSpan.textContent = `pH ${current[idx]}`;

            const input = document.createElement("input");
            input.type = "range";
            input.min = "1";
            input.max = "10";
            input.value = String(current[idx]);
            input.className = "flex-1 accent-emerald-400 cursor-pointer";
            input.addEventListener("input", () => {
                current[idx] = Number(input.value);
                valSpan.textContent = `pH ${current[idx]}`;
                if (targets.every((t, i) => current[i] === t)) {
                    completeActiveTask(task);
                }
            });

            row.appendChild(label);
            row.appendChild(input);
            row.appendChild(valSpan);
            wrap.appendChild(row);
        });

        container.appendChild(wrap);
    }

    // 4. HEALTH CENTER: First-Aid Bioscan Sequence
    function buildMemoryMinigame(task, container) {
        const pads = [
            { label: "❤️ PULSE", color: "border-red-500 text-red-200" },
            { label: "🫁 OXYGEN", color: "border-cyan-400 text-cyan-200" },
            { label: "🌡️ TEMP", color: "border-amber-400 text-amber-200" },
            { label: "🧬 NEURO", color: "border-emerald-400 text-emerald-200" }
        ];
        const seq = [0, 2, 1, 3];
        let step = 0;

        const wrap = document.createElement("div");
        wrap.className = "space-y-3 text-center max-w-md m-auto";

        const badge = document.createElement("div");
        badge.className = "p-2 rounded-xl bg-slate-950 border border-slate-700 font-mono-code text-xs text-amber-300";
        badge.textContent = "REQUIRED BIOSCAN ORDER: ❤️ PULSE → 🌡️ TEMP → 🫁 OXYGEN → 🧬 NEURO";

        const grid = document.createElement("div");
        grid.className = "grid grid-cols-2 gap-2.5";

        pads.forEach((p, idx) => {
            const btn = document.createElement("button");
            btn.type = "button";
            btn.className = `au-btn py-4 rounded-xl font-orbitron font-black text-xs border-2 ${p.color}`;
            btn.textContent = p.label;
            btn.addEventListener("click", () => {
                if (idx === seq[step]) {
                    playSfx("click");
                    step++;
                    showTaskFeedback(true, `Scanned ${step} / 4 vitals...`);
                    if (step === seq.length) {
                        completeActiveTask(task);
                    }
                } else {
                    step = 0;
                    playSfx("error");
                    showTaskFeedback(false, "❌ Bioscan sequence interrupted! Start again from ❤️ PULSE.");
                }
            });
            grid.appendChild(btn);
        });

        wrap.appendChild(badge);
        wrap.appendChild(grid);
        container.appendChild(wrap);
    }

    // 5. CAFETERIA: Espresso & Masala Tea Dispenser
    function buildBeverageMinigame(task, container) {
        const orders = [
            { name: "Chittagong Masala Chai", target: "HOT 85°C", options: ["ICED 5°C", "WARM 50°C", "HOT 85°C"] },
            { name: "AUW Study Matcha Latte", target: "WARM 50°C", options: ["ICED 5°C", "WARM 50°C", "HOT 85°C"] },
            { name: "Mango Lassi Cooler", target: "ICED 5°C", options: ["ICED 5°C", "WARM 50°C", "HOT 85°C"] }
        ];
        const fulfilled = [false, false, false];

        const wrap = document.createElement("div");
        wrap.className = "space-y-2.5 max-w-md m-auto";

        orders.forEach((ord, idx) => {
            const card = document.createElement("div");
            card.className = "p-3 rounded-xl bg-slate-950 border border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-2";
            const title = document.createElement("div");
            title.className = "text-xs font-bold text-white";
            title.innerHTML = `☕ ${ord.name} <span class="text-amber-300 font-mono-code">(${ord.target})</span>`;

            const btnGroup = document.createElement("div");
            btnGroup.className = "flex gap-1.5";

            ord.options.forEach((opt) => {
                const b = document.createElement("button");
                b.type = "button";
                b.className = "au-btn px-2.5 py-1 rounded text-[10px] font-bold";
                b.textContent = opt;
                b.addEventListener("click", () => {
                    if (opt === ord.target) {
                        playSfx("click");
                        fulfilled[idx] = true;
                        card.className = "p-3 rounded-xl bg-emerald-950/60 border border-emerald-400 flex flex-col sm:flex-row items-center justify-between gap-2";
                        if (fulfilled.every(Boolean)) {
                            completeActiveTask(task);
                        }
                    } else {
                        playSfx("error");
                        showTaskFeedback(false, `❌ Wrong temperature for ${ord.name}! Select ${ord.target}.`);
                    }
                });
                btnGroup.appendChild(b);
            });

            card.appendChild(title);
            card.appendChild(btnGroup);
            wrap.appendChild(card);
        });

        container.appendChild(wrap);
    }

    // 6. IT LAB: Campus Firewall Fiber Wire Patching
    function buildWiresMinigame(task, container) {
        const wires = [
            { id: "RED", label: "🔴 RED FIBER", cls: "border-red-500 text-red-200" },
            { id: "CYAN", label: "🔵 CYAN FIBER", cls: "border-cyan-400 text-cyan-200" },
            { id: "GOLD", label: "🟡 GOLD FIBER", cls: "border-amber-400 text-amber-200" },
            { id: "LIME", label: "🟢 LIME FIBER", cls: "border-emerald-400 text-emerald-200" }
        ];
        const rightSide = [...wires].sort(() => Math.random() - 0.5);
        const connected = {};
        let selectedLeft = null;

        const wrap = document.createElement("div");
        wrap.className = "grid grid-cols-2 gap-4 max-w-md m-auto";

        const leftCol = document.createElement("div");
        leftCol.className = "space-y-2";
        const rightCol = document.createElement("div");
        rightCol.className = "space-y-2";

        wires.forEach((w) => {
            const btn = document.createElement("button");
            btn.type = "button";
            btn.className = `w-full au-btn py-2.5 px-3 rounded-xl text-xs font-bold border-2 ${w.cls}`;
            btn.textContent = w.label;
            btn.addEventListener("click", () => {
                if (connected[w.id]) return;
                playSfx("click");
                selectedLeft = w.id;
                showTaskFeedback(true, `Selected ${w.label} — now click the matching right server node.`);
            });
            leftCol.appendChild(btn);
        });

        rightSide.forEach((w) => {
            const btn = document.createElement("button");
            btn.type = "button";
            btn.className = `w-full au-btn py-2.5 px-3 rounded-xl text-xs font-bold border-2 ${w.cls}`;
            btn.textContent = `NODE → ${w.id}`;
            btn.addEventListener("click", () => {
                if (!selectedLeft) {
                    playSfx("error");
                    showTaskFeedback(false, "Select a fiber cable on the left side first!");
                    return;
                }
                if (selectedLeft === w.id) {
                    playSfx("click");
                    connected[w.id] = true;
                    btn.disabled = true;
                    btn.textContent = `✅ ${w.id} LINKED`;
                    selectedLeft = null;
                    if (Object.keys(connected).length === wires.length) {
                        completeActiveTask(task);
                    }
                } else {
                    playSfx("error");
                    showTaskFeedback(false, "❌ Mismatched fiber polarity! Match identical colours.");
                }
            });
            rightCol.appendChild(btn);
        });

        wrap.appendChild(leftCol);
        wrap.appendChild(rightCol);
        container.appendChild(wrap);
    }

    // 7. COURTYARD: 3x3 Solar Canopy Alignment
    function buildSolarMinigame(task, container) {
        const states = [true, false, true, false, true, false, true, false, false];
        const grid = document.createElement("div");
        grid.className = "grid grid-cols-3 gap-2.5 max-w-xs m-auto";

        states.forEach((st, idx) => {
            const btn = document.createElement("button");
            btn.type = "button";
            const renderCell = () => {
                btn.className = `h-14 rounded-xl border-2 font-orbitron font-black text-xs cursor-pointer transition ${
                    states[idx]
                        ? "bg-emerald-950 border-emerald-400 text-emerald-300"
                        : "bg-slate-950 border-slate-700 text-slate-400"
                }`;
                btn.textContent = states[idx] ? "☀️ ON" : "🌑 OFF";
            };
            renderCell();
            btn.addEventListener("click", () => {
                playSfx("click");
                states[idx] = !states[idx];
                renderCell();
                if (states.every(Boolean)) {
                    completeActiveTask(task);
                }
            });
            grid.appendChild(btn);
        });

        container.appendChild(grid);
    }

    // 8. AUDITORIUM: Stage Acoustic Frequency Mixer
    function buildAcousticMinigame(task, container) {
        const channels = ["MAIN VOCAL MIC", "STAGE LEFT MONITOR", "PODIUM LECTERN", "BALCONY ARRAY"];
        const locked = [false, false, false, false];

        const wrap = document.createElement("div");
        wrap.className = "space-y-2.5 max-w-md m-auto";

        channels.forEach((ch, idx) => {
            const row = document.createElement("div");
            row.className = "p-3 rounded-xl bg-slate-950 border border-slate-700 flex items-center justify-between";
            const label = document.createElement("span");
            label.className = "text-xs font-orbitron font-bold text-cyan-300";
            label.textContent = `🎙️ ${ch}`;

            const btn = document.createElement("button");
            btn.type = "button";
            btn.className = "au-btn-amber px-4 py-1.5 rounded-xl text-xs font-black";
            btn.textContent = "CALIBRATE 440Hz";
            btn.addEventListener("click", () => {
                playSfx("click");
                locked[idx] = true;
                btn.disabled = true;
                btn.className = "px-4 py-1.5 rounded-xl bg-emerald-950 border-2 border-emerald-400 text-emerald-300 text-xs font-black";
                btn.textContent = "LOCKED ✅";
                if (locked.every(Boolean)) {
                    completeActiveTask(task);
                }
            });

            row.appendChild(label);
            row.appendChild(btn);
            wrap.appendChild(row);
        });

        container.appendChild(wrap);
    }

    // 9. SECURITY: Main Breaker Relays
    function buildBreakerMinigame(task, container) {
        const relays = [false, true, false, false, true];
        const wrap = document.createElement("div");
        wrap.className = "grid grid-cols-5 gap-2 max-w-md m-auto";

        relays.forEach((rState, idx) => {
            const btn = document.createElement("button");
            btn.type = "button";
            const updateBtn = () => {
                btn.className = `py-5 rounded-xl border-2 font-orbitron font-black text-xs flex flex-col items-center gap-1 cursor-pointer ${
                    relays[idx]
                        ? "bg-emerald-950 border-emerald-400 text-emerald-300"
                        : "bg-red-950/70 border-red-500 text-red-200"
                }`;
                btn.innerHTML = `<span class="text-lg">${relays[idx] ? "⚡" : "⭕"}</span><span>R-${idx + 1}</span><span>${relays[idx] ? "ON" : "OFF"}</span>`;
            };
            updateBtn();
            btn.addEventListener("click", () => {
                playSfx("click");
                relays[idx] = !relays[idx];
                updateBtn();
                if (relays.every(Boolean)) {
                    completeActiveTask(task);
                }
            });
            wrap.appendChild(btn);
        });

        container.appendChild(wrap);
    }

    // ======================================================================
    // 12. CCTV SURVEILLANCE & FULL CAMPUS MAP OVERLAYS
    // ======================================================================
    function buildCctvTabs() {
        const tabs = $("cctv-cam-tabs");
        if (!tabs) return;
        tabs.innerHTML = "";
        ROOMS.forEach((room, idx) => {
            const btn = document.createElement("button");
            btn.type = "button";
            btn.className = `au-btn px-2.5 py-1 rounded-lg text-[10px] font-orbitron font-bold ${
                idx === state.activeCctvRoomIndex ? "border-emerald-400 text-emerald-300" : "text-slate-300"
            }`;
            btn.textContent = `${room.camId}: ${room.short}`;
            btn.addEventListener("click", () => {
                playSfx("click");
                state.activeCctvRoomIndex = idx;
                buildCctvTabs();
                const title = $("cctv-cam-title");
                if (title) title.textContent = `${room.camId} • ${room.name}`;
            });
            tabs.appendChild(btn);
        });
    }

    function openCctvModal() {
        if (state.screen !== "PLAYING") return;
        playSfx("click");
        buildCctvTabs();
        const modal = $("modal-cctv");
        if (modal) modal.classList.remove("hidden");
    }

    function closeCctvModal() {
        playSfx("click");
        const modal = $("modal-cctv");
        if (modal) modal.classList.add("hidden");
    }

    function renderCctvFeed() {
        const modal = $("modal-cctv");
        if (!modal || modal.classList.contains("hidden")) return;

        const canvas = $("cctvCanvas");
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        const room = ROOMS[state.activeCctvRoomIndex] || ROOMS[4];

        ctx.save();
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const scaleX = canvas.width / room.w;
        const scaleY = canvas.height / room.h;
        const scale = Math.min(scaleX, scaleY);

        ctx.fillStyle = "#16171a";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.translate(
            (canvas.width - room.w * scale) / 2 - room.x * scale,
            (canvas.height - room.h * scale) / 2 - room.y * scale
        );
        ctx.scale(scale, scale);

        drawWorldRoom(ctx, room);

        // Draw bodies in room
        state.deadBodies.forEach((b) => {
            if (b.x >= room.x && b.x <= room.x + room.w && b.y >= room.y && b.y <= room.y + room.h) {
                drawDeadBody(ctx, b);
            }
        });

        // Draw characters in room
        const occupants = [];
        state.allCharacters.forEach((c) => {
            if (!c.alive || c.inVent) return;
            if (c.x >= room.x && c.x <= room.x + room.w && c.y >= room.y && c.y <= room.y + room.h) {
                occupants.push(`${c.flag} ${c.name}`);
                drawChibiCharacter(ctx, c, c.x, c.y, 1, Math.hypot(c.vx, c.vy) > 0.05 ? "walk" : "idle", c.animTick);
            }
        });

        ctx.restore();

        // Night-vision scanlines
        ctx.fillStyle = "rgba(16, 210, 117, 0.06)";
        for (let y = 0; y < canvas.height; y += 4) {
            ctx.fillRect(0, y, canvas.width, 1);
        }

        const tag = $("cctv-activity-tag");
        if (tag) {
            tag.textContent = occupants.length > 0
                ? `Detected in ${room.short}: ${occupants.join(", ")}`
                : `No student movement detected in ${room.short}.`;
        }
    }

    function buildMapQuickNav() {
        const nav = $("map-quick-nav");
        if (!nav) return;
        nav.innerHTML = "";
        ROOMS.forEach((room) => {
            const btn = document.createElement("button");
            btn.type = "button";
            btn.className = "au-btn px-2.5 py-1 rounded-lg text-[10px] font-orbitron font-bold text-cyan-300";
            btn.textContent = `📍 ${room.short}`;
            btn.addEventListener("click", () => {
                if (!state.player) return;
                playSfx("click");
                state.player.x = room.x + room.w / 2;
                state.player.y = room.y + room.h / 2;
                closeFullMapModal();
                showAnnouncement(`🏃 Fast-traveled to ${room.name}!`, 2200);
            });
            nav.appendChild(btn);
        });
    }

    function openFullMapModal() {
        if (state.screen !== "PLAYING") return;
        playSfx("click");
        const modal = $("modal-full-map");
        if (modal) modal.classList.remove("hidden");
        renderRadarCanvas($("fullMapCanvas"), true);
    }

    function closeFullMapModal() {
        playSfx("click");
        const modal = $("modal-full-map");
        if (modal) modal.classList.add("hidden");
    }

    // ======================================================================
    // 13. EMERGENCY MEETING, CHAT & VOTING SYSTEM
    // ======================================================================
    function startEmergencyMeeting(type, caller, bodyVictim) {
        if (state.screen !== "PLAYING") return;
        playSfx("report");
        closeTaskModal();
        closeCctvModal();
        closeFullMapModal();

        state.screen = "MEETING";
        state.meetingsCalled++;
        state.meetingType = type;
        state.meetingCaller = caller;
        state.meetingBodyVictim = bodyVictim;
        state.meetingTimeLeft = 20;
        state.playerVoteCast = null;
        state.votes = {};
        state.meetingResolved = false;

        // Clear reported dead bodies from floor
        state.deadBodies = [];

        const modal = $("modal-meeting");
        const badge = $("meeting-badge");
        const resBanner = $("meeting-result-banner");
        const chatLog = $("meeting-chat-log");
        const skipBtn = $("btn-skip-vote");

        if (modal) modal.classList.remove("hidden");
        if (resBanner) {
            resBanner.classList.add("hidden");
            resBanner.textContent = "";
        }
        if (skipBtn) skipBtn.disabled = false;

        if (badge) {
            badge.textContent = type === "BODY" && bodyVictim
                ? `🚨 DEAD BODY REPORTED (${bodyVictim.flag} ${bodyVictim.name})`
                : `📢 EMERGENCY MEETING CALLED BY ${caller.flag} ${caller.name}`;
        }

        if (chatLog) {
            chatLog.innerHTML = "";
            appendMeetingChat(
                "SYSTEM",
                type === "BODY" && bodyVictim
                    ? `${caller.flag} ${caller.name} reported ${bodyVictim.flag} ${bodyVictim.name}'s body in ${bodyVictim.roomId}!`
                    : `${caller.flag} ${caller.name} pressed the Cafeteria Emergency Button!`
            );
        }

        renderMeetingPlayersGrid();

        // Trigger AI Student clues in chat
        setTimeout(() => generateAiMeetingDiscussion(), 900);

        clearInterval(state.meetingInterval);
        updateMeetingTimerDisplay();
        state.meetingInterval = setInterval(() => {
            state.meetingTimeLeft--;
            updateMeetingTimerDisplay();
            if (state.meetingTimeLeft <= 0) {
                resolveMeetingVotes();
            }
        }, 1000);
    }

    function updateMeetingTimerDisplay() {
        const timerEl = $("meeting-timer");
        if (timerEl) timerEl.textContent = `${Math.max(0, state.meetingTimeLeft)}s`;
    }

    function appendMeetingChat(sender, text) {
        const chatLog = $("meeting-chat-log");
        if (!chatLog) return;
        const msg = document.createElement("div");
        msg.className = "p-2 rounded-lg bg-slate-900 border border-slate-800 text-xs";
        msg.innerHTML = `<span class="font-bold text-amber-300">${sender}:</span> <span class="text-slate-200">${text}</span>`;
        chatLog.appendChild(msg);
        chatLog.scrollTop = chatLog.scrollHeight;
    }

    function sendMeetingChat() {
        const input = $("meeting-chat-input");
        if (!input || !input.value.trim() || !state.player) return;
        playSfx("click");
        appendMeetingChat(`${state.player.flag} ${state.player.name}`, input.value.trim());
        input.value = "";
    }

    function generateAiMeetingDiscussion() {
        if (state.screen !== "MEETING") return;
        const livingBots = state.bots.filter((b) => b.alive);
        const actualImpostor = state.allCharacters.find((c) => c.alive && c.role === "IMPOSTOR");

        livingBots.slice(0, 3).forEach((bot, idx) => {
            setTimeout(() => {
                if (state.screen !== "MEETING") return;
                const room = getRoomAt(bot.x, bot.y);
                const locName = room ? room.short : "the corridor";
                if (bot.role === "IMPOSTOR") {
                    appendMeetingChat(`${bot.flag} ${bot.name}`, `I was doing my campus tasks near ${locName}. Should we skip or vote carefully?`);
                } else if (actualImpostor && Math.random() < 0.55) {
                    appendMeetingChat(`${bot.flag} ${bot.name}`, `I saw ${actualImpostor.flag} ${actualImpostor.name} acting suspiciously near the corridors!`);
                } else {
                    appendMeetingChat(`${bot.flag} ${bot.name}`, `I was studying in ${locName}. Stay alert everyone!`);
                }
            }, idx * 1100);
        });
    }

    function renderMeetingPlayersGrid() {
        const grid = $("meeting-players-grid");
        if (!grid) return;
        grid.innerHTML = "";

        state.allCharacters.forEach((char) => {
            const card = document.createElement("button");
            card.type = "button";
            const isVoted = state.playerVoteCast === char.id;
            card.disabled = !char.alive || Boolean(state.playerVoteCast);
            card.className = `p-2.5 rounded-xl border-2 text-left flex items-center justify-between transition ${
                !char.alive
                    ? "bg-red-950/35 border-slate-800 opacity-40"
                    : isVoted
                    ? "bg-amber-950/80 border-amber-400"
                    : "bg-slate-950 border-slate-700 hover:border-cyan-400 cursor-pointer"
            }`;

            card.innerHTML = `
                <div class="flex items-center gap-2 truncate">
                    <span class="text-lg">${char.flag}</span>
                    <div class="truncate">
                        <div class="text-xs font-bold text-white truncate">${char.name} ${char.isPlayer ? "(YOU)" : ""}</div>
                        <div class="text-[10px] font-mono-code ${char.alive ? "text-emerald-300" : "text-red-400"}">
                            ${char.alive ? "ALIVE" : "ELIMINATED"}
                        </div>
                    </div>
                </div>
                <span class="text-[10px] font-orbitron font-black px-2 py-0.5 rounded bg-slate-800 text-amber-300">
                    ${isVoted ? "VOTED" : char.alive ? "VOTE" : "✕"}
                </span>
            `;

            if (char.alive) {
                card.addEventListener("click", () => castPlayerVote(char.id));
            }
            grid.appendChild(card);
        });
    }

    function castPlayerVote(targetId) {
        if (state.playerVoteCast || state.meetingResolved || state.screen !== "MEETING") return;
        playSfx("click");
        state.playerVoteCast = targetId;
        state.votes[state.player.id] = targetId;

        const skipBtn = $("btn-skip-vote");
        if (skipBtn) skipBtn.disabled = true;

        renderMeetingPlayersGrid();

        // AI Bots cast votes shortly after player
        setTimeout(() => {
            if (state.screen === "MEETING" && !state.meetingResolved) {
                resolveMeetingVotes();
            }
        }, 1200);
    }

    function resolveMeetingVotes() {
        if (state.meetingResolved) return;
        state.meetingResolved = true;
        clearInterval(state.meetingInterval);

        const actualImpostor = state.allCharacters.find((c) => c.alive && c.role === "IMPOSTOR");

        // AI Bot Votes
        state.bots.forEach((bot) => {
            if (!bot.alive) return;
            if (bot.role === "IMPOSTOR") {
                // Impostor votes for a random crewmate or skips
                const crew = state.allCharacters.filter((c) => c.alive && c.id !== bot.id);
                state.votes[bot.id] = crew.length > 0 ? crew[Math.floor(Math.random() * crew.length)].id : "SKIP";
            } else {
                // Crewmate bots have higher accuracy if clues were found or player voted
                if (state.playerVoteCast && state.playerVoteCast !== "SKIP" && Math.random() < 0.65) {
                    state.votes[bot.id] = state.playerVoteCast;
                } else if (actualImpostor && Math.random() < 0.5) {
                    state.votes[bot.id] = actualImpostor.id;
                } else {
                    state.votes[bot.id] = "SKIP";
                }
            }
        });

        // Tally Votes
        const tally = {};
        Object.values(state.votes).forEach((v) => {
            tally[v] = (tally[v] || 0) + 1;
        });

        let topChoice = "SKIP";
        let topCount = 0;
        let tie = false;

        Object.entries(tally).forEach(([choice, count]) => {
            if (count > topCount) {
                topCount = count;
                topChoice = choice;
                tie = false;
            } else if (count === topCount) {
                tie = true;
            }
        });

        const banner = $("meeting-result-banner");
        if (banner) banner.classList.remove("hidden");

        let ejectedChar = null;
        if (topChoice === "SKIP" || tie) {
            if (banner) banner.textContent = "⚖️ NO ONE WAS EJECTED (TIE OR SKIPPED VOTE).";
        } else {
            ejectedChar = state.allCharacters.find((c) => c.id === topChoice);
            if (ejectedChar) {
                ejectedChar.alive = false;
                const roleConfirm = ejectedChar.role === "IMPOSTOR"
                    ? "WAS THE DISGUISED IMPOSTOR! 🎉"
                    : "WAS NOT THE IMPOSTOR.";
                if (banner) {
                    banner.textContent = `🚀 ${ejectedChar.flag} ${ejectedChar.name} WAS EJECTED... ${ejectedChar.name} ${roleConfirm}`;
                }
            }
        }

        setTimeout(() => {
            const modal = $("modal-meeting");
            if (modal) modal.classList.add("hidden");

            // Check if game ended from ejection
            if (ejectedChar) {
                if (ejectedChar.isPlayer) {
                    endGame(false, "You were voted out by the AUW Student Council!");
                    return;
                }
                if (ejectedChar.role === "IMPOSTOR") {
                    state.score += 300;
                    endGame(true, `The disguised Intruder (${ejectedChar.flag} ${ejectedChar.name}) was identified and ejected!`);
                    return;
                }
            }

            if (!checkWinConditions()) {
                state.screen = "PLAYING";
                // Reset survivors around Cafeteria after meeting
                state.player.x = 1400;
                state.player.y = 980;
            }
        }, 3000);
    }

    // ======================================================================
    // 14. WIN / LOSE CONDITIONS & FINAL SCOREBOARD
    // ======================================================================
    function checkWinConditions() {
        const allTasksDone = state.tasks.every((t) => t.completed);
        const livingCrew = state.allCharacters.filter((c) => c.alive && c.role === "CREWMATE");
        const livingImp = state.allCharacters.filter((c) => c.alive && c.role === "IMPOSTOR");

        if (state.player.role === "CREWMATE") {
            if (allTasksDone) {
                endGame(true, "All 9 AUW Campus Missions were completed! The campus is secure!");
                return true;
            }
            if (livingImp.length === 0) {
                endGame(true, "The Intruder was eliminated! AUW Campus is safe!");
                return true;
            }
            if (livingCrew.length <= livingImp.length) {
                endGame(false, "The Intruder overwhelmed the remaining students on campus!");
                return true;
            }
        } else {
            // Player is Impostor
            if (livingCrew.length <= 1) {
                endGame(true, "IMPOSTOR VICTORY! You successfully infiltrated and took over AUW Campus!");
                return true;
            }
            if (allTasksDone) {
                endGame(false, "The AUW Students completed all 9 missions before you could stop them!");
                return true;
            }
        }
        return false;
    }

    function endGame(playerWon, description) {
        state.running = false;
        state.screen = "GAMEOVER";
        clearInterval(state.meetingInterval);
        playSfx(playerWon ? "win" : "lose");

        const modal = $("modal-gameover");
        const emoji = $("gameover-emoji");
        const title = $("gameover-title");
        const desc = $("gameover-desc");
        const sbCountry = $("scoreboard-country");
        const sbTasks = $("scoreboard-tasks");
        const sbPoints = $("scoreboard-points");
        const sbSurvival = $("scoreboard-survival");
        const sbAch = $("scoreboard-achievements");

        if (modal) modal.classList.remove("hidden");
        if (emoji) emoji.textContent = playerWon ? "🏆" : "🚨";
        if (title) {
            title.textContent = playerWon
                ? state.player.role === "IMPOSTOR" ? "IMPOSTOR VICTORY!" : "CREWMATES WIN!"
                : "CAMPUS BREACHED!";
            title.className = `pixel-heading font-orbitron font-black text-2xl sm:text-4xl mb-2 ${
                playerWon ? "text-emerald-400" : "text-red-400"
            }`;
        }
        if (desc) desc.textContent = description;

        const completedTasks = state.tasks.filter((t) => t.completed).length;
        if (sbCountry) sbCountry.textContent = `${state.player.flag} ${state.player.name} (${state.player.role})`;
        if (sbTasks) sbTasks.textContent = `${completedTasks} / ${state.tasks.length}`;
        if (sbPoints) sbPoints.textContent = `${state.score} PTS`;
        if (sbSurvival) sbSurvival.textContent = `${Math.floor(state.elapsedTime)}s • ${state.cluesFound}/5 Clues`;

        if (sbAch) {
            sbAch.innerHTML = "";
            const achievements = [];
            if (playerWon) achievements.push("🏅 Campus Champion");
            if (completedTasks >= 5) achievements.push("📚 Honour Student");
            if (completedTasks === 9) achievements.push("🌟 All 9 Missions Master");
            if (state.cluesFound >= 3) achievements.push("🔍 Campus Detective");
            if (state.player.role === "IMPOSTOR" && state.impostorKills >= 2) achievements.push("🕵️‍♀️ Master Saboteur");
            if (achievements.length === 0) achievements.push("🎓 AUW Campus Defender");

            achievements.forEach((ach) => {
                const badge = document.createElement("span");
                badge.className = "px-2.5 py-1 rounded bg-slate-900 border border-amber-400/70 text-amber-300";
                badge.textContent = ach;
                sbAch.appendChild(badge);
            });
        }
    }

    function returnToRoleSelect() {
        playSfx("click");
        const gameOverModal = $("modal-gameover");
        const roleModal = $("modal-role-select");
        if (gameOverModal) gameOverModal.classList.add("hidden");
        if (roleModal) roleModal.classList.remove("hidden");
        state.screen = "SETUP";
    }

    // ======================================================================
    // 15. THEME, WEATHER & AUDIO CONTROLS
    // ======================================================================
    function toggleTheme() {
        playSfx("click");
        state.theme = state.theme === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", state.theme);

        const btnTheme = $("btn-theme");
        const btnSetupTheme = $("btn-setup-theme");
        if (btnTheme) btnTheme.textContent = state.theme === "dark" ? "🌙" : "☀️";
        if (btnSetupTheme) {
            btnSetupTheme.textContent = state.theme === "dark" ? "🌙 NIGHT MODE" : "☀️ DAY MODE";
        }
        updateWeatherBadge();
    }

    function updateWeatherBadge() {
        const badge = $("hud-weather-badge");
        if (!badge) return;
        const w = WEATHER_TYPES[state.weatherIndex];
        badge.textContent = state.theme === "dark" ? w.label : w.lightLabel;
    }

    function toggleMusic() {
        state.musicEnabled = !state.musicEnabled;
        playSfx("click");
        const btn = $("btn-music");
        if (btn) btn.style.opacity = state.musicEnabled ? "1" : "0.45";
        updateAmbienceMusic();
    }

    function toggleSound() {
        state.soundEnabled = !state.soundEnabled;
        const btn = $("btn-sound");
        if (btn) {
            btn.textContent = state.soundEnabled ? "🔊" : "🔇";
            btn.style.opacity = state.soundEnabled ? "1" : "0.45";
        }
        if (state.soundEnabled) playSfx("click");
    }

    // ======================================================================
    // 16. MAIN GAME CANVAS & RADAR RENDERING ENGINE
    // ======================================================================
    function resizeMainCanvas() {
        const canvas = $("gameCanvas");
        if (!canvas) return;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    function drawWorldRoom(ctx, room) {
        const isLight = state.theme === "light";
        ctx.fillStyle = isLight ? room.floorLight : room.floorDark;
        ctx.fillRect(room.x, room.y, room.w, room.h);

        // Retro tile grid
        ctx.strokeStyle = isLight ? "rgba(35, 73, 117, 0.12)" : "rgba(250, 253, 255, 0.05)";
        ctx.lineWidth = 2;
        for (let gx = room.x; gx <= room.x + room.w; gx += 40) {
            ctx.beginPath();
            ctx.moveTo(gx, room.y);
            ctx.lineTo(gx, room.y + room.h);
            ctx.stroke();
        }
        for (let gy = room.y; gy <= room.y + room.h; gy += 40) {
            ctx.beginPath();
            ctx.moveTo(room.x, gy);
            ctx.lineTo(room.x + room.w, gy);
            ctx.stroke();
        }

        // Room Border
        ctx.strokeStyle = room.accent;
        ctx.lineWidth = 6;
        ctx.strokeRect(room.x, room.y, room.w, room.h);

        // Room Banner Header
        ctx.fillStyle = PALETTE.ink;
        ctx.fillRect(room.x + 16, room.y + 14, 270, 32);
        ctx.strokeStyle = room.accent;
        ctx.lineWidth = 2;
        ctx.strokeRect(room.x + 16, room.y + 14, 270, 32);

        ctx.fillStyle = room.accent;
        ctx.font = 'bold 13px "Courier New", monospace';
        ctx.textAlign = "left";
        ctx.fillText(room.name, room.x + 26, room.y + 35);
    }

    function drawDeadBody(ctx, body) {
        ctx.save();
        ctx.translate(body.x, body.y);

        // Pool
        ctx.fillStyle = PALETTE.wine;
        ctx.beginPath();
        ctx.ellipse(0, 4, 24, 12, 0, 0, Math.PI * 2);
        ctx.fill();

        // Fallen Suit Half
        ctx.fillStyle = body.color.hex;
        ctx.fillRect(-16, -8, 22, 16);
        ctx.fillStyle = PALETTE.paper;
        ctx.fillRect(6, -3, 10, 6);

        ctx.font = 'bold 11px "Trebuchet MS", sans-serif';
        ctx.fillStyle = PALETTE.yellow;
        ctx.textAlign = "center";
        ctx.fillText(`💀 ${body.flag} ${body.name}`, 0, -16);
        ctx.restore();
    }

    function renderMainCanvas() {
        const canvas = $("gameCanvas");
        if (!canvas || !state.player) return;
        const ctx = canvas.getContext("2d");

        // Smooth camera follow
        state.camera.x = state.player.x - canvas.width / 2;
        state.camera.y = state.player.y - canvas.height / 2;

        const isLight = state.theme === "light";
        ctx.fillStyle = isLight ? "#cad5e3" : "#111216";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.save();
        ctx.translate(-state.camera.x, -state.camera.y);

        // Draw Corridors
        CORRIDORS.forEach((c) => {
            ctx.fillStyle = isLight ? "#d2dce8" : "#1c1e26";
            ctx.fillRect(c.x, c.y, c.w, c.h);
            ctx.strokeStyle = isLight ? "#234975" : "#55515d";
            ctx.lineWidth = 4;
            ctx.strokeRect(c.x, c.y, c.w, c.h);
        });

        // Draw 9 Campus Rooms
        ROOMS.forEach((room) => drawWorldRoom(ctx, room));

        // Carve open doorway thresholds where corridors meet rooms
        CORRIDORS.forEach((c) => {
            ctx.fillStyle = isLight ? "#d2dce8" : "#1c1e26";
            if (c.w > c.h) {
                // Horizontal corridor doorway
                ctx.fillRect(c.x + 20, c.y + 4, c.w - 40, c.h - 8);
            } else {
                // Vertical corridor doorway
                ctx.fillRect(c.x + 4, c.y + 20, c.w - 8, c.h - 40);
            }
        });

        // Draw Vents
        VENTS.forEach((v) => {
            ctx.fillStyle = PALETTE.ink;
            ctx.fillRect(v.x - 22, v.y - 14, 44, 28);
            ctx.strokeStyle = state.player.role === "IMPOSTOR" ? PALETTE.rust : PALETTE.sky;
            ctx.lineWidth = 2;
            ctx.strokeRect(v.x - 22, v.y - 14, 44, 28);
            for (let sl = -14; sl <= 14; sl += 7) {
                ctx.beginPath();
                ctx.moveTo(v.x + sl, v.y - 10);
                ctx.lineTo(v.x + sl, v.y + 10);
                ctx.stroke();
            }
        });

        // Draw Cafeteria Emergency Table
        ctx.fillStyle = PALETTE.blue;
        ctx.beginPath();
        ctx.arc(EMERGENCY_TABLE.x, EMERGENCY_TABLE.y, 44, 0, Math.PI * 2);
        ctx.fill();
        ctx.lineWidth = 4;
        ctx.strokeStyle = PALETTE.sky;
        ctx.stroke();

        ctx.fillStyle = PALETTE.rust;
        ctx.fillRect(EMERGENCY_TABLE.x - 12, EMERGENCY_TABLE.y - 12, 24, 24);
        ctx.fillStyle = PALETTE.paper;
        ctx.font = 'bold 11px "Courier New", monospace';
        ctx.textAlign = "center";
        ctx.fillText("🚨 EMERGENCY BUTTON", EMERGENCY_TABLE.x, EMERGENCY_TABLE.y - 54);

        // Draw CCTV Security Terminal
        ctx.fillStyle = PALETTE.navy;
        ctx.fillRect(CCTV_TERMINAL.x - 28, CCTV_TERMINAL.y - 20, 56, 40);
        ctx.strokeStyle = PALETTE.green;
        ctx.lineWidth = 3;
        ctx.strokeRect(CCTV_TERMINAL.x - 28, CCTV_TERMINAL.y - 20, 56, 40);
        ctx.fillStyle = PALETTE.lime;
        ctx.fillText("🎥 CCTV DESK", CCTV_TERMINAL.x, CCTV_TERMINAL.y - 28);

        // Draw Sabotage Repair Terminal if active
        if (state.sabotageActive) {
            ctx.fillStyle = PALETTE.rust;
            ctx.fillRect(SABOTAGE_TERMINAL.x - 26, SABOTAGE_TERMINAL.y - 26, 52, 52);
            ctx.fillStyle = PALETTE.yellow;
            ctx.fillText("💡 FIX LIGHTS!", SABOTAGE_TERMINAL.x, SABOTAGE_TERMINAL.y - 34);
        }

        // Draw Clues
        state.clues.forEach((clue) => {
            if (clue.collected) return;
            const pulse = Math.sin(state.elapsedTime * 5) * 4;
            ctx.fillStyle = PALETTE.yellow;
            ctx.beginPath();
            ctx.arc(clue.x, clue.y, 12 + pulse * 0.3, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = PALETTE.ink;
            ctx.font = "14px sans-serif";
            ctx.textAlign = "center";
            ctx.fillText("🔎", clue.x, clue.y + 5);
        });

        // Draw Interactive Task Terminals
        state.tasks.forEach((task) => {
            const pulse = Math.sin(state.elapsedTime * 4) * 3;
            ctx.fillStyle = task.completed ? PALETTE.green : PALETTE.yellow;
            ctx.fillRect(task.x - 22, task.y - 22, 44, 44);
            ctx.strokeStyle = PALETTE.ink;
            ctx.lineWidth = 3;
            ctx.strokeRect(task.x - 22, task.y - 22, 44, 44);

            ctx.font = "20px sans-serif";
            ctx.textAlign = "center";
            ctx.fillText(task.completed ? "✅" : task.icon, task.x, task.y + 7);

            ctx.font = 'bold 11px "Courier New", monospace';
            ctx.fillStyle = task.completed ? PALETTE.green : PALETTE.yellow;
            ctx.fillText(task.title, task.x, task.y - 30 + pulse * 0.3);
        });

        // Draw Dead Bodies
        state.deadBodies.forEach((b) => drawDeadBody(ctx, b));

        // Draw All Characters (Sorted by Y for depth)
        const visibleChars = state.allCharacters
            .filter((c) => c.alive && !c.inVent)
            .sort((a, b) => a.y - b.y);

        visibleChars.forEach((char) => {
            const anim = Math.hypot(char.vx, char.vy) > 0.05 ? "walk" : "idle";
            drawChibiCharacter(ctx, char, char.x, char.y, 1.15, anim, char.animTick);

            // Name & Flag Tag above Character
            const shownFlag = char.disguisedAs ? char.disguisedAs.flag : char.flag;
            const shownName = char.disguisedAs ? char.disguisedAs.name : char.name;
            const label = `${shownFlag} ${shownName}${char.isPlayer ? " (YOU)" : ""}`;

            ctx.font = 'bold 12px "Trebuchet MS", sans-serif';
            const textW = ctx.measureText(label).width + 14;
            ctx.fillStyle = "rgba(22, 23, 26, 0.85)";
            ctx.fillRect(char.x - textW / 2, char.y - 54, textW, 20);
            ctx.strokeStyle = char.isPlayer ? PALETTE.lime : PALETTE.sky;
            ctx.lineWidth = 1.5;
            ctx.strokeRect(char.x - textW / 2, char.y - 54, textW, 20);

            ctx.fillStyle = char.isPlayer ? PALETTE.lime : PALETTE.paper;
            ctx.textAlign = "center";
            ctx.fillText(label, char.x, char.y - 40);
        });

        ctx.restore();

        // Weather Overlay (Monsoon Rain)
        if (WEATHER_TYPES[state.weatherIndex].id === "MONSOON") {
            ctx.strokeStyle = "rgba(104, 174, 212, 0.32)";
            ctx.lineWidth = 1.5;
            const timeOffset = (state.elapsedTime * 450) % canvas.height;
            for (let i = 0; i < 45; i++) {
                const rx = ((i * 97) % canvas.width);
                const ry = ((i * 53 + timeOffset) % canvas.height);
                ctx.beginPath();
                ctx.moveTo(rx, ry);
                ctx.lineTo(rx - 6, ry + 16);
                ctx.stroke();
            }
        }

        // Sabotage Blackout Fog-of-War Spotlight
        if (state.sabotageActive && state.player.role === "CREWMATE") {
            const grad = ctx.createRadialGradient(
                canvas.width / 2,
                canvas.height / 2,
                65,
                canvas.width / 2,
                canvas.height / 2,
                220
            );
            grad.addColorStop(0, "rgba(22, 23, 26, 0)");
            grad.addColorStop(1, "rgba(22, 23, 26, 0.94)");
            ctx.fillStyle = grad;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = PALETTE.rust;
            ctx.font = 'bold 14px "Courier New", monospace';
            ctx.textAlign = "center";
            ctx.fillText(
                `⚡ CAMPUS BLACKOUT ACTIVE (${Math.ceil(state.sabotageTimer)}s) — REPAIR AT SECURITY HUB!`,
                canvas.width / 2,
                88
            );
        }
    }

    // ======================================================================
    // 17. MINIMAP & FULL CAMPUS RADAR RENDERER
    // ======================================================================
    function renderRadarCanvas(canvas, isFullMap = false) {
        if (!canvas || !state.player) return;
        const ctx = canvas.getContext("2d");
        const w = canvas.width;
        const h = canvas.height;

        ctx.clearRect(0, 0, w, h);
        ctx.fillStyle = "#16171a";
        ctx.fillRect(0, 0, w, h);

        const scaleX = w / WORLD_WIDTH;
        const scaleY = h / WORLD_HEIGHT;

        // Draw Corridors
        ctx.fillStyle = "#30313a";
        CORRIDORS.forEach((c) => {
            ctx.fillRect(c.x * scaleX, c.y * scaleY, c.w * scaleX, c.h * scaleY);
        });

        // Draw Rooms
        ROOMS.forEach((r) => {
            ctx.fillStyle = "#202127";
            ctx.fillRect(r.x * scaleX, r.y * scaleY, r.w * scaleX, r.h * scaleY);
            ctx.strokeStyle = r.accent;
            ctx.lineWidth = isFullMap ? 2 : 1.2;
            ctx.strokeRect(r.x * scaleX, r.y * scaleY, r.w * scaleX, r.h * scaleY);

            if (isFullMap) {
                ctx.fillStyle = PALETTE.paper;
                ctx.font = 'bold 10px "Courier New", monospace';
                ctx.textAlign = "center";
                ctx.fillText(
                    r.short,
                    (r.x + r.w / 2) * scaleX,
                    (r.y + r.h / 2) * scaleY + 3
                );
            }
        });

        // Draw Incomplete Tasks as Gold Dots
        state.tasks.forEach((t) => {
            ctx.fillStyle = t.completed ? PALETTE.green : PALETTE.yellow;
            ctx.beginPath();
            ctx.arc(t.x * scaleX, t.y * scaleY, isFullMap ? 4.5 : 2.5, 0, Math.PI * 2);
            ctx.fill();
        });

        // Draw Dead Bodies on Full Map if discovered
        state.deadBodies.forEach((b) => {
            if (!b.discovered) return;
            ctx.fillStyle = PALETTE.rust;
            ctx.beginPath();
            ctx.arc(b.x * scaleX, b.y * scaleY, isFullMap ? 5 : 3, 0, Math.PI * 2);
            ctx.fill();
        });

        // Draw Player Pulsing Beacon
        const px = state.player.x * scaleX;
        const py = state.player.y * scaleY;
        const pulse = (Math.sin(state.elapsedTime * 6) + 1) * (isFullMap ? 4 : 2);

        ctx.strokeStyle = PALETTE.lime;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(px, py, (isFullMap ? 6 : 3.5) + pulse, 0, Math.PI * 2);
        ctx.stroke();

        ctx.fillStyle = PALETTE.lime;
        ctx.beginPath();
        ctx.arc(px, py, isFullMap ? 5 : 3, 0, Math.PI * 2);
        ctx.fill();
    }

    // ======================================================================
    // 18. KEYBOARD, TOUCH D-PAD & CLICK-TO-TELEPORT FULL MAP CONTROLS
    // ======================================================================
    function setupInputListeners() {
        window.addEventListener("resize", resizeMainCanvas);

        window.addEventListener("keydown", (e) => {
            // Allow normal typing inside chat or room code inputs
            if (e.target && (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA")) {
                if (e.key === "Enter" && e.target.id === "meeting-chat-input") {
                    sendMeetingChat();
                }
                return;
            }

            const key = e.key.toLowerCase();
            if (key === "w" || e.key === "ArrowUp") state.keys.up = true;
            if (key === "s" || e.key === "ArrowDown") state.keys.down = true;
            if (key === "a" || e.key === "ArrowLeft") state.keys.left = true;
            if (key === "d" || e.key === "ArrowRight") state.keys.right = true;

            if (key === "t") toggleTheme();

            if (state.screen === "PLAYING") {
                if (key === "e") interactWithNearby();
                if (key === "r") reportBodyOrEmergency();
                if (key === "q") attemptKill();
                if (key === "v") useVent();
                if (key === "f") activateImpostorDisguise();
                if (key === "c") {
                    const cctvModal = $("modal-cctv");
                    if (cctvModal && !cctvModal.classList.contains("hidden")) {
                        closeCctvModal();
                    } else {
                        openCctvModal();
                    }
                }
                if (key === "m") {
                    const mapModal = $("modal-full-map");
                    if (mapModal && !mapModal.classList.contains("hidden")) {
                        closeFullMapModal();
                    } else {
                        openFullMapModal();
                    }
                }
                if (e.key === "Escape") {
                    closeTaskModal();
                    closeCctvModal();
                    closeFullMapModal();
                }
            }
        });

        window.addEventListener("keyup", (e) => {
            const key = e.key.toLowerCase();
            if (key === "w" || e.key === "ArrowUp") state.keys.up = false;
            if (key === "s" || e.key === "ArrowDown") state.keys.down = false;
            if (key === "a" || e.key === "ArrowLeft") state.keys.left = false;
            if (key === "d" || e.key === "ArrowRight") state.keys.right = false;
        });

        // Mobile / Touch D-Pad Bindings
        const bindDpad = (btnId, dirKey) => {
            const btn = $(btnId);
            if (!btn) return;
            const start = (ev) => {
                ev.preventDefault();
                state.keys[dirKey] = true;
            };
            const end = (ev) => {
                ev.preventDefault();
                state.keys[dirKey] = false;
            };
            btn.addEventListener("mousedown", start);
            btn.addEventListener("mouseup", end);
            btn.addEventListener("mouseleave", end);
            btn.addEventListener("touchstart", start, { passive: false });
            btn.addEventListener("touchend", end, { passive: false });
            btn.addEventListener("touchcancel", end, { passive: false });
        };

        bindDpad("dpad-up", "up");
        bindDpad("dpad-down", "down");
        bindDpad("dpad-left", "left");
        bindDpad("dpad-right", "right");

        // Click on Full Map Canvas to Fast Travel to clicked room
        const fullMapCanvas = $("fullMapCanvas");
        if (fullMapCanvas) {
            fullMapCanvas.addEventListener("click", (ev) => {
                if (!state.player) return;
                const rect = fullMapCanvas.getBoundingClientRect();
                const clickX = ((ev.clientX - rect.left) / rect.width) * WORLD_WIDTH;
                const clickY = ((ev.clientY - rect.top) / rect.height) * WORLD_HEIGHT;
                const clickedRoom = getRoomAt(clickX, clickY);
                if (clickedRoom) {
                    playSfx("click");
                    state.player.x = clickedRoom.x + clickedRoom.w / 2;
                    state.player.y = clickedRoom.y + clickedRoom.h / 2;
                    closeFullMapModal();
                    showAnnouncement(`🏃 Fast-traveled to ${clickedRoom.name}!`, 2200);
                }
            });
        }
    }

    // ======================================================================
    // 19. MASTER ANIMATION LOOP & GLOBAL HTML HANDLER EXPORTS
    // ======================================================================
    function masterLoop(timestamp) {
        if (!state.lastFrameTime) state.lastFrameTime = timestamp;
        const dt = Math.min(0.05, (timestamp - state.lastFrameTime) / 1000);
        state.lastFrameTime = timestamp;

        if (state.screen === "SETUP" || state.screen === "SECURITY_ALERT") {
            updatePreviewCanvas();
        } else if (state.screen === "PLAYING") {
            updateGame(dt);
            renderMainCanvas();
            renderRadarCanvas($("minimapCanvas"), false);
            renderCctvFeed();

            const fullMapModal = $("modal-full-map");
            if (fullMapModal && !fullMapModal.classList.contains("hidden")) {
                renderRadarCanvas($("fullMapCanvas"), true);
            }
        }

        requestAnimationFrame(masterLoop);
    }

    // Expose all functions referenced by inline onclick="..." attributes in index.html
    window.acknowledgeSecurityAlert = acknowledgeSecurityAlert;
    window.toggleTheme = toggleTheme;
    window.setPreviewAnim = setPreviewAnim;
    window.selectRole = selectRole;
    window.selectPlayMode = selectPlayMode;
    window.generateRoomCode = generateRoomCode;
    window.downloadOfflineGame = downloadOfflineGame;
    window.initGame = initGame;
    window.toggleChecklist = toggleChecklist;
    window.openCctvModal = openCctvModal;
    window.closeCctvModal = closeCctvModal;
    window.openFullMapModal = openFullMapModal;
    window.closeFullMapModal = closeFullMapModal;
    window.toggleMusic = toggleMusic;
    window.toggleSound = toggleSound;
    window.interactWithNearby = interactWithNearby;
    window.activateImpostorDisguise = activateImpostorDisguise;
    window.triggerSabotage = triggerSabotage;
    window.useVent = useVent;
    window.attemptKill = attemptKill;
    window.reportBodyOrEmergency = reportBodyOrEmergency;
    window.closeTaskModal = closeTaskModal;
    window.castPlayerVote = castPlayerVote;
    window.sendMeetingChat = sendMeetingChat;
    window.returnToRoleSelect = returnToRoleSelect;

    // Boot Game UI on DOM Ready
    function boot() {
        renderCountryGrid();
        renderCustomizerGrids();
        updateSetupBadges();
        updateWeatherBadge();
        setupInputListeners();
        resizeMainCanvas();
        requestAnimationFrame(masterLoop);
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", boot);
    } else {
        boot();
    }
})();