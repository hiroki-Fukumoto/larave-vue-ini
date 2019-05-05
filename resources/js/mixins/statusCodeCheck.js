/**
 * HTTPステータスをチェックするミックスイン
 */

import { OK } from '../util'

export default {
  methods: {
    checkGetResponseStatusCode (statusCode) {
      if (statusCode !== OK) {
        this.$store.commit('error/setCode', statusCode)
        return false
      }
    }
  }
}
