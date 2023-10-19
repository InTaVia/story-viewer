<template>

    <section class="puzzle-section" :class="'puzzle-section-' + puzzleDomId">
        <div class="puzzle-canvas" :id="puzzleDomId"></div>


        <div class="puzzle-ui disabled">
            <!-- functionalities -->
            <div class="ui-container">
                <div class="tooltip">
                    <div class="functionality" @click.prevent.stop="hint">
                        {{getTranslation('hint')}}
                    </div>
                </div>
                <!-- 
                    // not working gonnna check it out later
                    <div class="tooltip">
                    <span class="tooltip-content">Verify</span>
                    <div class="functionality" @click.prevent.stop="verify">
                        verify
                    </div>
                </div> -->
            </div>
        </div>
    </section>

</template>

<script>


///// !IMPORTANT: Install p5 first as dependency:
///// npm i p5
///// !IMPORANT: only use images with max-size of 600px

import p5 from 'p5';

import uniqueId from 'lodash/uniqueId';


// https://www.codeproject.com/Articles/395453/Html5-Jigsaw-Puzzle

const Settings = {
    allowIncorectPlacements: true,
    hintIncorectPlacements: true
}

const NONE = 0
const IN = -1
const OUT = 1

const HORIZONTAL = 'horizontal'
const VERTICAL = 'vertical'


