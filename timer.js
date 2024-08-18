
class Timer extends GameObject {

    constructor(time, handler, one = false) {
        super(0, 0, 0, 0, '')
        this.group = 'timer'
        this.time = time
        this.handler = handler
        this.curret_time = 0
    }

    _draw(eng) {}

    _phisics(eng, delta) {
        this.curret_time += delta
        if(this.curret_time >= this.time) {
            if(this.handler !== null) this.handler()
            this.curret_time = 0
            if(this.one) eng.objects.splice(eng.objects.indexOf(this), 1)
        }
    }

}