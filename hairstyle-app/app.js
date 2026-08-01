// ===== Данные =====

// Общие defs для каждой причёски: градиенты объёма, сияние макушки, фильтры мягких краёв.
// Токены %ID% (уникальный суффикс) и %DEEP%/%DARK%/%MID%/%LIGHT%/%HI% (оттенки цвета)
// подставляются при инстанцировании в instHair().
const HAIR_DEFS = `
<defs>
  <linearGradient id="gv%ID%" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="%LIGHT%"/>
    <stop offset="0.3" stop-color="%MID%"/>
    <stop offset="1" stop-color="%DARK%"/>
  </linearGradient>
  <linearGradient id="gb%ID%" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="%MID%"/>
    <stop offset="0.55" stop-color="%DARK%"/>
    <stop offset="1" stop-color="%DEEP%"/>
  </linearGradient>
  <radialGradient id="gs%ID%" cx="0.5" cy="0.22" r="0.8">
    <stop offset="0" stop-color="%HI%" stop-opacity="0.5"/>
    <stop offset="0.4" stop-color="%HI%" stop-opacity="0"/>
  </radialGradient>
  <filter id="fw%ID%" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="1.2"/></filter>
  <filter id="fs%ID%" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="4"/></filter>
</defs>`;

// Маска для режима фото: вырезает в заднем слое волос мягкое окно под лицо и шею,
// чтобы пряди обрамляли лицо по контуру, а не закрывали его
const HOLE_MASK = `
<mask id="mh%ID%" maskUnits="userSpaceOnUse" x="-300" y="-300" width="900" height="1000">
    <rect x="-300" y="-300" width="900" height="1000" fill="#fff"/>
    <ellipse cx="150" cy="167" rx="57" ry="71" fill="#000" filter="url(#fs%ID%)"/>
    <rect x="116" y="215" width="68" height="140" rx="32" fill="#000" filter="url(#fs%ID%)"/>
</mask>`;

// Тень, которую чёлка отбрасывает на лоб, — делает наложение на фото естественнее
const FRINGE_SHADOW = `<path d="M100 124 q50 26 100 0 l-8 22 q-42 18 -84 0 z" fill="#000" opacity="0.08" filter="url(#fs%ID%)"/>`;

