export interface EnvDiff {
    missing: string[];
    extra: string[];
}

export function parseEnv(content: string): Record<string, string> {
    const result: Record<string, string> = {};
    const lines = content.split(/\r?\n/);
    for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('#')) {
            continue;
        }
        const eqIndex = trimmed.indexOf('=');
        if (eqIndex === -1) {
            continue;
        }
        const key = trimmed.substring(0, eqIndex).trim();
        const value = trimmed.substring(eqIndex + 1).trim();
        result[key] = value;
    }
    return result;
}

export function diffEnv(example: Record<string, string>, actual: Record<string, string>): EnvDiff {
    const missing: string[] = [];
    for (const key of Object.keys(example)) {
        if (!(key in actual)) {
            missing.push(key);
        }
    }

    const extra: string[] = [];
    for (const key of Object.keys(actual)) {
        if (!(key in example)) {
            extra.push(key);
        }
    }

    return { missing, extra };
}