export default {
	components: {
        p5
    },
	props: {
		colsProp: {
            type: Number,
            default: 5
        },
        rowsProp: {
            type: Number,
            default: 5
        },
        scaleProp: {
            type: Number,
            default: 0.8
        },
        imageUrl: {
            type: String,
            default: undefined
        },
        themeProp: {
            type: Object,
            // Object or array defaults must be returned from
            // a factory function
            default: function () {
                return {
                    background: [ 255 ],
                    board: [ 240 ],
                    board_fill: [ 235 ],
                    board_outline: [ 220 ]
                }
            }
        },
	},
    emits: ['puzzleSolved'],
	data() {
		return {
            // defines the shape of the puzzle pieces
            // this array contains the points to define one side facing up
            // the shape is from x: 0 to x: 100
            // array of bezier curves (x1, y1, x3, y3, x2, y2)
            shape: [
                [ 0, 0, 35, 15, 37, 5 ],
                [ 37, 5, 40, 0, 38, -5 ],
                [ 38, -5, 20, -20, 50, -20 ],
                [ 50, -20, 80, -20, 62, -5 ],
                [ 62, -5, 60, 0, 63, 5 ],
                [ 63, 5, 65, 15, 100, 0 ]
            ],
			img: undefined,
            canvas: undefined,
            preview: undefined,
            frame: undefined,
            tiles: undefined,
            pieces: [],
            placed: undefined,
            unplaced: undefined,
            puzzle: undefined,
            board: undefined,
            cols: undefined,
            rows: undefined,
            aspect: undefined,
            cropX: undefined,
            cropY: undefined,
            scl: undefined,
            s: undefined,
            sketch: undefined, 
            loading: true,
            verifying: false,
            solved: false,
            error: false,
            previewing: -1,
            progress: undefined,
            progressObj: undefined,
            prev: undefined,
            baseSize: undefined,
            Theme: undefined,
            puzzleDomId: uniqueId("puzzle-canvas-")
		};
	},
    created(){
        const vm = this;

        vm.Theme = this.themeProp;
        // this.puzzleDomId = uniqueId("puzzle-canvas-");
        // console.log(this.puzzleDomId);
    },
    mounted(){
        const vm = this;

        if(this.imageUrl == undefined) {
            console.log('Puzzle Error: please provide image url')
            return;
        }

        this.$nextTick(() => {
            const sketch = (s) => {

                vm.sketch = s;

                // console.log(vm.sketch)

                s.setup = () => {
                    vm.setup();
                }
                s.start = () => {
                    this.start();
                }
                s.draw = () => {
                    this.draw(s);
                }

                s.mousePressed = () =>  {
                    this.mousePressed();
                }
                s.touchStarted = () =>  {
                    this.mousePressed();
                }

                s.mouseReleased = () =>  {
                    this.mouseReleased();
                }
                s.touchEnded = () =>  {
                    this.mouseReleased();
                }
            }

            const sketchInstance = new p5(sketch);
        });

	},
	methods: {
        setup(){
            const vm = this;
            let puzzleCanvas = document.getElementById(vm.puzzleDomId);

            let size = puzzleCanvas.clientWidth;

            
            vm.canvas = vm.sketch.createCanvas(puzzleCanvas.clientWidth, puzzleCanvas.clientHeight);
            vm.canvas.parent(puzzleCanvas);
            // vm.canvas.id(vm.puzzleDomId);

            // Set actual size in memory (scaled to account for extra pixel density).
            const scale = window.devicePixelRatio; // Change to 1 on retina screens to see blurry canvas.
            puzzleCanvas.width = Math.floor(size * scale);
            puzzleCanvas.height = Math.floor(size * scale);

            // Normalize coordinate system to use CSS pixels.
            vm.canvas.scale(scale, scale);
            
            addScreenPositionFunction(vm.sketch);
            
            let puzzleSection = document.querySelector('.puzzle-section-' + vm.puzzleDomId);
            
            
            vm.sketch.createImg(vm.imageUrl, 'puzzle', null, event => {
                var element = event.elt
                vm.img = new p5.Image(element.width, element.height, p5.instance)
                vm.img.drawingContext.drawImage(element, 0, 0)
                vm.img.modified = true
                
                puzzleSection.querySelector('.puzzle-ui').classList.remove('disabled');
                
                // remove created dom image element directly on body... why does it appear there is a mistery... ^^
                document.querySelector('body > img[alt="puzzle"]').remove();
                
                vm.loading = false
                vm.start();
            })
        },
        start(){
            const vm = this;
            vm.aspect = vm.aspectRatio(vm.sketch.round(vm.img.width/100)*100, vm.sketch.round(vm.img.height/100)*100)

            // simplify aspect for undefined cols & rows
            if(vm.aspect.x == 1 && vm.aspect.y == 1)
                vm.aspect = { x: 4, y: 4 }
            while(vm.aspect.x * vm.aspect.y >= 50)
                vm.aspect = { x: parseInt(vm.aspect.x/2), y: parseInt(vm.aspect.y/2) }
            while(vm.aspect.x * vm.aspect.y <= 9)
                vm.aspect = { x: parseInt(vm.aspect.x*2), y: parseInt(vm.aspect.y*2) }

            vm.cols = vm.colsProp > 0 ? vm.colsProp : vm.aspect.x
            vm.rows = vm.rowsProp > 0 ? vm.rowsProp : vm.aspect.y
            vm.scl = vm.scaleProp > 0 ? vm.scaleProp : 0.5

            vm.progress = vm.progressObj = vm.numFrames(vm.img) * 2

            vm.prev = vm.sketch.millis()

            // puzzle generation
            vm.tiles = []
            for(var i = 0; i < vm.numFrames(vm.img); i++) {
                vm.img.setFrame(i)
                vm.tiles.push(vm.cut(vm.img, vm.cols, vm.rows, vm.sketch.CENTER, vm.sketch.CENTER))
                vm.progress--
            }

            // console.log('cut: ', vm.sketch.millis() - vm.prev)

            vm.prev = vm.sketch.millis()

            vm.tiles = vm.puzzleify(vm.tiles)

            // console.log('puzzleify: ', vm.sketch.millis() - vm.prev)

            // preview image
            vm.preview = vm.img.get(vm.cropX/2, vm.cropY/2, vm.img.width - vm.cropX, vm.img.height - vm.cropY)

            // console.log(vm.preview);

            vm.prev = vm.sketch.millis()

            var positionX, positionY;

            // pieces
            vm.placed = []
            vm.unplaced = []
            vm.pieces = []
            for(var x=0; x<vm.cols; x++) {
                for(var y=0; y<vm.rows; y++) {
                    var orientation = Math.random() < 0.5 ? HORIZONTAL : VERTICAL
                    var side = Math.random() < 0.5 ? -1 : 1

                    switch(orientation) {
                        case HORIZONTAL:
                            // positionX = side * vm.preview.width/2 * vm.sketch.random(1.15, 1.90)
                            positionX = side * vm.preview.width/2 * vm.sketch.random(0.9, 0.9)
                            // positionY = vm.sketch.random(-vm.preview.height/2 * 1.15, vm.preview.height/2 * 1.15)
                            positionY = vm.sketch.random(-vm.preview.height/2 * 0.9, vm.preview.height/2 * 0.9)
                            break;
                        case VERTICAL:
                            // positionX = vm.sketch.random(-vm.preview.width/2 * 1.90, vm.preview.width/2 * 1.90)
                            positionX = vm.sketch.random(-vm.preview.width/2 * 0.9, vm.preview.width/2 * 0.9)
                            // positionY = side * vm.preview.height/2 * vm.sketch.random(1.15, 1.45)
                            positionY = side * vm.preview.height/2 * vm.sketch.random(0.9, 0.9)
                            break;
                    }

                    const piece = new Piece(x, y, positionX, positionY, vm.sketch, vm)
                    vm.pieces.push(piece)
                    vm.unplaced.push(piece)
                }
            }

            // console.log(vm.pieces);

            // board
            vm.board = (() => {
                var pg = vm.sketch.createGraphics(parseInt(vm.cols * vm.tiles.sizeX + vm.tiles.sizeX/2 + 1), parseInt(vm.rows * vm.tiles.sizeY + vm.tiles.sizeY/2 + 1))
                for(var x=0; x<vm.cols; x++) {
                    for(var y=0; y<vm.rows; y++) {
                        var tile = vm.tiles[0][x][y]
            
                        pg.image(tile.jigsaw, x * vm.tiles.sizeX, y * vm.tiles.sizeY)
                    }
                }
                return vm.imagify(pg)
            })()

            // console.log('pieces: ', vm.sketch.millis() - vm.prev)

            // puzzle data
            let puzzle = {
                width: vm.preview.width,
                height: vm.preview.height,
                ratio: { original: vm.aspectRatio(vm.img.width, vm.img.height), simplified: vm.aspect },
                count: vm.pieces.length,
                pieces: new Map()
            }
            vm.puzzle = puzzle;

            // console.log(vm.puzzle)

            // @event
            window.parent.document.dispatchEvent(new CustomEvent('puzzleLoaded', { puzzle }))
        },
        numFrames(img) {
            return img.numFrames() || 1
        },
        draw() {
            const vm = this;

            // loading screen
            if(vm.loading) {
                vm.sketch.background(255)

                vm.sketch.noStroke()
                vm.sketch.textAlign(vm.sketch.CENTER, vm.sketch.CENTER)
                vm.sketch.textSize(50)

                if(vm.error) {
                    vm.sketch.fill(255, 0, 0)
                    vm.sketch.text("Failed to load puzzle", vm.sketch.width/2, vm.sketch.height/2)
                    return
                }
                else {
                    vm.sketch.fill(0)
                    vm.sketch.text("Loading puzzle", vm.sketch.width/2, vm.sketch.height/2)
                }

                vm.sketch.stroke(0)
                vm.sketch.strokeWeight(1)
                vm.sketch.line(vm.sketch.width*0.25, vm.sketch.height*0.75, vm.sketch.map(vm.sketch.progress, 0, vm.sketch.progressObj, vm.sketch.width*0.25, vm.sketch.width*0.75), vm.sketch.height*0.75)
                
                return
            }

            // base
            vm.baseSize = Math.min(vm.sketch.width / vm.img.width, vm.sketch.height / vm.img.height) * vm.scl
            vm.frame = parseInt((0.5 * vm.sketch.frameCount) % vm.numFrames(vm.img))

            vm.sketch.background(vm.Theme.background)

            vm.sketch.translate(vm.sketch.width/2, vm.sketch.height/2)
            vm.sketch.scale(vm.baseSize)

            // preview animation
            var deltaPreviewing = vm.sketch.millis() - vm.previewing
            var previewAlpha = vm.sketch.map(vm.sketch.sin((-(deltaPreviewing)*0.002 + 1.5)), -1, 1, 0, 255)

            if(deltaPreviewing > 3000 || vm.previewing == -1)
                previewAlpha = 255

            if(vm.solved) previewAlpha = 0

            // preview background
            vm.img.setFrame(vm.frame)
            vm.sketch.image(vm.img, -vm.preview.width /2, -vm.preview.height /2, vm.preview.width, vm.preview.height, vm.cropX/2, vm.cropY/2, vm.img.width - vm.cropX, vm.img.height - vm.cropY)

            // board background
            vm.sketch.rectMode(vm.sketch.CENTER)
            vm.sketch.noStroke()
            vm.sketch.fill(...vm.Theme.board, previewAlpha)
            vm.sketch.rect(0, 0, vm.puzzle.width, vm.puzzle.height)

            // puzzle board
            if(!vm.solved) {
                vm.sketch.push()
                vm.sketch.translate(-vm.tiles.sizeX/2 -vm.img.width/2 + vm.cropX/2, -vm.tiles.sizeY/2 -vm.img.height/2 + vm.cropY/2)
                for(var x=0; x<vm.cols; x++) {
                    for(var y=0; y<vm.rows; y++) {
                        var tile = vm.tiles[vm.frame][x][y]
                        
                        // realtime board
                        // image(tile.jigsaw, x * tiles.sizeX, y * tiles.sizeY)
                        
                        var min = vm.sketch.screenPosition(x * vm.tiles.sizeX + vm.tiles.sizeX*0.5, y * vm.tiles.sizeY + vm.tiles.sizeY*0.5)
                        var max = vm.sketch.screenPosition(x * vm.tiles.sizeX + vm.tiles.sizeX*1.5, y * vm.tiles.sizeY + vm.tiles.sizeY*1.5)
            
                        // over
                        if(
                            vm.sketch.mouseIsPressed &&
                            vm.sketch.mouseX > min.x && vm.sketch.mouseX < max.x &&
                            vm.sketch.mouseY > min.y && vm.sketch.mouseY < max.y
                            ) {
                                vm.sketch.image(tile.jigsawFill, x * vm.tiles.sizeX, y * vm.tiles.sizeY)
                            }
                    }
                }
                vm.sketch.image(vm.board,.0, 0)
                vm.sketch.pop()
            }

            // placed pieces
            for(var i=vm.placed.length-1; i>=0; i--) {
                var piece = vm.placed[i]
                piece.update()
                piece.draw()
            }
            
            // placed pieces
            for(var i=vm.placed.length-1; i>=0; i--) {
                var piece = vm.placed[i]
                piece.drawPost()
            }

            // unplaced pieces
            for(var i=vm.unplaced.length-1; i>=0; i--) {
                var piece = vm.unplaced[i]
                piece.update()
                piece.draw()
            }
        },
        cut(img, cols, rows, alignX, alignY) {

            const vm = this;

            var squared = (alignX || alignY)

            // size of image
            var w = img.width 
            var h = img.height
            
            // size of each tiles
            var sizeX = w / cols
            var sizeY = h / rows

            vm.cropX = 0
            vm.cropY = 0

            // tiles are squared and image will be cropped
            if(squared) {
                
                var ratio = vm.aspectRatio(sizeX, sizeY)

                // reduce the size of the biggest dimension (width or height)
                // to make it aspect 1:1
                if(ratio.y > ratio.x)
                    sizeY *= ratio.x / ratio.y
                else if(ratio.x > ratio.y)
                    sizeX *= ratio.y / ratio.x

                // crop unused image space
                vm.cropX = w - cols*sizeX
                vm.cropY = h - rows*sizeY
            }

            var newTiles = [];

            // metadata
            vm.tiles.sizeX = sizeX
            vm.tiles.sizeY = sizeY

            // will need to capture beyond the image dimensions
            var pg = vm.sketch.createGraphics(img.width + sizeX*2, img.height + sizeY*2)
            pg.image(img, sizeX, sizeY)
            img = vm.imagify(pg)

            for(var x=0; x<cols; x++) {
                var col = []
                for(var y=0; y<rows; y++) {
                    var offset = { x: 0, y: 0 }

                    // aligned cropped
                    if(squared) {
                        switch(alignX) {
                            case vm.sketch.LEFT: offset.x = 0; break;
                            case vm.sketch.CENTER: offset.x = vm.cropX/2; break;
                            case vm.sketch.RIGHT: offset.x = vm.cropX; break;
                        }

                        switch(alignX) {
                            case vm.sketch.TOP: offset.y = 0; break;
                            case vm.sketch.CENTER: offset.y = vm.cropY/2; break;
                            case vm.sketch.BOTTOM: offset.y = vm.cropY; break;
                        }
                    }

                    // image capture
                    // var sliced = img.get(x * sizeX + offset.x, y * sizeY + offset.y, sizeX, sizeY)
                    
                    // image capture with buffer (doubled size)
                    var sliced = img.get((x+1) * sizeX + offset.x -sizeX/2, (y+1) * sizeY + offset.y -sizeY/2, sizeX*2, sizeY*2)

                    col.push(sliced)
                }
                newTiles.push(col)
            }

            return newTiles
        },
        puzzleify(tiles) {
            const vm = this;
            var w = parseInt(tiles.sizeX), h = parseInt(tiles.sizeY)

            // cache, so we don't need to recreate same masks
            // pixel access is time consuming
            var cached = new Map()
            
            for(var i=0; i < vm.numFrames(vm.img); i++) {
                vm.img.setFrame(i)

                vm.progress--

                for(var x=0; x<vm.cols; x++) {
                    for(var y=0; y<vm.rows; y++) {
            
                        // in / out checkers pattern
                        var xCurve = (x % 2 == 0 ? IN : OUT)
                        var yCurve = (y % 2 != 0 ? IN : OUT)
            
                        // corners and sides
                        var topCurve    = y == 0 ? NONE : yCurve
                        var bottomCurve = y == vm.rows-1 ? NONE : yCurve
                        var leftCurve   = x == 0 ? NONE : xCurve
                        var rightCurve  = x == vm.cols-1 ? NONE : xCurve
            
                        var key = `${topCurve}, ${bottomCurve}, ${leftCurve}, ${rightCurve}`
                        
                        // mask
                        if(!cached.has(key)) {
                            var mask = (() => {
                                var pg = vm.sketch.createGraphics(w*2, h*2)
                                pg.background(255)
                                pg.translate(w*0.5, h*0.5)
                                vm.drawPuzzleSideMask(pg, vm.sketch.TOP, topCurve, w, h)
                                vm.drawPuzzleSideMask(pg, vm.sketch.BOTTOM, bottomCurve, w, h)
                                vm.drawPuzzleSideMask(pg, vm.sketch.LEFT, leftCurve, w, h)
                                vm.drawPuzzleSideMask(pg, vm.sketch.RIGHT, rightCurve, w, h)
                                return vm.maskify(vm.imagify(pg))
                            })()
            
                            // jigsaw outline
                            var jigsaw = (() => {
                                var pg = vm.sketch.createGraphics(w*2, h*2)
                                pg.translate(w*0.5, h*0.5)
                                vm.drawPuzzleSide(pg, vm.sketch.TOP, topCurve, w, h)
                                vm.drawPuzzleSide(pg, vm.sketch.BOTTOM, bottomCurve, w, h)
                                vm.drawPuzzleSide(pg, vm.sketch.LEFT, leftCurve, w, h)
                                vm.drawPuzzleSide(pg, vm.sketch.RIGHT, rightCurve, w, h)
                                return vm.imagify(pg)
                            })()
                
                            // jigsaw fill
                            var jigsawFill = (() => {
                                var pg = vm.sketch.createGraphics(w*2, h*2)
                                pg.background(vm.Theme.board_fill)
                                var img = vm.imagify(pg)
                                img.mask(mask)
                                return img
                            })()
            
                            cached.set(key, { mask, jigsaw, jigsawFill })
                        }

                        var tile = tiles[i][x][y];
            
                        // stuff is cached to avoid duplicate processing
                        var { mask, jigsaw, jigsawFill } = cached.get(key)
                        tile.mask(mask)
            
                        tiles[i][x][y] = {
                            tile, jigsaw, jigsawFill,
                            topCurve, bottomCurve, leftCurve, rightCurve
                        }
                    }
                }
            }

            return tiles
        },
        maskify(img) {
            img.loadPixels();

            // skip every 4 values (r, g, b, a)
            for(let i = 0 ; i < img.pixels.length; i+= 4){
                // transfer grayscale R, G, B into alpha (index + 3)
                img.pixels[i + 3] = (img.pixels[i + 0] + img.pixels[i + 0] + img.pixels[i + 0]) / 3;
            }
            img.updatePixels();

            return img
        },
        imagify(pg) {
            var img = pg.get()
            pg.remove()
            return img
        },
        gcd(a, b) {
            if(b == 0) return a
            return this.gcd(b, a % b)
        },
        aspectRatio(w, h) {
            var abc = this.gcd(w, h)
            return { x: w/abc, y: h/abc }
        },
        drawPuzzleSideMask(pg, side, curve, w, h) {
            const vm = this;
            this.drawPuzzleSideShape(true, pg, side, curve , w, h, () => {
                pg.fill(0)
                pg.stroke(0)
                pg.strokeWeight(1)
            })
        },
        drawPuzzleSide(pg, side, curve, w, h) {
            const vm = this;
            this.drawPuzzleSideShape(false, pg, side, curve , w, h, () => {
                pg.noFill()
                pg.stroke(vm.Theme.board_outline)
                pg.strokeWeight(2)
            })
        },
        drawPuzzleSideShape(shaped, pg, side, curve, size, h, style) {
            const vm = this;
            var s = size / 100

            pg.push()
            
            style()

            switch(side) {
                case vm.sketch.BOTTOM:
                    pg.translate(0, size)
                    pg.rotate(vm.sketch.PI)
                    pg.translate(-size, 0)
                    break;
                case vm.sketch.LEFT:
                    pg.rotate(-vm.sketch.HALF_PI)
                    pg.translate(-size, 0)
                    break;
                case vm.sketch.RIGHT:
                    pg.rotate(vm.sketch.HALF_PI)
                    pg.translate(0, -size)
                    break;
            }

            pg.beginShape()
            pg.vertex(0, 0)

            if(curve != NONE) {
                for(var bezier of vm.shape) {
                    pg.bezierVertex(...bezier.map((value, i) => (curve == IN && i%2 != 0 ? -value : value) * s))
                }
            }
            else pg.vertex(100 * s, 0)

            if(shaped) {
                pg.vertex(150 * s, -50 * s)
                pg.vertex(-50 * s, -50 * s)
            }

            if(shaped) pg.endShape(vm.sketch.CLOSE)
            else pg.endShape()
            pg.pop()
        },
        windowResized() {
            resizeCanvas(windowWidth, windowHeight)
        },
        drawJigsaw(x, y, weight, stroke) {
            const vm = this;

            var tile = vm.tiles[vm.frame][x][y]
            var w = vm.tiles.sizeX
            var h = vm.tiles.sizeY
            var pg = vm.canvas._pInst

            var drawPuzzleSide = (side, curve) => {
                vm.drawPuzzleSideShape(false, pg, side, curve , w, h, () => {
                    pg.noFill()
                    pg.stroke(...stroke)
                    pg.strokeWeight(weight)
                })
            }

            vm.sketch.push()
            vm.sketch.translate(x * w + w/2, y * h + h/2)
     
            drawPuzzleSide(vm.sketch.TOP, tile.topCurve)
            drawPuzzleSide(vm.sketch.BOTTOM, tile.bottomCurve)
            drawPuzzleSide(vm.sketch.LEFT, tile.leftCurve)
            drawPuzzleSide(vm.sketch.RIGHT, tile.rightCurve)
            vm.sketch.pop()
        },
        // --- events ---
        mousePressed(){
            const vm = this;
            if(!vm.error && !vm.solved && vm.pieces.length > 0){
                for(var piece of vm.pieces) {
                    if(piece.pressed()) {
                        // bring to front
                        var index = vm.pieces.indexOf(piece)

                        vm.pieces.splice(index, 1)
                        vm.pieces.splice(0, 0, piece)

                        var index = vm.unplaced.indexOf(piece)
                        vm.unplaced.splice(index, 1)
                        vm.unplaced.splice(0, 0, piece)

                        // grab one at a time
                        break
                    }
                }
            }
        },
        mouseReleased(){
            const vm = this;
            if(!vm.error && !vm.solved && vm.pieces.length > 0){
                for(var piece of vm.pieces) {
                    piece.released()
                }
            }
        },
        onPieceRelease(piece) {
            const vm = this;
        
            if(piece.isInsidePuzzle()) {
                var coordX = Math.round((piece.x + (vm.cols % 2 == 0 ? vm.tiles.sizeX/2 : 0)) / vm.tiles.sizeX)
                var coordY = Math.round((piece.y + (vm.rows % 2 == 0 ? vm.tiles.sizeY/2 : 0)) / vm.tiles.sizeY)

                var x = Math.trunc(coordX + vm.cols/2 + (vm.cols % 2 == 0 ? -1 : 0))
                var y = Math.trunc(coordY + vm.rows/2 + (vm.rows % 2 == 0 ? -1 : 0))

                // snap to grid if matches and place available
                if(piece.matchesShape(x, y) && !vm.puzzle.pieces.has(`${x},${y}`)) {
                    piece.x = coordX * vm.tiles.sizeX + (vm.cols % 2 == 0 ? -1 : 0) * vm.tiles.sizeX/2
                    piece.y = coordY * vm.tiles.sizeY + (vm.rows % 2 == 0 ? -1 : 0) * vm.tiles.sizeY/2
                    piece.placement = { x, y }
                    piece.placed = vm.sketch.millis()
                    
                    // now placed: bring to back
                    vm.puzzle.pieces.set(`${x},${y}`, piece)
                    vm.unplaced.splice(vm.unplaced.indexOf(piece), 1)
                    vm.placed.push(piece)

                    // bring to back
                    var index = vm.pieces.indexOf(piece)
                    vm.pieces.splice(index, 1)
                    vm.pieces.push(piece)

                    // all pieces placed
                    if(vm.puzzle.pieces.size == vm.puzzle.count)
                        this.onComplete()
                }
            }
        },
        onComplete() {
            const vm = this;
            // solved?
            for (const [key, value] of vm.puzzle.pieces) {
                var coords = key.split(',')
                var x = parseInt(coords[0])
                var y = parseInt(coords[1])

                // wrongly placed
                if(x != value.index.x || y != value.index.y)
                    return
            }

            // solved!
            this.onSolve()
        },
        onSolve() {
            // console.log('solved!')
            const vm = this;

            vm.solved = true
            vm.previewing = vm.sketch.millis()

            this.puzzleSolved();
        },

        // --- functionalities ---
        hint() {
            const vm = this;
            vm.previewing = vm.sketch.millis();
        },
        verify() {
            const vm = this;
            vm.verifying = true
            for(var piece of vm.pieces)
                if(piece.placed != -1)
                    piece.placed = vm.sketch.millis()
            vm.verifying = false
        },
        // solve() {
        //     const vm = this;
        // },
        // reset() {
        //     const vm = this;
        // },
        // toggleFullscreen() {
        //     const vm = this;
        //     vm.fullscreen(!vm.fullscreen())
        // } 
        
        ///// on solved end quiz item
        puzzleSolved: function(){
            // trigger custom event - "quiz end"
            this.$emit('puzzleSolved');
        }
    },
};






