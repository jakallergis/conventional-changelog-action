import cp from 'child_process'
import ICommit from '../models/ICommit'
import {CommitTypes} from '../models/CommitTypes'

const DEL = '----DELIMITER----'
const END = '----END_COMMIT----'
const CMD = `git log --format='%s${DEL}%b${DEL}%H${DEL}%h${END}'`

export default function getGitCommits(): ICommit[] {
  const output = cp.execSync(CMD).toString('utf-8')

  return output
    .split(`${END}\n`)
    .map(commit => {
      const sections = commit.split(DEL) || []
      const fullMessage = sections[0]
      const body = sections[1]
      const sha = sections[2]
      const shaShort = sections[3]

      const mSplit = fullMessage?.split(': ')
      const type = (mSplit.length > 1
        ? mSplit[0]
        : CommitTypes.CHORE) as CommitTypes
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
