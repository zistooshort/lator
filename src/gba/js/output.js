var iGBA;
(function (iGBA) {
    var gba;
    function init(gameboy) {
        gba = gameboy;
    }
    iGBA.init = init;
    var Controls;
    (function (Controls) {
        function fire(code) {
            gba.keypad.keyboardHandler({
                keyCode: code,
                type: 'keydown',
                preventDefault: function () { }
            });
            setTimeout(function () {
                gba.keypad.keyboardHandler({
                    keyCode: code,
                    type: 'keyup',
                    preventDefault: function () { }
                });
            }, 1);
        }
        function up() {
            fire(gba.keypad.KEYCODE_UP);
        }
        Controls.up = up;
        function down() {
            fire(gba.keypad.KEYCODE_DOWN);
        }
        Controls.down = down;
        function left() {
            fire(gba.keypad.KEYCODE_LEFT);
        }
        Controls.left = left;
        function right() {
            fire(gba.keypad.KEYCODE_RIGHT);
        }
        Controls.right = right;
        function start() {
            fire(gba.keypad.KEYCODE_START);
        }
        Controls.start = start;
        function select() {
            fire(gba.keypad.KEYCODE_SELECT);
        }
        Controls.select = select;
        function a() {
            fire(gba.keypad.KEYCODE_A);
        }
        Controls.a = a;
        function b() {
            fire(gba.keypad.KEYCODE_B);
        }
        Controls.b = b;
        function l() {
            fire(gba.keypad.KEYCODE_L);
        }
        Controls.l = l;
        function r() {
            fire(gba.keypad.KEYCODE_R);
        }
        Controls.r = r;
    })(Controls = iGBA.Controls || (iGBA.Controls = {}));
})(iGBA || (iGBA = {}));
iGBA.init(gba);
