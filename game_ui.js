
class GameUI extends GameObject {

    constructor(x, y) {
        super(x, y, 100, 50, '')
        this.group = 'player'
        this.score = 0
        this.game_over = false
    }

    _draw(eng) {
        if(this.game_over) {
            eng.draw_fill_rect(100, 200, eng.canva.offsetWidth - 200, 200, "red")
            eng.draw_text("SCORE: " + this.score, 320, 250, "white", 20)
            eng.draw_text("GAME OVER: ", 320, 280, "white", 20)

            eng.draw_text("Pressione ENTER para reiniciar.", 260, 380, "white", 20)
        } else {
            eng.draw_text("SCORE: " + this.score, this.x + 10, this.y + 30, "white", 20)
        }
    }

    _phisics(eng, delta) {

        // Se os inimigos chegarem até o jogador o jogo acaba
        if(!this.game_over) {
            const enemys_list = eng.find_objects_by_params([ [ 'group', 'enemy' ] ])
            for(const eny of enemys_list) {
                if(eny.y + eny.h > eng.canva.offsetHeight - 90) {
                    this.game_over = true
                    return
                } 
            }
        }

    }

    _onkeydown(eng, key) {
        if(this.game_over && key === "Enter") {
            location.reload()
        }
    }

}