<script setup>
  import { ref, reactive, onMounted } from 'vue';
  import { defaultThemes, loadCustomThemes } from '../assets/js/themes.js';

  const selectedTheme = ref('light');
  const allThemes = ref({ ...defaultThemes, ...loadCustomThemes() });
  const isCreating = ref(false);
  const newThemeName = ref('');
  const newTheme = reactive({
    '--color-bg': '#ffffff',
    '--color-text': '#000000',
    '--color-primary': '#42b983',
  });

  const applyTheme = (themeName) => {
    const theme = allThemes.value[themeName];
    Object.entries(theme).forEach(([key, value]) => {
      document.documentElement.style.setProperty(key, value);
    });
    localStorage.setItem('currentTheme', themeName);
  };

  const saveTheme = () => {
    allThemes.value[newThemeName.value] = { ...newTheme };
    localStorage.setItem('customThemes', JSON.stringify(allThemes.value));
    isCreating.value = false;
    newThemeName.value = '';
  };

  onMounted(() => {
    const savedTheme = localStorage.getItem('currentTheme') || 'light';
    applyTheme(savedTheme);
  });
</script>

<template>
  <div>
    <select v-model="selectedTheme" @change="applyTheme(selectedTheme)">
      <option v-for="(theme, name) in allThemes" :key="name" :value="name">
        {{ name }}
      </option>
    </select>

    <div v-if="isCreating" class="theme-creator">
      <input v-model="newThemeName" placeholder="Название темы">
      <input type="color" v-model="newTheme['--color-bg']" title="Фон">
      <input type="color" v-model="newTheme['--color-text']" title="Текст">
      <button @click="saveTheme">Сохранить</button>
    </div>
    <button @click="isCreating = !isCreating">
      {{ isCreating ? 'Отмена' : 'Создать тему' }}
    </button>
  </div>
</template>

