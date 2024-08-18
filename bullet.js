
class Bullet extends GameObject {

    constructor(x, y, color, vy = -5, evade_group = null, hit_handler = null) {
        super(x, y, 3, 20, color)
        this.group = 'bullet'
        this.vy = vy
        this.evade_group = evade_group
        this.hit_handler = hit_handler
    }

    _phisics(eng, delta) {
        this.y += this.vy

        if(this.y <= 0 || this.y >= eng.canva.offsetHeight) {
            eng.objects.splice(eng.objects.indexOf(this), 1)
            return
        }

        for(const obj of eng.objects) {
            if(obj !== this && obj.group !== this.evade_group
                && eng.colision_rect_rect(obj, this)) {
                eng.objects.splice(eng.objects.indexOf(this), 1)
                eng.objects.splice(eng.objects.indexOf(obj), 1)
                if(this.hit_handler !== null) this.hit_handler(obj)
                return
            }
        }

    }

}