// --- piece ---
class Piece {

    constructor(x, y, posX, posY, sketch, vm) {
        this.x = posX
        this.y = posY
		this.sketch = sketch
        this.vm = vm
        this.w = this.vm.tiles.sizeX * 1.25
        this.h = this.vm.tiles.sizeY * 1.25
        this.dragging = false
        this.rollover = false
        this.placed = -1

        this.tile = () => this.vm.tiles[this.vm.frame][x][y].tile
        this.jigsaw = () => this.vm.tiles[this.vm.frame][x][y].jigsaw
        this.index = { x, y }
        this.placement = { x: -1, y: -1 }
    }

    draw() {
        this.sketch.push()
        this.sketch.imageMode(this.sketch.CENTER)

        // drop shadow
        if(this.placed == -1 && this.vm.puzzle.count < 100) {
            this.sketch.drawingContext.shadowOffsetX = 0;
            this.sketch.drawingContext.shadowOffsetY = 0;
            this.sketch.drawingContext.shadowBlur = 20;
            this.sketch.drawingContext.shadowColor = '#00000055';
        }
        
        // piece
        this.sketch.image(this.tile(), this.x, this.y)

        // placed outline
        if(this.placed != -1) {
            if(this.vm.solved) {
                var deltaPreviewing = this.sketch.millis() - this.vm.previewing
                if(deltaPreviewing < 1500) {
                    var fade = this.sketch.map(this.sketch.sin((-(deltaPreviewing)*0.002 + 1.5)), -1, 1, 0, 255)
                    this.sketch.translate(-this.vm.tiles.sizeX/2 -this.vm.img.width/2 + this.vm.cropX/2, -this.vm.tiles.sizeY/2 -this.vm.img.height/2 + this.vm.cropY/2)
                    this.vm.drawJigsaw(this.placement.x, this.placement.y, 2, [ ...this.vm.Theme.board_outline, fade ])
                }
            }
            else {
                this.sketch.image(this.jigsaw(), this.x, this.y)
            }
        }

        this.sketch.pop()
    }


