import { Ref } from 'vue';
import { defineStore } from 'pinia';
import {
  darkTheme,
  GlobalThemeOverrides,
  useOsTheme,
  zhCN,
  enUS,
  dateZhCN,
  dateEnUS,
} from 'naive-ui';
import { getSatusColor } from './helps';
export const useAppStore = defineStore(
  'appStore',
  () => {
    const darkMode = ref(false);
    const useOsDark = ref(false);
    const useDarkMode = computed(() => {
      if (useOsDark.value) return useOsTheme().value === 'dark' ? true : false;
      return darkMode.value;
    });
    const themePanelShow = ref(false);
    const { locale } = useI18n();
    const language = ref<'zh_cn' | 'en_us'>('zh_cn');
    watch(language, (language) => (locale.value = language));
    const naiveLocale = computed(() =>
      language.value === 'zh_cn' ? zhCN : enUS,
    );
    const naiveDateLocale = computed(() =>
      language.value === 'zh_cn' ? dateZhCN : dateEnUS,
    );
    const layoutMode = ref<'vertical' | 'horizontal'>('horizontal');
    const sideCollapsed = ref(false);
    const layoutOption = ref({
      sider: {
        show: true,
        width: 200,
        collapsedWidth: 60,
      },
      header: {
        show: true,
        fixed: true,
        height: 100,
      },
      footer: {
        show: true,
        fixed: false,
        height: 80,
      },
    });
    const themeColor = ref({
      primary: '#88ada6',
      info: '#44cef6',
      success: '#7bcfa6',
      warning: '#eacd76',
      error: '#dc3023',
    });
    const naiveThemeMode = computed(() => {
      darkMode.value
        ? document.body.classList.add('dark')
        : document.body.classList.remove('dark');
      return darkMode.value ? darkTheme : undefined;
    });
    const naiveThemeOverrides: Ref<GlobalThemeOverrides> = computed(() => {
      return {
        common: {
          primaryColor: themeColor.value.primary,
          primaryColorHover: getSatusColor(themeColor.value.primary).hover,
          primaryColorPressed: getSatusColor(themeColor.value.primary).pressed,
          primaryColorSuppl: getSatusColor(themeColor.value.primary).suppl,
          infoColor: themeColor.value.info,
          infoColorHover: getSatusColor(themeColor.value.info).hover,
          infoColorPressed: getSatusColor(themeColor.value.info).pressed,
          infoColorSuppl: getSatusColor(themeColor.value.info).suppl,
          successColor: themeColor.value.success,
          successColorHover: getSatusColor(themeColor.value.success).hover,
          successColorPressed: getSatusColor(themeColor.value.success).pressed,
          successColorSuppl: getSatusColor(themeColor.value.success).suppl,
          warningColor: themeColor.value.warning,
          warningColorHover: getSatusColor(themeColor.value.warning).hover,
          warningColorPressed: getSatusColor(themeColor.value.warning).pressed,
          warningColorSuppl: getSatusColor(themeColor.value.warning).suppl,
          errorColor: themeColor.value.error,
          errorColorHover: getSatusColor(themeColor.value.error).hover,
          errorColorPressed: getSatusColor(themeColor.value.error).pressed,
          errorColorSuppl: getSatusColor(themeColor.value.error).suppl,
        },
      };
    });
    return {
      language,
      darkMode,
      useOsDark,
      useDarkMode,
      themePanelShow,
      layoutMode,
      sideCollapsed,
      layoutOption,
      themeColor,
      naiveThemeMode,
      naiveThemeOverrides,
      naiveLocale,
      naiveDateLocale,
    };
  },
  {
    persist: {
      key: '__app__',
      paths: ['language', 'layoutMode', 'layoutOption', 'themeColor'],
    },
  },
);
