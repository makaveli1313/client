<script setup>
import { RouterLink, RouterView } from "vue-router";
import TodoApp from "./components/todo/TodoApp.vue";
</script>

<template>
  <!-- <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" /> -->

  <TodoApp headingText="TODO List:" />

  <!-- <RouterLink to="/">Home</RouterLink> -->

  <RouterView />
</template>

<style scoped></style>