    drawPost() {
        if(this.placed == -1) return
        
        this.sketch.push()
        this.sketch.imageMode(this.sketch.CENTER)
        
        var delta = this.sketch.millis() - this.placed

        // feedback
        if(delta < 1100) {
            var fade = this.sketch.map(this.sketch.sin(delta*0.01), -1, 1, 0, 255)
            this.sketch.translate(-this.vm.tiles.sizeX/2 -this.vm.img.width/2 + this.vm.cropX/2, -this.vm.tiles.sizeY/2 -this.vm.img.height/2 + this.vm.cropY/2)

            // incorrectly placed
            if(this.placement.x != this.index.x || this.placement.y != this.index.y){
                
               
                this.vm.drawJigsaw(this.placement.x, this.placement.y, 6, [ 255, 0, 0, fade ])
            }
        }

        this.sketch.pop()
    }

    update() {
        this.over()

        // Adjust location if being dragged
        if (this.dragging) {
            this.x = this.sketch.mouseX/this.vm.baseSize + this.offsetX
            this.y = this.sketch.mouseY/this.vm.baseSize + this.offsetY
        }
    }   

    isOver() {
        var min = this.sketch.screenPosition(this.x - this.w/2, this.y - this.h/2)
        var max = this.sketch.screenPosition(this.x + this.w/2, this.y + this.h/2)

        return (
            this.sketch.mouseX > min.x && this.sketch.mouseX < max.x &&
            this.sketch.mouseY > min.y && this.sketch.mouseY < max.y
        )
    }

