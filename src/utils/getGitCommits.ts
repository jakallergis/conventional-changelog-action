import cp from 'child_process'
import ICommit from '../models/ICommit'

export default function getGitCommits(): ICommit[] {
  const output = cp
    .execSync(
      `git log --format='%s----DELIMITER----%b----DELIMITER----%H----DELIMITER----%h----END_COMMIT----'`
    )
    .toString('utf-8')

  return output
    .split('----END_COMMIT----\n')
    .map(commit => {
      const sections = commit.split('----DELIMITER----') || []
      const fullMessage = sections[0]
      const body = sections[1]
      const sha = sections[2]
      const shaShort = sections[3]

      const mSplit = fullMessage?.split(': ')
      const type = mSplit.length > 1 ? mSplit[0] : 'chore'
      const message = (mSplit.length > 1 ? mSplit[1] : mSplit[0]) || '-'

      return {
        message,
        body,
        sha,
        shaShort,
        type
      }
    })
    .filter(c => Boolean(c.sha))
}
