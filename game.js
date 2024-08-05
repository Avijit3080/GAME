// IMPORTANT: Make sure to use Kaboom version 0.5.0 for this game by adding the correct script tag in the HTML file.

kaboom({
  global: true,
  fullscreen: true,
  scale: 1.5,
  width: 320,
  height: 240,
  debug: true,
  clearColor: [0, 0, 1],
})

// Speed identifiers
const MOVE_SPEED = 120
const JUMP_FORCE = 420
const BIG_JUMP_FORCE = 550
let CURRENT_JUMP_FORCE = JUMP_FORCE
const FALL_DEATH = 400
const ENEMY_SPEED = 20
const BOSS_SPEED = 60

// Game logic

let isJumping = true

// sounds
/*const bgmusic = new Audio('https://vgmsite.com/soundtracks/super-mario-bros/khbnvkqp/01%20-%20Super%20Mario%20Bros.mp3')*/
const mushintake = new Audio('https://vgmsite.com/soundtracks/super-mario-bros/gwsxwxwl/02%20-%20Invincibility%20Star.mp3')
const mariolose = new Audio('https://vgmsite.com/soundtracks/super-mario-bros/juxuzytm/15%20-%201-Down.mp3')
/* Another sound for losing game
// const mariolose = new Audio('http://soundfxcenter.com/video-games/super-mario-64/8d82b5_Super_Mario_64_Game_Over_Sound_Effect.mp3')*/
const levelup = new Audio('http://soundfxcenter.com/video-games/new-super-mario-bros/8d82b5_New_Super_Mario_Bros_Pipe_Sound_Effect.mp3')
const coinbgm = new Audio('https://www.redringtones.com/wp-content/uploads/2018/01/mario-coin-sound.mp3')
const jumpmario = new Audio('http://soundfxcenter.com/video-games/super-mario-bros/8d82b5_Super_Mario_Bros_Jump_Super_Sound_Effect.mp3');
const enemykill = new Audio('http://soundfxcenter.com/video-games/super-mario-64/8d82b5_SM64_Kill_Enemy_Sound_Effect.mp3');

loadRoot('https://i.imgur.com/')
// usage
loadSprite('mario', 'Wb1qfhK.png')
// loadSprite('mario', '')
loadSprite('mario-reverse', 'A9E6JJa.png')
loadSprite('coin', 'wbKxhcd.png')
loadSprite('pipe-top-left', 'ReTPiWY.png')
loadSprite('pipe-top-right', 'hj2GK4n.png')
loadSprite('pipe-bottom-left', 'c1cYSbt.png')
loadSprite('pipe-bottom-right', 'nqQ79eI.png')
// level 1
loadSprite('UNDERWORLD', 'riaIpSg.png')
loadSprite('evil-shroom', 'KPO3fR9.png')
loadSprite('brick', 'pogC9x5.png')
loadSprite('block', 'M6rwarW.png')
loadSprite('mushroom', '0wMd92p.png')
loadSprite('surprise', 'gesQ1KP.png')
loadSprite('unboxed', 'bdrLpi6.png')
// level 2
loadSprite('ICEWORLD', 'LYxSjgB.png')
loadSprite('blue-block', 'fVscIbn.png')
loadSprite('blue-brick', '3e5YRQd.png')
loadSprite('blue-steel', 'gqVoI2b.png')
loadSprite('blue-evil-shroom', 'SvV4ueD.png')
loadSprite('blue-surprise', 'RMqCc1G.png')
// level 3
loadSprite('SWAMPWORLD_1', 'W3cHgLV.png')
loadSprite('yellow-evil-shroom', 'SSQeffV.png')
loadSprite('green-brick', 'SXwIUIN.png')
loadSprite('green-block', 'ICiAcb4.png')
// level 4
loadSprite('SWAMPWORLD_2', 'yls9Qo0.png')
loadSprite('yellow-evil-shroom-stan', 'KLhkAuu.png')
// level 5
loadSprite('FINAL BOSS - DARK WORLD', 'Wen1OAe.png')
loadSprite('Turtle', 'gzQp7nl.png')
// loadSprite('Pins','0ASeTnG.png')
loadSprite('Shrooms', 'aGIClqw.png')



