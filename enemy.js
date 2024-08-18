
class Enemy extends GameObject {

    constructor(x, y, points = 0, wall_handler = null, bullet_timer_handler = null) {
        super(x, y, 30, 30, 'white')
        this.vx = 0.2
        this.vxa = 1.0
        this.group = 'enemy'
        this.points = points
        this.enemy_wall_changed_handler = wall_handler
        this.enemy_projectile_time_handler = bullet_timer_handler
    }

    set_enemy_wall_changed(val) {
        if(this.enemy_wall_changed_handler !== null) this.enemy_wall_changed_handler.set(val)
    }

    get_enemy_wall_changed() {
        if(this.enemy_wall_changed_handler !== null) return this.enemy_wall_changed_handler.get()
        return null
    }

    set_enemy_projectile_time(val) {
        if(this.enemy_projectile_time_handler !== null) this.enemy_projectile_time_handler.set(val)
    }

    get_enemy_projectile_time() {
        if(this.enemy_projectile_time_handler !== null) return this.enemy_projectile_time_handler.get()
        return null
    }

    /* Verifica se algum dos inimigos chegou proximo das paredes do jogo */
    _colision_walls() {

        // retorna todos objetos que possuem um parametro chamado group com o valor enemy,
        // ou seja, todos os inimigos que existem no jogo
        const enemys_list = this.engine.find_objects_by_params([ ['group', 'enemy'] ])
        for(const eny of enemys_list) {
            if(eny.x < 50 || eny.x > this.engine.canva.offsetWidth - 50) {
                return true
            }
        }

        return false
    }

    _phisics(eng, delta) {

        // se tocou na parede do jogo avança para baixo e
        // muda a direção do movimento
        if(this._colision_walls()) {
            this.vx = -this.vx
            this.x += this.vx * 10
            this.y += 15
            this.vxa += 0.5

            if(this.get_enemy_wall_changed() === 1) {

                // reduz o tempo entre os tiros dos inimigos
                if(this.get_enemy_projectile_time() > 500) {
                    this.set_enemy_projectile_time( this.get_enemy_projectile_time() - 50 )
                }

                // notifica o toque na parede
                this.set_enemy_wall_changed(0)
            }

        }

        this.x += this.vx * this.vxa
    }

}