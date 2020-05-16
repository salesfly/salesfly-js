const Salesfly = require('../lib/index')

const client = new Salesfly({
  apiKey: '', //process.env.SALESFLY_APIKEY,
})

async function main() {
  try {
    let location = await client.geoip.get('8.8.8.8')
    console.log(location)
    console.log('Country: ' + location.country_name) // prints "United States"
    console.log('Country code: ' + location.country_code) // and    "US"
  } catch (err) {
    console.log(err)
  }
}

main().then(
  () => {
    console.log('Done!')
  },
  (err) => {
    // Deal with the fact the chain failed
  }
)
