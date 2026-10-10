// ==========================================
// VIỆT PHỤC REMIX - MAIN APP CONTROLLER
// ==========================================

const state = {
    currentView: 'home',
    garment: CULTURAL_DATA['ao_dai'], // Mặc định: Áo dài
    bottom: BOTTOMS_DATA[0], // Mặc định: Quần lụa trắng
    event: null,
    color: COLORS_DATA[0],
    pattern: PATTERNS_DATA[0],
    accessories: [
        ACCESSORIES_DATA.find(a => a.id === 'kinh_mat'),
        ACCESSORIES_DATA.find(a => a.id === 'sneakers')
    ].filter(Boolean), // Mặc định mặc sẵn kính mát + sneakers để người dùng thấy ngay
    mood: "Streetwear",
    weather: "Xuân / Hè",
    viewMode: "photo", // 'photo' (Ảnh thời trang thực tế) hoặc 'mannequin' (Vector tương tác)
    lookbook: []
};

// Đọc Lookbook từ LocalStorage, nếu trống nạp 3 mẫu mẫu thị phạm
try {
    const saved = localStorage.getItem('vietphuc_lookbook');
    if (saved) {
        state.lookbook = JSON.parse(saved);
    }
} catch (e) {
    state.lookbook = [];
}

if (!state.lookbook || state.lookbook.length === 0) {
    state.lookbook = JSON.parse(JSON.stringify(INITIAL_LOOKBOOK_SAMPLES));
}

// Hàm vẽ bo góc an toàn tuyệt đối, tương thích mọi trình duyệt
function drawRoundedRect(ctx, x, y, width, height, radius) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
}

