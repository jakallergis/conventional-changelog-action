import ICommit from '../models/ICommit'
import {CommitTypes} from '../models/CommitTypes'

export function extractCurrentChangelog(
  commits: ICommit[],
  version: string
): string {
  const date = new Date().toISOString().split('T')[0]
  let newChangelog = `# Version ${version} (${date})\n\n`
  if (commits?.length) {
    const features: string[] = []
    const chores: string[] = []
    for (const commit of commits) {
      const {sha, shaShort, message, body} = commit
      const formattedText = `- ${message} ([${shaShort}](https://github.com/{owner}/{repo}/commit/${sha})))`
      switch (commit.type) {
        case CommitTypes.FEATURE:
          features.push(formattedText)
          break
        case CommitTypes.CHORE:
        default:
          chores.push(formattedText)
      }
    }

    if (features.length) {
      newChangelog += `## Features\n`
      newChangelog += features.join('\n')
      newChangelog += '\n'
    }

    if (chores.length) {
      newChangelog += `## Chores\n`
      newChangelog += chores.join('\n')
      newChangelog += '\n'
    }
  }
  return newChangelog
}
