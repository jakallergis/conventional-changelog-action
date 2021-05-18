import {env, execPath} from 'process'
import cp from 'child_process'
import {join} from 'path'

// shows how the runner will run a javascript action with env / stdout protocol
test('test runs', () => {
  env['repo'] = 'jakallergis'
  env['owner'] = 'jakallergis'
  const np = execPath
  const ip = join(__dirname, '..', 'lib', 'src', 'main.js')
  const options: cp.ExecFileSyncOptions = {
    env
  }
  console.log(cp.execFileSync(np, [ip], options).toString())
})
