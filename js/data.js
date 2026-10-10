// ==========================================
// VIỆT PHỤC REMIX - DATABASE & CONSTANTS
// High-Detail Fashion Mannequin Vector System
// ==========================================

// CÁC HOA VĂN DỆT CHẤT LIỆU DÙNG CHUNG CHO MỌI VIỆT PHỤC
const SVG_PATTERNS_DEFS = '<pattern id="pat-gam" width="18" height="18" patternUnits="userSpaceOnUse">'
    + '<path d="M 0,9 L 9,0 L 18,9 L 9,18 Z" fill="none" stroke="rgba(255,255,255,0.25)" stroke-width="0.8"/>'
    + '<circle cx="9" cy="9" r="2.5" fill="none" stroke="rgba(255,255,255,0.28)" stroke-width="0.7"/>'
    + '<circle cx="0" cy="0" r="2" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="0.6"/>'
    + '<circle cx="18" cy="18" r="2" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="0.6"/>'
    + '</pattern>'
    + '<pattern id="pat-soc" width="8" height="8" patternUnits="userSpaceOnUse">'
    + '<line x1="0" y1="0" x2="0" y2="8" stroke="rgba(255,255,255,0.22)" stroke-width="1.2"/>'
    + '</pattern>'
    + '<pattern id="pat-batik" width="24" height="24" patternUnits="userSpaceOnUse">'
    + '<path d="M 0,12 Q 6,6 12,12 Q 18,18 24,12" fill="none" stroke="rgba(255,255,255,0.28)" stroke-width="1"/>'
    + '<path d="M 0,6 Q 6,0 12,6 Q 18,12 24,6" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="0.8"/>'
    + '<path d="M 0,18 Q 6,12 12,18 Q 18,24 24,18" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="0.8"/>'
    + '</pattern>';

