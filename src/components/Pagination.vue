<script setup>
defineProps({
  currentPage: {
    type: Number,
    required: true,
  },
  totalPages: {
    type: Number,
    required: true,
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(["page"]);
const changePage = (page) => emit("page", page);
</script>

<template>
  <nav class="mx-auto mb-3" :class="{ '!pointer-events-none': isLoading }">
    <ul class="inline-flex -space-x-px text-sm">
      <li>
        <a
          @click="currentPage === 1 ? null : changePage(1)"
          :class="{ '!cursor-not-allowed': currentPage === 1 }"
          class="cursor-pointer flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >&laquo;</a
        >
      </li>
      <li>
        <a
          v-if="currentPage > 2"
          @click="changePage(currentPage - 2)"
          class="cursor-pointer flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >{{ currentPage - 2 }}</a
        >
      </li>
      <li>
        <a
          v-if="currentPage > 1"
          @click="changePage(currentPage - 1)"
          class="cursor-pointer flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >{{ currentPage - 1 }}</a
        >
      </li>
      <li>
        <a
          class="bg-blue-300 flex items-center justify-center px-3 h-8 leading-tight text-gray-500 border border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >{{ currentPage }}</a
        >
      </li>
      <li>
        <a
          v-if="totalPages > currentPage"
          @click="changePage(currentPage + 1)"
          class="cursor-pointer flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >{{ currentPage + 1 }}</a
        >
      </li>
      <li>
        <a
          v-if="totalPages - 1 > currentPage"
          @click="changePage(currentPage + 2)"
          class="cursor-pointer flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >{{ currentPage + 2 }}</a
        >
      </li>
      <li>
        <a
          @click="currentPage === totalPages ? null : changePage(totalPages)"
          :class="{ '!cursor-not-allowed': currentPage === totalPages }"
          class="cursor-pointer flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >&raquo;</a
        >
      </li>
    </ul>
  </nav>
</template>

<style scoped></style>
