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
      reviews: {
        graphql: {
          url: 'https://api.graphcms.com/simple/v1/vinylbase',
          query: `{
            allReviews {
              title, slug, rating, review,
              record {
                title, cover { id },
                artist { name, slug, picture { id } }
              }
            }
          }`
        }
      },
      artists: {
        graphql: {
          url: 'https://api.graphcms.com/simple/v1/vinylbase',
          query: `{
            allArtists {
              name, bio, picture { id },
              records { title, slug, cover { id } }
            }
          }`
        }
      },
      records: {
        graphql: {
          url: 'https://api.graphcms.com/simple/v1/vinylbase',
          query: `{
            allRecords {
              title, slug, cover { id },
              tracks { title, length }
            }
          }`
        }
      }
    })
  ]
}
