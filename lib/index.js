// Javascript client for Salesfly API

const RestClient = require('./internal/rest')
const VERSION = require('../package.json').version
const GeoLocation = require('./geoip')
const Mail = require('./mail')
const PDF = require('./pdf')
const Usage = require('./usage')

class SalesflyClient {
  constructor(options) {
    const client = new RestClient(options)
    this.geoip = new GeoLocation(client)
    this.mail = new Mail(client)
    this.pdf = new PDF(client)
    this.usage = new Usage(client)
  }

  /**
   * Get client version
   *
   * @returns {string} Version number.
   */
  getVersion() {
    return VERSION
  }
}

module.exports = SalesflyClient
