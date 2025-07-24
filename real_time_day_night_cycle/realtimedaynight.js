/*:
 * @plugindesc Changes screen tint based on real-world time to simulate day and night cycle. [System Clock Sync]
 * @author Arshit Samkria aka DarkHawk0097 (or DarkHawk097 :P )
 * @version beta 1.0.0
 * Target: RPG Maker MV (I don't really know about MZ, but my guess is: It should work with minimal errors)
 * @help_section Real-Time Day/Night Cycle Tint
 * First of all, it's not rocket science, but it is a simple plugin that changes the screen tint based on the real-world system clock.
 * This plugin changes tints of screen depending on the real-world system clock:
 * - Morning (6am - 11am): Light tint
 * - Afternoon (11am - 5pm): No tint
 * - Evening (5pm - 7pm): Slight orange tint
 * - Night (7pm - 6am): Dark blue tint
 *
 * It applies the tint automatically on map load.
 * Now some Juicy Stuff, if you really want realism. I recommend that you do at least 8 different tints based on dusk, sunrise, sunset etc.
 * This will create realistic and immersive experience for players.
 * 
 * In future updates, I aim to do exactly that, but for now, this is a simple implementation.
 * My future plan also includes a custom Season based tint system, which will change the tint based on the season of the year.
 * For now, experiment and enjoy!
 * 
 *
 * No plugin commands required.
 * 
 * Additionally, you can find me on: {Discord: DarkHawk97, PokeCommunity: DarkHawk0097}
 * Have fun!
 */

(function() {
    const updateScreenTint = function() {
        const hour = new Date().getHours();
        let tint;

        if (hour >= 6 && hour < 11) { 
            // morning - soft light blue
            tint = [30, 30, 60, 60];
        } else if (hour >= 11 && hour < 17) {
            // afternoon - no tint
            tint = [0, 0, 0, 0];
        } else if (hour >= 17 && hour < 19) {
            // evening - orange tint
            tint = [68, 34, -34, 40];
        } else {
            // night - dark blue
            tint = [-68, -68, 0, 100];
        }

        $gameScreen.startTint(tint, 60); // apply over 60 frames (1 second)
    };

    const _Scene_Map_start = Scene_Map.prototype.start;
    Scene_Map.prototype.start = function() {
        _Scene_Map_start.call(this);
        updateScreenTint();
    };

    const _Scene_Map_update = Scene_Map.prototype.update;
    Scene_Map.prototype.update = function() {
        _Scene_Map_update.call(this);
        if (this._tintTimer === undefined) this._tintTimer = 0;

        this._tintTimer++;
        if (this._tintTimer >= 3600) { // recheck every 3600 frames (~60 seconds), but I recommened 3500 frame.
            updateScreenTint();
            this._tintTimer = 0;
        }
    };
})();