// Причёски: SVG-слои в системе координат аватара (viewBox 0 0 300 340).
// back — за головой, front — поверх лица (чёлка, пряди, тень на лоб).
const HAIRSTYLES = [
    {
        id: 'pixie',
        name: 'Пикси',
        back: '',
        front: `
            <path d="M88 160 q-8-62 62-72 q70 10 62 72 q-4-30-20-38 q6 14 2 24 q-10-24-44-26 q-34 2-44 26 q-4-10 2-24 q-16 8-20 38 z" fill="url(#gv%ID%)"/>
            <path d="M88 160 q-8-62 62-72 q70 10 62 72 q-4-30-20-38 q6 14 2 24 q-10-24-44-26 q-34 2-44 26 q-4-10 2-24 q-16 8-20 38 z" fill="url(#gs%ID%)"/>
            <g fill="%MID%">
                <path d="M87 162 q-7 14 -3 28 q7-5 9-14 z"/>
                <path d="M213 162 q7 14 3 28 q-7-5 -9-14 z"/>
                <path d="M96 178 q-3 12 2 20 q5-6 5-13 z"/>
                <path d="M204 178 q3 12 -2 20 q-5-6 -5-13 z"/>
            </g>
            <g stroke="%HI%" stroke-width="2.2" fill="none" opacity="0.55" stroke-linecap="round">
                <path d="M116 100 q-14 12 -18 34"/>
                <path d="M150 92 q-4 10 -4 24"/>
                <path d="M184 100 q14 12 18 34"/>
            </g>
            <g stroke="%DEEP%" stroke-width="1.6" fill="none" opacity="0.45" stroke-linecap="round">
                <path d="M104 118 q-8 12 -9 28"/>
                <path d="M196 118 q8 12 9 28"/>
                <path d="M132 96 q-8 10 -10 26"/>
                <path d="M168 96 q8 10 10 26"/>
            </g>`
    },
    {
        id: 'bob',
        name: 'Каре',
        back: `
            <path d="M84 150 q-6-70 66-70 q72 0 66 70 l4 76 q0 14-18 12 l-104 0 q-18 2-18-12 z" fill="url(#gb%ID%)"/>
            <g stroke="%DEEP%" stroke-width="3.5" fill="none" opacity="0.45" stroke-linecap="round">
                <path d="M100 170 q-5 40 -2 70"/>
                <path d="M200 170 q5 40 2 70"/>
                <path d="M118 190 q-3 30 -1 52"/>
                <path d="M182 190 q3 30 1 52"/>
            </g>
            <g stroke="%LIGHT%" stroke-width="2.5" fill="none" opacity="0.4" stroke-linecap="round">
                <path d="M109 180 q-4 34 -1 58"/>
                <path d="M191 180 q4 34 1 58"/>
            </g>
            <g stroke="%MID%" stroke-width="1.4" fill="none" opacity="0.6" filter="url(#fw%ID%)">
                <path d="M86 165 q-6 30 -2 62"/>
                <path d="M214 165 q6 30 2 62"/>
            </g>`,
        front: `
            ${FRINGE_SHADOW}
            <path d="M88 165 q-10-80 62-80 q72 0 62 80 q-6-40-22-48 q4 14 0 24 q-12-28-40-30 q-28 2-40 30 q-4-10 0-24 q-16 8-22 48 z" fill="url(#gv%ID%)"/>
            <path d="M88 165 q-10-80 62-80 q72 0 62 80 q-6-40-22-48 q4 14 0 24 q-12-28-40-30 q-28 2-40 30 q-4-10 0-24 q-16 8-22 48 z" fill="url(#gs%ID%)"/>
            <g stroke="%HI%" stroke-width="2.4" fill="none" opacity="0.5" stroke-linecap="round">
                <path d="M118 96 q-16 20 -20 52"/>
                <path d="M182 96 q16 20 20 52"/>
                <path d="M140 88 q-8 12 -10 30"/>
            </g>
            <g stroke="%DARK%" stroke-width="1.2" fill="none" opacity="0.5">
                <path d="M103 130 q-4 10 -3 22"/>
                <path d="M197 130 q4 10 3 22"/>
            </g>`
    },
    {
        id: 'long',
        name: 'Длинные прямые',
        back: `
            <path d="M84 150 q-6-72 66-72 q72 0 66 72 l8 150 q0 14-16 12 l-116 0 q-16 2-16-12 z" fill="url(#gb%ID%)"/>
            <g stroke="%DEEP%" stroke-width="4" fill="none" opacity="0.45" stroke-linecap="round">
                <path d="M103 170 q-7 66 -3 132"/>
                <path d="M124 185 q-4 60 -1 118"/>
                <path d="M197 170 q7 66 3 132"/>
                <path d="M176 185 q4 60 1 118"/>
                <path d="M150 205 q0 50 0 96"/>
            </g>
            <g stroke="%LIGHT%" stroke-width="3" fill="none" opacity="0.4" stroke-linecap="round">
                <path d="M112 175 q-5 62 -2 124"/>
                <path d="M188 175 q5 62 2 124"/>
                <path d="M137 195 q-2 54 -1 104"/>
                <path d="M163 195 q2 54 1 104"/>
            </g>
            <g stroke="%MID%" stroke-width="1.5" fill="none" opacity="0.6" filter="url(#fw%ID%)">
                <path d="M86 160 q-8 40 -4 90"/>
                <path d="M214 160 q8 40 4 90"/>
                <path d="M90 260 q-4 30 2 48"/>
                <path d="M210 260 q4 30 -2 48"/>
            </g>`,
        front: `
            ${FRINGE_SHADOW}
            <path d="M88 175 q-12-92 62-92 q74 0 62 92 q-4-50-20-60 q4 16 0 28 q-12-32-42-34 q-30 2-42 34 q-4-12 0-28 q-16 10-20 60 z" fill="url(#gv%ID%)"/>
            <path d="M88 175 q-12-92 62-92 q74 0 62 92 q-4-50-20-60 q4 16 0 28 q-12-32-42-34 q-30 2-42 34 q-4-12 0-28 q-16 10-20 60 z" fill="url(#gs%ID%)"/>
            <g stroke="%HI%" stroke-width="2.5" fill="none" opacity="0.5" stroke-linecap="round">
                <path d="M120 92 q-18 22 -22 58"/>
                <path d="M180 92 q18 22 22 58"/>
                <path d="M138 86 q-10 14 -12 34"/>
                <path d="M162 86 q10 14 12 34"/>
            </g>
            <g stroke="%DARK%" stroke-width="1.2" fill="none" opacity="0.5">
                <path d="M104 128 q-4 10 -2 20"/>
                <path d="M196 128 q4 10 2 20"/>
            </g>`
    },
    {
        id: 'wavy',
        name: 'Каскад волнами',
        back: `
            <path d="M84 150 q-6-72 66-72 q72 0 66 72 q10 30 2 60 q10 26 0 52 q8 22-6 38 q-12 8-20-4 q-8 12-18 4 l-88 0 q-10 8-18-4 q-8 12-20 4 q-14-16-6-38 q-10-26 0-52 q-8-30 2-60 z" fill="url(#gb%ID%)"/>
            <g stroke="%DEEP%" stroke-width="4" fill="none" opacity="0.45" stroke-linecap="round">
                <path d="M106 170 q-14 28 0 56 q13 27 -2 58"/>
                <path d="M194 170 q14 28 0 56 q-13 27 2 58"/>
                <path d="M130 190 q-10 24 0 48 q9 23 -2 48"/>
                <path d="M170 190 q10 24 0 48 q-9 23 2 48"/>
            </g>
            <g stroke="%LIGHT%" stroke-width="2.8" fill="none" opacity="0.42" stroke-linecap="round">
                <path d="M117 180 q-12 26 0 52 q11 25 -2 52"/>
                <path d="M183 180 q12 26 0 52 q-11 25 2 52"/>
                <path d="M150 200 q-8 22 0 44 q7 21 -1 44"/>
            </g>
            <g stroke="%MID%" stroke-width="1.5" fill="none" opacity="0.6" filter="url(#fw%ID%)">
                <path d="M84 165 q-10 30 -2 62"/>
                <path d="M216 165 q10 30 2 62"/>
            </g>`,
        front: `
            ${FRINGE_SHADOW}
            <path d="M88 175 q-12-92 62-92 q74 0 62 92 q-4-50-20-60 q4 16 0 28 q-12-32-42-34 q-30 2-42 34 q-4-12 0-28 q-16 10-20 60 z" fill="url(#gv%ID%)"/>
            <path d="M88 175 q-12-92 62-92 q74 0 62 92 q-4-50-20-60 q4 16 0 28 q-12-32-42-34 q-30 2-42 34 q-4-12 0-28 q-16 10-20 60 z" fill="url(#gs%ID%)"/>
            <g stroke="%HI%" stroke-width="2.4" fill="none" opacity="0.5" stroke-linecap="round">
                <path d="M119 94 q-14 18 -12 40 q2 12 -6 22"/>
                <path d="M181 94 q14 18 12 40 q-2 12 6 22"/>
            </g>`
    },
    {
        id: 'curly',
        name: 'Кудри',
        back: `
            <g fill="url(#gb%ID%)">
                <circle cx="95" cy="130" r="27"/><circle cx="150" cy="104" r="31"/><circle cx="205" cy="130" r="27"/>
                <circle cx="82" cy="175" r="25"/><circle cx="218" cy="175" r="25"/>
                <circle cx="86" cy="220" r="23"/><circle cx="214" cy="220" r="23"/>
                <circle cx="100" cy="256" r="20"/><circle cx="200" cy="256" r="20"/>
            </g>
            <g fill="%LIGHT%" opacity="0.35">
                <circle cx="90" cy="123" r="11"/><circle cx="144" cy="96" r="13"/><circle cx="200" cy="123" r="11"/>
                <circle cx="77" cy="168" r="10"/><circle cx="213" cy="168" r="10"/>
                <circle cx="81" cy="213" r="9"/><circle cx="209" cy="213" r="9"/>
            </g>
            <g fill="%DEEP%" opacity="0.4">
                <circle cx="101" cy="138" r="10"/><circle cx="157" cy="113" r="12"/><circle cx="211" cy="138" r="10"/>
                <circle cx="88" cy="183" r="9"/><circle cx="224" cy="183" r="9"/>
                <circle cx="106" cy="262" r="8"/><circle cx="206" cy="262" r="8"/>
            </g>`,
        front: `
            ${FRINGE_SHADOW}
            <path d="M92 152 q-6-60 58-60 q64 0 58 60 q-8-27-24-33 q2 10-2 18 q-10-20-32-22 q-22 2-32 22 q-4-8-2-18 q-16 6-24 33 z" fill="url(#gv%ID%)"/>
            <g fill="url(#gv%ID%)">
                <circle cx="97" cy="140" r="14"/><circle cx="118" cy="112" r="15"/><circle cx="150" cy="101" r="16"/>
                <circle cx="182" cy="112" r="15"/><circle cx="203" cy="140" r="14"/>
            </g>
            <g fill="%HI%" opacity="0.45">
                <circle cx="93" cy="135" r="5.5"/><circle cx="114" cy="107" r="6"/><circle cx="146" cy="96" r="6.5"/>
                <circle cx="178" cy="107" r="6"/><circle cx="199" cy="135" r="5.5"/>
            </g>
            <g fill="%DEEP%" opacity="0.35">
                <circle cx="102" cy="146" r="5"/><circle cx="123" cy="118" r="5.5"/><circle cx="155" cy="107" r="6"/>
                <circle cx="187" cy="118" r="5.5"/><circle cx="208" cy="146" r="5"/>
            </g>`
    },
    {
        id: 'ponytail',
        name: 'Хвост',
        back: `
            <path d="M198 118 q42 16 36 72 q-6 62 -32 94 q-13 14 -21 4 q-7-9 2-20 q17-35 11-86 q-3-40 4-64 z" fill="url(#gb%ID%)"/>
            <g stroke="%DEEP%" stroke-width="3" fill="none" opacity="0.5" stroke-linecap="round">
                <path d="M213 135 q13 42 3 88 q-5 28 -14 46"/>
                <path d="M204 130 q8 46 0 92"/>
            </g>
            <g stroke="%LIGHT%" stroke-width="2.4" fill="none" opacity="0.45" stroke-linecap="round">
                <path d="M221 145 q10 40 0 84 q-4 22 -12 38"/>
            </g>
            <ellipse cx="205" cy="115" rx="11" ry="7" fill="%DEEP%" transform="rotate(32 205 115)"/>`,
        front: `
            <path d="M88 168 q-10-84 62-84 q72 0 62 84 q-4-42-20-52 q3 14-1 24 q-11-26-41-28 q-30 2-41 28 q-4-10-1-24 q-16 10-20 52 z" fill="url(#gv%ID%)"/>
            <path d="M88 168 q-10-84 62-84 q72 0 62 84 q-4-42-20-52 q3 14-1 24 q-11-26-41-28 q-30 2-41 28 q-4-10-1-24 q-16 10-20 52 z" fill="url(#gs%ID%)"/>
            <g stroke="%DARK%" stroke-width="1.8" fill="none" opacity="0.45" stroke-linecap="round">
                <path d="M100 132 q52-36 102-16"/>
                <path d="M96 148 q56-34 106-18"/>
                <path d="M108 118 q46-30 92-14"/>
                <path d="M124 104 q36-20 72-8"/>
            </g>
            <g stroke="%HI%" stroke-width="2" fill="none" opacity="0.5" stroke-linecap="round">
                <path d="M104 140 q54-34 100-17"/>
                <path d="M116 111 q40-24 80-10"/>
            </g>`
    },
    {
        id: 'bun',
        name: 'Пучок',
        back: '',
        front: `
            <circle cx="150" cy="76" r="26" fill="url(#gb%ID%)"/>
            <path d="M132 68 q10-15 32-7 q13 7 6 20" stroke="%DEEP%" stroke-width="3" fill="none" opacity="0.5" stroke-linecap="round"/>
            <path d="M137 85 q14 9 27-1" stroke="%LIGHT%" stroke-width="2.5" fill="none" opacity="0.5" stroke-linecap="round"/>
            <path d="M88 168 q-10-82 62-82 q72 0 62 82 q-4-42-20-52 q3 14-1 24 q-11-26-41-28 q-30 2-41 28 q-4-10-1-24 q-16 10-20 52 z" fill="url(#gv%ID%)"/>
            <path d="M88 168 q-10-82 62-82 q72 0 62 82 q-4-42-20-52 q3 14-1 24 q-11-26-41-28 q-30 2-41 28 q-4-10-1-24 q-16 10-20 52 z" fill="url(#gs%ID%)"/>
            <g stroke="%DARK%" stroke-width="1.8" fill="none" opacity="0.45" stroke-linecap="round">
                <path d="M100 134 q24-40 48-46"/>
                <path d="M200 134 q-24-40-48-46"/>
                <path d="M112 116 q20-24 38-28"/>
                <path d="M188 116 q-20-24-38-28"/>
            </g>
            <g stroke="%HI%" stroke-width="2" fill="none" opacity="0.5" stroke-linecap="round">
                <path d="M106 126 q24-34 44-40"/>
                <path d="M194 126 q-24-34-44-40"/>
            </g>`
    },
    {
        id: 'buzz',
        name: 'Ёжик',
        back: '',
        front: `
            <path d="M91 144 q-5-54 59-56 q64 2 59 56 q-5-24-19-30 q-15-13-40-13 q-25 0-40 13 q-14 6-19 30 z" fill="url(#gb%ID%)" opacity="0.78" filter="url(#fw%ID%)"/>
            <path d="M96 132 q-3-32 54-34 q57 2 54 34 q-14-22-54-22 q-40 0-54 22 z" fill="%DEEP%" opacity="0.35" filter="url(#fw%ID%)"/>`
    }
];