    isInsidePuzzle() {
        return (
            this.x > -this.vm.puzzle.width/2 && this.x < this.vm.puzzle.width/2 &&
            this.y > -this.vm.puzzle.height/2 && this.y < this.vm.puzzle.height/2
        )
    }

    matchesShape(x, y) {
        var other = this.vm.tiles[this.vm.frame][x][y]
        var tile = this.vm.tiles[this.vm.frame][this.index.x][this.index.y]

        if(other != null) {
            return (
                other.topCurve == tile.topCurve &&
                other.bottomCurve == tile.bottomCurve &&
                other.leftCurve == tile.leftCurve &&
                other.rightCurve == tile.rightCurve
            )
        }
    }

    over() {
        // Is mouse over object
        if (this.isOver()) {
            this.rollover = true;
            if(!this.vm.solved) this.sketch.cursor(this.sketch.HAND)
        }
        else {
            if(this.rollover) this.sketch.cursor(this.sketch.ARROW)
            this.rollover = false;
        }
    }

    pressed() {
        // Did I click on the rectangle?
        if (this.isOver()) {

			// console.log("isover", this)

            // placed -> unplaced
            if(this.placed != -1) {
                this.vm.puzzle.pieces.delete(`${this.placement.x},${this.placement.y}`)
                this.vm.placed.splice(this.vm.placed.indexOf(this), 1)
                this.vm.unplaced.push(this)
            }

            this.dragging = true
            this.placed = -1

            // If so, keep track of relative location of click to corner of rectangle
            this.offsetX = this.x - this.sketch.mouseX/this.vm.baseSize
            this.offsetY = this.y - this.sketch.mouseY/this.vm.baseSize

			// console.log(this.x, this.sketch.mouseX, this.vm.baseSize)

            return true
        }
        return false
    }
    
