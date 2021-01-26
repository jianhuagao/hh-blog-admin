import { combineReducers } from 'redux-immutable'

import { reducer as globalConfig } from '@/global-data/store'
import { reducer as page } from '@p/store'

const cReducers = combineReducers({
  global: globalConfig,
  page:page
})

export default cReducers
