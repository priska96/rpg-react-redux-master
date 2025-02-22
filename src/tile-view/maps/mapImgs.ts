import { dungeonPath } from './dungeonPath';
import { evilKing } from './evilKing';
import { forest } from './forest';
import { forest2 } from './forest2';
import { forest3 } from './forest3';
import { forest4 } from './forest4';
import { MapMatrix } from './mapData';
import { piscesTown } from './piscesTown';
import { piscesTown2 } from './piscesTown2';
import { piscesTown3 } from './piscesTown3';
import { piscesTown3Melted } from './piscesTown3Melted';
import { sky } from './sky';
import { skyBroken } from './skyBroken';

export interface LayersInterface {
    forest: MapMatrix;
    forest2: MapMatrix;
    forest3: MapMatrix;
    forest4: MapMatrix;
    piscesTown: MapMatrix;
    piscesTown2: MapMatrix;
    piscesTown3: MapMatrix;
    piscesTown3Melted: MapMatrix;
    evilKing: MapMatrix;
    dungeonPath: MapMatrix;
    sky: MapMatrix;
    skyBroken: MapMatrix;
}

export const LAYERS: LayersInterface = {
    forest,
    forest2,
    forest3,
    forest4,
    piscesTown,
    piscesTown2,
    piscesTown3,
    piscesTown3Melted,
    evilKing,
    dungeonPath,
    sky,
    skyBroken,
};

export const SOLID_TILES = [
    '5',
    '15',
    '25',
    '26',
    '35',
    '36',
    '63',
    '104',
    '114',
    '81',
    '82',
    '91',
    '92',
    '88',
    '131',
    '132',
    '1311',
    '133',
    '1341',
    '134',
    '141',
    '142',
    '1431',
    '143',
    '1441',
    '144',
    '76',
    '124',
    '83',
    '420',
    '310',
    '320',
    '330',
    '410',
    '430',
    '440',
    '510',
    '520',
    '530',
    '610',
    '620',
    '630',
    '1760',
    '1770',
    '1780',
    '1860',
    '1880',
    '1510',
    '1520',
    '1530',
    '1540',
    '1610',
    '1620',
    '1630',
    '1640',
    '260',
    '3500',
    '390',
    '3100',
    '490',
    '4100',
    's22',
    's61',
    's62',
    's63',
    's71',
    's72',
    's73',
    's67',
    's121',
    's122',
    's123',
    's131',
    's132',
    's133',
    's141',
    's122',
    's123',
    's151',
    's152',
    's153',
    's161',
    's162',
    's163',
    's15',
    's23',
    'sn181',
    'sn182',
    'sn197',
    'sn224',
    'sn225',
    'sn226',
    'sn227',
    'sn240',
    'sn241',
    'sn242',
    'sn243',
    'sn183',
    'sn199',
    'sn196',
    'sn198',
    'p036',
    'p045',
    'p046',
    'p047',
    'p061',
    'p062',
    'p063',
    'p077',
    'p078',
    'p079',
    'p091',
    'p092',
    'p093',
    'p235',
    'p251',
    'p192',
    'p156',
    'p160',
    'p144',
    'p096',
    'p097',
    'p099',
    'p115',
    'p141',
    'p230',
    'p231',
    'p147',
    'p161',
    'p216',
    'p217',
    'p218',
    'p232',
    'p233',
    'p234',
    'p248',
    'p123',
    'p124',
    'p125',
    'p110',
    'p111',
    'p034',
    'm149',
    'm150',
    'm151',
    'm165',
    'm166',
    'm167',
    'm181',
    'm182',
    'm183',
    'm197',
    'm198',
    'm096',
    'm113',
    'm099',
    'm115',
    'm117',
    'm125',
    'm071',
    'm196',
];
