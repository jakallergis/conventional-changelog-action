import ICommit from '../models/ICommit'
import {CommitTypes} from '../models/CommitTypes'
import {CommitScopes} from '../models/CommitScopes'

export function extractCurrentChangelog(
  commits: ICommit[],
  version: string
): string {
  const date = new Date().toISOString().split('T')[0]
  let newChangelog = `# Version ${version} (${date})\n\n`
  if (commits?.length) {
    const features: string[] = []
    const fixes: string[] = []
    const chores: string[] = []
    const deps: string[] = []
    for (const commit of commits) {
      const {sha, shaShort, message, body, type, scope} = commit
      const link = `[${shaShort}](https://github.com/{owner}/{repo}/commit/${sha})`
      const formattedScope = scope ? `**[${scope}]** ` : ''
      let formattedText = `- ${formattedScope}${message} (${link})`

      if (type === CommitTypes.CHORE) {
        const isDep = scope === CommitScopes.DEPS
        const isDepDev = scope === CommitScopes.DEPS_DEV
        if (isDep || isDepDev) {
          deps.push(formattedText)
        } else {
          chores.push(formattedText)
        }
        continue
      }

      const formattedBody = body?.length ? `\n  - ${body.join('\n  - ')}` : ''
      formattedText = `${formattedText}${formattedBody}`

      if (type === CommitTypes.FEATURE) features.push(formattedText)
      if (type === CommitTypes.FIX) fixes.push(formattedText)
    }

    if (features.length) {
      newChangelog += `## Features\n`
      newChangelog += features.join('\n')
      newChangelog += '\n'
    }

    if (fixes.length) {
      newChangelog += `## Fixes\n`
      newChangelog += fixes.join('\n')
      newChangelog += '\n'
    }

    if (chores.length) {
      newChangelog += `## Chores\n`
      newChangelog += chores.join('\n')
      newChangelog += '\n'
    }

    if (deps.length) {
      newChangelog += `## Changed Dependencies\n`
      newChangelog += deps.join('\n')
      newChangelog += '\n'
    }
  }
  return newChangelog
}
