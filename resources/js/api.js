import axios from 'axios'

const axiosOptions = {
  baseURL: '/api'
}

export const client = axios.create(axiosOptions)

/**
 * API でアクセスできるリソース名を指定します.
 */
export const ResourceName = Object.freeze([
  'tests'
])

/**
 * axios のエラー時にレスポンスに記載された情報を返します。
 * @param {Object} err axios のエラーオブジェクト
 * @returns 呼び出し元に返すオブジェクト
 */
function handleErrorResponse (err) {
  const result = {
    success: false,
    error: true,
    status: null,
    statusText: null,
    message: null,
    data: null
  }
  if (err.response) {
    result.status = err.response.status
    result.statusText = err.response.statusText
    const data = err.response.data
    if (data instanceof Array) {
      // データが配列の場合
      const more = data.length > 3 ? '\n...' : ''
      result.message = data.slice(0, 3).join('\n') + more
    } else if (toString.apply(data) === '[object String]') {
      result.message = data
    } else {
      result.message = JSON.stringify(data)
    }
  }
  return result
}

/**
 * 指定したリソースの一覧を取得します.
 * @param {string} resourceName リソース名 (値を指定するには ResourceName 列挙体を使用してください)
 * @returns {Promise} リソースのデータを返す Promise
 * @throws レスポンスのステータスコードが 200 番台以外の場合は Promise は reject され, Promise#catch が発生します.
 */
export function getIndex (resourceName) {
  if (!ResourceName.includes(resourceName)) {
    throw Error(`${resourceName} is an invalid name as a resource which has the option list.`)
  }
  return client
    .get(`${resourceName}`)
    .then(response => {
      return {
        status: response.status,
        data: response.data
      }
    })
    .catch(handleErrorResponse)
}

/**
 * 指定したリソースの詳細を取得します.
 * @param {string} resourceName リソース名 (値を指定するには ResourceName 列挙体を使用してください)
 * @param {number} id リソース ID
 * @returns {Promise} リソースのデータを返す Promise
 * @throws レスポンスのステータスコードが 200 番台以外の場合は Promise は reject され, Promise#catch が発生します.
 */
export function getDetail (resourceName, id) {
  return client
    .get(`${resourceName}/${id}`)
    .then(response => {
      return {
        status: response.status,
        data: response.data
      }
    })
    .catch(handleErrorResponse)
}
