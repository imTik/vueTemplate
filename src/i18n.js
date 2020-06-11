import Vue from 'vue'
import VueI18n from 'vue-i18n'
import { getCookie } from './utils/cookieFn'
import en from './language/en.json'
import cn from './language/cn.json'

Vue.use(VueI18n)

function loadLocaleMessages () {
  const locales = require.context('./language', true, /[A-Za-z0-9-_,\s]+\.json$/i)
  const messages = {}
  locales.keys().forEach(key => {
    const matched = key.match(/([A-Za-z0-9-_]+)\./i)
    if (matched && matched.length > 1) {
      const locale = matched[1]
      messages[locale] = locales(key)
    }
  })
  return messages
}
let cookie_locale = getCookie('locale');
export default new VueI18n({
  locale: cookie_locale || 'cn',
  fallbackLocale: cookie_locale || 'cn',
  messages: loadLocaleMessages()
})
