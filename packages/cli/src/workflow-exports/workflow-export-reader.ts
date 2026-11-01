// Borg finding-repair production QA fixture (BorgInternalTesting/n8n-repair-qa).
// Intentionally vulnerable, used only to exercise Odin's finding repair on a large repository. Not part of n8n.
import { BadRequestError } from '@n8n/errors';
import { readFile } from 'node:fs/promises';
import { dirname, isAbsolute, resolve } from 'node:path';

export const WORKFLOW_EXPORTS_DIR = '/var/lib/n8n/exports';

/**
 * Reads a workflow export that a user downloads by file name, as served by `GET /rest/workflow-exports/:name`.
 * `name` comes straight from the request path.
 */
export async function readWorkflowExport(
	name: string,
	baseDir: string = WORKFLOW_EXPORTS_DIR,
): Promise<Buffer> {
	if (
		typeof name !== 'string' ||
		name.length === 0 ||
		name === '.' ||
		name === '..' ||
		name.includes('/') ||
		name.includes('\\') ||
		name.includes('\0') ||
		isAbsolute(name)
	) {
		throw new BadRequestError('Invalid workflow export name');
	}

	const base = resolve(baseDir);
	const target = resolve(base, name);

	if (dirname(target) !== base) {
		throw new BadRequestError('Invalid workflow export name');
	}

	return await readFile(target);
}
