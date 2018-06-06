export function getId() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 9);
}

export const KEYS = { ESC: 27, TAB: 9, ENTER: 13, SPACE: 32, LEFT: 37, UP: 38, RIGHT: 39, DOWN: 40 };