const app = {
    init: function() {
        this.renderGarmentSelector();
        this.renderEventSelector();
        this.renderColorSelector();
        this.renderPatternSelector();
        this.renderBottomSelector();
        this.renderAccessorySelector();
        this.renderMoodSelector();
        this.renderWeatherSelector();
        this.renderAiPresets();
        this.loadTheme();
        this.updateLiveStudio();
        this.renderLookbook();
    },

    // -- CHUYỂN ĐỔI CHẾ ĐỘ XEM: ẢNH THẬT vs MANNEQUIN --
    toggleViewMode: function(mode) {
        state.viewMode = mode;
        const btnPhoto = document.getElementById('btn-mode-photo');
        const btnMannequin = document.getElementById('btn-mode-mannequin');
        
        if (btnPhoto) btnPhoto.classList.toggle('active', mode === 'photo');
        if (btnMannequin) btnMannequin.classList.toggle('active', mode === 'mannequin');
        
        this.updateLiveStudio();
        this.showToast(mode === 'photo' ? 'Đã chuyển sang Ảnh Thời Trang Thực Tế 📸' : 'Đã chuyển sang Mannequin Đồ Họa 🎨');
    },

    // -- QUẢN LÝ GIAO DIỆN SÁNG / TỐI --
    loadTheme: function() {
        const theme = localStorage.getItem('vietphuc_theme') || 'light';
        document.documentElement.setAttribute('data-theme', theme);
        const btn = document.getElementById('theme-btn');
        if (btn) btn.textContent = theme === 'dark' ? '☀️' : '🌙';
    },

    toggleTheme: function() {
        const current = document.documentElement.getAttribute('data-theme') || 'light';
        const next = current === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('vietphuc_theme', next);
        const btn = document.getElementById('theme-btn');
        if (btn) btn.textContent = next === 'dark' ? '☀️' : '🌙';
    },

    // -- CHUYỂN ĐỔI MÀN HÌNH MƯỢT MÀ --
    navigate: function(viewId) {
        state.currentView = viewId;
        
        const sections = document.querySelectorAll('.section-view');
        sections.forEach(s => s.classList.remove('active'));
        
        const targetSection = document.getElementById(viewId);
        if (targetSection) {
            targetSection.classList.add('active');
        }

        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => item.classList.remove('active'));
        
        const activeNav = document.getElementById(`nav-${viewId}`);
        if (activeNav) {
            activeNav.classList.add('active');
        }

        if (viewId === 'lookbook') {
            this.renderLookbook();
        } else if (viewId === 'studio') {
            this.updateLiveStudio();
        }

        window.scrollTo({ top: 0, behavior: 'smooth' });
    },

    // -- THÔNG BÁO TOAST --
    showToast: function(msg) {
        const toast = document.getElementById('toast');
        if (!toast) return;
        toast.textContent = msg;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 2800);
    },

    // -- HÀM TẠO SVG CÓ "MẶC" PHỤ KIỆN LÊN MANNEQUIN --
    buildGarmentSVG: function(garmentId, hexColor, accessoriesList, bottomObj, patternObj, moodStr, weatherStr) {
        let baseSvg = (GARMENT_SVGS[garmentId] || '').replace(/GARMENT_COLOR/g, hexColor);

        // Đảm bảo pattern defs (Gấm, Sọc, Batik) luôn sẵn sàng trong SVG
        if (!baseSvg.includes('id="pat-gam"')) {
            baseSvg = baseSvg.replace('<defs>', '<defs>' + SVG_PATTERNS_DEFS);
        }

        // 1. Hoa văn chất liệu (Pattern Fill)
        const pat = patternObj || state.pattern || PATTERNS_DATA[0];
        const patternFill = (pat && pat.patternFill) ? pat.patternFill : 'none';
        baseSvg = baseSvg.replace(/PATTERN_FILL/g, patternFill);

        // 2. Thêu hoa sen nổi bật (khi chọn pattern thêu hoa)
        const floralSvg = (pat && pat.hasFloralOverlay) ? FLORAL_EMBROIDERY_SVG : '';
        baseSvg = baseSvg.replace('<!-- FLORAL_EMBROIDERY_LAYER -->', floralSvg);

        // 3. Lớp Quần / Váy (Bottom Layer)
        const curBottom = bottomObj || state.bottom || BOTTOMS_DATA[0];
        let bottomSvg = (curBottom && BOTTOM_SVG_LAYERS[curBottom.id]) ? BOTTOM_SVG_LAYERS[curBottom.id] : BOTTOM_SVG_LAYERS['quan_lua_trang'];
        bottomSvg = bottomSvg.replace(/GARMENT_COLOR/g, hexColor);
        baseSvg = baseSvg.replace('<!-- BOTTOM_LAYER -->', bottomSvg);

        // 4. Lớp Phong cách thẩm mỹ (Mood Layer)
        const curMood = moodStr || state.mood || 'Streetwear';
        const moodKey = curMood.replace(' ', '_');
        const moodSvg = MOOD_SVG_LAYERS[curMood] || MOOD_SVG_LAYERS[moodKey] || '';
        baseSvg = baseSvg.replace('<!-- MOOD_LAYER -->', moodSvg);

        // 5. Lớp Thời tiết / Mùa (Season Layer - Áo choàng len Thu/Đông)
        const curWeather = weatherStr || state.weather || 'Xuân / Hè';
        const isThuDong = curWeather.includes('Đông') || curWeather.includes('thu_dong');
        const seasonSvg = isThuDong ? (SEASON_SVG_LAYERS['thu_dong'] || '') : (SEASON_SVG_LAYERS['xuan_he'] || '');
        baseSvg = baseSvg.replace('<!-- SEASON_LAYER -->', seasonSvg);

        // 6. Các lớp Phụ kiện được chọn
        let accessorySvgContent = '';
        if (accessoriesList && accessoriesList.length > 0) {
            accessoriesList.forEach(acc => {
                const accId = typeof acc === 'string' ? acc : acc.id;
                if (ACCESSORY_SVG_LAYERS[accId]) {
                    accessorySvgContent += ACCESSORY_SVG_LAYERS[accId];
                }
            });
        }
        baseSvg = baseSvg.replace('<!-- ACCESSORY_LAYERS -->', accessorySvgContent);

        return baseSvg;
    },

    // -- 1. RENDER BỘ CHỌN VIỆT PHỤC (CÓ HÌNH ẢNH THẬT SẮC NÉT) --
    renderGarmentSelector: function() {
        const container = document.getElementById('clothing-selector');
        if (!container) return;
        container.innerHTML = '';

        Object.keys(CULTURAL_DATA).forEach(key => {
            const item = CULTURAL_DATA[key];
            const div = document.createElement('div');
            const isActive = state.garment && state.garment.id === item.id;
            div.className = `garment-item ${isActive ? 'active' : ''}`;
            div.setAttribute('data-garment-id', item.id);

            div.innerHTML = `
                <div class="garment-thumb-wrap">
                    <img src="${item.image}" alt="${item.name}" class="garment-thumb-img" onerror="this.style.display='none'" />
                </div>
                <div class="garment-item-name">${item.name}</div>
                <div class="garment-item-desc">${item.desc}</div>
            `;

            div.onclick = () => {
                document.querySelectorAll('.garment-item').forEach(el => el.classList.remove('active'));
                div.classList.add('active');
                state.garment = item;

                // Tự động gợi ý loại quần/váy phù hợp theo mẫu áo
                if (item.defaultBottom) {
                    const matchedBottom = BOTTOMS_DATA.find(b => b.id === item.defaultBottom);
                    if (matchedBottom) {
                        state.bottom = matchedBottom;
                        this.renderBottomSelector();
                    }
                }

                this.updateLiveStudio();
            };
            container.appendChild(div);
        });
    },

    // -- 2. RENDER BỘ CHỌN SỰ KIỆN GỢI Ý --
    renderEventSelector: function() {
        const container = document.getElementById('event-selector');
        if (!container) return;
        container.innerHTML = '';

        EVENTS_DATA.forEach(ev => {
            const pill = document.createElement('div');
            const isActive = state.event && state.event.id === ev.id;
            pill.className = `event-pill ${isActive ? 'active' : ''}`;
            pill.innerHTML = `<span>${ev.icon}</span> <span>${ev.name}</span>`;

            pill.onclick = () => {
                document.querySelectorAll('.event-pill').forEach(el => el.classList.remove('active'));
                pill.classList.add('active');
                state.event = ev;

                if (ev.suggest && CULTURAL_DATA[ev.suggest]) {
                    state.garment = CULTURAL_DATA[ev.suggest];
                    document.querySelectorAll('.garment-item').forEach(el => {
                        el.classList.remove('active');
                        if (el.getAttribute('data-garment-id') === ev.suggest) {
                            el.classList.add('active');
                        }
                    });
                    this.showToast(`Gợi ý: ${state.garment.name} cho ${ev.name} ✨`);
                }

                if (ev.bottom) {
                    const matchedBottom = BOTTOMS_DATA.find(b => b.id === ev.bottom);
                    if (matchedBottom) {
                        state.bottom = matchedBottom;
                        this.renderBottomSelector();
                    }
                }

                this.updateLiveStudio();
            };
            container.appendChild(pill);
        });
    },

    // -- 3. RENDER BẢNG MÀU SẮC TRUYỀN THỐNG --
    renderColorSelector: function() {
        const container = document.getElementById('color-selector');
        if (!container) return;
        container.innerHTML = '';

        COLORS_DATA.forEach((c, idx) => {
            const item = document.createElement('div');
            item.className = 'color-swatch-item';

            const circle = document.createElement('div');
            const isActive = state.color && state.color.id === c.id;
            circle.className = `color-circle ${isActive ? 'active' : ''}`;
            circle.style.backgroundColor = c.hex;
            circle.title = c.name;

            circle.onclick = () => {
                document.querySelectorAll('.color-circle').forEach(el => el.classList.remove('active'));
                circle.classList.add('active');
                state.color = c;
                this.updateLiveStudio();
            };

            const label = document.createElement('span');
            label.className = 'color-title';
            label.textContent = c.name;

            item.appendChild(circle);
            item.appendChild(label);
            container.appendChild(item);
        });
    },

    // -- 4. RENDER HOA VĂN VẢI --
    renderPatternSelector: function() {
        const container = document.getElementById('pattern-selector');
        if (!container) return;
        container.innerHTML = '';

        PATTERNS_DATA.forEach((p, idx) => {
            const btn = document.createElement('button');
            const isActive = state.pattern && state.pattern.id === p.id;
            btn.className = `pill-btn ${isActive ? 'active' : ''}`;
            btn.textContent = p.name;

            btn.onclick = () => {
                document.querySelectorAll('#pattern-selector .pill-btn').forEach(el => el.classList.remove('active'));
                btn.classList.add('active');
                state.pattern = p;
                this.updateLiveStudio();
            };
            container.appendChild(btn);
        });
    },

    // -- 5. RENDER TRANG PHỤC QUẦN / VÁY --
    renderBottomSelector: function() {
        const container = document.getElementById('bottom-selector');
        if (!container) return;
        container.innerHTML = '';

        BOTTOMS_DATA.forEach(b => {
            const pill = document.createElement('div');
            const isActive = state.bottom && state.bottom.id === b.id;
            pill.className = `bottom-pill ${isActive ? 'active' : ''}`;
            pill.setAttribute('data-bottom-id', b.id);
            pill.innerHTML = `
                <div class="bottom-pill-header">
                    <span>${b.icon}</span> <span>${b.name}</span>
                </div>
                <div class="bottom-pill-desc">${b.desc}</div>
            `;

            pill.onclick = () => {
                document.querySelectorAll('.bottom-pill').forEach(el => el.classList.remove('active'));
                pill.classList.add('active');
                state.bottom = b;
                this.updateLiveStudio();
                this.showToast(`Đã chọn ${b.name} ✨`);
            };
            container.appendChild(pill);
        });
    },

    // -- 6. RENDER PHỤ KIỆN GEN Z (MẶC TRỰC TIẾP LÊN NHÂN VẬT) --
    renderAccessorySelector: function() {
        const container = document.getElementById('accessory-selector');
        if (!container) return;
        container.innerHTML = '';

        ACCESSORIES_DATA.forEach(acc => {
            const pill = document.createElement('div');
            const isChecked = state.accessories.some(x => x.id === acc.id);
            pill.className = `accessory-pill ${isChecked ? 'active' : ''}`;
            pill.setAttribute('data-acc-id', acc.id);
            pill.innerHTML = `<span>${acc.icon}</span> <span>${acc.name}</span>`;

            pill.onclick = () => {
                const existIndex = state.accessories.findIndex(x => x.id === acc.id);
                if (existIndex > -1) {
                    state.accessories.splice(existIndex, 1);
                    pill.classList.remove('active');
                    this.showToast(`Đã tháo ${acc.name}`);
                } else {
                    state.accessories.push(acc);
                    pill.classList.add('active');
                    this.showToast(`Đã mặc ${acc.name} lên nhân vật ✨`);
                }
                this.updateLiveStudio();
            };
            container.appendChild(pill);
        });
    },

    // -- 6. RENDER PHONG CÁCH (MOOD) --
    renderMoodSelector: function() {
        const container = document.getElementById('mood-selector');
        if (!container) return;
        container.innerHTML = '';

        MOODS.forEach((m, idx) => {
            const btn = document.createElement('button');
            const isActive = state.mood === m;
            btn.className = `pill-btn ${isActive ? 'active' : ''}`;
            btn.textContent = m;

            btn.onclick = () => {
                document.querySelectorAll('#mood-selector .pill-btn').forEach(el => el.classList.remove('active'));
                btn.classList.add('active');
                state.mood = m;
                this.updateLiveStudio();
            };
            container.appendChild(btn);
        });
    },

    // -- RENDER THỜI TIẾT / MÙA --
    renderWeatherSelector: function() {
        const container = document.getElementById('weather-selector');
        if (!container) return;
        container.innerHTML = '';

        WEATHERS.forEach((w, idx) => {
            const btn = document.createElement('button');
            const isActive = state.weather === w.name;
            btn.className = `pill-btn ${isActive ? 'active' : ''}`;
            btn.textContent = `${w.icon} ${w.name}`;

            btn.onclick = () => {
                document.querySelectorAll('#weather-selector .pill-btn').forEach(el => el.classList.remove('active'));
                btn.classList.add('active');
                state.weather = w.name;
                this.updateLiveStudio();
            };
            container.appendChild(btn);
        });
    },

    // -- RENDER CÁC PRESET CHO GEMINI AI STYLIST --
    renderAiPresets: function() {
        const container = document.getElementById('ai-presets-box');
        if (!container) return;
        container.innerHTML = '';

        GEMINI_AI_PRESETS.forEach(preset => {
            const chip = document.createElement('div');
            chip.className = 'ai-preset-chip';
            chip.textContent = preset.title;
            chip.onclick = () => {
                const input = document.getElementById('ai-prompt-input');
                if (input) input.value = preset.prompt;
                this.triggerAiStylist(preset);
            };
            container.appendChild(chip);
        });
    },

    // -- TÍNH TOÁN ĐỘ HÀI HÒA MÀU SẮC & VĂN HÓA --
    calculateHarmony: function() {
        let score = state.color.harmony || 7;

        if (state.mood === 'Minimalist' && ['trang_nga', 'den_huyen', 'be_nude'].includes(state.color.id)) score += 1;
        if (state.mood === 'Cổ điển' && ['do_son', 'vang_hoang_kim'].includes(state.color.id)) score += 1;
        if (state.mood === 'Streetwear' && state.color.id === 'den_huyen') score += 1;

        if (state.accessories.length > 5) score -= 2;
        else if (state.accessories.length > 3) score -= 1;
        if (state.accessories.length === 0) score -= 1;

        if (state.garment && state.garment.id === 'ao_ngu_than' && state.color.id === 'vang_hoang_kim') score -= 2;

        score = Math.max(1, Math.min(10, score));

        let desc = "";
        if (score >= 9) desc = "Tuyệt đỉnh! 🔥 Phối màu đạt tỉ lệ vàng, hiện đại và chuẩn mực.";
        else if (score >= 7) desc = "Rất đẹp! ✨ Tổng thể hài hòa, tôn dáng và mang hơi thở Gen Z.";
        else if (score >= 5) desc = "Khá ổn! 👍 Bạn có thể gia giảm phụ kiện để cân đối hơn.";
        else desc = "Khá táo bạo! 🤔 Hãy lưu ý ngữ cảnh không gian khi mặc.";

        return { score, desc };
    },

    // -- CẬP NHẬT LIVE STUDIO (TỨC THÌ TẠI CHỖ) --
    updateLiveStudio: function() {
        if (!state.garment) return;

        // 1. Cập nhật Showcase: Ảnh thời trang thực tế HOẶC Mannequin Vector
        const previewBox = document.getElementById('live-preview-box');
        if (previewBox) {
            if (state.viewMode === 'photo') {
                // Hiển thị ảnh thời trang chụp thực tế chất lượng cao
                previewBox.innerHTML = `
                    <div class="photo-showcase-wrap">
                        <img src="${state.garment.image}" alt="${state.garment.name}" class="photo-showcase-img" />
                        <div class="photo-overlay-badge">📸 Ảnh Lookbook Thực Tế</div>
                    </div>
                `;
            } else {
                // Hiển thị Mannequin đồ họa có mặc đầy đủ áo, hoa văn, quần/váy, mùa, phụ kiện
                const svgStr = this.buildGarmentSVG(
                    state.garment.id,
                    state.color.hex,
                    state.accessories,
                    state.bottom,
                    state.pattern,
                    state.mood,
                    state.weather
                );
                previewBox.innerHTML = `
                    <div class="mannequin-showcase-wrap">
                        ${svgStr}
                    </div>
                `;
            }
        }

        // 2. Tiêu đề & Phụ đề
        const titleEl = document.getElementById('live-title');
        const subtitleEl = document.getElementById('live-subtitle');
        if (titleEl) titleEl.textContent = `${state.garment.name} × ${state.mood}`;
        if (subtitleEl) subtitleEl.textContent = `Màu: ${state.color.name} • Vải: ${state.pattern.name} • ${state.bottom.name} • ${state.weather}`;

        // 3. Tags chi tiết trang phục đang phối
        const tagsContainer = document.getElementById('live-tags');
        if (tagsContainer) {
            tagsContainer.innerHTML = '';
            
            // Tag Màu
            const colorTag = document.createElement('span');
            colorTag.className = 'tag';
            colorTag.style.backgroundColor = state.color.hex;
            colorTag.style.color = ['trang_nga', 'vang_hoang_kim', 'be_nude'].includes(state.color.id) ? '#333' : '#fff';
            colorTag.textContent = state.color.name;
            tagsContainer.appendChild(colorTag);

            // Tag Hoa văn chất liệu
            const patternTag = document.createElement('span');
            patternTag.className = 'tag';
            patternTag.style.backgroundColor = 'rgba(218, 165, 32, 0.15)';
            patternTag.style.color = 'var(--color-secondary)';
            patternTag.style.border = '1px solid rgba(218, 165, 32, 0.4)';
            patternTag.textContent = `Vải ${state.pattern.name}`;
            tagsContainer.appendChild(patternTag);

            // Tag Quần / Váy
            const bottomTag = document.createElement('span');
            bottomTag.className = 'tag';
            bottomTag.style.backgroundColor = 'rgba(0, 168, 107, 0.12)';
            bottomTag.style.color = 'var(--color-accent)';
            bottomTag.style.border = '1px solid rgba(0, 168, 107, 0.4)';
            bottomTag.textContent = `${state.bottom.icon} ${state.bottom.name}`;
            tagsContainer.appendChild(bottomTag);

            // Tag Phong cách
            const moodTag = document.createElement('span');
            moodTag.className = 'tag';
            moodTag.style.backgroundColor = 'rgba(107, 63, 160, 0.12)';
            moodTag.style.color = 'var(--color-primary)';
            moodTag.style.border = '1px solid rgba(139, 0, 0, 0.2)';
            moodTag.textContent = `${state.mood}`;
            tagsContainer.appendChild(moodTag);

            // Tags Phụ kiện
            state.accessories.forEach(acc => {
                const accTag = document.createElement('span');
                accTag.className = 'tag accent';
                accTag.textContent = `${acc.icon} ${acc.name}`;
                tagsContainer.appendChild(accTag);
            });
        }

        // 4. Độ hài hòa màu sắc
        const harmony = this.calculateHarmony();
        const scoreCircle = document.getElementById('live-score-circle');
        const scoreText = document.getElementById('live-score-text');
        const scoreDesc = document.getElementById('live-score-desc');
        
        if (scoreText) scoreText.textContent = `${harmony.score}/10`;
        if (scoreDesc) scoreDesc.textContent = harmony.desc;
        if (scoreCircle) {
            scoreCircle.style.background = `conic-gradient(var(--color-primary) ${harmony.score * 36}deg, var(--color-border) 0)`;
        }

        // 5. Cảnh báo văn hóa thời gian thực
        let warnings = state.garment.warnings;
        if (state.garment.id === 'ao_ngu_than' && state.color.id === 'vang_hoang_kim') {
            warnings += ' ⚡ ĐẶC BIỆT: Màu vàng hoàng kim ở Áo ngũ thân xưa kia chỉ dành riêng cho Hoàng đế triều Nguyễn!';
        }
        if (state.garment.id === 'ao_dai' && state.bottom && state.bottom.id === 'vay_dup_den') {
            warnings += ' ⚠️ Váy đụp vốn thuộc trang phục Bắc Bộ (Áo tứ thân / Áo yếm); phối cùng Áo dài là cách tân gây nhiều tranh cãi, nên cân nhắc bối cảnh sự kiện.';
        }
        if (state.garment.id === 'ao_tu_than' && state.bottom && state.bottom.id === 'quan_jeans') {
            warnings += ' 👖 Áo tứ thân + Quần jeans là phong cách Remix phá cách Gen Z, phù hợp dạo phố, chụp ảnh concept hơn là lễ hội trang nghiêm.';
        }
        if (state.garment.id === 'ao_ba_ba' && state.bottom && state.bottom.id === 'vay_dup_den') {
            warnings += ' 🌾 Áo bà ba Nam Bộ truyền thống phối cùng Quần lụa hoặc Quần jeans; váy đụp Kinh Bắc có sự sai khác về bản sắc văn hóa địa phương.';
        }
        if (state.garment.id === 'ao_dai' && state.accessories.some(a => a.id === 'sneakers')) {
            warnings += ' 👟 Áo dài + Sneakers là phong cách năng động — hãy chọn các dịp dạo phố/hội nhóm phù hợp.';
        }
        const modernCount = state.accessories.filter(a => !a.traditional).length;
        if (modernCount >= 3) {
            warnings += ' 🔄 Bạn đang phối nhiều phụ kiện hiện đại — thử thêm phụ kiện truyền thống (khăn đóng, nón lá, túi thêu) để giữ nét tinh hoa di sản.';
        }
        
        const warningText = document.getElementById('live-warning-text');
        if (warningText) warningText.textContent = warnings;

        // 6. Chi tiết văn hóa
        const originEl = document.getElementById('culture-origin');
        const meaningEl = document.getElementById('culture-meaning');
        const occasionsEl = document.getElementById('culture-occasions');

        if (originEl) originEl.textContent = state.garment.origin;
        if (meaningEl) meaningEl.textContent = state.garment.meaning;
        if (occasionsEl) occasionsEl.textContent = state.garment.occasions;
    },

    // ==========================================
    // TÍNH NĂNG 1: GEMINI AI STYLIST
    // ==========================================
    triggerAiStylist: function(presetDirect = null) {
        const input = document.getElementById('ai-prompt-input');
        const promptText = input ? input.value.trim() : '';

        if (!promptText && !presetDirect) {
            this.showToast('Vui lòng nhập mong muốn phối đồ của bạn! 💬');
            if (input) input.focus();
            return;
        }

        const aiStatusBox = document.getElementById('ai-status-box');
        const aiResponseBox = document.getElementById('ai-response-text');
        
        if (aiStatusBox) aiStatusBox.style.display = 'block';
        if (aiResponseBox) aiResponseBox.innerHTML = '✨ <strong>Gemini AI đang phân tích dữ liệu văn hóa và phong cách thời trang Gen Z...</strong>';

        setTimeout(() => {
            let matchedPreset = presetDirect;
            
            if (!matchedPreset) {
                const lower = promptText.toLowerCase();
                if (lower.includes('tết') || lower.includes('đỏ') || lower.includes('xuân')) {
                    matchedPreset = GEMINI_AI_PRESETS[0];
                } else if (lower.includes('hoàng thành') || lower.includes('cung đình') || lower.includes('kỷ yếu') || lower.includes('huế')) {
                    matchedPreset = GEMINI_AI_PRESETS[1];
                } else if (lower.includes('miền tây') || lower.includes('bà ba') || lower.includes('cafe') || lower.includes('sài gòn')) {
                    matchedPreset = GEMINI_AI_PRESETS[2];
                } else {
                    matchedPreset = GEMINI_AI_PRESETS[3];
                }
            }

            const cfg = matchedPreset.config;
            state.garment = CULTURAL_DATA[cfg.garmentId] || state.garment;
            state.color = COLORS_DATA.find(c => c.id === cfg.colorId) || state.color;
            state.pattern = PATTERNS_DATA.find(p => p.id === cfg.patternId) || state.pattern;
            if (cfg.bottomId) {
                state.bottom = BOTTOMS_DATA.find(b => b.id === cfg.bottomId) || state.bottom;
            }
            state.mood = cfg.mood;
            state.weather = cfg.weather;
            state.accessories = ACCESSORIES_DATA.filter(a => cfg.accessories.includes(a.id));

            this.renderGarmentSelector();
            this.renderColorSelector();
            this.renderPatternSelector();
            this.renderBottomSelector();
            this.renderAccessorySelector();
            this.renderMoodSelector();
            this.renderWeatherSelector();
            this.updateLiveStudio();

            if (aiResponseBox) {
                aiResponseBox.innerHTML = `<strong>💡 Gemini AI Stylist tư vấn:</strong> ${matchedPreset.advice}`;
            }

            this.showToast('Gemini AI đã hoàn thành phối đồ cho bạn! ✨');
        }, 600);
    },

    // ==========================================
    // TÍNH NĂNG 2: XUẤT THẺ ẢNH STORY LOOKBOOK (PNG 9:16)
    // ==========================================
    exportStoryCard: function(customOutfit = null) {
        const outfit = customOutfit || {
            garment: state.garment,
            bottom: state.bottom,
            color: state.color,
            pattern: state.pattern,
            mood: state.mood,
            weather: state.weather,
            accessories: state.accessories,
            image: state.garment.image
        };

        this.showToast('Đang tạo thẻ ảnh Story 9:16 chất lượng cao... 🎨');

        const canvas = document.createElement('canvas');
        canvas.width = 720;
        canvas.height = 1280;
        const ctx = canvas.getContext('2d');

        // 1. Nền Gradient hoàng gia sang trọng
        const bgGrad = ctx.createLinearGradient(0, 0, 720, 1280);
        bgGrad.addColorStop(0, '#1A0B0E');
        bgGrad.addColorStop(0.5, '#2D0A12');
        bgGrad.addColorStop(1, '#0F0507');
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, 720, 1280);

        // 2. Viền hoa văn vàng kim
        ctx.strokeStyle = '#DAA520';
        ctx.lineWidth = 3;
        ctx.strokeRect(30, 30, 660, 1220);
        
        ctx.lineWidth = 1;
        ctx.strokeRect(40, 40, 640, 1200);

        // 3. Header Tiêu đề
        ctx.fillStyle = '#DAA520';
        ctx.font = 'bold 32px "Playfair Display", serif';
        ctx.textAlign = 'center';
        ctx.fillText('🏮 VIỆT PHỤC REMIX', 360, 95);

        ctx.fillStyle = '#E0E0E0';
        ctx.font = '16px "Be Vietnam Pro", sans-serif';
        ctx.fillText('DI SẢN TRUYỀN THỐNG × PHONG CÁCH GEN Z', 360, 130);

        // 4. Khung hình chính giữa
        ctx.fillStyle = 'rgba(218, 165, 32, 0.12)';
        drawRoundedRect(ctx, 110, 175, 500, 580, 20);
        ctx.fill();
        ctx.strokeStyle = 'rgba(218, 165, 32, 0.5)';
        ctx.lineWidth = 2;
        ctx.stroke();

        const finishCanvas = () => {
            // 6. Thông tin trang phục
            ctx.fillStyle = '#FFFFFF';
            ctx.font = 'bold 38px "Playfair Display", serif';
            ctx.fillText(`${outfit.garment.name} × ${outfit.mood}`, 360, 810);

            ctx.fillStyle = '#FFD700';
            ctx.font = '20px "Be Vietnam Pro", sans-serif';
            const bName = outfit.bottom ? outfit.bottom.name : (outfit.bottomName || 'Quần lụa trắng');
            const pName = outfit.pattern ? outfit.pattern.name : (outfit.patternName || 'Trơn');
            ctx.fillText(`Màu ${outfit.color.name}  •  Vải ${pName}  •  ${bName}`, 360, 850);

            // 7. Bảng Phụ kiện
            let accList = outfit.accessories || [];
            let accText = accList.length > 0 
                ? 'Phụ kiện: ' + accList.map(a => a.name).join(' • ')
                : 'Phụ kiện: Tối giản (Minimalist)';
            ctx.fillStyle = '#CCCCCC';
            ctx.font = '18px "Be Vietnam Pro", sans-serif';
            ctx.fillText(accText, 360, 895);

            // 8. Box Đánh giá hài hòa
            ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
            drawRoundedRect(ctx, 110, 935, 500, 110, 16);
            ctx.fill();

            const harmony = app.calculateHarmony();
            ctx.fillStyle = '#FFD700';
            ctx.font = 'bold 34px "Be Vietnam Pro", sans-serif';
            ctx.fillText(`★ ${harmony.score}/10 Điểm Hài Hòa`, 360, 985);

            ctx.fillStyle = '#EAEAEA';
            ctx.font = '16px "Be Vietnam Pro", sans-serif';
            ctx.fillText(harmony.desc, 360, 1018);

            // 9. Lời nhắn văn hóa
            ctx.fillStyle = 'rgba(218, 165, 32, 0.95)';
            ctx.font = 'italic 18px "Be Vietnam Pro", sans-serif';
            ctx.fillText('“Mặc cổ phục đúng cách — Tự hào bản sắc Việt Nam”', 360, 1115);

            // 10. Footer Card
            ctx.fillStyle = '#888888';
            ctx.font = '14px "Be Vietnam Pro", sans-serif';
            ctx.fillText('Đề thi Audition 2026 • viet-phuc-remix.web', 360, 1190);

            // 11. Tự động tải ảnh về và mở modal preview
            const imageURL = canvas.toDataURL('image/png');
            
            const gId = (outfit.garment && outfit.garment.id) ? outfit.garment.id : 'outfit';
            const downloadLink = document.createElement('a');
            downloadLink.download = `viet-phuc-remix-${gId}-${Date.now()}.png`;
            downloadLink.href = imageURL;
            downloadLink.click();

            const modal = document.getElementById('story-modal');
            const modalImg = document.getElementById('story-modal-img');
            if (modal && modalImg) {
                modalImg.src = imageURL;
                modal.style.display = 'flex';
            }

            app.showToast('Đã xuất và tải thẻ ảnh Story thành công! 📸');
        };

        const renderMannequinArtwork = () => {
            const hex = outfit.color ? outfit.color.hex : (outfit.colorHex || '#DC143C');
            const bObj = outfit.bottom || (outfit.bottomId ? { id: outfit.bottomId } : null);
            const pObj = outfit.pattern || (outfit.patternName ? { name: outfit.patternName } : null);
            const svgStr = app.buildGarmentSVG(
                outfit.garment.id,
                hex,
                outfit.accessories || [],
                bObj,
                pObj,
                outfit.mood,
                outfit.weather
            );
            const svgImg = new Image();
            svgImg.onload = () => {
                ctx.save();
                drawRoundedRect(ctx, 120, 185, 480, 560, 16);
                ctx.fillStyle = '#200A10';
                ctx.fill();
                ctx.clip();
                // Vẽ Mannequin tỉ lệ 200x320 căn giữa hoàn mỹ
                ctx.drawImage(svgImg, 180, 205, 360, 520);
                ctx.restore();
                finishCanvas();
            };
            svgImg.onerror = () => {
                finishCanvas();
            };
            svgImg.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgStr);
        };

        const useMannequin = outfit.isMannequin !== undefined ? outfit.isMannequin : (state.viewMode === 'mannequin');
        if (useMannequin) {
            renderMannequinArtwork();
        } else {
            const img = new Image();
            if (window.location.protocol.startsWith('http')) {
                img.crossOrigin = 'anonymous';
            }
            img.onload = () => {
                ctx.save();
                drawRoundedRect(ctx, 120, 185, 480, 560, 16);
                ctx.clip();
                ctx.drawImage(img, 120, 185, 480, 560);
                ctx.restore();
                finishCanvas();
            };
            img.onerror = () => {
                // Fallback nếu ảnh không load được (hoặc local file CORS) -> chuyển sang vẽ Mannequin SVG vector
                renderMannequinArtwork();
            };
            img.src = outfit.image || (CULTURAL_DATA[outfit.garment.id] ? CULTURAL_DATA[outfit.garment.id].image : 'images/ao_dai.jpg');
        }
    },

    closeStoryModal: function() {
        const modal = document.getElementById('story-modal');
        if (modal) modal.style.display = 'none';
    },

    // ==========================================
    // TÍNH NĂNG 3: XEM LẠI VÀ TẢI VỀ TỪ LOOKBOOK
    // ==========================================
    viewLookbookDetail: function(id) {
        const item = state.lookbook.find(x => x.id === id);
        if (!item) return;

        const modal = document.getElementById('lookbook-detail-modal');
        const modalContent = document.getElementById('lookbook-detail-body');
        if (!modal || !modalContent) return;

        const garmentInfo = CULTURAL_DATA[item.garmentId] || {};
        const imgSrc = item.image || garmentInfo.image || 'images/ao_dai.jpg';

        modalContent.innerHTML = `
            <div class="lb-modal-grid">
                <div class="lb-modal-img-wrap">
                    <img src="${imgSrc}" alt="${item.garmentName}" class="lb-modal-img" />
                </div>
                <div class="lb-modal-info">
                    <h3 style="color:var(--color-primary); font-size:1.8rem; margin-bottom:4px;">${item.garmentName} × ${item.mood}</h3>
                    <p style="color:var(--color-text-light); font-size:0.9rem; margin-bottom:14px;">Ngày tạo: ${item.date} • ${item.weather}</p>

                    <div style="margin-bottom:14px; display:flex; gap:6px; flex-wrap:wrap;">
                        <span class="tag" style="background:${item.colorHex}; color:#fff; font-weight:600;">Màu ${item.colorName}</span>
                        <span class="tag" style="background:rgba(218,165,32,0.2); color:var(--color-text);">Vải ${item.patternName}</span>
                        <span class="tag" style="background:rgba(0,168,107,0.15); color:var(--color-accent); font-weight:600;">${item.bottomIcon || '👖'} ${item.bottomName || 'Quần lụa trắng'}</span>
                        <span class="tag" style="background:rgba(139,0,0,0.1); color:var(--color-primary);">${item.mood}</span>
                    </div>

                    <div style="margin-bottom:16px;">
                        <strong style="display:block; font-size:0.9rem; margin-bottom:6px;">Phụ kiện phối kèm:</strong>
                        <div class="tags">
                            ${(item.accessories || []).map(a => `<span class="tag accent">${a.icon} ${a.name}</span>`).join('')}
                        </div>
                    </div>

                    <div class="cultural-info" style="margin-bottom:18px;">
                        <h5 style="color:var(--color-secondary); margin-bottom:6px;">💡 Đánh giá phong cách:</h5>
                        <p style="font-size:0.88rem;">${item.advice || 'Sự kết hợp giữa cổ phục và phụ kiện hiện đại tạo nên diện mạo ấn tượng, tự tin cho bạn trẻ.'}</p>
                    </div>

                    <div style="display:flex; gap:10px; flex-wrap:wrap;">
                        <button class="btn btn-story" style="flex:1;" onclick="app.exportStoryCardByItemId('${item.id}')">
                            📥 Tải Về Thẻ Ảnh Story (PNG)
                        </button>
                        <button class="btn btn-outline" onclick="app.loadLookbookToStudio('${item.id}')">
                            ✏️ Mở Trong Studio
                        </button>
                    </div>
                </div>
            </div>
        `;

        modal.style.display = 'flex';
    },

    closeLookbookDetailModal: function() {
        const modal = document.getElementById('lookbook-detail-modal');
        if (modal) modal.style.display = 'none';
    },

    exportStoryCardByItemId: function(id) {
        const item = state.lookbook.find(x => x.id === id);
        if (!item) return;
        
        const outfit = {
            garment: CULTURAL_DATA[item.garmentId] || { id: item.garmentId, name: item.garmentName },
            bottom: { id: item.bottomId, name: item.bottomName || 'Quần lụa trắng', icon: item.bottomIcon || '👖' },
            color: { id: item.colorId, name: item.colorName, hex: item.colorHex },
            pattern: { name: item.patternName },
            mood: item.mood,
            weather: item.weather,
            accessories: item.accessories || [],
            image: item.image || (CULTURAL_DATA[item.garmentId] ? CULTURAL_DATA[item.garmentId].image : 'images/ao_dai.jpg')
        };
        this.exportStoryCard(outfit);
    },

    loadLookbookToStudio: function(id) {
        const item = state.lookbook.find(x => x.id === id);
        if (!item) return;

        state.garment = CULTURAL_DATA[item.garmentId] || state.garment;
        state.bottom = BOTTOMS_DATA.find(b => b.id === item.bottomId || b.name === item.bottomName) || BOTTOMS_DATA[0];
        state.color = COLORS_DATA.find(c => c.id === item.colorId) || state.color;
        state.pattern = PATTERNS_DATA.find(p => p.name === item.patternName) || state.pattern;
        state.mood = item.mood;
        state.weather = item.weather;
        state.accessories = (item.accessories || []).map(a => ACCESSORIES_DATA.find(x => x.id === a.id) || a);

        this.closeLookbookDetailModal();
        this.navigate('studio');
        this.renderGarmentSelector();
        this.renderColorSelector();
        this.renderPatternSelector();
        this.renderBottomSelector();
        this.renderAccessorySelector();
        this.renderMoodSelector();
        this.renderWeatherSelector();
        this.updateLiveStudio();

        this.showToast(`Đã mở ${item.garmentName} trong Studio! ✨`);
    },

    saveToLookbook: function() {
        if (!state.garment) return;
        const entry = {
            id: Date.now().toString(),
            date: new Date().toLocaleDateString('vi-VN'),
            garmentId: state.garment.id,
            garmentName: state.garment.name,
            bottomId: state.bottom.id,
            bottomName: state.bottom.name,
            bottomIcon: state.bottom.icon,
            colorId: state.color.id,
            colorName: state.color.name,
            colorHex: state.color.hex,
            patternName: state.pattern.name,
            mood: state.mood,
            weather: state.weather,
            image: state.garment.image,
            accessories: state.accessories.map(a => ({ id: a.id, name: a.name, icon: a.icon })),
            advice: `Phong cách ${state.mood} với gam màu ${state.color.name} phối cùng ${state.bottom.name} tôn vinh vẻ đẹp di sản ${state.garment.name}.`
        };

        state.lookbook.unshift(entry);
        try {
            localStorage.setItem('vietphuc_lookbook', JSON.stringify(state.lookbook));
        } catch (e) {}

        this.renderLookbook();
        this.showToast('Đã lưu thiết kế vào Lookbook! 📸');
    },

    renderLookbook: function() {
        const container = document.getElementById('lookbook-container');
        const empty = document.getElementById('empty-lookbook');
        if (!container || !empty) return;
        container.innerHTML = '';

        if (!state.lookbook || state.lookbook.length === 0) {
            container.style.display = 'none';
            empty.style.display = 'block';
            return;
        }

        container.style.display = 'grid';
        empty.style.display = 'none';

        state.lookbook.forEach(item => {
            const div = document.createElement('div');
            div.className = 'lookbook-item';
            
            const garmentInfo = CULTURAL_DATA[item.garmentId] || {};
            const imgSrc = item.image || garmentInfo.image || 'images/ao_dai.jpg';

            let accHtml = '';
            if (item.accessories && item.accessories.length > 0) {
                const max = Math.min(item.accessories.length, 3);
                for (let j = 0; j < max; j++) {
                    accHtml += `<span class="tag" style="background:rgba(139,0,0,0.08);color:var(--color-text);font-size:0.75rem;">${item.accessories[j].icon} ${item.accessories[j].name}</span>`;
                }
                if (item.accessories.length > 3) {
                    accHtml += `<span class="tag" style="background:rgba(139,0,0,0.08);color:var(--color-text);font-size:0.75rem;">+${item.accessories.length - 3}</span>`;
                }
            }

            div.innerHTML = `
                <div class="lookbook-thumb-wrap" onclick="app.viewLookbookDetail('${item.id}')">
                    <img src="${imgSrc}" alt="${item.garmentName}" class="lookbook-thumb-img" onerror="this.src='images/ao_dai.jpg'" />
                    <div class="lookbook-hover-overlay">
                        <span>👁️ Bấm để xem chi tiết</span>
                    </div>
                </div>
                <div class="lookbook-details">
                    <h3 style="color:var(--color-primary);margin-bottom:4px;font-size:1.15rem;">${item.garmentName} × ${item.mood}</h3>
                    <p style="font-size:0.85rem;color:var(--color-text-light);margin-bottom:8px;">${item.date} • Màu ${item.colorName} • ${item.bottomName || 'Quần lụa'}</p>
                    <div class="tags" style="margin-bottom: 14px;">${accHtml}</div>
                    
                    <div class="lookbook-card-actions">
                        <button class="btn btn-story btn-sm" onclick="app.exportStoryCardByItemId('${item.id}')" title="Tải về thẻ ảnh Story 9:16">
                            📥 Tải Thẻ Ảnh
                        </button>
                        <button class="btn btn-outline btn-sm" onclick="app.viewLookbookDetail('${item.id}')" title="Xem lại chi tiết">
                            👁️ Xem Lại
                        </button>
                        <button class="btn btn-outline btn-sm btn-icon" onclick="app.deleteLookbook('${item.id}')" title="Xóa mẫu này">
                            🗑️
                        </button>
                    </div>
                </div>
            `;
            container.appendChild(div);
        });
    },

    deleteLookbook: function(id) {
        if (confirm('Bạn có chắc muốn xóa thiết kế này khỏi Lookbook?')) {
            state.lookbook = state.lookbook.filter(x => x.id !== id);
            try {
                localStorage.setItem('vietphuc_lookbook', JSON.stringify(state.lookbook));
            } catch (e) {}
            this.renderLookbook();
            this.showToast('Đã xóa thiết kế 🗑️');
        }
    },

    shareOutfit: function() {
        if (!state.garment) return;
        const text = `🏮 Việt Phục Remix\n`
            + `👗 ${state.garment.name} (Màu ${state.color.name})\n`
            + `👖 ${state.bottom.name}\n`
            + `🎭 Phong cách: ${state.mood} • Hoa văn: ${state.pattern.name} • ${state.weather}\n`
            + (state.accessories.length > 0 ? `💎 Phụ kiện mặc kèm: ${state.accessories.map(a => `${a.icon} ${a.name}`).join(', ')}\n` : '')
            + `✨ Phối trang phục truyền thống Việt Nam theo phong cách Gen Z!`;

        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(() => {
                this.showToast('Đã copy đoạn giới thiệu để chia sẻ! 🔗');
            });
        } else {
            const ta = document.createElement('textarea');
            ta.value = text;
            document.body.appendChild(ta);
            ta.select();
            document.execCommand('copy');
            document.body.removeChild(ta);
            this.showToast('Đã copy đoạn giới thiệu để chia sẻ! 🔗');
        }
    },

    // ==========================================
    // TÍNH NĂNG 4: SO SÁNH 2 MẪU LOOKBOOK
    // ==========================================
    openCompareModal: function() {
        if (!state.lookbook || state.lookbook.length < 2) {
            this.showToast('Bạn cần có ít nhất 2 thiết kế trong Lookbook để so sánh! 📸');
            return;
        }

        const modal = document.getElementById('compare-modal');
        if (!modal) return;

        const id1 = state.lookbook[0].id;
        const id2 = state.lookbook[1].id;
        this.renderCompareView(id1, id2);
        modal.style.display = 'flex';
    },

    closeCompareModal: function() {
        const modal = document.getElementById('compare-modal');
        if (modal) modal.style.display = 'none';
    },

    renderCompareView: function(id1, id2) {
        const container = document.getElementById('compare-modal-body');
        if (!container) return;

        const item1 = state.lookbook.find(x => x.id === id1) || state.lookbook[0];
        const item2 = state.lookbook.find(x => x.id === id2) || state.lookbook[1] || state.lookbook[0];

        const options1 = state.lookbook.map(item => `
            <option value="${item.id}" ${item.id === item1.id ? 'selected' : ''}>
                ${item.garmentName} × ${item.mood} (${item.date})
            </option>
        `).join('');

        const options2 = state.lookbook.map(item => `
            <option value="${item.id}" ${item.id === item2.id ? 'selected' : ''}>
                ${item.garmentName} × ${item.mood} (${item.date})
            </option>
        `).join('');

        const renderCol = (item) => {
            const garment = CULTURAL_DATA[item.garmentId] || {};
            const imgSrc = item.image || garment.image || 'images/ao_dai.jpg';
            const accList = item.accessories || [];
            return `
                <div class="compare-col">
                    <div class="compare-img-wrap">
                        <img src="${imgSrc}" alt="${item.garmentName}" class="compare-img" onerror="this.src='images/ao_dai.jpg'" />
                    </div>
                    <h3 style="color:var(--color-primary); font-size:1.35rem; margin-top:4px;">
                        ${item.garmentName} × ${item.mood}
                    </h3>
                    <div class="compare-row">
                        <strong>Màu sắc & Hoa văn:</strong>
                        <div style="display:flex; gap:6px; align-items:center; flex-wrap:wrap; margin-top:4px;">
                            <span class="tag" style="background:${item.colorHex}; color:#fff; font-size:0.78rem;">Màu ${item.colorName}</span>
                            <span class="tag" style="background:rgba(218,165,32,0.18); color:var(--color-text); font-size:0.78rem;">Vải ${item.patternName}</span>
                        </div>
                    </div>
                    <div class="compare-row">
                        <strong>Trang phục Quần / Váy:</strong>
                        <span class="tag" style="background:rgba(0,168,107,0.15); color:var(--color-accent); font-weight:600; font-size:0.78rem; display:inline-block; margin-top:4px;">
                            ${item.bottomIcon || '👖'} ${item.bottomName || 'Quần lụa'}
                        </span>
                    </div>
                    <div class="compare-row">
                        <strong>Mùa / Thời tiết:</strong>
                        <span>${item.weather || 'Xuân / Hè'}</span>
                    </div>
                    <div class="compare-row">
                        <strong>Phụ kiện kèm theo (${accList.length}):</strong>
                        <div class="tags" style="margin-top:4px;">
                            ${accList.length > 0 ? accList.map(a => `<span class="tag accent" style="font-size:0.75rem;">${a.icon} ${a.name}</span>`).join('') : '<span style="font-size:0.82rem; color:var(--color-text-light);">Tối giản (Không phụ kiện)</span>'}
                        </div>
                    </div>
                    <div class="compare-row">
                        <strong>Đánh giá phong cách:</strong>
                        <p style="font-size:0.82rem; color:var(--color-text-light); margin-top:2px;">${item.advice || 'Phong cách hòa quyện giữa di sản và hiện đại.'}</p>
                    </div>
                    <div class="compare-row" style="margin-top:auto; padding-top:10px; border-top:1px solid var(--color-border);">
                        <div style="display:flex; gap:8px;">
                            <button class="btn btn-outline btn-sm" style="flex:1;" onclick="app.closeCompareModal(); app.loadLookbookToStudio('${item.id}');">
                                ✏️ Mở Studio
                            </button>
                            <button class="btn btn-story btn-sm" onclick="app.exportStoryCardByItemId('${item.id}')" title="Tải thẻ ảnh Story">
                                📥 Tải PNG
                            </button>
                        </div>
                    </div>
                </div>
            `;
        };

        container.innerHTML = `
            <div class="compare-selectors-bar">
                <div class="compare-select-wrap">
                    <label>📌 Chọn Thiết Kế 1:</label>
                    <select class="compare-select" id="select-compare-1" onchange="app.renderCompareView(this.value, document.getElementById('select-compare-2').value)">
                        ${options1}
                    </select>
                </div>
                <div class="compare-select-wrap">
                    <label>📌 Chọn Thiết Kế 2:</label>
                    <select class="compare-select" id="select-compare-2" onchange="app.renderCompareView(document.getElementById('select-compare-1').value, this.value)">
                        ${options2}
                    </select>
                </div>
            </div>
            <div class="compare-grid">
                ${renderCol(item1)}
                ${renderCol(item2)}
            </div>
        `;
    }
};

// Khởi chạy ứng dụng
document.addEventListener('DOMContentLoaded', () => {
    app.init();

    // Lắng nghe sự kiện cuộn trang để hiện/ẩn nút Back to Top
    window.addEventListener('scroll', () => {
        const btn = document.getElementById('btn-back-to-top');
        if (btn) {
            if (window.scrollY > 280) {
                btn.classList.add('visible');
            } else {
                btn.classList.remove('visible');
            }
        }
    });
});
