/**
 * HTTPステータスをチェックするミックスイン
 */

import { OK, CREATED } from '../util'

export default {
  methods: {
    /**
     * ステータスコードが200かチェック
     * @param {number} statusCode
     */
    checkStatusCode200 (statusCode) {
      if (statusCode !== OK) {
        this.$store.commit('error/setCode', statusCode)
        return false
      }
      return true
    },
    /**
     * ステータスコードが201かチェック
     * @param {number} statusCode
     */
    checkStatusCode201 (statusCode) {
      if (statusCode !== CREATED) {
        this.$store.commit('error/setCode', statusCode)
        return false
      }
      return true
    }
  }
}
