// PDF API

const validate = require('./internal/validator')
const schema = require('./internal/pdf-schema')

class PDF {
  constructor(client) {
    this.client = client
  }

  /**
   * Create PDF document from HTML.
   *
   * @returns {buffer} PDF binary data.
   * @throws {object} JSON object with error message.
   */
  create(options) {
    // validate(options, schema)
    const headers = {
      Accept: 'application/pdf',
    }
    return this.client.post('/v1/pdf/create', options, headers)
  }
}

module.exports = PDF
