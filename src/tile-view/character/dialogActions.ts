import {
    battleEvilKing,
    enterDungeon,
    exitDungeon,
    gameOver,
    //gameWon,
    goBackToGround,
    goToForest2,
    goToForest3,
    goToForest4,
    goToPiscesTown,
    goToPiscesTown2,
    goToPiscesTown3,
    goToPiscesTownFrom2,
    goToSky,
    leaveDungeon,
    victory,
    beforeBattleEvilQueen,
    beforeBattleEvilQueen2,
    battleEvilQueen,
    gameWonEvilQueen,
    gameOverEvilQueen,
    victoryEvilQueen,
    spellBroken,
    followHeroHome,
    goToForest,
    goToForest2From3,
    goToForest3From4,
} from '../action_utils';
import { dialogs } from '../dialog_utils';
import { fullyGeared, whoIsOnMap } from '../utils';
import {
    ObjectNPC,
    ObjectState,
    UpdateObjectAction,
} from '../objectNPC/slices/objectSlice';
import {
    AddToInventoryAction,
    CharacterState,
    UpdatePlayerPositionAction,
} from './slices/characterSlice';
import {
    FireAction,
    NPC,
    NPCState,
    UpdateNPCAction,
} from '../npc/slices/npcSlice';
import {
    DialogState,
    SetContentsAction,
} from '../../game-ui/slices/dialogSlice';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { OnGameEndAction } from '../slices/statusSlice';
import { FinishActionParams } from './types/FinishActionParams';
import { HanldeActionAfterDialogParams } from './types/HanldeActionAfterDialogParams';
import { InteractWithNPCParams } from './types/InteractWithNPCParams';
import { InteractWithObjectParams } from './types/InteractWithObjectParams';
import { DoActionParams } from './types/DoActionParams';

export const finishAction = ({
    dialog,
    npc,
    objectNPC,
    character,
    setContents,
    fireAction,
    onGameEnd,
    changeMap,
    updatePlayerPosition,
    updateNPC,
    updateObject,
    fireActionObject,
    addToInventory,
}: FinishActionParams) => {
    const openerId = dialog.openerId;
    const otherThingIdx = parseInt(openerId.split('-')[1]);

    handleActionAfterDialogDone({
        dialog,
        character,
        otherThingIdx,
        setContents,
        onGameEnd,
        changeMap,
        updatePlayerPosition,
        updateNPC,
        updateObject,
        fireActionObject,
    });

    if (openerId.startsWith('npc-') && npc.npcs[otherThingIdx].stopMoving) {
        interactWithNPC({ setContents, npc, otherThingIdx, fireAction });
    } else if (openerId.startsWith('object-')) {
        interactWithObject({
            dialog,
            setContents,
            fireActionObject,
            otherThingIdx,
            objectNPC,
            addToInventory,
        });
    } else {
        setContents({
            open: false,
            title: '',
            text: '',
            openerId: '',
            action: '',
        });
    }
};