// Цвета волос
const COLORS = [
    { id: 'blond', name: 'Блонд', hex: '#e7c78f' },
    { id: 'rusy', name: 'Русый', hex: '#a8845c' },
    { id: 'brown', name: 'Каштановый', hex: '#6b4226' },
    { id: 'black', name: 'Чёрный', hex: '#241a16' },
    { id: 'ginger', name: 'Рыжий', hex: '#b5501e' },
    { id: 'red', name: 'Красный', hex: '#a32638' },
    { id: 'ash', name: 'Пепельный', hex: '#b0a8a3' },
    { id: 'pink', name: 'Розовый', hex: '#e79fc4' },
    { id: 'violet', name: 'Фиолетовый', hex: '#7d5ba6' },
    { id: 'blue', name: 'Синий', hex: '#3f5fa8' }
];

// Тон кожи
const SKINS = [
    { id: 'light', hex: '#f2c9a5' },
    { id: 'tan', hex: '#e0ab7d' },
    { id: 'medium', hex: '#c08552' },
    { id: 'dark', hex: '#8d5a33' },
    { id: 'deep', hex: '#5f3a20' }
];

// Формы лица и рекомендации
const FACE_SHAPES = [
    {
        id: 'oval',
        name: 'Овал',
        tip: 'Овалу подходит почти всё — экспериментируйте смело!',
        styles: ['pixie', 'bob', 'long', 'wavy', 'curly', 'ponytail', 'bun', 'buzz']
    },
    {
        id: 'round',
        name: 'Круг',
        tip: 'Круглому лицу идут объём у макушки и удлинённые пряди: каскад, длинные волосы, высокий пучок.',
        styles: ['long', 'wavy', 'bun', 'ponytail']
    },
    {
        id: 'square',
        name: 'Квадрат',
        tip: 'Квадратному лицу подойдут мягкие линии: волны, кудри и удлинённое каре.',
        styles: ['wavy', 'curly', 'bob', 'long']
    },
    {
        id: 'heart',
        name: 'Сердце',
        tip: 'Форме «сердце» идут причёски с объёмом у подбородка: каре, волны, кудри.',
        styles: ['bob', 'wavy', 'curly']
    },
    {
        id: 'oblong',
        name: 'Вытянутое',
        tip: 'Вытянутому лицу подходят объём по бокам и чёлка: каре, кудри, пикси.',
        styles: ['bob', 'curly', 'pixie']
    }
];

