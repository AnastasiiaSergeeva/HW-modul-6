// ===== Данные =====

// Причёски: SVG-слои в системе координат аватара (viewBox 0 0 300 340).
// back — рисуется за головой, front — поверх лица (чёлка, пряди).
const HAIRSTYLES = [
    {
        id: 'pixie',
        name: 'Пикси',
        back: '',
        front: `
            <path d="M88 160 q-8-62 62-72 q70 10 62 72 q-4-30-20-38 q6 14 2 24 q-10-24-44-26 q-34 2-44 26 q-4-10 2-24 q-16 8-20 38 z"/>
            <path d="M88 160 q-2 12 4 20 q-8-4-10-14 z"/>
            <path d="M212 160 q2 12 -4 20 q8-4 10-14 z"/>`
    },
    {
        id: 'bob',
        name: 'Каре',
        back: `<path d="M84 150 q-6-70 66-70 q72 0 66 70 l4 76 q0 14-18 12 l-104 0 q-18 2-18-12 z"/>`,
        front: `
            <path d="M88 165 q-10-80 62-80 q72 0 62 80 q-6-40-22-48 q4 14 0 24 q-12-28-40-30 q-28 2-40 30 q-4-10 0-24 q-16 8-22 48 z"/>`
    },
    {
        id: 'long',
        name: 'Длинные прямые',
        back: `<path d="M84 150 q-6-72 66-72 q72 0 66 72 l8 150 q0 14-16 12 l-116 0 q-16 2-16-12 z"/>`,
        front: `
            <path d="M88 175 q-12-92 62-92 q74 0 62 92 q-4-50-20-60 q4 16 0 28 q-12-32-42-34 q-30 2-42 34 q-4-12 0-28 q-16 10-20 60 z"/>`
    },
    {
        id: 'wavy',
        name: 'Каскад волнами',
        back: `
            <path d="M84 150 q-6-72 66-72 q72 0 66 72 q10 30 2 60 q10 26 0 52 q8 22-6 38 q-12 8-20-4 q-8 12-18 4 l-88 0 q-10 8-18-4 q-8 12-20 4 q-14-16-6-38 q-10-26 0-52 q-8-30 2-60 z"/>`,
        front: `
            <path d="M88 175 q-12-92 62-92 q74 0 62 92 q-6-48-22-58 q4 16 0 28 q-12-32-40-34 q-28 2-40 34 q-4-12 0-28 q-16 10-22 58 z"/>`
    },
    {
        id: 'curly',
        name: 'Кудри',
        back: `
            <circle cx="95" cy="130" r="26"/><circle cx="150" cy="105" r="30"/><circle cx="205" cy="130" r="26"/>
            <circle cx="82" cy="175" r="24"/><circle cx="218" cy="175" r="24"/>
            <circle cx="86" cy="220" r="22"/><circle cx="214" cy="220" r="22"/>
            <circle cx="100" cy="255" r="20"/><circle cx="200" cy="255" r="20"/>`,
        front: `
            <path d="M92 150 q-6-58 58-58 q64 0 58 58 q-8-26-24-32 q2 10-2 18 q-10-20-32-22 q-22 2-32 22 q-4-8-2-18 q-16 6-24 32 z"/>
            <circle cx="97" cy="140" r="13"/><circle cx="118" cy="112" r="14"/><circle cx="150" cy="102" r="15"/>
            <circle cx="182" cy="112" r="14"/><circle cx="203" cy="140" r="13"/>`
    },
    {
        id: 'ponytail',
        name: 'Хвост',
        back: `
            <path d="M196 120 q34 14 30 66 q-4 56-28 88 q-14 16-22 6 q-6-10 4-22 q14-36 8-86 q-2-34 8-52 z"/>
            <circle cx="204" cy="112" r="14"/>`,
        front: `
            <path d="M88 165 q-10-80 62-80 q72 0 62 80 q-6-42-22-50 q4 14 0 24 q-12-28-40-30 q-28 2-40 30 q-4-10 0-24 q-16 8-22 50 z"/>`
    },
    {
        id: 'bun',
        name: 'Пучок',
        back: '',
        front: `
            <circle cx="150" cy="78" r="24"/>
            <path d="M88 165 q-10-78 62-78 q72 0 62 78 q-6-42-22-50 q4 14 0 24 q-12-28-40-30 q-28 2-40 30 q-4-10 0-24 q-16 8-22 50 z"/>`
    },
    {
        id: 'buzz',
        name: 'Ёжик',
        back: '',
        front: `<path d="M92 140 q-4-48 58-50 q62 2 58 50 q-6-20-18-26 q-16-14-40-14 q-24 0-40 14 q-12 6-18 26 z" opacity="0.9"/>`
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
    fit: { x: 0, y: 0, s: 1, r: 0 } // подгонка причёски под фото
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

// ===== Рендер аватара =====

function renderAvatar() {
    const style = HAIRSTYLES.find(s => s.id === state.style);
    el.hairBack.innerHTML = style.back;
    el.hairFront.innerHTML = style.front;
    el.hairBack.setAttribute('fill', shade(state.color, -18));
    el.hairFront.setAttribute('fill', state.color);
    document.documentElement.style.setProperty('--skin', state.skin);

    const photoMode = state.mode === 'photo';
    el.avatarBody.style.display = photoMode && photoData ? 'none' : '';
    el.userPhoto.style.display = photoMode && photoData ? '' : 'none';
    if (photoData) el.userPhoto.setAttribute('href', photoData);

    if (photoMode && photoData) {
        // Двигаем/масштабируем/вращаем причёску вокруг центра головы аватара (150, 165)
        const { x, y, s, r } = state.fit;
        const t = `translate(${x} ${y}) translate(150 165) rotate(${r}) scale(${s}) translate(-150 -165)`;
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
    el.fitRotate.value = state.fit.r;

    el.currentChoice.textContent = `${style.name} · ${state.colorName}`;
}

// Затемнение/осветление цвета для заднего слоя волос
function shade(hex, amount) {
    const n = parseInt(hex.slice(1), 16);
    const clamp = v => Math.max(0, Math.min(255, v + amount));
    const r = clamp(n >> 16), g = clamp((n >> 8) & 0xff), b = clamp(n & 0xff);
    return '#' + ((r << 16) | (g << 8) | b).toString(16).padStart(6, '0');
}

// ===== Рендер панелей выбора =====

function thumbSvg(style, color) {
    return `
        <svg viewBox="40 40 220 250" class="thumb">
            <g class="thumb-hair-back" fill="${shade(color, -18)}">${style.back}</g>
            <ellipse cx="150" cy="165" rx="62" ry="75" fill="#f2c9a5"/>
            <g class="thumb-hair-front" fill="${color}">${style.front}</g>
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
        state.fit = { x: 0, y: 0, s: 1, r: 0 };
        update();
        autoFit(); // пробуем найти лицо автоматически, если браузер умеет
    };
    reader.readAsDataURL(file);
});

el.fitScale.addEventListener('input', e => {
    state.fit.s = parseFloat(e.target.value);
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

// Авто-подгонка: используем встроенный в браузер FaceDetector, если он есть
async function autoFit(showAlert) {
    if (!('FaceDetector' in window)) {
        if (showAlert) alert('Ваш браузер не поддерживает автоопределение лица — подгоните причёску вручную.');
        return;
    }
    try {
        const img = new Image();
        img.src = photoData;
        await img.decode();

        const faces = await new FaceDetector().detect(img);
        if (!faces.length) {
            if (showAlert) alert('Лицо не найдено — подгоните причёску вручную.');
            return;
        }
        const box = faces[0].boundingBox;

        // Фото вписано в viewBox 300x340 в режиме «cover» — пересчитываем рамку лица
        const k = Math.max(300 / img.naturalWidth, 340 / img.naturalHeight);
        const ox = (img.naturalWidth * k - 300) / 2;
        const oy = (img.naturalHeight * k - 340) / 2;
        const fx = box.x * k - ox + (box.width * k) / 2;
        const fy = box.y * k - oy + (box.height * k) / 2;

        state.fit.s = Math.min(2.5, Math.max(0.35, (box.width * k) / 115));
        state.fit.x = fx - 150;
        state.fit.y = fy - 165;
        state.fit.r = 0;
        update();
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
            state.fit = saved.fit || { x: 0, y: 0, s: 1, r: 0 };
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
