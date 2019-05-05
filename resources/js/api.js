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
    .then(l => l.data)
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
    .then(l => l.data)
}
