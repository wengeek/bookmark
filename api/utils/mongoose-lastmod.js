/**
 * mongoose最新更新时间
 */

module.exports = function lastModifiedPlugin (schema) {
  schema.add({ lastMod: Date })
  
  schema.pre('save', function (next) {
    this.lastMod = new Date
    next()
  })  
}
