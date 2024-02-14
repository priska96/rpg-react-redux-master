import Konva from "konva"
import {Layer} from "react-konva";
import {useEffect, useRef} from "react";
import {MAP_DIMENSIONS, TILE_SIZE} from "./mapImgs";
import {Ring, Satellite} from "./Explosion";
import {RootState} from "../store";
import {onGameEnd} from "./slices/statusSlice";
import {setContents} from "../game-ui/slices/dialogSlice";
import {connect, ConnectedProps} from "react-redux";
import {dialogs} from "./dialog_utils";

const ExplosionKonva = ({onGameEnd, setContents}:PropsFromRedux) => {

    const {COLS, ROWS} = MAP_DIMENSIONS;
    const spriteRef = useRef<Konva.Layer>(null)
    function initializeAnimation() {
        const CANVAS_WIDTH= COLS*32
        const CANVAS_HEIGHT = ROWS*32

        const COUNT = 12;
        const mouse = { x: 0, y: 0 };

        const ctx = spriteRef.current!.getContext();

        function degreeToRadian(deg:number):number {
            return deg * (Math.PI / 180);
        }

        // Array for storing all the generated satellites
        let satellites = [] as Satellite[];

        // Generate satellites
        for (let i = 0; i < COUNT; i++) {
            let deg = 360 / COUNT;
            satellites.push(new Satellite(ctx, i * deg));
        }

        // Ring instance
        let ring = new Ring(ctx);

        // Clear canvas
        function clearCanvas() {
            ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        }

        let myReq:number,
            flag:number = 0;

        function animate() {
            clearCanvas();

            if (flag === 60) {
                cancelAnimationFrame(myReq);
                flag = 0;

                ring.reset();
                satellites.forEach((el) => {
                    el.reset();
                });
                return;
            }

            ring.x = mouse.x;
            ring.y = mouse.y;
            ring.radius = ring.radius + ring.velocity;
            ring.draw();

            satellites.forEach((el) => {
                el.x = mouse.x + el.r * Math.cos(degreeToRadian(el.deg as number));
                el.y = mouse.y + el.r * Math.sin(degreeToRadian(el.deg as number));
                el.r = el.r + 0.02 * el.r;
                el.draw();
            });

            flag++;

            myReq = requestAnimationFrame(animate);
        }
        mouse.x = 7*TILE_SIZE;
        mouse.y = 12*TILE_SIZE;
        animate();
        setTimeout(()=> {
                mouse.x = 4*TILE_SIZE;
                mouse.y =8*TILE_SIZE;
                animate();
            },2000
        )
        setTimeout(()=> {
                mouse.x = 12*TILE_SIZE;
                mouse.y =8*TILE_SIZE;
                animate();
            },4000
        )
        setTimeout(()=> {
            setContents(dialogs.piscesTown["npc-2"].spellBroken.content);
            onGameEnd({mode: 'spell-broken', winner: 'Jihoon', selectedOpponentIdx: 0})
            },6000
        )

    }
    useEffect(() => {
        if(spriteRef && spriteRef.current) {
            initializeAnimation();
        }
    }, [spriteRef]);

    return(
        <Layer
            ref={spriteRef}>

        </Layer>
    )
}

const mapStateToProps = (state: RootState) => (
    {
        mode:state.gameStatus.mode,
        mapImagesLoaded:state.mapImagesLoaded,
        backgroundImg: state.gameStatus.backgroundImg
    })
const mapDispatch = {onGameEnd, setContents}



const connector = connect(mapStateToProps, mapDispatch)

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(ExplosionKonva);
