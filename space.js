
// Cria um objeto do motor de jogo
const engine = new Engine('canva')

const game_ui = new GameUI(0, 0)

engine.add_object(new Player(
    (engine.canva.offsetWidth / 2) -50,
    engine.canva.offsetHeight - 90,
    (pt) => { game_ui.score = pt }
))

/* Cria os inimigos e suas funcionalidades de apoio */
wall_handler = {
    value: 1,
    set: function(val) { this.value = val },
    get: function() { return this.value }
}

const enemyTimerBullet = new Timer(1.0, () => {
    wall_handler.set(1)
    
    const enemys_list = engine.find_objects_by_params( [ [ 'group', 'enemy' ] ])
    // seleciona um inimigo aleatorio para dispara o tiro
    const enemy_bullet = enemys_list[ parseInt( (enemys_list.length - 1) * Math.random() ) ]

    const bullet = new Bullet(
        enemy_bullet.x + (enemy_bullet.w / 2),
        enemy_bullet.y + (enemy_bullet.h / 2),
        'white',
        5,
        'enemy',
        (obj) => {
            if(obj.isplayer === true) game_ui.game_over = true
        }
    )
    bullet.isenemybullet = true
    engine.add_object(bullet)
})
engine.add_object(enemyTimerBullet)

bullet_time_handler = {
    value: 1000,
    set: function(val) { this.value = val; enemyTimerBullet.time = val / 1000 },
    get: function() { return this.value }
}

for(let x = 0; x < 11; x ++) {
    for(let y = 0; y < 5; y ++) {
        engine.add_object(new Enemy(
            115 + (40 * x),
            50 + (40 * y),
            (5 - y) * 10,
            wall_handler,
            bullet_time_handler
        ))
    }
}

/* Uma função para gerar um grupo de escudos */
function generate_shield(x, y) {
    for(let xp = 0; xp < 5; xp ++) {
        engine.add_object(new Shield(x + (xp * 20), y, 1))
        engine.add_object(new Shield(x + (xp * 20), y, 2))
        engine.add_object(new Shield(x + (xp * 20), y, 3))
        engine.add_object(new Shield(x + (xp * 20), y, 4))
    }

    for(let xp = 0; xp < 5; xp ++) {
        if(xp != 2) {
            engine.add_object(new Shield(x + (xp * 20), y + 20, 1))
            engine.add_object(new Shield(x + (xp * 20), y + 20, 2))
            engine.add_object(new Shield(x + (xp * 20), y + 20, 3))
            engine.add_object(new Shield(x + (xp * 20), y + 20, 4))
        }
    }

    for(let xp = 0; xp < 5; xp += 4) {
        if(xp != 2) {
            engine.add_object(new Shield(x + (xp * 20), y + 40, 1))
            engine.add_object(new Shield(x + (xp * 20), y + 40, 2))
            engine.add_object(new Shield(x + (xp * 20), y + 40, 3))
            engine.add_object(new Shield(x + (xp * 20), y + 40, 4))
        }
    }

}
generate_shield(100, engine.canva.offsetHeight - 190)
generate_shield(270, engine.canva.offsetHeight - 190)
generate_shield(440, engine.canva.offsetHeight - 190)
generate_shield(610, engine.canva.offsetHeight - 190)

/* Adiciona por ultimo para que a interface fique acima de todos os objetos */
engine.add_object(game_ui)

// inicia a atualização do motor de jogo
engine.update()