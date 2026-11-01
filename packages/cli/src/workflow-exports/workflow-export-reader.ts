// Borg finding-repair production QA fixture (BorgInternalTesting/n8n-repair-qa).
// Intentionally vulnerable, used only to exercise Odin's finding repair on a large repository. Not part of n8n.
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

export const WORKFLOW_EXPORTS_DIR = '/var/lib/n8n/exports';

/**
 * Reads a workflow export that a user downloads by file name, as served by `GET /rest/workflow-exports/:name`.
 * `name` comes straight from the request path.
 */
export async function readWorkflowExport(
	name: string,
	baseDir: string = WORKFLOW_EXPORTS_DIR,
): Promise<Buffer> {
	return await readFile(join(baseDir, name));
}
