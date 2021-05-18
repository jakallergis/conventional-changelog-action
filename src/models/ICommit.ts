import {CommitTypes} from './CommitTypes'
import {CommitScopes} from './CommitScopes'

export default interface ICommit {
  message: string
  body: string[]
  sha: string
  shaShort: string
  type: CommitTypes
  scope: CommitScopes
}