// SVG Minh họa MANNEQUIN THỜI TRANG CHI TIẾT CAO (Tỉ lệ chuẩn 200x320)
const GARMENT_SVGS = {
    ao_dai: '<svg viewBox="0 0 200 320" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" class="mannequin-svg">'
        + '<defs>'
        + '<linearGradient id="skinGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#FFE0CC"/><stop offset="100%" stop-color="#F5CBA7"/></linearGradient>'
        + '<linearGradient id="hairGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#1A1A1A"/><stop offset="100%" stop-color="#0A0A0A"/></linearGradient>'
        + '<linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#FFDF73"/><stop offset="100%" stop-color="#D4AC0D"/></linearGradient>'
        + '<filter id="clothShadow" x="-10%" y="-10%" width="120%" height="120%"><feDropShadow dx="0" dy="2" stdDeviation="2" flood-opacity="0.18"/></filter>'
        + SVG_PATTERNS_DEFS
        + '</defs>'
        // 1. Tóc sau
        + '<path d="M 85,25 Q 100,10 115,25 Q 120,45 118,60 Q 100,55 82,60 Z" fill="url(#hairGrad)"/>'
        // 2. Cổ & Vai Mannequin
        + '<path d="M 94,36 L 94,52 L 106,52 L 106,36 Z" fill="url(#skinGrad)"/>'
        + '<path d="M 76,52 Q 100,48 124,52 L 132,65 Q 100,58 68,65 Z" fill="url(#skinGrad)"/>'
        // 3. Khuôn mặt & Đường nét thanh tú
        + '<path d="M 88,26 C 88,14 112,14 112,26 C 112,38 104,44 100,44 C 96,44 88,38 88,26 Z" fill="url(#skinGrad)"/>'
        + '<path d="M 86,22 C 86,10 114,10 114,22 C 114,18 106,12 100,12 C 94,12 86,18 86,22 Z" fill="url(#hairGrad)"/>'
        + '<circle cx="100" cy="8" r="6.5" fill="url(#hairGrad)"/>'
        + '<path d="M 97,7 L 108,4" stroke="#DAA520" stroke-width="1.4" stroke-linecap="round"/>'
        + '<ellipse cx="95" cy="27" rx="1.5" ry="0.9" fill="#222"/>'
        + '<ellipse cx="105" cy="27" rx="1.5" ry="0.9" fill="#222"/>'
        + '<path d="M 93,24 Q 95,23 97,24" stroke="#333" stroke-width="0.6" fill="none"/>'
        + '<path d="M 103,24 Q 105,23 107,24" stroke="#333" stroke-width="0.6" fill="none"/>'
        + '<path d="M 100,28 L 99.5,32 L 100.5,32" stroke="#D98880" stroke-width="0.6" fill="none"/>'
        + '<path d="M 98,36 Q 100,38 102,36 Q 100,36.5 98,36" fill="#C0392B"/>'
        // 4. LỚP QUẦN / VÁY ĐƯỢC CHỌN (BOTTOM_LAYER)
        + '<!-- BOTTOM_LAYER -->'
        // 5. Tà áo sau Áo Dài
        + '<path d="M 80,115 C 60,150 52,260 56,275 C 80,282 120,282 144,275 C 148,260 140,150 120,115 Z" fill="GARMENT_COLOR" opacity="0.75"/>'
        + '<path d="M 80,115 C 60,150 52,260 56,275 C 80,282 120,282 144,275 C 148,260 140,150 120,115 Z" fill="PATTERN_FILL" opacity="0.6"/>'
        // 6. Cánh tay áo Raglan
        + '<path d="M 76,52 L 40,125 L 52,130 L 80,68 Z" fill="GARMENT_COLOR" filter="url(#clothShadow)"/>'
        + '<path d="M 76,52 L 40,125 L 52,130 L 80,68 Z" fill="PATTERN_FILL" opacity="0.6"/>'
        + '<path d="M 124,52 L 160,125 L 148,130 L 120,68 Z" fill="GARMENT_COLOR" filter="url(#clothShadow)"/>'
        + '<path d="M 124,52 L 160,125 L 148,130 L 120,68 Z" fill="PATTERN_FILL" opacity="0.6"/>'
        + '<path d="M 38,124 Q 35,134 42,134 L 48,128 Z" fill="url(#skinGrad)"/>'
        + '<path d="M 162,124 Q 165,134 158,134 L 152,128 Z" fill="url(#skinGrad)"/>'
        // 7. Thân trước & Tà trước Áo Dài
        + '<path d="M 88,52 C 78,72 82,105 84,115 C 66,155 60,255 64,270 C 84,276 116,276 136,270 C 140,255 134,155 116,115 C 118,105 122,72 112,52 Z" fill="GARMENT_COLOR" filter="url(#clothShadow)"/>'
        + '<path d="M 88,52 C 78,72 82,105 84,115 C 66,155 60,255 64,270 C 84,276 116,276 136,270 C 140,255 134,155 116,115 C 118,105 122,72 112,52 Z" fill="PATTERN_FILL" opacity="0.6"/>'
        // Hoa văn Thêu Hoa Sen đặc biệt (nếu chọn pattern Thêu hoa)
        + '<!-- FLORAL_EMBROIDERY_LAYER -->'
        // Nếp gấp eo & xẻ tà
        + '<path d="M 84,115 Q 100,122 116,115" stroke="rgba(0,0,0,0.18)" stroke-width="0.9" fill="none"/>'
        + '<path d="M 86,115 Q 82,150 86,220" stroke="rgba(0,0,0,0.08)" stroke-width="0.8" fill="none"/>'
        + '<path d="M 114,115 Q 118,150 114,220" stroke="rgba(0,0,0,0.08)" stroke-width="0.8" fill="none"/>'
        // Cổ đứng lập lĩnh 3cm & Hàng khuy bấm ngực chéo
        + '<path d="M 94,44 L 106,44 L 107,52 L 93,52 Z" fill="GARMENT_COLOR" stroke="url(#goldGrad)" stroke-width="0.9"/>'
        + '<path d="M 100,52 Q 108,60 116,68" stroke="url(#goldGrad)" stroke-width="1.3" fill="none"/>'
        + '<circle cx="102" cy="54" r="1.3" fill="#DAA520"/>'
        + '<circle cx="106" cy="58" r="1.3" fill="#DAA520"/>'
        + '<circle cx="110" cy="62" r="1.3" fill="#DAA520"/>'
        + '<circle cx="114" cy="66" r="1.3" fill="#DAA520"/>'
        // LỚP MÙA (SEASON_LAYER) & PHONG CÁCH (MOOD_LAYER)
        + '<!-- MOOD_LAYER -->'
        + '<!-- SEASON_LAYER -->'
        // LỚP PHỤ KIỆN ĐƯỢC CHỌN
        + '<!-- ACCESSORY_LAYERS -->'
        + '</svg>',

    ao_tu_than: '<svg viewBox="0 0 200 320" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" class="mannequin-svg">'
        + '<defs>'
        + '<linearGradient id="skinGrad2" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#FFE0CC"/><stop offset="100%" stop-color="#F5CBA7"/></linearGradient>'
        + '<linearGradient id="hairGrad2" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#1A1A1A"/><stop offset="100%" stop-color="#0A0A0A"/></linearGradient>'
        + '</defs>'
        + '<path d="M 85,25 Q 100,10 115,25 Q 120,45 118,60 Q 100,55 82,60 Z" fill="url(#hairGrad2)"/>'
        + '<path d="M 94,36 L 94,52 L 106,52 L 106,36 Z" fill="url(#skinGrad2)"/>'
        + '<path d="M 88,26 C 88,14 112,14 112,26 C 112,38 104,44 100,44 C 96,44 88,38 88,26 Z" fill="url(#skinGrad2)"/>'
        + '<path d="M 86,22 Q 100,10 114,22 L 100,32 Z" fill="#1C1C1C"/>'
        + '<ellipse cx="95" cy="27" rx="1.4" ry="0.9" fill="#222"/>'
        + '<ellipse cx="105" cy="27" rx="1.4" ry="0.9" fill="#222"/>'
        + '<path d="M 98,36 Q 100,38 102,36" fill="#C0392B"/>'
        // LỚP VÁY / QUẦN
        + '<!-- BOTTOM_LAYER -->'
        // Yếm lụa đào bên trong
        + '<path d="M 100,52 L 84,78 L 100,105 L 116,78 Z" fill="#DC143C"/>'
        + '<path d="M 92,65 Q 100,72 108,65" stroke="#FFD700" stroke-width="0.8" fill="none"/>'
        // 2 Vạt áo tứ thân khoác ngoài
        + '<path d="M 76,52 C 55,75 52,140 50,265 L 82,270 C 80,210 82,140 92,110 L 98,62 Z" fill="GARMENT_COLOR"/>'
        + '<path d="M 76,52 C 55,75 52,140 50,265 L 82,270 C 80,210 82,140 92,110 L 98,62 Z" fill="PATTERN_FILL" opacity="0.6"/>'
        + '<path d="M 124,52 C 145,75 148,140 150,265 L 118,270 C 120,210 118,140 108,110 L 102,62 Z" fill="GARMENT_COLOR"/>'
        + '<path d="M 124,52 C 145,75 148,140 150,265 L 118,270 C 120,210 118,140 108,110 L 102,62 Z" fill="PATTERN_FILL" opacity="0.6"/>'
        + '<!-- FLORAL_EMBROIDERY_LAYER -->'
        // Dải thắt lưng bao đoan xanh mạ & hồng đào
        + '<path d="M 78,110 Q 100,118 122,110 L 120,124 Q 100,132 80,124 Z" fill="#00A86B"/>'
        + '<path d="M 94,118 L 88,185 L 96,187 L 100,122 Z" fill="#00A86B"/>'
        + '<path d="M 100,118 L 106,175 L 114,173 L 104,122 Z" fill="#FF69B4"/>'
        // Tay áo tứ thân
        + '<path d="M 76,52 L 40,115 L 50,120 L 80,68 Z" fill="GARMENT_COLOR"/>'
        + '<path d="M 76,52 L 40,115 L 50,120 L 80,68 Z" fill="PATTERN_FILL" opacity="0.6"/>'
        + '<path d="M 124,52 L 160,115 L 150,120 L 120,68 Z" fill="GARMENT_COLOR"/>'
        + '<path d="M 124,52 L 160,115 L 150,120 L 120,68 Z" fill="PATTERN_FILL" opacity="0.6"/>'
        + '<path d="M 38,114 Q 35,124 42,124 L 46,118 Z" fill="url(#skinGrad2)"/>'
        + '<path d="M 162,114 Q 165,124 158,124 L 154,118 Z" fill="url(#skinGrad2)"/>'
        + '<!-- MOOD_LAYER -->'
        + '<!-- SEASON_LAYER -->'
        + '<!-- ACCESSORY_LAYERS -->'
        + '</svg>',

    ao_ngu_than: '<svg viewBox="0 0 200 320" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" class="mannequin-svg">'
        + '<defs>'
        + '<linearGradient id="skinGrad3" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#FFE0CC"/><stop offset="100%" stop-color="#F5CBA7"/></linearGradient>'
        + '<linearGradient id="hairGrad3" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#1A1A1A"/><stop offset="100%" stop-color="#0A0A0A"/></linearGradient>'
        + '</defs>'
        + '<path d="M 88,26 C 88,14 112,14 112,26 C 112,38 104,44 100,44 C 96,44 88,38 88,26 Z" fill="url(#skinGrad3)"/>'
        + '<path d="M 80,24 C 80,10 120,10 120,24 L 122,34 Q 100,37 78,34 Z" fill="#1C1C1C" stroke="#DAA520" stroke-width="0.8"/>'
        + '<path d="M 82,20 Q 100,15 118,20" stroke="#DAA520" stroke-width="0.5" fill="none"/>'
        + '<path d="M 82,26 Q 100,21 118,26" stroke="#DAA520" stroke-width="0.5" fill="none"/>'
        + '<ellipse cx="95" cy="30" rx="1.4" ry="0.9" fill="#222"/>'
        + '<ellipse cx="105" cy="30" rx="1.4" ry="0.9" fill="#222"/>'
        + '<path d="M 98,38 Q 100,40 102,38" fill="#C0392B"/>'
        // LỚP QUẦN
        + '<!-- BOTTOM_LAYER -->'
        // Thân áo Ngũ Thân thụng dáng chữ A
        + '<path d="M 72,56 C 50,90 48,225 54,250 C 78,256 122,256 146,250 C 152,225 150,90 128,56 Z" fill="GARMENT_COLOR"/>'
        + '<path d="M 72,56 C 50,90 48,225 54,250 C 78,256 122,256 146,250 C 152,225 150,90 128,56 Z" fill="PATTERN_FILL" opacity="0.6"/>'
        + '<!-- FLORAL_EMBROIDERY_LAYER -->'
        // Đường ghép 5 thân (ngũ thân)
        + '<line x1="100" y1="56" x2="100" y2="252" stroke="rgba(0,0,0,0.18)" stroke-width="1"/>'
        + '<line x1="82" y1="65" x2="78" y2="250" stroke="rgba(0,0,0,0.1)" stroke-width="0.8"/>'
        + '<line x1="118" y1="65" x2="122" y2="250" stroke="rgba(0,0,0,0.1)" stroke-width="0.8"/>'
        // Cổ áo lập lĩnh cao viền gấm
        + '<path d="M 88,48 L 112,48 L 113,58 L 87,58 Z" fill="GARMENT_COLOR" stroke="#DAA520" stroke-width="1"/>'
        // 5 Khuy cài ngũ quyền bằng vàng
        + '<circle cx="100" cy="64" r="1.9" fill="#FFD700" stroke="#B7950B" stroke-width="0.5"/>'
        + '<circle cx="100" cy="85" r="1.9" fill="#FFD700" stroke="#B7950B" stroke-width="0.5"/>'
        + '<circle cx="100" cy="110" r="1.9" fill="#FFD700" stroke="#B7950B" stroke-width="0.5"/>'
        + '<circle cx="100" cy="140" r="1.9" fill="#FFD700" stroke="#B7950B" stroke-width="0.5"/>'
        + '<circle cx="100" cy="175" r="1.9" fill="#FFD700" stroke="#B7950B" stroke-width="0.5"/>'
        // Tay áo thụng quý phái
        + '<path d="M 72,56 L 24,130 L 40,138 L 76,78 Z" fill="GARMENT_COLOR"/>'
        + '<path d="M 72,56 L 24,130 L 40,138 L 76,78 Z" fill="PATTERN_FILL" opacity="0.6"/>'
        + '<path d="M 128,56 L 176,130 L 160,138 L 124,78 Z" fill="GARMENT_COLOR"/>'
        + '<path d="M 128,56 L 176,130 L 160,138 L 124,78 Z" fill="PATTERN_FILL" opacity="0.6"/>'
        + '<path d="M 24,130 Q 18,140 28,140 L 36,136 Z" fill="url(#skinGrad3)"/>'
        + '<path d="M 176,130 Q 182,140 172,140 L 164,136 Z" fill="url(#skinGrad3)"/>'
        + '<!-- MOOD_LAYER -->'
        + '<!-- SEASON_LAYER -->'
        + '<!-- ACCESSORY_LAYERS -->'
        + '</svg>',

    ao_ba_ba: '<svg viewBox="0 0 200 320" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" class="mannequin-svg">'
        + '<defs>'
        + '<linearGradient id="skinGrad4" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#FFE0CC"/><stop offset="100%" stop-color="#F5CBA7"/></linearGradient>'
        + '<linearGradient id="hairGrad4" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#1A1A1A"/><stop offset="100%" stop-color="#0A0A0A"/></linearGradient>'
        + '</defs>'
        + '<path d="M 85,25 Q 100,10 115,25 Q 124,55 120,80 Q 100,70 80,80 Z" fill="url(#hairGrad4)"/>'
        + '<path d="M 94,36 L 94,52 L 106,52 L 106,36 Z" fill="url(#skinGrad4)"/>'
        + '<path d="M 88,26 C 88,14 112,14 112,26 C 112,38 104,44 100,44 C 96,44 88,38 88,26 Z" fill="url(#skinGrad4)"/>'
        + '<ellipse cx="95" cy="27" rx="1.4" ry="0.9" fill="#222"/>'
        + '<ellipse cx="105" cy="27" rx="1.4" ry="0.9" fill="#222"/>'
        + '<path d="M 98,36 Q 100,38 102,36" fill="#C0392B"/>'
        // LỚP QUẦN
        + '<!-- BOTTOM_LAYER -->'
        // Thân áo Bà Ba xẻ tà thấp, chít eo thanh thoát
        + '<path d="M 84,52 C 72,70 74,105 76,120 C 66,135 64,168 68,175 C 86,180 114,180 132,175 C 136,168 134,135 124,120 C 126,105 128,70 116,52 Z" fill="GARMENT_COLOR"/>'
        + '<path d="M 84,52 C 72,70 74,105 76,120 C 66,135 64,168 68,175 C 86,180 114,180 132,175 C 136,168 134,135 124,120 C 126,105 128,70 116,52 Z" fill="PATTERN_FILL" opacity="0.6"/>'
        + '<!-- FLORAL_EMBROIDERY_LAYER -->'
        // Cổ tròn lá sen xẻ giữa ngực
        + '<path d="M 92,52 Q 100,64 108,52" stroke="#FFFFFF" stroke-width="1.3" fill="none"/>'
        + '<line x1="100" y1="62" x2="100" y2="178" stroke="rgba(0,0,0,0.18)" stroke-width="1"/>'
        + '<circle cx="100" cy="74" r="1.6" fill="#FFFFFF" stroke="#999" stroke-width="0.4"/>'
        + '<circle cx="100" cy="94" r="1.6" fill="#FFFFFF" stroke="#999" stroke-width="0.4"/>'
        + '<circle cx="100" cy="114" r="1.6" fill="#FFFFFF" stroke="#999" stroke-width="0.4"/>'
        + '<circle cx="100" cy="134" r="1.6" fill="#FFFFFF" stroke="#999" stroke-width="0.4"/>'
        + '<circle cx="100" cy="154" r="1.6" fill="#FFFFFF" stroke="#999" stroke-width="0.4"/>'
        // 2 Chiếc túi may nổi hai bên vạt áo
        + '<rect x="74" y="140" width="18" height="22" rx="2.5" fill="GARMENT_COLOR" stroke="rgba(0,0,0,0.25)" stroke-width="0.8"/>'
        + '<rect x="108" y="140" width="18" height="22" rx="2.5" fill="GARMENT_COLOR" stroke="rgba(0,0,0,0.25)" stroke-width="0.8"/>'
        // Tay áo lỡ
        + '<path d="M 78,56 L 46,120 L 58,124 L 84,72 Z" fill="GARMENT_COLOR"/>'
        + '<path d="M 78,56 L 46,120 L 58,124 L 84,72 Z" fill="PATTERN_FILL" opacity="0.6"/>'
        + '<path d="M 122,56 L 154,120 L 142,124 L 116,72 Z" fill="GARMENT_COLOR"/>'
        + '<path d="M 122,56 L 154,120 L 142,124 L 116,72 Z" fill="PATTERN_FILL" opacity="0.6"/>'
        + '<path d="M 46,120 Q 42,130 50,130 L 54,124 Z" fill="url(#skinGrad4)"/>'
        + '<path d="M 154,120 Q 158,130 150,130 L 146,124 Z" fill="url(#skinGrad4)"/>'
        + '<!-- MOOD_LAYER -->'
        + '<!-- SEASON_LAYER -->'
        + '<!-- ACCESSORY_LAYERS -->'
        + '</svg>',

    ao_yem: '<svg viewBox="0 0 200 320" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" class="mannequin-svg">'
        + '<defs>'
        + '<linearGradient id="skinGrad5" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#FFE0CC"/><stop offset="100%" stop-color="#F5CBA7"/></linearGradient>'
        + '<linearGradient id="hairGrad5" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#1A1A1A"/><stop offset="100%" stop-color="#0A0A0A"/></linearGradient>'
        + '</defs>'
        + '<circle cx="100" cy="8" r="7" fill="url(#hairGrad5)"/>'
        + '<path d="M 86,22 C 86,10 114,10 114,22 L 100,32 Z" fill="url(#hairGrad5)"/>'
        + '<path d="M 94,36 L 94,52 L 106,52 L 106,36 Z" fill="url(#skinGrad5)"/>'
        + '<path d="M 88,26 C 88,14 112,14 112,26 C 112,38 104,44 100,44 C 96,44 88,38 88,26 Z" fill="url(#skinGrad5)"/>'
        + '<ellipse cx="95" cy="27" rx="1.4" ry="0.9" fill="#222"/>'
        + '<ellipse cx="105" cy="27" rx="1.4" ry="0.9" fill="#222"/>'
        + '<path d="M 98,36 Q 100,38 102,36" fill="#C0392B"/>'
        + '<path d="M 76,52 Q 100,48 124,52 L 136,85 Q 100,90 64,85 Z" fill="url(#skinGrad5)"/>'
        + '<path d="M 64,85 L 50,150 L 60,154 L 74,95 Z" fill="url(#skinGrad5)"/>'
        + '<path d="M 136,85 L 150,150 L 140,154 L 126,95 Z" fill="url(#skinGrad5)"/>'
        // LỚP VÁY / QUẦN
        + '<!-- BOTTOM_LAYER -->'
        // Yếm vải hình thoi đào
        + '<path d="M 100,48 L 74,100 L 100,155 L 126,100 Z" fill="GARMENT_COLOR"/>'
        + '<path d="M 100,48 L 74,100 L 100,155 L 126,100 Z" fill="PATTERN_FILL" opacity="0.6"/>'
        + '<!-- FLORAL_EMBROIDERY_LAYER -->'
        + '<path d="M 100,48 C 90,38 110,38 100,48" stroke="GARMENT_COLOR" stroke-width="2.5" fill="none"/>'
        + '<path d="M 74,100 C 60,105 60,115 70,118" stroke="GARMENT_COLOR" stroke-width="2" fill="none"/>'
        + '<path d="M 126,100 C 140,105 140,115 130,118" stroke="GARMENT_COLOR" stroke-width="2" fill="none"/>'
        + '<!-- MOOD_LAYER -->'
        + '<!-- SEASON_LAYER -->'
        + '<!-- ACCESSORY_LAYERS -->'
        + '</svg>'
};

