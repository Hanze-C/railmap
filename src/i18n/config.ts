import rmgRuntime from '@railmapgen/rmg-runtime';
import { initReactI18next } from 'react-i18next';
import { defaultTranslation } from '@railmapgen/rmg-translate';
import enTranslation from './translations/en.json';
import zhHansTranslation from './translations/zh-Hans.json';
import zhHantTranslation from './translations/zh-Hant.json';
import jaTranslation from './translations/ja.json';
import koTranslation from './translations/ko.json';

const i18n = new rmgRuntime.I18nBuilder()
    .use(initReactI18next)
    .withAppName('Rail Map Toolkit')
    .withLng(rmgRuntime.getLanguage())
    .withDefaultResource(defaultTranslation)
    .withResource('en', enTranslation)
    .withResource('zh-Hans', zhHansTranslation)
    .withResource('zh-Hant', zhHantTranslation)
    .withResource('ja', jaTranslation)
    .withResource('ko', koTranslation)
    .build();

export default i18n;
