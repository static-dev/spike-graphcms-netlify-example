const htmlStandards = require('reshape-standard')
const cssStandards = require('spike-css-standards')
const jsStandards = require('spike-js-standards')
const Records = require('spike-records')
const path = require('path')

const locals = {}
const apiUrl = 'https://api.graphcms.com/simple/v1/vinylbase'

module.exports = {
  matchers: {
    html: '*(**/)*.sgr',
    css: '*(**/)*.sss'
  },
  ignore: ['**/layout.sgr', '**/_*', '**/.*', 'readme.md', 'yarn.lock', 'views/templates/*.sgr'],
  reshape: htmlStandards({
    root: path.join(__dirname, 'views'),
    locals: (ctx) => locals
  }),
  postcss: cssStandards(),
  babel: jsStandards(),
  plugins: [
    new Records({
      addDataTo: locals,
      reviews: {
        graphql: {
          url: apiUrl,
          query: `{
            allReviews {
              title, slug, rating, review,
              record {
                title, cover { id },
                artist { name, slug, picture { id } }
              }
            }
          }`
        },
        transform: (res) => res.data.allReviews,
        template: {
          path: 'views/templates/review.sgr',
          output: (review) => `reviews/${review.slug}.html`
        }
      },
      artists: {
        graphql: {
          url: apiUrl,
          query: `{
            allArtists {
              name, slug, bio, picture { id },
              records { title, slug, cover { id } }
            }
          }`
        },
        transform: (res) => res.data.allArtists,
        template: {
          path: 'views/templates/artist.sgr',
          output: (artist) => `artists/${artist.slug}.html`
        }
      },
      records: {
        graphql: {
          url: apiUrl,
          query: `{
            allRecords {
              title, slug, cover { id },
              tracks { title, length }
            }
          }`
        },
        transform: (res) => res.data.allRecords,
        template: {
          path: 'views/templates/record.sgr',
          output: (record) => `records/${record.slug}.html`
        }
      }
    })
  ]
}
