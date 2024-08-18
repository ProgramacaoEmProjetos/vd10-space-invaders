
class Player extends GameObject {

    constructor(x, y, points_update_handler = null) {
        super(x, y, 50, 50, 'green')
        this.vx = 0
        this.isplayer = true
        this.group = 'player'
        this.points = 0
        this.points_update_handler = points_update_handler
    }

    _draw(eng) {
        eng.draw_fill_rect(this.x, this.y + (this.h / 2), this.w, this.h / 2, this.color)
        eng.draw_fill_rect(this.x + (this.w / 4), this.y, this.w / 2, this.h / 2, this.color)
    }

    _phisics(eng, delta) {
        this.x += this.vx
    }

    _onkeydown(eng, key) {

        if(key === "ArrowLeft") {
            this.vx = -5
        }

        if(key === "ArrowRight") {
            this.vx = 5
        }

        if(key === " ") {

            const exist_bullet = eng.find_objects_by_params([ ['isplayerbullet', true] ], true)
            if(exist_bullet.length > 0) return

            const bullet = new Bullet(
                this.x + (this.w / 2),
                this.y - 30,
                this.color,
                -5,
                'player',
                (obj) => {
                    if(obj.group === 'enemy') {
                        this.points += obj.points
                        if(this.points_update_handler !== null) this.points_update_handler(this.points)
                    }
                }
            )

            bullet.isplayerbullet = true

            eng.add_object(bullet)
        }

    }

    _onkeyup(eng, key) {
        if(key === "ArrowLeft" || key === "ArrowRight") {
            this.vx = 0
        }
    }


}