const STORAGE_KEY = 'hairstyle-app-state';
const FAV_KEY = 'hairstyle-app-favorites';

// ===== Состояние =====

let state = {
    style: 'bob',
    color: '#6b4226',
    colorName: 'Каштановый',
    skin: '#f2c9a5',
    shape: null,
    mode: 'avatar', // 'avatar' | 'photo'
    fit: { x: 0, y: 0, s: 1, r: 0, w: 1 } // подгонка причёски под фото (w — ширина)
};

// Фото храним отдельно от state: dataURL слишком большой для localStorage
let photoData = null;

// ===== Элементы =====

const el = {
    svg: document.getElementById('avatar'),
    hairBack: document.getElementById('hair-back'),
    hairFront: document.getElementById('hair-front'),
    avatarBody: document.getElementById('avatar-body'),
    userPhoto: document.getElementById('user-photo'),
    modeAvatar: document.getElementById('mode-avatar'),
    modePhoto: document.getElementById('mode-photo'),
    photoControls: document.getElementById('photo-controls'),
    fitControls: document.getElementById('fit-controls'),
    photoInput: document.getElementById('photo-input'),
    fitScale: document.getElementById('fit-scale'),
    fitWidth: document.getElementById('fit-width'),
    fitRotate: document.getElementById('fit-rotate'),
    btnAutofit: document.getElementById('btn-autofit'),
    btnDownload: document.getElementById('btn-download'),
    skinGroup: document.getElementById('skin-group'),
    hairstyles: document.getElementById('hairstyles'),
    colors: document.getElementById('colors'),
    skins: document.getElementById('skins'),
    faceShapes: document.getElementById('face-shapes'),
    shapeTip: document.getElementById('shape-tip'),
    currentChoice: document.getElementById('current-choice'),
    customColor: document.getElementById('custom-color'),
    favorites: document.getElementById('favorites'),
    btnRandom: document.getElementById('btn-random'),
    btnSave: document.getElementById('btn-save')
};

