module.exports = {
  managerEntries: (entry = []) => [
    ...entry,
    require.resolve('./manager.js')
  ]
};