// ==========================================
// CÁC LAYER QUẦN / VÁY (BOTTOM LAYERS)
// ==========================================
const BOTTOM_SVG_LAYERS = {
    quan_lua_trang: '<g id="bottom-quan-lua-trang">'
        + '<path d="M 76,135 L 52,290 L 98,290 L 98,145 Z" fill="#FFFFFF" stroke="#E5E7EB" stroke-width="0.8"/>'
        + '<path d="M 124,135 L 148,290 L 102,290 L 102,145 Z" fill="#FFFFFF" stroke="#E5E7EB" stroke-width="0.8"/>'
        + '<path d="M 68,290 Q 76,270 78,150" stroke="#E0E0E0" stroke-width="0.7" fill="none"/>'
        + '<path d="M 132,290 Q 124,270 122,150" stroke="#E0E0E0" stroke-width="0.7" fill="none"/>'
        + '</g>',

    quan_lua_den: '<g id="bottom-quan-lua-den">'
        + '<path d="M 76,135 L 52,290 L 98,290 L 98,145 Z" fill="#1C1C1C" stroke="#111" stroke-width="0.8"/>'
        + '<path d="M 124,135 L 148,290 L 102,290 L 102,145 Z" fill="#1C1C1C" stroke="#111" stroke-width="0.8"/>'
        + '<path d="M 68,290 Q 76,270 78,150" stroke="#2B2B2B" stroke-width="0.7" fill="none"/>'
        + '<path d="M 132,290 Q 124,270 122,150" stroke="#2B2B2B" stroke-width="0.7" fill="none"/>'
        + '</g>',

    quan_cung_tong: '<g id="bottom-quan-cung-tong">'
        + '<path d="M 76,135 L 52,290 L 98,290 L 98,145 Z" fill="GARMENT_COLOR" opacity="0.9" stroke="rgba(0,0,0,0.15)" stroke-width="0.8"/>'
        + '<path d="M 124,135 L 148,290 L 102,290 L 102,145 Z" fill="GARMENT_COLOR" opacity="0.9" stroke="rgba(0,0,0,0.15)" stroke-width="0.8"/>'
        + '</g>',

    quan_jeans: '<g id="bottom-quan-jeans">'
        + '<path d="M 74,138 L 54,290 L 98,290 L 98,148 Z" fill="#2E5B88" stroke="#1B3A57" stroke-width="0.9"/>'
        + '<path d="M 126,138 L 146,290 L 102,290 L 102,148 Z" fill="#2E5B88" stroke="#1B3A57" stroke-width="0.9"/>'
        + '<path d="M 72,142 Q 86,155 98,142" stroke="#E67E22" stroke-width="0.7" fill="none"/>' // Đường chỉ cam túi jeans
        + '<path d="M 128,142 Q 114,155 102,142" stroke="#E67E22" stroke-width="0.7" fill="none"/>'
        // Vết mài rách wash bụi bặm Gen Z
        + '<rect x="68" y="200" width="14" height="4" rx="1" fill="#AED6F1"/>'
        + '<rect x="118" y="225" width="14" height="4" rx="1" fill="#AED6F1"/>'
        + '</g>',

    vay_dup_den: '<g id="bottom-vay-dup-den">'
        + '<path d="M 76,120 L 44,290 L 156,290 L 124,120 Z" fill="#151515" stroke="#000" stroke-width="0.9"/>'
        + '<path d="M 70,290 Q 85,200 86,130" stroke="#2D2D2D" stroke-width="0.8" fill="none"/>'
        + '<path d="M 130,290 Q 115,200 114,130" stroke="#2D2D2D" stroke-width="0.8" fill="none"/>'
        + '<path d="M 100,290 Q 100,210 100,135" stroke="#2D2D2D" stroke-width="0.7" fill="none"/>'
        + '</g>'
};