const handleActionAfterDialogDone = ({
    dialog,
    character,
    otherThingIdx,
    setContents,
    changeMap,
    onGameEnd,
    updatePlayerPosition,
    updateNPC,
    updateObject,
    fireActionObject,
}: HanldeActionAfterDialogParams) => {
    if (
        enterDungeon(
            dialog.action,
            setContents,
            changeMap,
            updatePlayerPosition,
            updateNPC,
            updateObject
        )
    ) {
        return;
    } else if (
        goToSky(
            dialog.action,
            setContents,
            changeMap,
            updatePlayerPosition,
            updateNPC
        )
    ) {
        return;
    } else if (
        battleEvilKing(dialog.action, otherThingIdx, setContents, onGameEnd)
    ) {
        return;
    } else if (gameOver(dialog.action, otherThingIdx, setContents, onGameEnd)) {
        return;
    } else if (
        victory(
            dialog.action,
            otherThingIdx,
            setContents,
            fireActionObject,
            updateNPC,
            onGameEnd
        )
    ) {
        return;
    } else if (
        leaveDungeon(
            dialog.action,
            setContents,
            changeMap,
            updatePlayerPosition,
            updateNPC,
            onGameEnd
        )
    ) {
        return;
    } else if (
        exitDungeon(
            dialog.action,
            setContents,
            changeMap,
            updatePlayerPosition,
            updateNPC
        )
    ) {
        return;
    } else if (
        goBackToGround(
            dialog.action,
            setContents,
            changeMap,
            updatePlayerPosition,
            updateNPC,
            onGameEnd
        )
    ) {
        return;
    } else if (
        followHeroHome(dialog.action, setContents, updateNPC, character)
    ) {
        return;
    } else if (beforeBattleEvilQueen(dialog.action, setContents, updateNPC)) {
        return;
    } else if (beforeBattleEvilQueen2(dialog.action, setContents, updateNPC)) {
        return;
    } else if (
        battleEvilQueen(dialog.action, otherThingIdx, setContents, onGameEnd)
    ) {
        return;
    } else if (
        gameOverEvilQueen(dialog.action, otherThingIdx, setContents, onGameEnd)
    ) {
        return;
    } else if (
        victoryEvilQueen(
            dialog.action,
            otherThingIdx,
            setContents,
            updateNPC,
            onGameEnd
        )
    ) {
        return;
    } else if (
        gameWonEvilQueen(dialog.action, otherThingIdx, setContents, onGameEnd)
    ) {
        return;
    } else if (
        spellBroken(
            dialog.action,
            otherThingIdx,
            setContents,
            onGameEnd,
            changeMap,
            updateNPC
        )
    ) {
        return;
    }
};

const interactWithNPC = ({
    setContents,
    npc,
    otherThingIdx,
    fireAction,
}: InteractWithNPCParams) => {
    setContents({
        open: false,
        title: '',
        text: '',
        openerId: '',
        action: '',
    });
    if (!npc.npcs[otherThingIdx].dead) {
        fireAction({ idx: otherThingIdx });
    }
};

const interactWithObject = ({
    dialog,
    setContents,
    fireActionObject,
    otherThingIdx,
    objectNPC,
    addToInventory,
}: InteractWithObjectParams) => {
    const prevTitle = dialog.title;

    setContents({
        open: false,
        title: '',
        text: '',
        openerId: '',
        action: '',
    });
    fireActionObject({ idx: otherThingIdx });
    if (prevTitle !== 'Nothing!')
        addToInventory({ item: objectNPC.objects[otherThingIdx] });
};

