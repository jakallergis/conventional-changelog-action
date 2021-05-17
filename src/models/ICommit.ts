import {CommitTypes} from './CommitTypes'

export default interface ICommit {
  message: string
  body: string
  sha: string
  shaShort: string
  type: CommitTypes
}
