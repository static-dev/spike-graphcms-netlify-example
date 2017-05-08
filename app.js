const htmlStandards = require('reshape-standard')
const cssStandards = require('spike-css-standards')
const jsStandards = require('spike-js-standards')
const Records = require('spike-records')

const locals = {}

module.exports = {
  matchers: {
    html: '*(**/)*.sgr',
    css: '*(**/)*.sss'
  },
  ignore: ['**/layout.sgr', '**/_*', '**/.*', 'readme.md', 'yarn.lock'],
  reshape: htmlStandards({ locals: (ctx) => locals }),
  postcss: cssStandards(),
  babel: jsStandards(),
  plugins: [
    new Records({
      addDataTo: locals,
      records: {
        graphql: {
          url: 'https://api.graphcms.com/simple/v1/vinylbase',
          query: `query {
            allRecords {
              title,
              tracks {
                title
              },
              artist {
                name
              }
            }
          }`
        }
      }
    })
  ]
}
