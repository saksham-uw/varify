import * as assert from 'assert';
import { parseEnv, diffEnv } from '../env';

describe('env utilities', () => {
    it('diffEnv detects missing and extra keys', () => {
        const example = parseEnv('A=1\nB=2');
        const actual = parseEnv('A=1\nC=3');
        const diff = diffEnv(example, actual);
        assert.deepStrictEqual(diff.missing, ['B']);
        assert.deepStrictEqual(diff.extra, ['C']);
    });
});
