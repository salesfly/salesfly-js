const pdfSchema = {
  name: 'PDFOptions',
  type: 'object',
  properties: {
    document_url: {
      type: 'string',
      maxLength: 250,
    },
    document_html: {
      type: 'string',
      maxLength: 250,
    },
    /*    from_name: {
      type: 'string',
      maxLength: 50,
    },
    to: {
      type: 'array',
      minLength: 1,
      maxLength: 50,
      items: {
        type: 'string',
      },
    },
    cc: {
      type: 'array',
      minLength: 1,
      maxLength: 50,
      items: {
        type: 'string',
      },
    },
    bcc: {
      type: 'array',
      minLength: 1,
      maxLength: 50,
      items: {
        type: 'string',
      },
    },
    reply_to: {
      type: 'string',
      maxLength: 50,
    },
    subject: {
      type: 'string',
      maxLength: 100,
    },
    text: {
      type: 'string',
    },
    html: {
      type: 'string',
    },
    attachments: {
      type: 'array',
      maxLength: 10,
      items: {
        type: 'string',
      },
    },
    tags: {
      type: 'array',
      maxLength: 3,
      items: {
        type: 'string',
        maxLength: 20,
      },
    },
    charset: {
      type: 'string',
      maxLength: 20,
    },
    encoding: {
      type: 'string',
      maxLength: 20,
    },
    require_tls: {
      type: 'boolean',
    },
    verify_cert: {
      type: 'boolean',
    },
    open_tracking: {
      type: 'boolean',
    },
    click_tracking: {
      type: 'boolean',
    },
    text_click_tracking: {
      type: 'boolean',
    },
    unsubscribe_tracking: {
      type: 'boolean',
    },
    test_mode: {
      type: 'boolean',
    }, */
  },
  oneIsRequired: ['document_html', 'document_url'], // OR
  additionalProperties: false,
}

module.exports = pdfSchema
