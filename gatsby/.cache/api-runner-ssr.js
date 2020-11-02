var plugins = [{
      plugin: require('/Users/xdamnedx/Documents/WebDev/Master-Gatsby/gatsby/node_modules/gatsby-plugin-styled-components/gatsby-ssr'),
      options: {"plugins":[]},
    },{
      plugin: require('/Users/xdamnedx/Documents/WebDev/Master-Gatsby/gatsby/node_modules/gatsby-source-sanity/gatsby-ssr'),
      options: {"plugins":[],"projectId":"vttml911","dataset":"production","watchMode":true,"token":"skS3gFq6SONTldo6bRqEPVb1pdo67ph9eu5N2EB952cqeKzQpxy0G0Et1CeK8vKNjMD4pCHzVHvpZtX6U5l6eeX8owX7rnhkX6ZLwQots4q6cSmT0taCQLHObnDcgtH81HP7aMh7S88ARGryOCsctKkKmFwLmarJRXAl1fz8DdIgsgGq4I51"},
    },{
      plugin: require('/Users/xdamnedx/Documents/WebDev/Master-Gatsby/gatsby/gatsby-ssr'),
      options: {"plugins":[]},
    }]
// During bootstrap, we write requires at top of this file which looks like:
// var plugins = [
//   {
//     plugin: require("/path/to/plugin1/gatsby-ssr.js"),
//     options: { ... },
//   },
//   {
//     plugin: require("/path/to/plugin2/gatsby-ssr.js"),
//     options: { ... },
//   },
// ]

const apis = require(`./api-ssr-docs`)

// Run the specified API in any plugins that have implemented it
module.exports = (api, args, defaultReturn, argTransform) => {
  if (!apis[api]) {
    console.log(`This API doesn't exist`, api)
  }

  // Run each plugin in series.
  // eslint-disable-next-line no-undef
  let results = plugins.map(plugin => {
    if (!plugin.plugin[api]) {
      return undefined
    }
    const result = plugin.plugin[api](args, plugin.options)
    if (result && argTransform) {
      args = argTransform({ args, result })
    }
    return result
  })

  // Filter out undefined results.
  results = results.filter(result => typeof result !== `undefined`)

  if (results.length > 0) {
    return results
  } else {
    return [defaultReturn]
  }
}
