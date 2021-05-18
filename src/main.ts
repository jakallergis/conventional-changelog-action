import fs from 'fs'
import {getInput, setFailed, setOutput} from '@actions/core'
import getGitCommits from './utils/getGitCommits'
import {getCurrentVersion} from './utils/getCurrentVersion'
import {extractCurrentChangelog} from './utils/extractCurrentChangelog'
import formatUnicorn from './utils/formatUnicorn'

async function run(): Promise<void> {
  try {
    const repo = getInput('repo') || process.env.REPO
    const owner = getInput('owner') || process.env.OWNER
    const ctx = {repo, owner}

    const version = getCurrentVersion()
    const commits = getGitCommits()
    if (!commits.length) return
    const newChangelog = extractCurrentChangelog(commits, version)
    const formattedLog = formatUnicorn(newChangelog, ctx)

    const currentLog = fs.readFileSync('./CHANGELOG.md', 'utf-8')
    const newLog = `${formattedLog}\n\n${currentLog}`
    // setOutput('changelog', newLog)
    fs.writeFileSync('./CHANGELOG.md', newLog)
  } catch (error) {
    console.log({error})
    setFailed(error.message)
  }
}

void run()