// ==========================================
// CÁC LAYER HOA VĂN THÊU TAY (EMBROIDERY)
// ==========================================
const FLORAL_EMBROIDERY_SVG = '<g id="layer-floral-embroidery">'
    + '<path d="M 100,210 C 90,200 88,216 100,228 C 112,216 110,200 100,210 Z" fill="#FF80AB" stroke="#E91E63" stroke-width="0.8"/>'
    + '<path d="M 94,220 Q 100,226 106,220" stroke="#FFD700" stroke-width="0.8" fill="none"/>'
    + '<path d="M 100,228 Q 104,242 98,252" stroke="#2E7D32" stroke-width="1.2" fill="none"/>'
    + '<path d="M 100,235 Q 110,232 112,238 Q 106,242 100,238" fill="#4CAF50"/>'
    + '<circle cx="100" cy="75" r="5" fill="#FF80AB" opacity="0.85"/>'
    + '<circle cx="100" cy="75" r="2" fill="#FFD700"/>'
    + '</g>';

// ==========================================
// CÁC LAYER MÙA & PHONG CÁCH
// ==========================================
const SEASON_SVG_LAYERS = {
    thu_dong: '<g id="layer-season-thu-dong">'
        + '<path d="M 74,52 C 60,65 65,95 80,105 Q 100,110 120,105 C 135,95 140,65 126,52 Z" fill="#8B4513" opacity="0.92" stroke="#5D2E0C" stroke-width="1"/>'
        + '<path d="M 88,104 L 84,145 L 94,145 L 96,106 Z" fill="#8B4513"/>'
        + '<line x1="84" y1="145" x2="84" y2="152" stroke="#D7CCC8" stroke-width="0.8"/>'
        + '<line x1="89" y1="145" x2="89" y2="152" stroke="#D7CCC8" stroke-width="0.8"/>'
        + '<line x1="94" y1="145" x2="94" y2="152" stroke="#D7CCC8" stroke-width="0.8"/>'
        + '</g>',
    xuan_he: '' // Mùa hè thoáng nhẹ
};