    released() {
        if(this.dragging)
            this.vm.onPieceRelease(this)

        // Quit dragging
        this.dragging = false
    }
}


// Acknowledgement to Thibault Coppex (@tcoppex) for the 3d-modelview-projection-math.
// Had to adjust it a bit maybe because p5js changed the way webgl is handled since 2016.
// See: https://editor.p5js.org/bohnacker/sketches/nUk3bVW7b on how to use it
p5.disableFriendlyErrors = true;

function addScreenPositionFunction(p5Instance) {
    let p = p5Instance || this;

    p.disableFriendlyErrors = false

    // find out which context we're in (2D or WEBGL)
    const R_2D = 0;
    const R_WEBGL = 1;
    let context = getObjectName(p._renderer.drawingContext).search("2D") >= 0 ? R_2D : R_WEBGL;

    // the stack to keep track of matrices when using push and pop
    if (context == R_2D) {
        p._renderer.matrixStack = [new p5.Matrix()];
    }

    // replace all necessary functions to keep track of transformations

    if (p.draw instanceof Function) {
        let drawNative = p.draw;
        p.draw = function(...args) {
            if (context == R_2D) p._renderer.matrixStack = [new p5.Matrix()];
            drawNative.apply(p, args);
        };
    }


    if (p.resetMatrix instanceof Function) {
        let resetMatrixNative = p.resetMatrix;
        p.resetMatrix = function(...args) {
            if (context == R_2D) p._renderer.matrixStack = [new p5.Matrix()];
            resetMatrixNative.apply(p, args);
        };
    }

    if (p.translate instanceof Function) {
        let translateNative = p.translate;
        p.translate = function(...args) {
            if (context == R_2D) last(p._renderer.matrixStack).translate(args);
            translateNative.apply(p, args);
        };
    }

    if (p.rotate instanceof Function) {
        let rotateNative = p.rotate;
        p.rotate = function(...args) {
            if (context == R_2D) {
                let rad = p._toRadians(args[0]);
                last(p._renderer.matrixStack).rotateZ(rad);
            }
            rotateNative.apply(p, args);
        };
    }

    if (p.rotateX instanceof Function) {
        let rotateXNative = p.rotateX;
        p.rotateX = function(...args) {
            if (context == R_2D) {
                let rad = p._toRadians(args[0]);
                last(p._renderer.matrixStack).rotateX(rad);
            }
            rotateXNative.apply(p, args);
        };
    }
    if (p.rotateY instanceof Function) {
        let rotateYNative = p.rotateY;
        p.rotateY = function(...args) {
            if (context == R_2D) {
                let rad = p._toRadians(args[0]);
                last(p._renderer.matrixStack).rotateY(rad);
            }
            rotateYNative.apply(p, args);
        };
    }
    if (p.rotateZ instanceof Function) {
        let rotateZNative = p.rotateZ;
        p.rotateZ = function(...args) {
            if (context == R_2D) {
                let rad = p._toRadians(args[0]);
                last(p._renderer.matrixStack).rotateZ(rad);
            }
            rotateZNative.apply(p, args);
        };
    }

    if (p.scale instanceof Function) {
        let scaleNative = p.scale;
        p.scale = function(...args) {
            if (context == R_2D) {
                let m = last(p._renderer.matrixStack);
                let sx = args[0];
                let sy = args[1] || sx;
                let sz = context == R_2D ? 1 : args[2];
                m.scale([sx, sy, sz]);
            }
            scaleNative.apply(p, args);
        };
    }

    // Help needed: don't know what transformation matrix to use 
    // Solved: Matrix multiplication had to be in reversed order. 
    // Still, this looks like it could be simplified.

    if (p.shearX instanceof Function) {
        let shearXNative = p.shearX;
        p.shearX = function(...args) {
            if (context == R_2D) {
                let rad = p._toRadians(args[0]);
                let stack = p._renderer.matrixStack;
                let m = last(stack);
                let sm = new p5.Matrix();
                sm.mat4[4] = Math.tan(rad);
                sm.mult(m);
                stack[stack.length - 1] = sm;
            }
            shearXNative.apply(p, args);
        };
    }

    if (p.shearY instanceof Function) {
        let shearYNative = p.shearY;
        p.shearY = function(...args) {
            if (context == R_2D) {
                let rad = p._toRadians(args[0]);
                let stack = p._renderer.matrixStack;
                let m = last(stack);
                let sm = new p5.Matrix();
                sm.mat4[1] = Math.tan(rad);
                sm.mult(m);
                stack[stack.length - 1] = sm;
            }
            shearYNative.apply(p, args);
        };
    }


    if (p.applyMatrix instanceof Function) {
        let applyMatrixNative = p.applyMatrix;
        p.applyMatrix = function(...args) {
            if (context == R_2D) {
                let stack = p._renderer.matrixStack;
                let m = last(stack);
                let sm = new p5.Matrix();
                sm.mat4[0] = args[0];
                sm.mat4[1] = args[1];
                sm.mat4[4] = args[2];
                sm.mat4[5] = args[3];
                sm.mat4[12] = args[4];
                sm.mat4[13] = args[5];
                sm.mult(m);
                stack[stack.length - 1] = sm;
            }
            applyMatrixNative.apply(p, args);
        };
    }

    if (p.push instanceof Function) {
        let pushNative = p.push;
        p.push = function(...args) {
            if (context == R_2D) {
                let m = last(p._renderer.matrixStack);
                p._renderer.matrixStack.push(m.copy());
            }
            pushNative.apply(p, args);
        };
    }
    if (p.pop instanceof Function) {
        let popNative = p.pop;
        p.pop = function(...args) {
            if (context == R_2D) p._renderer.matrixStack.pop();
            popNative.apply(p, args);
        };
    }

    p.screenPosition = function(x, y, z) {
        if (x instanceof p5.Vector) {
            let v = x;
            x = v.x;
            y = v.y;
            z = v.z;
        } else if (x instanceof Array) {
            let rg = x;
            x = rg[0];
            y = rg[1];
            z = rg[2] || 0;
        }
        z = z || 0;

        if (context == R_2D) {
            let m = last(p._renderer.matrixStack);
            // probably not needed:
            // let mInv = (new p5.Matrix()).invert(m);

            let v = p.createVector(x, y, z);
            let vCanvas = multMatrixVector(m, v);
            // console.log(vCanvas);
            return vCanvas;

        } else {
            let v = p.createVector(x, y, z);

            // Calculate the ModelViewProjection Matrix.
            let mvp = (p._renderer.uMVMatrix.copy()).mult(p._renderer.uPMatrix);

            // Transform the vector to Normalized Device Coordinate.
            let vNDC = multMatrixVector(mvp, v);

            // Transform vector from NDC to Canvas coordinates.
            let vCanvas = p.createVector();
            vCanvas.x = 0.5 * vNDC.x * p.width;
            vCanvas.y = 0.5 * -vNDC.y * p.height;
            vCanvas.z = 0;

            return vCanvas;
        }
    }


    // helper functions ---------------------------
    function last(arr) {
        return arr[arr.length - 1];
    }

    function getObjectName(obj) {
        var funcNameRegex = /function (.{1,})\(/;
        var results = (funcNameRegex).exec((obj).constructor.toString());
        return (results && results.length > 1) ? results[1] : "";
    };

    /* Multiply a 4x4 homogeneous matrix by a Vector4 considered as point
    * (ie, subject to translation). */
    function multMatrixVector(m, v) {
        if (!(m instanceof p5.Matrix) || !(v instanceof p5.Vector)) {
            print('multMatrixVector : Invalid arguments');
            return;
        }

        var _dest = p.createVector();
        var mat = m.mat4;

        // Multiply in column major order.
        _dest.x = mat[0] * v.x + mat[4] * v.y + mat[8] * v.z + mat[12];
        _dest.y = mat[1] * v.x + mat[5] * v.y + mat[9] * v.z + mat[13];
        _dest.z = mat[2] * v.x + mat[6] * v.y + mat[10] * v.z + mat[14];
        var w = mat[3] * v.x + mat[7] * v.y + mat[11] * v.z + mat[15];

        if (Math.abs(w) > Number.EPSILON) {
            _dest.mult(1.0 / w);
        }

        return _dest;
    }
}

</script>


<style lang="less">
    @import './Puzzle.less';
</style>
