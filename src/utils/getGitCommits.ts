import cp from 'child_process'
import ICommit from '../models/ICommit'
import {CommitTypes} from '../models/CommitTypes'
import {CommitScopes} from '../models/CommitScopes'
import formatUnicorn from './formatUnicorn'

const DEL = '----DELIMITER----'
const END = '----END_COMMIT----'
const LAST_TWO_TAGS_CMD = 'git tag --sort=-version:refname | head -n {count}'
const CMD = `git log --format='%s${DEL}%b${DEL}%H${DEL}%h${END}' --no-merges`

function getTagsRange(count = 2): string {
  const command = formatUnicorn(LAST_TWO_TAGS_CMD, {count})
  const tags = cp
    .execSync(command)
    .toString('utf-8')
    .split('\n')
    .filter(Boolean)
  const mostRecentTag = tags[0]
  const oldestTag = tags[tags.length - 1]
  if (!mostRecentTag && !oldestTag) return ''
  if (mostRecentTag === oldestTag) return `${mostRecentTag}..HEAD`
  if (mostRecentTag && oldestTag) return `${oldestTag}..${mostRecentTag}`
  return ''
}

export default function getGitCommits(): ICommit[] {
  const tagsRange = getTagsRange(2)
  const COMMITS_CMD = `${CMD} ${tagsRange}`
  const output = cp.execSync(COMMITS_CMD).toString('utf-8')

  return output
    .split(`${END}\n`)
    .map(commit => {
      const sections = commit.split(DEL) || []
      const messageSection = sections[0]
      const bodySection = sections[1]
      const sha = sections[2]
      const shaShort = sections[3]

      const mSplit = messageSection?.split(': ')
      const typeSection = mSplit.length > 1 ? mSplit[0] : CommitTypes.CHORE
      const scope = typeSection.match(/\((.+)\)$/)?.[1]
      const type = scope ? typeSection.replace(/\(.+\)$/, '') : typeSection
      const message = (mSplit.length > 1 ? mSplit[1] : mSplit[0]) || '-'

      const body =
        bodySection
          ?.split('\n')
          .filter(Boolean)
          .map(b => b.replace(/^- /, '')) || []

      return {
        message,
        body,
        sha,
        shaShort,
        type: type as CommitTypes,
        scope: scope as CommitScopes
      }
    })
    .filter(c => Boolean(c.sha))
}