scene("game", ({ level, score }) => {
  layers(['bg', 'obj', 'ui'], 'obj')

  const maps =
    [
      [
        '                      U                      /',
        '                                             /',
        '                     =%=%=                   /',
        '                                             /',
        '                     $   $                   /',
        '                    ///////                  /',
        '         $                                   /',
        '     %   =*=%=                               /',
        '                                             /',
        '                                          -+ /',
        '    $ $    $ $      ^   ^   $ $ $         () /',
        '==============================================',
      ],
      [
        '                     I                                £',
        '                                                      £',
        '                                                      £',
        '                          $           x               £',
        '££££££                @@@@@@          x x             £',
        '                                    x x x $           £',
        '                                $ x x x x   x      -+ £',
        '                   Z      z     x x x x x x x x    () £',
        '!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!',

      ],
      [
        '                                    S                                                 b',
        '                     a%a%aaaaa%a%                               $                     b',
        '                                                                         -+           b',
        '    $ $                   $   $   $ $                                    ()           b',
        'aaaaaaa              bbbbbbbbbbbbbbbbb       a    a          a   a%%aaaaaaaaaa        b',
        '           $      &                        a   a     a   a                            b',
        '          b%b%bbbbb                                               bbbbb               b',
        '                                                                                      b',
        '                                                                                      b',
        '   $ $           c   c   $ $ $                          C         c                   b',
        'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
      ],
      [
        '                                                                  T                                                                       -+ b',
        '   $ $            l    l     $ $ $        $                   l          l               $    $        $        $      $  l  l            () b',
        'aaaaaaaaaaaaa   aaaaaaaaaa  aaaaaaa  aa  aaaa  aaaa      aaa  aaaaaa    aaaaaaaaa        aaa  aaa aa  aaa  aa   aaa a  a  aa aaa       aaaaaaa',
        '                                                                                                                                             b',
        '              b            $                        bbb       $$                  bbbbb                                     bbb      bbb   a',
        '         bbb             b b         b       bbbb             bbbb        bbbbb                                                 bbbbb      a',
        '             l      l l         l       $                               l        $            l    $             $     l       l           a',
        'aaaaaaaaaaaaaaa  aaaaaaaaaa aaaaaaa aa aaaa aaaa aaa aaaaaa a  aa  aa aaa aaaaaa aaaaa  aaaaa a aaaa aaaaaaa  aaaaaaaa a aaaaaaaaaa aaaaaa a',
      ],
      [
        '                                                                                                                        a',
        '                                        F                                                                               !',
        '                                                                                                                        =',
        '                                                                                                                        a',
        '                                                                                                                        !',
        '                                                                                                                        =',
        '                                                                                                             -+         a',
        '                                                                                                             ()         !',
        '                                                                                                      @@@@@@@@@         =',
        '                                                                                                                        a',
        '                                          s  t  t          t   s     t     t           s         s          t           !',
        '=!a=!a=!a=!a=!a=!a=!a=!a=!a=!a=!a=!a=!a=!a=!a=!a=!a=!a=!a=!a=!a=!a=!a=!a=!a=!a=!a=!a=!a=!a=!a=!a=!a=!a=!a=!a=!a=!a=!a=!a=',
      ]
    ]

  const levelCfg = {
    width: 20,
    height: 20,
    '$': [sprite('coin'), 'coin'],                              // coin
    '(': [sprite('pipe-bottom-left'), solid(), scale(0.5)],     // pipe bottom left
    ')': [sprite('pipe-bottom-right'), solid(), scale(0.5)],    // pipe bottom right
    '-': [sprite('pipe-top-left'), solid(), scale(0.5), 'pipe'],  // pipe top left
    '+': [sprite('pipe-top-right'), solid(), scale(0.5), 'pipe'], // pipe top right
    '%': [sprite('surprise'), solid(), 'coin-surprise'],          // coin surprise  
    '#': [sprite('mushroom'), solid(), 'mushroom', body()],       // mushroom (Mario's power)
    '}': [sprite('unboxed'), solid()],                          // unboxed
    // level 1
    'U': [sprite('UNDERWORLD'), scale(0.5)],
    '=': [sprite('block'), solid()],                            // block
    '/': [sprite('brick'), solid(), 'brick'],                   // brick
    '*': [sprite('surprise'), solid(), 'mushroom-surprise'],    // mushroom surprise
    '^': [sprite('evil-shroom'), solid(), 'dangerous', body()],   // evil-shroom (Mario's enemy)
    // level 2
    'I': [sprite('ICEWORLD'), scale(0.5)],
    '!': [sprite('blue-block'), solid(), 'coly', scale(0.5)],             // block
    '£': [sprite('blue-brick'), solid(), scale(0.5)],             // brick
    'z': [sprite('blue-evil-shroom'), solid(), scale(0.5), 'dangerous', body()],    // evilshroom (Mario's enemy)
    '@': [sprite('blue-surprise'), solid(), scale(0.5), 'coin-surprise'],         // coin suprise
    'x': [sprite('blue-steel'), solid(), scale(0.5)],                     // blue surprise
    // level 3
    'S': [sprite('SWAMPWORLD_1'), scale(0.5)],
    'a': [sprite('green-block'), solid(), scale(0.5)],                        // block
    'b': [sprite('green-brick'), solid(), scale(0.5)],                         // brick
    'c': [sprite('yellow-evil-shroom'), solid(), 'dangerous', body()],   // evilshroom (Mario's enemy)
    // level 4
    'T': [sprite('SWAMPWORLD_2'), scale(0.5)],
    'l': [sprite('yellow-evil-shroom-stan'), solid(), 'dangerous2', body()],   // evilshroom (Mario's enemy)
    // level 5
    'F': [sprite('FINAL BOSS - DARK WORLD'), scale(0.5)],
    's': [sprite('Shrooms'), solid(), 'dang', body()],
    't': [sprite('Turtle'), solid(), 'dang', body()],
  }


  const gameLevel = addLevel(maps[level], levelCfg)

  const scoreLabel = add([
    text(score),
    pos(68, 9),
    layer('ui'),
    {
      value: score,
    }
  ])
  add([text('Score '), pos(21, 9)])
  add([text('Level ' + parseInt(level + 1)), pos(20, 1)])

  function big() {
    let timer = 0
    let isBig = false
    return {
      update() {
        if (isBig) {
          CURRENT_JUMP_FORCE = BIG_JUMP_FORCE
          timer -= dt()
          // bgmusic.pause()
          mushintake.play()
          if (timer <= 0) {
            this.smallify()
          }
        }
      },
      isBig() {
        return isBig
      },
      smallify() {
        mushintake.pause()
        // bgmusic.play()
        this.scale = vec2(1)
        CURRENT_JUMP_FORCE = JUMP_FORCE
        timer = 0
        isBig = false
      },
      biggify(time) {
        this.scale = vec2(2)
        timer = time
        isBig = true
      }
    }
  }

  const player = add([
    sprite('mario'),
    solid(),
    pos(20, 0),
    body(),
    big(),
    origin('bot'),
  ])


  action('mushroom', (m) => {
    m.move(20, 0)
  })

  player.on("headbump", (obj) => {
    if (obj.is('coin-surprise')) {
      gameLevel.spawn('$', obj.gridPos.sub(0, 1))
      destroy(obj)
      gameLevel.spawn('}', obj.gridPos.sub(0, 0))
    }
    if (obj.is('mushroom-surprise')) {
      gameLevel.spawn('#', obj.gridPos.sub(0, 1))
      destroy(obj)
      gameLevel.spawn('}', obj.gridPos.sub(0, 0))
    }
  })

  player.collides('mushroom', (m) => {
    destroy(m)
    player.biggify(6)
  })

  player.collides('coin', (c) => {
    destroy(c)
    coinbgm.play()
    scoreLabel.value++
    scoreLabel.text = scoreLabel.value
  })

  action('dangerous', (d) => {
    d.move(-ENEMY_SPEED, 0)
    if (d.pos.y >= FALL_DEATH) {
      destroy(d)
    }
  })
  action('dang', (d) => {
    d.move(-BOSS_SPEED, 0)
    if (d.pos.y >= FALL_DEATH) {
      destroy(d)
    }
  })

  player.collides('dangerous', (d) => {
    if (isJumping) {
      destroy(d)
      enemykill.play()
    } else {
      go('lose', { score: scoreLabel.value })
    }
  })

  player.collides('dangerous2', (d) => {
    if (isJumping) {
      destroy(d)
      enemykill.play()
    } else {
      go('lose', { score: scoreLabel.value })
    }
  })

  player.collides('dang', (d) => {
    if (isJumping) {
      destroy(d)
      enemykill.play()
    } else {
      go('lose', { score: scoreLabel.value })
    }
  })


  player.action(() => {
    camPos(player.pos)
    if (player.pos.y >= FALL_DEATH) {
      go('lose', { score: scoreLabel.value })
    }
  })

  player.collides('pipe', () => {
    keyPress('down', () => {
      // bgmusic.pause()
      levelup.play()
      go('game', {
        level: (level + 1) % maps.length,
        score: scoreLabel.value
      })
    })
    keyPress('s', () => {
      go('game', {
        level: (level + 1) % maps.length,
        score: scoreLabel.value
      })
    })
  })

  keyDown('a', () => {
    // player.flipX(true)
    player.move(-MOVE_SPEED, 0)
  })

  keyDown('d', () => {
    // player.flipX(false)
    player.move(MOVE_SPEED, 0)
  })
  keyDown('left', () => {
    // player.flipX(true)
    player.move(-MOVE_SPEED, 0)
  })

  keyDown('right', () => {
    // player.flipX(false)
    player.move(MOVE_SPEED, 0)
  })

  player.action(() => {
    if (player.grounded()) {
      isJumping = false
    }
  })

  keyPress('space', () => {
    if (player.grounded()) {
      jumpmario.play()
      isJumping = true
      player.jump(CURRENT_JUMP_FORCE)
    }
  })
  keyPress('r', () => {
    if (confirm("Are you sure you want to restart?")) {
      location.reload()
    }
  })
  keyPress('q', () => {
    if (confirm("Are you sure you want to quit?")) {
      location.replace("file:///C:/Users/HP/Desktop/Game/Super%20Mario/Background.html")
    }
  })
})