const MOOD_SVG_LAYERS = {
    Streetwear: '<g id="layer-mood-streetwear">'
        + '<path d="M 76,58 L 124,122" stroke="#E0E0E0" stroke-width="2.2" stroke-dasharray="3,2.5" fill="none"/>' // Dây xích bạc chéo ngực
        + '<circle cx="124" cy="122" r="3.2" fill="#B0BEC5" stroke="#37474F" stroke-width="0.9"/>'
        + '</g>',
    "Cổ điển": '<g id="layer-mood-co-dien">'
        + '<circle cx="100" cy="8" r="8" stroke="#DAA520" stroke-width="1.6" fill="none"/>' // Vòng vàng cài tóc
        + '<circle cx="100" cy="8" r="4" fill="#DAA520" opacity="0.4"/>'
        + '</g>',
    Cổ_điển: '<g id="layer-mood-co-dien">'
        + '<circle cx="100" cy="8" r="8" stroke="#DAA520" stroke-width="1.6" fill="none"/>'
        + '<circle cx="100" cy="8" r="4" fill="#DAA520" opacity="0.4"/>'
        + '</g>',
    Retro: '<g id="layer-mood-retro">'
        + '<circle cx="78" cy="165" r="3" fill="#FFE082" opacity="0.7"/>'
        + '<circle cx="122" cy="185" r="3" fill="#FFE082" opacity="0.7"/>'
        + '<circle cx="95" cy="210" r="3" fill="#FFE082" opacity="0.7"/>'
        + '</g>',
    "Hiện đại": '<g id="layer-mood-hien-dai">'
        + '<line x1="82" y1="116" x2="118" y2="116" stroke="#00E5FF" stroke-width="1.8"/>' // Đai thắt eo metallic
        + '</g>',
    Hiện_đại: '<g id="layer-mood-hien-dai">'
        + '<line x1="82" y1="116" x2="118" y2="116" stroke="#00E5FF" stroke-width="1.8"/>'
        + '</g>',
    Minimalist: ''
};

