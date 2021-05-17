import {setFailed} from '@actions/core'
import getGitCommits from './utils/getGitCommits'

async function run(): Promise<void> {
  try {
    const commits = getGitCommits()
    console.log({commits})
  } catch (error) {
    console.log({error})
    setFailed(error.message)
  }
}

void run()