// ===== Оттенки цвета и инстанцирование причёски =====

function shade(hex, amount) {
    const n = parseInt(hex.slice(1), 16);
    const clamp = v => Math.max(0, Math.min(255, v + amount));
    const r = clamp(n >> 16), g = clamp((n >> 8) & 0xff), b = clamp(n & 0xff);
    return '#' + ((r << 16) | (g << 8) | b).toString(16).padStart(6, '0');
}

function paletteFor(hex) {
    return {
        DEEP: shade(hex, -64),
        DARK: shade(hex, -36),
        MID: hex,
        LIGHT: shade(hex, 40),
        HI: shade(hex, 84)
    };
}

// Подставляет цветовые оттенки и уникальный суффикс id в SVG-фрагмент причёски
function instHair(fragment, color, uid) {
    const p = paletteFor(color);
    return fragment
        .replaceAll('%ID%', uid)
        .replaceAll('%DEEP%', p.DEEP)
        .replaceAll('%DARK%', p.DARK)
        .replaceAll('%MID%', p.MID)
        .replaceAll('%LIGHT%', p.LIGHT)
        .replaceAll('%HI%', p.HI);
}

// ===== Рендер аватара =====

function renderAvatar() {
    const style = HAIRSTYLES.find(s => s.id === state.style);
    const photoMode = state.mode === 'photo';

    // На фото нет нарисованной головы, прикрывающей задний слой волос,
    // поэтому вырезаем в нём окно под лицо маской
    const back = photoMode && photoData
        ? HOLE_MASK + '<g mask="url(#mh%ID%)">' + style.back + '</g>'
        : style.back;
    el.hairBack.innerHTML = instHair(HAIR_DEFS + back, state.color, 'av');
    el.hairFront.innerHTML = instHair(style.front, state.color, 'av');
    document.documentElement.style.setProperty('--skin', state.skin);
    el.avatarBody.style.display = photoMode && photoData ? 'none' : '';
    el.userPhoto.style.display = photoMode && photoData ? '' : 'none';
    if (photoData) el.userPhoto.setAttribute('href', photoData);

    if (photoMode && photoData) {
        // Двигаем/масштабируем/вращаем причёску вокруг центра головы аватара (150, 165);
        // w растягивает по ширине, чтобы сесть по контуру лица
        const { x, y, s, r, w } = state.fit;
        const t = `translate(${x} ${y}) translate(150 165) rotate(${r}) scale(${s * w} ${s}) translate(-150 -165)`;
        el.hairBack.setAttribute('transform', t);
        el.hairFront.setAttribute('transform', t);
    } else {
        el.hairBack.removeAttribute('transform');
        el.hairFront.removeAttribute('transform');
    }

    // Панели и подсказки под текущий режим
    el.modeAvatar.classList.toggle('active', !photoMode);
    el.modePhoto.classList.toggle('active', photoMode);
    el.photoControls.hidden = !photoMode;
    el.fitControls.hidden = !photoMode || !photoData;
    el.skinGroup.style.display = photoMode ? 'none' : '';
    el.svg.classList.toggle('draggable', photoMode && !!photoData);
    el.fitScale.value = state.fit.s;
    el.fitWidth.value = state.fit.w;
    el.fitRotate.value = state.fit.r;

    el.currentChoice.textContent = `${style.name} · ${state.colorName}`;
}