scene('lose', ({ score }) => {
  // bgmusic.pause()
  mushintake.pause()
  levelup.pause()
  mariolose.play()
  add([sprite('mario'), pos(width() / 2, height() / 4 + 55), scale(2), origin('center')])
  add([text("GAME OVER", 22), pos(width() / 2, height() / 4), origin('center')])
  add([text("YOUR SCORE", 22), origin('center'), pos(width() / 2, height() / 2)])
  add([text(score, 45), pos(425, 250)])
  add([text("RESTART (r)", 22), pos(50, 320)])
  // add([text("RESUME", 22), pos(400, 320)])
  add([text("QUIT (q)", 22), pos(650, 320)])
  add([text("CREATED BY", 15), pos(50, 350)])
  add([text("Deep Chakraborty", 10), pos(50, 400)])
  add([text("Chandan Das", 10), pos(250, 400)])
  add([text("Kaushik Paul", 10), pos(400, 400)])
  add([text("Ankan Das", 10), pos(550, 400)])
  add([text("Subhankar Basak", 10), pos(650, 400)])


  keyPress('r', () => {
    if (confirm("Are you sure to restart your game?")) {
      location.reload()
    }
  })
  keyPress('q', () => {
    if (confirm("Are you sure to quit your game?")) {
      location.replace("file:///C:/Users/HP/Desktop/Game/Super%20Mario/Background.html")
    }
  })
})


start("game", { level: 0, score: 0 })