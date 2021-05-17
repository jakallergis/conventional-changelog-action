import cp from 'child_process'
import ICommit from '../models/ICommit'

export default function getGitCommits(): ICommit[] {
  const output = cp
    .execSync(
      `git log --format='%s----SHA_DELIMITER----%H----SHA_SHORT_DELIMITER----%h----COMMIT_DELIMITER----'`
    )
    .toString('utf-8')

  return output
    .split('----COMMIT_DELIMITER----\n')
    .map(commit => {
      const [fullMessage, shas] = commit.split('----SHA_DELIMITER----') || []
      const [sha, shaShort] = shas?.split('----SHA_SHORT_DELIMITER----') || []
      const messageSplit = fullMessage?.split(': ') || []
      return {
        sha,
        shaShort,
        message: messageSplit[1] || messageSplit[0],
        type: messageSplit.length > 1 ? messageSplit[0] : 'chore'
      }
    })
    .filter(c => Boolean(c.sha))
}