// ===== Рендер панелей выбора =====

function thumbSvg(style, color) {
    const uid = 't-' + style.id;
    return `
        <svg viewBox="40 40 220 250" class="thumb">
            ${instHair(HAIR_DEFS + style.back, color, uid)}
            <ellipse cx="150" cy="165" rx="62" ry="75" fill="#f2c9a5"/>
            ${instHair(style.front, color, uid)}
        </svg>`;
}

function renderHairstyles() {
    el.hairstyles.innerHTML = '';
    const shape = FACE_SHAPES.find(f => f.id === state.shape);

    HAIRSTYLES.forEach(style => {
        const card = document.createElement('button');
        card.type = 'button';
        card.className = 'style-card';
        if (style.id === state.style) card.classList.add('active');
        if (shape && shape.styles.includes(style.id)) card.classList.add('recommended');
        card.innerHTML = thumbSvg(style, state.color) + `<span>${style.name}</span>`;
        card.addEventListener('click', () => {
            state.style = style.id;
            update();
        });
        el.hairstyles.appendChild(card);
    });
}

function renderColors() {
    el.colors.innerHTML = '';
    COLORS.forEach(color => {
        const sw = document.createElement('button');
        sw.type = 'button';
        sw.className = 'swatch';
        sw.style.background = color.hex;
        sw.title = color.name;
        if (color.hex === state.color) sw.classList.add('active');
        sw.addEventListener('click', () => {
            state.color = color.hex;
            state.colorName = color.name;
            update();
        });
        el.colors.appendChild(sw);
    });
}

function renderSkins() {
    el.skins.innerHTML = '';
    SKINS.forEach(skin => {
        const sw = document.createElement('button');
        sw.type = 'button';
        sw.className = 'swatch';
        sw.style.background = skin.hex;
        if (skin.hex === state.skin) sw.classList.add('active');
        sw.addEventListener('click', () => {
            state.skin = skin.hex;
            update();
        });
        el.skins.appendChild(sw);
    });
}

function renderFaceShapes() {
    el.faceShapes.innerHTML = '';
    FACE_SHAPES.forEach(shape => {
        const chip = document.createElement('button');
        chip.type = 'button';
        chip.className = 'chip';
        chip.textContent = shape.name;
        if (shape.id === state.shape) chip.classList.add('active');
        chip.addEventListener('click', () => {
            state.shape = state.shape === shape.id ? null : shape.id;
            update();
        });
        el.faceShapes.appendChild(chip);
    });
    const shape = FACE_SHAPES.find(f => f.id === state.shape);
    el.shapeTip.textContent = shape ? shape.tip : '';
}

