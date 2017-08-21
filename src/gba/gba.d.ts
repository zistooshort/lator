declare class GameBoyAdvance {
    keypad: GameBoyAdvanceKeypad;
    setCanvas(canvas: HTMLElement): void;
    setLogger(logger: (level: number, error: string) => void): void;
    pause(): void;
    logLevel: {};
    LOG_ERROR: number;
    setBios(bios: any): void;
    setRom(rom: any): void;
    runStable(): void;
    paused: boolean;
    freeze(): {};
    reset(): void;
    targetCanvas: HTMLCanvasElement;
    video: {
        drawCallback(): void;
    };
    context: AudioContext;
    audio: {
        context: AudioContext;
    }
    loadRomFromFile (file: File, res: (res: any) => void): void;
}

declare class GameBoyAdvanceKeypad {
	KEYCODE_LEFT: number;
	KEYCODE_UP: number;
	KEYCODE_RIGHT: number;
	KEYCODE_DOWN: number;
	KEYCODE_START: number;
	KEYCODE_SELECT: number;
	KEYCODE_A: number;
	KEYCODE_B: number;
	KEYCODE_L: number;
	KEYCODE_R: number;
    keyboardHandler (e: {}): void;
    eatInput: boolean;
}

declare function loadRom(address: string, cb: (res: any) => void): void;
