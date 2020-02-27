const constants = require('./constants_and_utils/constants')
const utils = require('./constants_and_utils/utils')

const setTimeout = (timeoutInMilliseconds = constants.DEFAULT_TIMEOUT_IN_MS) => {
  utils.timeout.timeoutInMilliseconds = timeoutInMilliseconds
}

// const setHeader = (header = constants.DEFAULT_HEADER) => {
//   utils.header.header = header
// }

module.exports = {
  // setHeader,
  setTimeout
}
