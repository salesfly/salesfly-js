const axios = require('axios')
const isNode = require('./utils')
const FormData = require('form-data')

const VERSION = require('../../package.json').version
const USER_AGENT = 'salesfly-js/' + VERSION
const API_BASE_URL = 'https://api.salesfly.com'
const DEFAULT_TIMEOUT = 30 // seconds
const DEFAULT_RETRY_MAX = 4
const DEFAULT_RETRY_WAIT_MIN = 1 // seconds
const DEFAULT_RETRY_WAIT_MAX = 30 // seconds

class RestClient {
  /**
   * Creates a new REST client.
   *
   * @constructor
   * @param {object} options
   */
  constructor(options) {
    const opts = options || {}
    this.apiKey = opts.apiKey
    this.apiBaseURL = opts.apiBaseURL || API_BASE_URL
    this.timeout = opts.timeout || DEFAULT_TIMEOUT
    this.logger = opts.logger
  }

  /**
   * Executes a HTTP GET.
   *
   * @param {string} path
   * @returns {object} JSON object.
   * @throws {object} JSON object with error message.
   */
  get(path, headers) {
    return this._request('GET', path, null, headers)
  }

  /**
   * Executes a HTTP PATCH.
   *
   * @param {string} path
   * @param {object} data
   * @returns {object} JSON object.
   * @throws {object} JSON object with error message.
   */
  patch(path, data, headers) {
    return this._request('PATCH', path, data, headers)
  }

  /**
   * Executes a HTTP POST.
   *
   * @param {string} path
   * @param {object} data
   * @returns {object} JSON object.
   * @throws {object} JSON object with error message.
   */
  post(path, data, headers) {
    return this._request('POST', path, data, headers)
  }

  /**
   * Executes a HTTP PUT.
   *
   * @param {string} path
   * @param {object} data
   * @returns {object} JSON object.
   * @throws {object} JSON object with error message.
   */
  put(path, data, headers) {
    return this._request('PUT', path, data, headers)
  }

  /**
   * Executes a HTTP DELETE.
   *
   * @param {string} path
   * @returns {object} JSON object.
   * @throws {object} JSON object with error message.
   */
  delete(path, headers) {
    return this._request('DELETE', path, null, headers)
  }

  // Serialize object of properties to url query.
  makeQuery(obj) {
    let str = []
    for (let p in obj) {
      if (obj.hasOwnProperty(p)) {
        if (obj[p]) {
          str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]))
        }
      }
    }
    let result = str.join('&')
    if (result.length > 0) {
      result = '?' + result
    }
    return result
  }

  /**
   * Sends a HTTP request.
   *
   * @param {string} method
   * @param {string} path
   * @param {object} data
   * @returns {object} JSON object.
   * @throws {object} JSON object with error message.
   */
  _request(method, path, data, headers) {
    headers = headers || { Accept: 'application/json' }

    if (this.logger) {
      let now = new Date().toISOString()
      this.logger.debug(`${now} [DEBUG] ${method} ${path}`)
    }

    if (data) {
      if (data instanceof FormData) {
        headers['Content-Type'] = data.getHeaders()['content-type']
      } else {
        headers['Content-Type'] = 'application/json; charset=utf-8'
      }
    }

    if (this.apiKey) {
      headers['Authorization'] = 'Bearer ' + this.apiKey
    }

    if (isNode()) {
      headers['User-Agent'] = USER_AGENT
    }

    let responseType = 'json'
    if (headers['Accept'] === 'application/pdf') {
      responseType = 'arraybuffer' // binary blob
    }

    return axios({
      method: method,
      url: path,
      baseURL: this.apiBaseURL,
      timeout: this.timeout * 1000,
      headers: headers,
      data: data,
      responseType: responseType,
    })
      .then((response) => {
        if (response.headers['content-type'] === 'application/pdf') {
          return response.data
        }
        return response.data.data
      })
      .catch((error) => {
        if (error.response) {
          if (this.logger) {
            let now = new Date().toISOString()
            this.logger.error(
              `${now} [ERROR] ${error.response.data.message} (${error.response.data.code})`
            )
          }
          throw error.response.data
        } else {
          let message = ''
          if (error.code === 'ESOCKETTIMEDOUT') {
            message = 'Connection timed out'
          } else if (error.code === 'ENOTFOUND') {
            message = 'Host not found'
          } else if (error.code === 'ECONNREFUSED') {
            message = 'Connection refused'
          } else {
            message = error.message
          }

          if (this.logger) {
            let now = new Date().toISOString()
            this.logger.error(`${now} [ERROR] ${message} (${error.code})`)
          }

          throw {
            status: 0,
            success: false,
            code: error.code,
            message: message,
          }
        }
      })
  }
}

module.exports = RestClient