// ===== Избранное =====

function getFavorites() {
    try {
        return JSON.parse(localStorage.getItem(FAV_KEY)) || [];
    } catch {
        return [];
    }
}

function renderFavorites() {
    const favs = getFavorites();
    el.favorites.innerHTML = '';
    if (!favs.length) {
        el.favorites.innerHTML = '<p class="fav-empty">Пока пусто — нажмите «Сохранить образ»</p>';
        return;
    }
    favs.forEach((fav, i) => {
        const styleName = (HAIRSTYLES.find(s => s.id === fav.style) || {}).name || fav.style;
        const item = document.createElement('div');
        item.className = 'fav-item';
        item.innerHTML = `
            <span class="dot" style="background:${fav.color}"></span>
            <span class="fav-name">${styleName} · ${fav.colorName}</span>
            <button type="button" class="fav-apply" title="Примерить">👁</button>
            <button type="button" class="fav-remove" title="Удалить">✕</button>`;
        item.querySelector('.fav-apply').addEventListener('click', () => {
            state = { ...state, style: fav.style, color: fav.color, colorName: fav.colorName, skin: fav.skin };
            update();
        });
        item.querySelector('.fav-remove').addEventListener('click', () => {
            const next = getFavorites();
            next.splice(i, 1);
            localStorage.setItem(FAV_KEY, JSON.stringify(next));
            renderFavorites();
        });
        el.favorites.appendChild(item);
    });
}

// ===== Действия =====

el.btnSave.addEventListener('click', () => {
    const favs = getFavorites();
    const exists = favs.some(f => f.style === state.style && f.color === state.color && f.skin === state.skin);
    if (!exists) {
        favs.push({ style: state.style, color: state.color, colorName: state.colorName, skin: state.skin });
        localStorage.setItem(FAV_KEY, JSON.stringify(favs));
    }
    renderFavorites();
});

el.btnRandom.addEventListener('click', () => {
    const pool = state.shape
        ? HAIRSTYLES.filter(s => FACE_SHAPES.find(f => f.id === state.shape).styles.includes(s.id))
        : HAIRSTYLES;
    const style = pool[Math.floor(Math.random() * pool.length)];
    const color = COLORS[Math.floor(Math.random() * COLORS.length)];
    state.style = style.id;
    state.color = color.hex;
    state.colorName = color.name;
    update();
});

el.customColor.addEventListener('input', e => {
    state.color = e.target.value;
    state.colorName = 'Свой цвет ' + e.target.value;
    update();
});

// ===== Режим «Моё фото» =====

el.modeAvatar.addEventListener('click', () => {
    state.mode = 'avatar';
    update();
});

el.modePhoto.addEventListener('click', () => {
    state.mode = 'photo';
    update();
});

el.photoInput.addEventListener('change', e => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
        photoData = reader.result;
        state.mode = 'photo';
        state.fit = { x: 0, y: 0, s: 1, r: 0, w: 1 };
        update();
        autoFit(); // сразу ищем лицо и сажаем причёску по нему
    };
    reader.readAsDataURL(file);
});

el.fitScale.addEventListener('input', e => {
    state.fit.s = parseFloat(e.target.value);
    update();
});

el.fitWidth.addEventListener('input', e => {
    state.fit.w = parseFloat(e.target.value);
    update();
});

el.fitRotate.addEventListener('input', e => {
    state.fit.r = parseFloat(e.target.value);
    update();
});

// Перетаскивание причёски по фото (мышь и палец)
let drag = null;

el.svg.addEventListener('pointerdown', e => {
    if (state.mode !== 'photo' || !photoData) return;
    e.preventDefault();
    el.svg.setPointerCapture(e.pointerId);
    el.svg.classList.add('dragging');
    drag = { px: e.clientX, py: e.clientY, x: state.fit.x, y: state.fit.y };
});

el.svg.addEventListener('pointermove', e => {
    if (!drag) return;
    // Переводим пиксели экрана в координаты viewBox (300 единиц по ширине)
    const k = 300 / el.svg.getBoundingClientRect().width;
    state.fit.x = drag.x + (e.clientX - drag.px) * k;
    state.fit.y = drag.y + (e.clientY - drag.py) * k;
    renderAvatar();
});

['pointerup', 'pointercancel'].forEach(ev => el.svg.addEventListener(ev, () => {
    if (!drag) return;
    drag = null;
    el.svg.classList.remove('dragging');
    saveState();
}));

// Колесо мыши — масштаб причёски
el.svg.addEventListener('wheel', e => {
    if (state.mode !== 'photo' || !photoData) return;
    e.preventDefault();
    const next = state.fit.s * (e.deltaY < 0 ? 1.05 : 0.95);
    state.fit.s = Math.min(2.5, Math.max(0.35, next));
    renderAvatar();
    saveState();
}, { passive: false });