// Chi tiết các layer SVG phụ kiện để "mặc" trực tiếp lên mannequin (Tỉ lệ chuẩn 200x320)
const ACCESSORY_SVG_LAYERS = {
    non_la: '<g id="layer-non-la">'
        + '<polygon points="100,4 45,26 155,26" fill="#F9E79F" stroke="#D4AC0D" stroke-width="1.2"/>'
        + '<ellipse cx="100" cy="22" rx="42" ry="3" fill="none" stroke="#D4AC0D" stroke-width="0.6"/>'
        + '<ellipse cx="100" cy="16" rx="28" ry="2" fill="none" stroke="#D4AC0D" stroke-width="0.6"/>'
        + '<line x1="70" y1="26" x2="100" y2="40" stroke="#E74C3C" stroke-width="1.2"/>'
        + '<line x1="130" y1="26" x2="100" y2="40" stroke="#E74C3C" stroke-width="1.2"/>'
        + '<circle cx="100" cy="4" r="1.5" fill="#B7950B"/>'
        + '</g>',

    khan_dong: '<g id="layer-khan-dong">'
        + '<path d="M 80,14 C 80,4 120,4 120,14 L 122,28 Q 100,32 78,28 Z" fill="#17202A" stroke="#DAA520" stroke-width="1.2"/>'
        + '<path d="M 82,10 Q 100,5 118,10" stroke="#DAA520" stroke-width="0.8" fill="none"/>'
        + '<path d="M 81,15 Q 100,10 119,15" stroke="#DAA520" stroke-width="0.8" fill="none"/>'
        + '<path d="M 80,20 Q 100,15 120,20" stroke="#DAA520" stroke-width="0.8" fill="none"/>'
        + '</g>',

    kinh_mat: '<g id="layer-kinh-mat">'
        + '<rect x="86" y="24" width="12" height="6" rx="1.5" fill="#111111" stroke="#FFD700" stroke-width="0.8"/>'
        + '<rect x="102" y="24" width="12" height="6" rx="1.5" fill="#111111" stroke="#FFD700" stroke-width="0.8"/>'
        + '<line x1="98" y1="27" x2="102" y2="27" stroke="#FFD700" stroke-width="1"/>'
        + '<line x1="86" y1="26" x2="82" y2="27" stroke="#222" stroke-width="0.8"/>'
        + '<line x1="114" y1="26" x2="118" y2="27" stroke="#222" stroke-width="0.8"/>'
        + '<line x1="88" y1="25" x2="92" y2="29" stroke="rgba(255,255,255,0.4)" stroke-width="0.8"/>'
        + '<line x1="104" y1="25" x2="108" y2="29" stroke="rgba(255,255,255,0.4)" stroke-width="0.8"/>'
        + '</g>',

    vong_co: '<g id="layer-vong-co">'
        + '<path d="M 90,46 C 92,58 108,58 110,46" stroke="#E0F7FA" stroke-width="3" stroke-linecap="round" fill="none"/>'
        + '<circle cx="100" cy="54" r="2.4" fill="#00BCD4" stroke="#fff" stroke-width="0.6"/>'
        + '</g>',

    hoa_tai: '<g id="layer-hoa-tai">'
        + '<circle cx="87" cy="28" r="1.8" fill="#FFD700"/>'
        + '<circle cx="113" cy="28" r="1.8" fill="#FFD700"/>'
        + '<line x1="87" y1="28" x2="87" y2="35" stroke="#FFD700" stroke-width="0.8"/>'
        + '<line x1="113" y1="28" x2="113" y2="35" stroke="#FFD700" stroke-width="0.8"/>'
        + '<circle cx="87" cy="36" r="1.4" fill="#DC143C"/>'
        + '<circle cx="113" cy="36" r="1.4" fill="#DC143C"/>'
        + '</g>',

    tui_theu: '<g id="layer-tui-theu">'
        + '<path d="M 46,130 C 46,110 70,64 70,64" stroke="#DAA520" stroke-width="1.2" fill="none"/>'
        + '<rect x="36" y="130" width="22" height="20" rx="3" fill="#C2185B" stroke="#DAA520" stroke-width="1.2"/>'
        + '<circle cx="47" cy="140" r="2.8" fill="#DAA520"/>'
        + '<line x1="47" y1="143" x2="47" y2="152" stroke="#DAA520" stroke-width="1"/>'
        + '</g>',

    tui_tote: '<g id="layer-tui-tote">'
        + '<path d="M 152,125 C 152,100 132,60 132,60" stroke="#795548" stroke-width="1.5" fill="none"/>'
        + '<rect x="142" y="125" width="28" height="34" rx="2.5" fill="#FFF8E7" stroke="#8D6E63" stroke-width="1.4"/>'
        + '<text x="156" y="145" font-size="5" font-family="sans-serif" font-weight="bold" fill="#8D6E63" text-anchor="middle">GEN Z</text>'
        + '</g>',

    sneakers: '<g id="layer-sneakers">'
        + '<path d="M 44,286 L 70,286 C 76,286 80,292 80,298 L 42,298 Z" fill="#FFFFFF" stroke="#DC143C" stroke-width="1.4"/>'
        + '<path d="M 120,286 L 146,286 C 152,286 156,292 156,298 L 118,298 Z" fill="#FFFFFF" stroke="#DC143C" stroke-width="1.4"/>'
        + '<line x1="50" y1="290" x2="64" y2="290" stroke="#DC143C" stroke-width="1.2"/>'
        + '<line x1="126" y1="290" x2="140" y2="290" stroke="#DC143C" stroke-width="1.2"/>'
        + '<rect x="42" y="296" width="38" height="3" fill="#333"/>'
        + '<rect x="118" y="296" width="38" height="3" fill="#333"/>'
        + '</g>',

    guoc_moc: '<g id="layer-guoc-moc">'
        + '<path d="M 48,288 L 68,288 L 68,298 L 48,298 Z" fill="#8D6E63"/>'
        + '<path d="M 124,288 L 144,288 L 144,298 L 124,298 Z" fill="#8D6E63"/>'
        + '<path d="M 50,288 Q 58,282 66,288" stroke="#DC143C" stroke-width="2" fill="none"/>'
        + '<path d="M 126,288 Q 134,282 142,288" stroke="#DC143C" stroke-width="2" fill="none"/>'
        + '</g>'
};