export const doAction = ({
    map,
    character,
    npc,
    objectNPC,
    winner,
    mode,
    setContents,
    fireAction,
    onGameEnd,
    changeMap,
    updatePlayerPosition,
    updateNPC,
}: DoActionParams) => {
    //in front of dungeon entrance
    if (map === 'sky' && character.x === 5 && character.y === 7) {
        setContents(
            dialogs.sky['npc-0'].enterDungeon.content ??
                ({} as SetContentsAction)
        );
    }
    //in front of dungeon exit
    if (map === 'evilKing' && character.x === 12 && character.y === 14) {
        setContents(
            dialogs.evilKing['npc-2'].exitDungeon.content ??
                ({} as SetContentsAction)
        );
    }
    //in front of dungeon exit2
    if (map === 'dungeonPath' && character.x === 12 && character.y === 14) {
        if (
            leaveDungeon(
                'leave-dungeon',
                setContents,
                changeMap,
                updatePlayerPosition,
                updateNPC,
                onGameEnd
            )
        ) {
            return;
        }
    }
    //in front of forest2
    if (map === 'forest' && character.x === 15 && character.y === 15) {
        goToForest2(changeMap, updateNPC, updatePlayerPosition);
    }
    //in front of forest
    if (map === 'forest2' && character.x === 15 && character.y === 0) {
        goToForest(changeMap, updateNPC, updatePlayerPosition);
    }
    //read woodenBoard
    if (
        map === 'forest2' &&
        ((character.x === 3 && character.y === 5) ||
            (character.x === 2 && character.y === 4) ||
            (character.x === 4 && character.y === 4))
    ) {
        setContents(
            dialogs.forest2.woodenBoard.readBoard.content ??
                ({} as SetContentsAction)
        );
    }
    //in front of forest3
    if (map === 'forest2' && character.x === 5 && character.y === 15) {
        goToForest3(changeMap, updateNPC, updatePlayerPosition);
    }
    //in front of forest2from3
    if (map === 'forest3' && character.x === 15 && character.y === 0) {
        goToForest2From3(changeMap, updateNPC, updatePlayerPosition);
    }
    //in front of forest3from4
    if (map === 'forest4' && character.x === 0 && character.y === 10) {
        goToForest3From4(changeMap, updateNPC, updatePlayerPosition, mode);
    }
    //in front of forest4
    if (map === 'forest3' && character.x === 16 && character.y === 10) {
        goToForest4(changeMap, updateNPC, updatePlayerPosition, mode);
    }
    //in front of pisces town
    if (map === 'forest4' && character.x === 15 && character.y === 0) {
        goToPiscesTown(changeMap, updateNPC, updatePlayerPosition, setContents);
    }
    //in front of pisces town2
    if (map === 'piscesTown' && character.x === 16 && character.y === 7) {
        goToPiscesTown2(changeMap, updateNPC, updatePlayerPosition);
    }
    //in front of pisces town3
    if (map === 'piscesTown2' && character.x === 8 && character.y === 0) {
        goToPiscesTown3(
            changeMap,
            updateNPC,
            updatePlayerPosition,
            setContents
        );
    }
    //in front of pisces town
    if (map === 'piscesTown2' && character.x === 0 && character.y === 7) {
        goToPiscesTownFrom2(changeMap, updateNPC, updatePlayerPosition);
    }
    const otherThing = whoIsOnMap(character.x, character.y, [
        ...npc.npcs,
        ...objectNPC.objects,
    ]);

    if (!otherThing) return;
    if (otherThing.type === 'npc') {
        const otherThingIdx = parseInt(otherThing.id.split('-')[1]);
        if (!(otherThing as NPC).dead) {
            fireAction({ idx: otherThingIdx });
        }
        if (map === 'forest') {
            if (mode === 'newChapter') {
                setContents(
                    dialogs.forest[otherThing.id].travelHome.content ??
                        ({} as SetContentsAction)
                );
                return;
            }
            if (mode === 'world') {
                if (fullyGeared(character.inventory) === 3) {
                    if (winner === undefined || winner === 'Blue Dragon') {
                        setContents(
                            dialogs.forest[otherThing.id].beforeFight.afterGear!
                                .content
                        );
                        setTimeout(() => {
                            onGameEnd({
                                mode: 'battle',
                                winner: undefined,
                                selectedOpponentIdx: otherThingIdx,
                            });
                        }, 500);
                        return;
                    }
                    if (winner === 'Jihoon') {
                        setContents(
                            dialogs.forest[otherThing.id].afterFight.goToSky!
                                .content
                        );
                        return;
                    }
                } else {
                    setContents(
                        dialogs.forest[otherThing.id].beforeFight.beforeGear!
                            .content
                    );
                    return;
                }
            }
        }
        if (map === 'evilKing') {
            setContents(
                dialogs.evilKing[otherThing.id].afterVictory.content ??
                    ({} as SetContentsAction)
            );
            return;
        }
        if (map === 'skyBroken') {
            setContents(
                dialogs.skyBroken[otherThing.id].goBackToForest.content ??
                    ({} as SetContentsAction)
            );
            return;
        }
        if (map === 'piscesTown3') {
            setContents(
                dialogs.piscesTown[otherThing.id].afterVictory.content ??
                    ({} as SetContentsAction)
            );
            return;
        }
        if (map === 'piscesTown3Melted') {
            setContents(
                dialogs.piscesTown[otherThing.id].afterSpell.content ??
                    ({} as SetContentsAction)
            );
            return;
        }
    }
    if (otherThing.type === 'objectNPC') {
        if ((otherThing as ObjectNPC).tookItem) {
            setContents({
                open: true,
                title: 'Nothing!',
                text: `Here is nothing to take from.`,
                openerId: otherThing.id,
                action: '',
            });
        } else {
            setContents({
                open: true,
                title: 'Item found!',
                text: `You found ${(otherThing as ObjectNPC).item}!`,
                openerId: otherThing.id,
                action: '',
            });
        }
    }
};