// ===== Авто-подгонка по лицу (pico.js, работает целиком в браузере) =====

let picoClassifier = null;

function getClassifier() {
    if (!picoClassifier) {
        const bytes = Uint8Array.from(atob(FACEFINDER_B64), c => c.charCodeAt(0));
        picoClassifier = pico.unpack_cascade(bytes);
    }
    return picoClassifier;
}

async function autoFit(showAlert) {
    if (!photoData) return;
    try {
        const img = new Image();
        img.src = photoData;
        await img.decode();

        // Уменьшаем фото для скорости детекции
        const kk = Math.min(1, 640 / img.naturalWidth);
        const W = Math.round(img.naturalWidth * kk);
        const H = Math.round(img.naturalHeight * kk);
        const canvas = document.createElement('canvas');
        canvas.width = W;
        canvas.height = H;
        const g = canvas.getContext('2d', { willReadFrequently: true });
        g.drawImage(img, 0, 0, W, H);
        const rgba = g.getImageData(0, 0, W, H).data;
        const gray = new Uint8Array(W * H);
        for (let i = 0; i < W * H; i++) {
            gray[i] = (2 * rgba[4 * i] + 7 * rgba[4 * i + 1] + rgba[4 * i + 2]) / 10;
        }

        let dets = pico.run_cascade(
            { pixels: gray, nrows: H, ncols: W, ldim: W },
            getClassifier(),
            { shiftfactor: 0.1, minsize: Math.max(40, Math.round(Math.min(W, H) * 0.15)), maxsize: 2000, scalefactor: 1.1 }
        );
        dets = pico.cluster_detections(dets, 0.2);
        dets.sort((a, b) => b[3] - a[3]);

        if (!dets.length || dets[0][3] < 5) {
            if (showAlert) alert('Лицо не найдено на фото — подгоните причёску вручную.');
            return;
        }

        const [row, col, size] = dets[0];
        // Обратно в пиксели оригинала, затем в координаты viewBox (фото вписано в 300×340 как cover)
        const k = Math.max(300 / img.naturalWidth, 340 / img.naturalHeight);
        const ox = (img.naturalWidth * k - 300) / 2;
        const oy = (img.naturalHeight * k - 340) / 2;
        const fx = (col / kk) * k - ox;
        const fy = (row / kk) * k - oy;
        const fs = (size / kk) * k; // примерный диаметр лица в единицах viewBox

        // Причёска должна быть шире лица и закрывать родные волосы, поэтому
        // берём масштаб с запасом, добавляем ширины и сдвигаем чуть выше центра лица
        state.fit.s = Math.min(2.5, Math.max(0.35, fs / 130));
        state.fit.w = 1.12;
        state.fit.x = fx - 150;
        state.fit.y = fy - 165 - fs * 0.06;
        state.fit.r = 0;
        update();
        saveState();
    } catch {
        if (showAlert) alert('Не получилось определить лицо — подгоните причёску вручную.');
    }
}

el.btnAutofit.addEventListener('click', () => autoFit(true));

// Скачать результат как PNG
el.btnDownload.addEventListener('click', () => {
    const clone = el.svg.cloneNode(true);
    clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    clone.setAttribute('width', 600);
    clone.setAttribute('height', 680);
    // Подставляем реальный цвет кожи вместо CSS-переменной
    clone.querySelectorAll('[fill="var(--skin)"]').forEach(n => n.setAttribute('fill', state.skin));

    const url = URL.createObjectURL(new Blob([clone.outerHTML], { type: 'image/svg+xml' }));
    const img = new Image();
    img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = 600;
        canvas.height = 680;
        canvas.getContext('2d').drawImage(img, 0, 0);
        URL.revokeObjectURL(url);
        const a = document.createElement('a');
        a.href = canvas.toDataURL('image/png');
        a.download = 'moy-obraz.png';
        a.click();
    };
    img.src = url;
});

// ===== Сохранение состояния =====

function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function loadState() {
    try {
        const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
        if (saved && HAIRSTYLES.some(s => s.id === saved.style)) {
            state = { ...state, ...saved };
            state.fit = { x: 0, y: 0, s: 1, r: 0, w: 1, ...(saved.fit || {}) };
            state.mode = 'avatar'; // фото не переживает перезагрузку, начинаем с аватара
        }
    } catch {
        // повреждённые данные — используем значения по умолчанию
    }
}

// ===== Общий апдейт =====

function update() {
    renderAvatar();
    renderHairstyles();
    renderColors();
    renderSkins();
    renderFaceShapes();
    saveState();
}

loadState();
update();
renderFavorites();