// Dữ liệu văn hóa 5 dòng trang phục kèm ảnh thời trang thực tế chất lượng cao
const CULTURAL_DATA = {
    ao_dai: {
        id: "ao_dai",
        name: "Áo dài",
        desc: "Quốc phục truyền thống tinh hoa",
        image: "images/ao_dai.jpg",
        defaultBottom: "quan_lua_trang",
        origin: "Phát triển từ thế kỷ 18, trải qua nhiều lần cải tiến, trở thành biểu tượng quốc phục Việt Nam. Áo dài hiện đại được cách tân bởi họa sĩ Nguyễn Cát Tường (1930s) và nhà thiết kế Trần Lệ Xuân (1960s).",
        meaning: "Tượng trưng cho sự thanh lịch, duyên dáng của phụ nữ Việt Nam. Hai tà áo phía trước và phía sau tượng trưng cho cha và mẹ, thể hiện sự tôn trọng gia đình.",
        occasions: "Tết, lễ hội, đám cưới, sự kiện trang trọng, đồng phục học sinh",
        warnings: "Không nên phối áo dài với quần short — làm mất đi tính trang trọng. Tránh in hình phản cảm hoặc không phù hợp lên áo dài."
    },
    ao_tu_than: {
        id: "ao_tu_than",
        name: "Áo tứ thân",
        desc: "Hồn cốt Kinh Bắc & Dân ca Quan họ",
        image: "images/ao_tu_than.jpg",
        defaultBottom: "vay_dup_den",
        origin: "Có từ thế kỷ 17-18, đặc trưng vùng Kinh Bắc (Bắc Ninh, Bắc Giang). Thường gắn liền với hình ảnh liền chị quan họ và người phụ nữ đồng bằng Bắc Bộ.",
        meaning: "Bốn thân áo tượng trưng cho tứ thân phụ mẫu (cha mẹ đôi bên). Dải thắt lưng xanh tượng trưng cho tình yêu đôi lứa.",
        occasions: "Lễ hội Quan họ, hội làng, diễn xướng dân gian, sân khấu truyền thống",
        warnings: "Cần mặc đúng cách buộc thắt, kết hợp với yếm đào và váy đen. Không nên cách điệu quá mức làm mất đi hồn cốt trang phục."
    },
    ao_ngu_than: {
        id: "ao_ngu_than",
        name: "Áo ngũ thân",
        desc: "Chuẩn mực cung đình Huế thời Nguyễn",
        image: "images/ao_ngu_than.jpg",
        defaultBottom: "quan_lua_trang",
        origin: "Ra đời thời nhà Nguyễn (thế kỷ 19), là trang phục chính thức của triều đình Huế. Được vua Minh Mạng quy định trong triều phục.",
        meaning: "Năm thân áo tượng trưng cho ngũ thường trong Nho giáo: Nhân, Lễ, Nghĩa, Trí, Tín. Năm nút áo tượng trưng cho ngũ luân.",
        occasions: "Lễ tế, nghi lễ cung đình, sự kiện văn hóa Huế, Festival Huế",
        warnings: "Màu vàng chỉ dành riêng cho vua — tránh sử dụng tùy tiện. Hệ thống màu sắc cung đình có quy tắc nghiêm ngặt theo phẩm hàm."
    },
    ao_ba_ba: {
        id: "ao_ba_ba",
        name: "Áo bà ba",
        desc: "Nét đẹp bình dị Nam Bộ sông nước",
        image: "images/ao_ba_ba.jpg",
        defaultBottom: "quan_lua_den",
        origin: "Xuất xứ từ Nam Bộ thế kỷ 19, ảnh hưởng từ trang phục người Hoa Minh Hương. Trở thành biểu tượng của phụ nữ miền Tây sông nước.",
        meaning: "Tượng trưng cho sự giản dị, mộc mạc, gần gũi đất và nước của người miền Nam. Hai túi áo phía trước thể hiện tính thực dụng.",
        occasions: "Sinh hoạt hàng ngày, lễ hội miền Tây, du lịch sông nước, chợ nổi",
        warnings: "Giữ sự giản dị — tránh phối quá cầu kỳ mất đi bản chất bình dân. Nên chọn vải mỏng, thoáng mát phù hợp khí hậu nóng."
    },
    ao_yem: {
        id: "ao_yem",
        name: "Áo yếm",
        desc: "Vẻ đẹp quyến rũ, nữ tính cổ truyền",
        image: "images/ao_yem.jpg",
        defaultBottom: "quan_lua_den",
        origin: "Có từ thời phong kiến, một trong những trang phục cổ nhất của người Việt. Thường xuất hiện trong tranh Đông Hồ và ca dao tục ngữ.",
        meaning: "Nét đẹp nữ tính, mềm mại, gợi nhớ hình ảnh người phụ nữ Việt xưa. Yếm đào (màu hồng đào) là loại phổ biến nhất, tượng trưng cho tuổi xuân.",
        occasions: "Biểu diễn nghệ thuật, chụp ảnh nghệ thuật, phối cùng trang phục hiện đại (Gen Z trend)",
        warnings: "Cần phối kín đáo, tôn trọng tính truyền thống. Khi mặc riêng cần có áo ngoài hoặc khăn choàng."
    }
};

const BOTTOMS_DATA = [
    { id: "quan_lua_trang", name: "Quần lụa trắng", icon: "🤍", desc: "Lụa trắng ống rộng truyền thống" },
    { id: "quan_lua_den", name: "Quần lụa đen", icon: "🖤", desc: "Lụa đen tuyền thanh lịch" },
    { id: "quan_cung_tong", name: "Quần cùng màu áo", icon: "🎨", desc: "Tone-sur-tone thời thượng" },
    { id: "quan_jeans", name: "Quần Jeans Gen Z", icon: "👖", desc: "Jeans xanh denim bụi bặm" },
    { id: "vay_dup_den", name: "Váy đụp đen", icon: "👗", desc: "Váy đụp Kinh Bắc bồng bềnh" }
];

const EVENTS_DATA = [
    { id: "tet", name: "Tết Nguyên Đán", icon: "🏮", suggest: "ao_dai", bottom: "quan_lua_trang" },
    { id: "le_hoi", name: "Lễ hội truyền thống", icon: "🎊", suggest: "ao_tu_than", bottom: "vay_dup_den" },
    { id: "dam_cuoi", name: "Đám cưới", icon: "💍", suggest: "ao_dai", bottom: "quan_lua_trang" },
    { id: "di_hoc", name: "Đi học / Đi làm", icon: "📚", suggest: "ao_dai", bottom: "quan_lua_trang" },
    { id: "dao_pho", name: "Dạo phố / Cafe", icon: "☕", suggest: "ao_ba_ba", bottom: "quan_jeans" },
    { id: "chup_anh", name: "Chụp ảnh nghệ thuật", icon: "📸", suggest: "ao_yem", bottom: "quan_lua_den" }
];

const COLORS_DATA = [
    { id: "do_son", name: "Đỏ son", hex: "#DC143C", harmony: 9 },
    { id: "vang_hoang_kim", name: "Vàng hoàng kim", hex: "#FFD700", harmony: 8 },
    { id: "xanh_ngoc", name: "Xanh ngọc", hex: "#00A86B", harmony: 8 },
    { id: "tim_hue", name: "Tím huế", hex: "#7B4FA2", harmony: 7 },
    { id: "trang_nga", name: "Trắng ngà", hex: "#FAF0E6", harmony: 10 },
    { id: "den_huyen", name: "Đen huyền", hex: "#1a1a1a", harmony: 9 },
    { id: "hong_dao", name: "Hồng đào", hex: "#FF69B4", harmony: 7 },
    { id: "xanh_lam", name: "Xanh lam", hex: "#2E5BA6", harmony: 8 },
    { id: "cam_gach", name: "Cam gạch", hex: "#CC5500", harmony: 7 },
    { id: "xanh_reu", name: "Xanh rêu", hex: "#4A6741", harmony: 8 },
    { id: "nau_do", name: "Nâu đỏ", hex: "#8B4513", harmony: 8 },
    { id: "be_nude", name: "Be nude", hex: "#D2B48C", harmony: 9 }
];

const PATTERNS_DATA = [
    { id: "tron", name: "Trơn", patternFill: "none" },
    { id: "gam", name: "Gấm", patternFill: "url(#pat-gam)" },
    { id: "theu_hoa", name: "Thêu hoa", patternFill: "none", hasFloralOverlay: true },
    { id: "soc", name: "Sọc", patternFill: "url(#pat-soc)" },
    { id: "batik", name: "Batik", patternFill: "url(#pat-batik)" }
];

const ACCESSORIES_DATA = [
    { id: "non_la", name: "Nón lá", icon: "👒", traditional: true },
    { id: "khan_dong", name: "Khăn đóng", icon: "👳", traditional: true },
    { id: "guoc_moc", name: "Guốc mộc", icon: "👡", traditional: true },
    { id: "tui_theu", name: "Túi thêu", icon: "👝", traditional: true },
    { id: "vong_co", name: "Vòng cổ ngọc", icon: "📿", traditional: true },
    { id: "hoa_tai", name: "Hoa tai", icon: "✨", traditional: true },
    { id: "kinh_mat", name: "Kính mát", icon: "🕶️", traditional: false },
    { id: "sneakers", name: "Sneakers", icon: "👟", traditional: false },
    { id: "tui_tote", name: "Túi tote", icon: "🛍️", traditional: false }
];

