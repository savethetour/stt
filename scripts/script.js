    const GOOGLE_FORM_EMBED_URL = "https://docs.google.com/forms/d/e/1FAIpQLScNF1AGP5XfFQdrR7sgww6hIrFCRbDnY7LugOu2weKuiYM3Lw/viewform?embedded=true";
    const GOOGLE_SHEET_CSV_URL  = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQwacBHU0g-bGBuj04PAnC_tdZN1it_g1tzaWw2AkApTatI4CwYk9uHGY3q1_5FHV7BQu4lG0IQzXQJ/pub?gid=37121646&single=true&output=csv";
    const SIGNATURE_GOAL        = 100;


    const storageHelper = (() => {
      const memory = {};
      return {
        get(key) {
          try {
            return window.localStorage.getItem(key);
          } catch (e) {
            return Object.prototype.hasOwnProperty.call(memory, key) ? memory[key] : null;
          }
        },
        set(key, val) {
          memory[key] = val;
          try {
            window.localStorage.setItem(key, val);
          } catch (e) {
          }
        }
      };
    })();

    function showToast(msg) {
      const el = document.getElementById("toast");
      el.textContent = msg;
      el.classList.add("show");
      clearTimeout(el._timer);
      el._timer = setTimeout(() => el.classList.remove("show"), 2600);
    }

    const themeToggle = document.getElementById("theme-toggle");
    const themeIcon   = document.getElementById("theme-icon");
    const themeLabel  = document.getElementById("theme-label");

    function applyTheme(theme) {
      document.documentElement.setAttribute("data-theme", theme);
      storageHelper.set("savethetour_theme", theme);
      if (theme === "dark") {
        themeIcon.textContent = "☀";
        themeLabel.textContent = "Light";
      } else {
        themeIcon.textContent = "☾";
        themeLabel.textContent = "Dark";
      }
    }

    (() => {
      const saved = storageHelper.get("savethetour_theme");
      if (saved === "dark" || saved === "light") {
        applyTheme(saved);
      } else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
        applyTheme("dark");
      } else {
        applyTheme("light");
      }
    })();

    themeToggle.addEventListener("click", () => {
      const current = document.documentElement.getAttribute("data-theme");
      applyTheme(current === "dark" ? "light" : "dark");
    });

    const mobileMenuBtn = document.getElementById("mobile-menu-btn");
    const mobileDrawer  = document.getElementById("mobile-drawer");

    mobileMenuBtn.addEventListener("click", () => {
      const isOpen = mobileDrawer.classList.toggle("open");
      mobileMenuBtn.setAttribute("aria-expanded", String(isOpen));
      mobileMenuBtn.textContent = isOpen ? "Close" : "Menu";
    });

    document.querySelectorAll(".drawer-link").forEach(link => {
      link.addEventListener("click", () => {
        mobileDrawer.classList.remove("open");
        mobileMenuBtn.setAttribute("aria-expanded", "false");
        mobileMenuBtn.textContent = "Menu";
      });
    });

    const signSection   = document.getElementById("sign");
    const mobileFloat   = document.getElementById("mobile-float-bar");
    if ("IntersectionObserver" in window && signSection && mobileFloat) {
      const obs = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          mobileFloat.classList.toggle("hidden-on-sign", entry.isIntersecting);
        });
      }, { threshold: 0.15 });
      obs.observe(signSection);
    }

    const PROGRAMME_WORKS = [
      {
        ensemble: "Symphony Orchestra",
        title: 'Robert Schumann — Symphony No. 3 in E-flat major, Op. 97 ("Rhenish")',
        movements: [
          {
            label: "I. Lebhaft",
            subtitle: "I. Lebhaft — E-flat major · Exhilarating opening inspired by the Rhine at Düsseldorf",
            urls: ["audio/schumann_1.mp3"]
          },
          {
            label: "II. Scherzo",
            subtitle: "II. Scherzo: Sehr mäßig — C major · Warm Ländler dance depicting river life",
            urls: ["audio/schumann_2.mp3"]
          },
          {
            label: "III. Nicht schnell",
            subtitle: "III. Nicht schnell — A-flat major · Intimate pastoral intermezzo for woodwinds and strings",
            urls: ["audio/schumann_3.mp3"]
          },
          {
            label: "IV. Feierlich",
            subtitle: "IV. Feierlich — E-flat minor · Solemn trombone chorale inspired by Cologne Cathedral",
            urls: ["audio/schumann_4.mp3"]
          },
          {
            label: "V. Lebhaft (Finale)",
            subtitle: "V. Lebhaft — E-flat major · Joyous festival finale celebrating the Rhineland",
            urls: ["audio/schumann_5.mp3"]
          }
        ]
      },
      {
        ensemble: "Chapel Choir",
        title: "Gabriel Fauré — Requiem in D minor, Op. 48",
        movements: [
          {
            label: "I. Introït et Kyrie",
            subtitle: "I. Introït et Kyrie — D minor · Serene choral prayer over dark strings and organ",
            urls: ["audio/faure_1.mp3"]
          },
          {
            label: "II. Offertoire",
            subtitle: "II. Offertoire — B minor · Contrapuntal choral dialogue and baritone solo",
            urls: ["audio/faure_2.mp3"]
          },
          {
            label: "III. Sanctus",
            subtitle: "III. Sanctus — E-flat major · Luminous ascending harp and violin arpeggios",
            urls: ["audio/faure_3.mp3"]
          },
          {
            label: "IV. Pie Jesu",
            subtitle: "IV. Pie Jesu — B-flat major · Lyrical treble/soprano solo prayer",
            urls: ["audio/faure_4.mp3"]
          },
          {
            label: "V. Agnus Dei",
            subtitle: "V. Agnus Dei — F major · Flowing orchestral melody and radiant Lux aeterna",
            urls: ["audio/faure_5.mp3"]
          },
          {
            label: "VI. Libera Me",
            subtitle: "VI. Libera Me — D minor · Dramatic baritone solo and full choir climax",
            urls: ["audio/faure_6.mp3"]
          },
          {
            label: "VII. In Paradisum",
            subtitle: "VII. In Paradisum — D major · Ethereal choral vision of peace",
            urls: ["audio/faure_7.mp3"]
          }
        ]
      },
      {
        ensemble: "Big Band",
        title: 'Pee Wee Ellis (arr. Big Band) — "The Chicken"',
        movements: [
          {
            label: "Full Big Band Chart",
            subtitle: 'Pee Wee Ellis — "The Chicken"',
            urls: ["audio/chicken.mp3"]
          }
        ]
      },
      {
        ensemble: "Big Band",
        title: 'Nina Simone (arr. Big Band) — "Feeling Good" (Theme from Rocky)',
        movements: [
          {
            label: "Full Big Band Chart",
            subtitle: 'Nina Simone — "Feeling Good"',
            urls: ["audio/feel.mp3"]
          }
        ]
      }
    ];

    const audioEl         = document.getElementById("programme-audio");
    const mainPlayBtn     = document.getElementById("main-play-btn");
    const mainPlayIcon    = document.getElementById("main-play-icon");
    const miniPlayBtn     = document.getElementById("mini-play-btn");
    const miniPlayIcon    = document.getElementById("mini-play-icon");
    const mobileFloatPlay = document.getElementById("mobile-float-play");
    const miniSelect      = document.getElementById("mini-work-select");
    const drawerSelect    = document.getElementById("drawer-work-select");
    const playerBadge     = document.getElementById("player-ensemble-badge");
    const playerTitle     = document.getElementById("player-work-title");
    const playerSubtitle  = document.getElementById("player-mvt-subtitle");
    const playerStatus    = document.getElementById("player-status");
    const mvtContainer    = document.getElementById("movement-pills");
    const scrubberZone    = document.getElementById("scrubber-hitzone");
    const scrubberProg    = document.getElementById("scrubber-progress");
    const timeCurr        = document.getElementById("time-current");
    const timeDur         = document.getElementById("time-duration");

    let currentWorkIdx = 0;
    let currentMvtIdx  = 0;
    let sourceTryIdx   = 0;
    let isPlaying      = false;

    const PLAY_SVG  = '<polygon points="6,4 20,12 6,20"></polygon>';
    const PAUSE_SVG = '<rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect>';

    function formatTime(sec) {
      if (!isFinite(sec) || sec < 0) return "0:00";
      const m = Math.floor(sec / 60);
      const s = Math.floor(sec % 60);
      return m + ":" + (s < 10 ? "0" : "") + s;
    }

    function syncPlayIcons(playing) {
      isPlaying = playing;
      mainPlayIcon.innerHTML = playing ? PAUSE_SVG : PLAY_SVG;
      miniPlayIcon.innerHTML = playing ? PAUSE_SVG : PLAY_SVG;
      mobileFloatPlay.textContent = playing ? "Pause Music" : "Play Music";
    }

    function loadTrack(workIdx, mvtIdx, autoPlay) {
      currentWorkIdx = workIdx;
      currentMvtIdx  = mvtIdx;
      sourceTryIdx   = 0;

      const work = PROGRAMME_WORKS[workIdx];
      const mvt  = work.movements[mvtIdx];

      document.querySelectorAll(".work-tab").forEach(btn => {
        const active = Number(btn.dataset.work) === workIdx;
        btn.classList.toggle("active", active);
        btn.setAttribute("aria-selected", String(active));
      });

      miniSelect.value   = String(workIdx);
      drawerSelect.value = String(workIdx);

      playerBadge.textContent    = work.ensemble;
      playerTitle.textContent    = work.title;
      playerSubtitle.textContent = mvt.subtitle;
      scrubberProg.style.width   = "0%";
      timeCurr.textContent       = "0:00";
      timeDur.textContent        = "--:--";

      mvtContainer.innerHTML = "";
      work.movements.forEach((item, idx) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "mvt-btn" + (idx === mvtIdx ? " active" : "");
        btn.textContent = item.label;
        btn.addEventListener("click", () => loadTrack(workIdx, idx, true));
        mvtContainer.appendChild(btn);
      });

      audioEl.pause();
      audioEl.src = mvt.urls[0];
      audioEl.load();

      if (autoPlay) {
        playerStatus.textContent = "Connecting to audio stream...";
        const playPromise = audioEl.play();
        if (playPromise && typeof playPromise.then === "function") {
          playPromise.then(() => {
            syncPlayIcons(true);
            playerStatus.textContent = "Playing recording";
          }).catch(() => {
            syncPlayIcons(false);
            playerStatus.textContent = "Tap Play to start audio stream";
          });
        }
      } else {
        syncPlayIcons(false);
        playerStatus.textContent = "Ready";
      }
    }

    function togglePlayPause() {
      if (!audioEl.src) {
        loadTrack(currentWorkIdx, currentMvtIdx, true);
        return;
      }
      if (audioEl.paused) {
        playerStatus.textContent = "Connecting to audio stream...";
        const p = audioEl.play();
        if (p && typeof p.then === "function") {
          p.then(() => {
            syncPlayIcons(true);
            playerStatus.textContent = "Playing recording";
          }).catch(() => {
            syncPlayIcons(false);
            playerStatus.textContent = "Stream unavailable on this network";
          });
        }
      } else {
        audioEl.pause();
        syncPlayIcons(false);
        playerStatus.textContent = "Paused";
      }
    }

    audioEl.addEventListener("error", () => {
      const mvt = PROGRAMME_WORKS[currentWorkIdx].movements[currentMvtIdx];
      if (sourceTryIdx + 1 < mvt.urls.length) {
        sourceTryIdx += 1;
        playerStatus.textContent = "Switching to backup archival stream...";
        audioEl.src = mvt.urls[sourceTryIdx];
        audioEl.load();
        if (isPlaying) {
          audioEl.play().catch(() => syncPlayIcons(false));
        }
      } else {
        syncPlayIcons(false);
        playerStatus.textContent = "Archival stream temporarily unreachable - try another movement or work.";
      }
    });

    audioEl.addEventListener("loadedmetadata", () => {
      timeDur.textContent = formatTime(audioEl.duration);
    });

    audioEl.addEventListener("timeupdate", () => {
      if (audioEl.duration > 0) {
        const pct = (audioEl.currentTime / audioEl.duration) * 100;
        scrubberProg.style.width = pct + "%";
        scrubberZone.setAttribute("aria-valuenow", String(Math.round(pct)));
        timeCurr.textContent = formatTime(audioEl.currentTime);
        timeDur.textContent  = formatTime(audioEl.duration);
      }
    });

    audioEl.addEventListener("ended", () => {
      const work = PROGRAMME_WORKS[currentWorkIdx];
      if (currentMvtIdx + 1 < work.movements.length) {
        loadTrack(currentWorkIdx, currentMvtIdx + 1, true);
      } else {
        syncPlayIcons(false);
        playerStatus.textContent = "Movement finished";
      }
    });

    function scrubAtEvent(clientX) {
      if (!audioEl.duration || !isFinite(audioEl.duration)) return;
      const rect = scrubberZone.getBoundingClientRect();
      const ratio = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
      audioEl.currentTime = ratio * audioEl.duration;
    }

    scrubberZone.addEventListener("click", e => scrubAtEvent(e.clientX));
    scrubberZone.addEventListener("touchstart", e => {
      if (e.touches && e.touches[0]) scrubAtEvent(e.touches[0].clientX);
    }, { passive: true });

    mainPlayBtn.addEventListener("click", togglePlayPause);
    miniPlayBtn.addEventListener("click", togglePlayPause);
    mobileFloatPlay.addEventListener("click", togglePlayPause);

    document.querySelectorAll(".work-tab[data-work]").forEach(btn => {
      btn.addEventListener("click", () => loadTrack(Number(btn.dataset.work), 0, true));
    });

    miniSelect.addEventListener("change", e => loadTrack(Number(e.target.value), 0, true));
    drawerSelect.addEventListener("change", e => loadTrack(Number(e.target.value), 0, true));

    loadTrack(0, 0, false);

    const formContainer = document.getElementById("form-container");
    if (GOOGLE_FORM_EMBED_URL && GOOGLE_FORM_EMBED_URL.startsWith("https://")) {
      formContainer.style.padding = "0";
      formContainer.innerHTML = `<iframe src="${GOOGLE_FORM_EMBED_URL}" title="Official Petition Google Form" loading="lazy">Loading…</iframe>`;
    }

    let verifiedSigners = [];

    function parseCSV(text) {
      const rows = [];
      let row = [], val = "", inQuotes = false;
      for (let i = 0; i < text.length; i++) {
        const ch = text[i];
        const next = text[i + 1];
        if (inQuotes) {
          if (ch === '"' && next === '"') {
            val += '"';
            i++;
          } else if (ch === '"') {
            inQuotes = false;
          } else {
            val += ch;
          }
        } else {
          if (ch === '"') {
            inQuotes = true;
          } else if (ch === ",") {
            row.push(val.trim());
            val = "";
          } else if (ch === "\r" && next === "\n") {
            row.push(val.trim());
            rows.push(row);
            row = [];
            val = "";
            i++;
          } else if (ch === "\n" || ch === "\r") {
            row.push(val.trim());
            rows.push(row);
            row = [];
            val = "";
          } else {
            val += ch;
          }
        }
      }
      if (val.length > 0 || row.length > 0) {
        row.push(val.trim());
        rows.push(row);
      }
      return rows;
    }

    function updateCounters(list) {
      const total = list.length;
      let orch = 0, choir = 0, bb = 0, multi = 0;

      list.forEach(item => {
        const ens = (item.ensemble || "").toLowerCase();
        if (ens.includes("multiple") || ens.includes("both") || (ens.includes("orchestra") && (ens.includes("choir") || ens.includes("band")))) {
          multi++;
        } else if (ens.includes("orchestra")) {
          orch++;
        } else if (ens.includes("choir")) {
          choir++;
        } else if (ens.includes("big band") || ens.includes("band")) {
          bb++;
        } else if (ens) {
          multi++;
        }
      });

      const pct = Math.min(100, Math.round((total / SIGNATURE_GOAL) * 100));
      document.getElementById("total-count").textContent     = String(total);
      document.getElementById("progress-pct").textContent    = pct + "%";
      document.getElementById("progress-fill").style.width   = pct + "%";
      document.getElementById("progress-bar-role").setAttribute("aria-valuenow", String(total));
      document.getElementById("count-orchestra").textContent = String(orch);
      document.getElementById("count-choir").textContent     = String(choir);
      document.getElementById("count-bigband").textContent   = String(bb);
      document.getElementById("count-multiple").textContent  = String(multi);
    }

    function renderSupporterWall() {
      const grid   = document.getElementById("wall-grid");
      const query  = document.getElementById("wall-search").value.trim().toLowerCase();
      const filter = document.getElementById("wall-filter").value;

      const filtered = verifiedSigners.filter(s => {
        const matchesFilter = filter === "ALL" || (s.ensemble || "").toLowerCase().includes(filter.toLowerCase());
        const hay = `${s.name} ${s.year} ${s.ensemble} ${s.note}`.toLowerCase();
        return matchesFilter && (!query || hay.includes(query));
      });

      if (filtered.length === 0) {
        grid.innerHTML = `
          <div class="wall-empty">
            <strong>${verifiedSigners.length === 0 ? "No verified signatures synced yet." : "No matching signatures found."}</strong>
            <p style="margin:6px 0 0; font-size:14px;">${
              verifiedSigners.length === 0
                ? "Once the @abingdon.org.uk Google Form and Public_Wall CSV link are connected, verified signatures will appear here automatically."
                : "Try clearing your search box or selecting All Ensembles."
            }</p>
          </div>`;
        return;
      }

      grid.innerHTML = "";
      filtered.slice().reverse().forEach(s => {
        const card = document.createElement("div");
        card.className = "supporter-item";

        const head = document.createElement("div");
        head.className = "supporter-head";

        const nameEl = document.createElement("span");
        nameEl.className = "supporter-name";
        nameEl.textContent = s.name || "Anonymous Musician";

        const metaEl = document.createElement("span");
        metaEl.className = "supporter-meta";
        metaEl.textContent = [s.year, s.ensemble].filter(Boolean).join(" · ");

        head.appendChild(nameEl);
        head.appendChild(metaEl);
        card.appendChild(head);

        if (s.note) {
          const noteEl = document.createElement("p");
          noteEl.className = "supporter-note";
          noteEl.textContent = "“" + s.note + "”";
          card.appendChild(noteEl);
        }

        grid.appendChild(card);
      });
    }

    async function syncPublicWall(notify) {
      if (!GOOGLE_SHEET_CSV_URL || !GOOGLE_SHEET_CSV_URL.startsWith("https://")) {
        updateCounters([]);
        renderSupporterWall();
        if (notify) showToast("Connect GOOGLE_SHEET_CSV_URL in index.html to sync");
        return;
      }

      try {
        const res = await fetch(GOOGLE_SHEET_CSV_URL, { cache: "no-store" });
        if (!res.ok) throw new Error("Network error");
        const csvText = await res.text();
        const rows = parseCSV(csvText);

        verifiedSigners = rows
          .filter((r, idx) => {
            if (!r || r.length === 0 || !r.join("").trim()) return false;
            if (idx === 0 && /display\s*name|public\s*name|year/i.test(r[0])) return false;
            return true;
          })
          .map(r => {
            const clean = str => (str || "").includes("@") ? "[Redacted]" : (str || "").trim();
            return {
              name: clean(r[0]) || "Anonymous Musician",
              year: clean(r[1]),
              ensemble: clean(r[2]),
              note: clean(r[3])
            };
          });

        updateCounters(verifiedSigners);
        renderSupporterWall();
        if (notify) showToast("Synced " + verifiedSigners.length + " verified signatures");
      } catch (err) {
        if (notify) showToast("Could not reach Public_Wall CSV right now");
      }
    }

    document.getElementById("wall-search").addEventListener("input", renderSupporterWall);
    document.getElementById("wall-filter").addEventListener("change", renderSupporterWall);
    document.getElementById("refresh-wall-btn").addEventListener("click", () => syncPublicWall(true));
    syncPublicWall(false);

    const LETTER_TEMPLATES = {
      student: {
        recipientEmail: "sophie.willis@abingdon.org.uk",
        recipientLines: [
          "Mr Michael Windsor",
          "Headmaster",
          "Abingdon School",
          "Park Road, Abingdon",
          "Oxfordshire, OX14 1DE"
        ],
        subject: "RE: Request to Reinstate the Summer 2027 Germany Music Tour",
        paragraphs: [
          "Dear Mr Windsor,",
          "Thank you for writing on 16 November 2026 regarding the proposed Music department tour to Germany in Summer 2027, and for the School's continued support for the concerts staged by Abingdon musicians over the past year.",
          "I am writing respectfully as a member of Abingdon's musical community to ask the Senior Leadership to reconsider the deferral of the tour to 2028. While we fully appreciate the School's aim of balancing educational visits across activities and moving multi-year-group trips to a sustainable biennial cycle, deferring the already-announced 2027 tour means that some pupils will leave Abingdon without ever having had the opportunity to perform on an overseas Music tour.",
          "As healthy expressions of interest from families have already been gathered for Germany 2027, we would like to propose a fair compromise: honouring the Summer 2027 Germany tour for our Symphony Orchestra, Chapel Choir, and Big Band, and beginning the new biennial cycle from Summer 2027 to Summer 2029. We are also eager to assist staff with rehearsal packs and tour administration alongside external tour operators to keep organisational demands manageable.",
          "Thank you very much for taking the time to consider the views of Abingdon's musicians."
        ]
      },
      parent: {
        recipientEmail: "sophie.willis@abingdon.org.uk",
        recipientLines: [
          "Mr Michael Windsor",
          "Headmaster",
          "Abingdon School",
          "Park Road, Abingdon",
          "Oxfordshire, OX14 1DE"
        ],
        subject: "RE: Summer 2027 Music Tour to Germany - Parental Support",
        paragraphs: [
          "Dear Mr Windsor,",
          "Thank you for your letter of 16 November 2026 outlining the School's decision to move multi-year-group trips onto a biennial cycle and defer the overseas Music tour from Summer 2027 to Summer 2028.",
          "As a parent/guardian of an Abingdon musician, I wanted to share how much our family values the extraordinary musical opportunities at the School, and to express our strong support for reinstating the Summer 2027 tour to Germany. Having already registered our interest earlier this academic year, we were saddened that current pupils in the Symphony Orchestra, Chapel Choir, and Big Band would otherwise miss their final opportunity to represent Abingdon abroad before leaving the School.",
          "We fully understand the importance of staff workload and maintaining balance across departments. Running the planned Germany tour in Summer 2027 where strong family commitment already exists, and commencing the biennial schedule with the next overseas Music tour in Summer 2029 would achieve both fairness for this cohort and long-term sustainability.",
          "Thank you for your consideration and for all that you and the Music staff do for the pupils."
        ]
      },
      tutor: {
        recipientEmail: "",
        recipientLines: [
          "Housemaster / Form Tutor",
          "Abingdon School",
          "Park Road, Abingdon",
          "Oxfordshire, OX14 1DE"
        ],
        subject: "RE: Student Petition Regarding the Summer 2027 Germany Music Tour",
        paragraphs: [
          "Dear Tutor / Housemaster,",
          "I wanted to let you know briefly about a constructive, student-led petition organised by members of the Symphony Orchestra, Chapel Choir, and Big Band (https://savethetour.de) regarding the Summer 2027 Music tour to Germany.",
          "Following the Headmaster's letter of 16 November 2026 moving multi-year-group trips to a biennial cycle, pupils are respectfully asking Senior Leadership to honour the already-announced Summer 2027 Germany tour for current senior musicians and begin the biennial cycle from 2027 to 2029. Signatures are strictly verified via @abingdon.org.uk accounts with full respect for staff and leadership.",
          "Thank you for your ongoing support in House and Tutor time."
        ]
      }
    };

    let activeLetterKey = "student";

    function formatBritishDate() {
      return new Date().toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric"
      });
    }

    function renderFormalLetter() {
      const tpl   = LETTER_TEMPLATES[activeLetterKey];
      const name  = document.getElementById("sender-name").value.trim() || "[Your Full Name]";
      const role  = document.getElementById("sender-role").value.trim() || "[Year Group · Ensemble]";
      const house = document.getElementById("sender-house").value.trim();

      const senderBlock = document.getElementById("letter-sender-block");
      senderBlock.innerHTML = [
        name,
        role,
        house,
        "Abingdon School, Park Road, Abingdon, OX14 1DE",
        formatBritishDate()
      ].filter(Boolean).map(line => `<div>${escapeHtml(line)}</div>`).join("");

      const recipBlock = document.getElementById("letter-recipient-block");
      recipBlock.innerHTML = tpl.recipientLines.map(line => `<div>${escapeHtml(line)}</div>`).join("");

      document.getElementById("letter-subject").textContent = tpl.subject;

      const bodyEl = document.getElementById("letter-body");
      bodyEl.innerHTML = tpl.paragraphs.map(p => `<p>${escapeHtml(p)}</p>`).join("");

      const signoffEl = document.getElementById("letter-signoff");
      signoffEl.innerHTML = `
        <div>Yours sincerely,</div>
        <div class="letter-sig-space"></div>
        <div><strong>${escapeHtml(name)}</strong></div>
        <div>${escapeHtml(role)}${house ? " · " + escapeHtml(house) : ""}</div>
      `;

      const plainText = [
        name,
        role,
        house,
        "Abingdon School, Park Road, Abingdon, OX14 1DE",
        formatBritishDate(),
        "",
        ...tpl.recipientLines,
        "",
        tpl.subject,
        "",
        ...tpl.paragraphs,
        "",
        "Yours sincerely,",
        "",
        name,
        role + (house ? " · " + house : "")
      ].filter((v, idx, arr) => !(v === "" && arr[idx - 1] === "")).join("\n");

      const mailtoBtn = document.getElementById("mailto-letter-btn");
      mailtoBtn.href = `mailto:${encodeURIComponent(tpl.recipientEmail)}?subject=${encodeURIComponent(tpl.subject.replace(/^RE:\s*/i, ""))}&body=${encodeURIComponent(plainText)}`;
      mailtoBtn.dataset.plainText = plainText;
    }

    function escapeHtml(str) {
      return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
    }

    document.querySelectorAll(".work-tab[data-letter]").forEach(btn => {
      btn.addEventListener("click", () => {
        activeLetterKey = btn.dataset.letter;
        document.querySelectorAll(".work-tab[data-letter]").forEach(b => {
          const active = b.dataset.letter === activeLetterKey;
          b.classList.toggle("active", active);
          b.setAttribute("aria-selected", String(active));
        });
        renderFormalLetter();
      });
    });

    ["sender-name", "sender-role", "sender-house"].forEach(id => {
      document.getElementById(id).addEventListener("input", renderFormalLetter);
    });

    document.getElementById("copy-letter-btn").addEventListener("click", async () => {
      const text = document.getElementById("mailto-letter-btn").dataset.plainText || "";
      try {
        await navigator.clipboard.writeText(text);
        showToast("Letter copied to clipboard");
      } catch (e) {
        showToast("Select and copy the letter text directly");
      }
    });

    document.getElementById("print-letter-btn").addEventListener("click", () => {
      document.body.classList.add("print-letter-only");
      window.print();
      setTimeout(() => document.body.classList.remove("print-letter-only"), 500);
    });

    document.getElementById("print-dossier-btn").addEventListener("click", () => {
      document.body.classList.remove("print-letter-only");
      window.print();
    });

    window.addEventListener("afterprint", () => {
      document.body.classList.remove("print-letter-only");
    });

    renderFormalLetter();

    const SHARE_URL  = "https://savethetour.de/";
    const SHARE_TEXT = "Sign the verified @abingdon.org.uk student petition to save the Summer 2027 Germany Music Tour for Symphony Orchestra, Chapel Choir, and Big Band: https://savethetour.de/";

    document.getElementById("whatsapp-share-btn").addEventListener("click", () => {
      window.open("https://api.whatsapp.com/send?text=" + encodeURIComponent(SHARE_TEXT), "_blank", "noopener");
    });

    document.getElementById("copy-link-btn").addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(SHARE_URL);
        showToast("Copied https://savethetour.de/");
      } catch (e) {
        showToast("Share link: https://savethetour.de/");
      }
    });