const MOODS = ["Cổ điển", "Hiện đại", "Streetwear", "Minimalist", "Retro"];

const WEATHERS = [
    { id: "xuan_he", name: "Xuân / Hè", icon: "🌸" },
    { id: "thu_dong", name: "Thu / Đông", icon: "🍂" }
];

// Presets gợi ý prompt thông minh cho Gemini AI Stylist
const GEMINI_AI_PRESETS = [
    {
        title: "🧧 Tết Gen Z tươi trẻ",
        prompt: "Phối Áo dài đỏ son đi du xuân đón Tết, kết hợp phong cách Streetwear với kính mát và sneakers cho bạn trẻ 20 tuổi năng động.",
        config: {
            garmentId: "ao_dai",
            bottomId: "quan_lua_trang",
            colorId: "do_son",
            patternId: "gam",
            accessories: ["kinh_mat", "sneakers", "tui_tote"],
            mood: "Streetwear",
            weather: "Xuân / Hè"
        },
        advice: "Sắc Đỏ son mang lại phúc lộc đầu năm. Kết hợp sneakers và kính mát đen tạo điểm nhấn cá tính, trẻ trung mà vẫn giữ trọn form dáng trang nhã của Áo dài truyền thống."
    },
    {
        title: "🏛️ Kỷ yếu Hoàng Thành",
        prompt: "Chụp ảnh kỷ yếu sinh viên ở cố đô hoặc Hoàng Thành Thăng Long, phong cách thanh lịch trang nghiêm.",
        config: {
            garmentId: "ao_ngu_than",
            bottomId: "quan_lua_trang",
            colorId: "xanh_ngoc",
            patternId: "tron",
            accessories: ["khan_dong", "guoc_moc", "vong_co"],
            mood: "Cổ điển",
            weather: "Thu / Đông"
        },
        advice: "Áo ngũ thân màu Xanh ngọc kết hợp Khăn đóng và Guốc mộc tôn vinh chuẩn mực Nho giáo thời Nguyễn. Tránh dùng màu vàng hoàng kim để tôn trọng điển chế cung đình."
    },
    {
        title: "☕ Dạo phố Cafe Cuối Tuần",
        prompt: "Đi dạo phố cafe chụp ảnh sống ảo với bạn bè, phong cách nhẹ nhàng thoải mái vùng Nam Bộ.",
        config: {
            garmentId: "ao_ba_ba",
            bottomId: "quan_jeans",
            colorId: "be_nude",
            patternId: "tron",
            accessories: ["non_la", "tui_tote", "guoc_moc"],
            mood: "Minimalist",
            weather: "Xuân / Hè"
        },
        advice: "Áo bà ba màu Be nude mộc mạc phối cùng Quần jeans xanh Gen Z và Túi tote, sự hòa quyện tuyệt vời giữa hồn quê Nam Bộ và phong cách dạo phố trẻ trung."
    },
    {
        title: "🎨 Triển lãm Nghệ Thuật",
        prompt: "Đi xem triển lãm mỹ thuật đương đại, thích sự quyến rũ cổ xưa pha nét phá cách.",
        config: {
            garmentId: "ao_yem",
            bottomId: "quan_lua_den",
            colorId: "hong_dao",
            patternId: "theu_hoa",
            accessories: ["hoa_tai", "vong_co", "kinh_mat"],
            mood: "Hiện đại",
            weather: "Xuân / Hè"
        },
        advice: "Yếm đào Hồng cánh sen thêu hoa sen nổi bật phối quần lụa đen ống suông. Điểm xuyết hoa tai ngọc và kính râm tạo nên thần thái của một Gen Z fashionista sành điệu."
    }
];

// Mẫu thiết kế Lookbook sẵn có để người dùng mở trang là XEM ĐƯỢC NGAY & TẢI VỀ NGAY
const INITIAL_LOOKBOOK_SAMPLES = [
    {
        id: "sample-1",
        date: "08/10/2026",
        garmentId: "ao_dai",
        garmentName: "Áo dài",
        bottomId: "quan_lua_trang",
        bottomName: "Quần lụa trắng",
        colorId: "do_son",
        colorName: "Đỏ son",
        colorHex: "#DC143C",
        patternId: "gam",
        patternName: "Gấm",
        mood: "Streetwear",
        weather: "Xuân / Hè",
        image: "images/ao_dai.jpg",
        accessories: [
            { id: "kinh_mat", name: "Kính mát", icon: "🕶️" },
            { id: "sneakers", name: "Sneakers", icon: "👟" },
            { id: "tui_theu", name: "Túi thêu", icon: "👝" }
        ],
        advice: "Tết Gen Z năng động: Áo dài lụa Đỏ son dệt gấm phối Quần lụa trắng, sneakers và kính mát cực kỳ thời thượng, tôn dáng mà vẫn giữ nét thanh lịch."
    },
    {
        id: "sample-2",
        date: "08/10/2026",
        garmentId: "ao_ngu_than",
        garmentName: "Áo ngũ thân",
        bottomId: "quan_lua_trang",
        bottomName: "Quần lụa trắng",
        colorId: "xanh_ngoc",
        colorName: "Xanh ngọc",
        colorHex: "#00A86B",
        patternId: "tron",
        patternName: "Trơn",
        mood: "Cổ điển",
        weather: "Thu / Đông",
        image: "images/ao_ngu_than.jpg",
        accessories: [
            { id: "khan_dong", name: "Khăn đóng", icon: "👳" },
            { id: "guoc_moc", name: "Guốc mộc", icon: "👡" },
            { id: "vong_co", name: "Vòng cổ", icon: "📿" }
        ],
        advice: "Kỷ yếu Hoàng thành Thăng Long: Áo ngũ thân Xanh ngọc kết hợp Khăn đóng và Guốc mộc trang nhã, nghiêm trang đúng chuẩn Nho giáo cung đình."
    },
    {
        id: "sample-3",
        date: "08/10/2026",
        garmentId: "ao_ba_ba",
        garmentName: "Áo bà ba",
        bottomId: "quan_jeans",
        bottomName: "Quần Jeans Gen Z",
        colorId: "be_nude",
        colorName: "Be nude",
        colorHex: "#D2B48C",
        patternId: "tron",
        patternName: "Trơn",
        mood: "Minimalist",
        weather: "Xuân / Hè",
        image: "images/ao_ba_ba.jpg",
        accessories: [
            { id: "non_la", name: "Nón lá", icon: "👒" },
            { id: "tui_tote", name: "Túi tote", icon: "🛍️" },
            { id: "guoc_moc", name: "Guốc mộc", icon: "👡" }
        ],
        advice: "Dạo phố Sài Gòn: Áo bà ba lụa màu Be mộc mạc phối cùng Quần Jeans rách và túi tote, sự hòa quyện tuyệt vời giữa mộc mạc miền Tây và nhịp sống trẻ."
    }
];
