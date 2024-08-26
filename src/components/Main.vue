<script setup>
import axios from "axios";
import { ref } from "vue";
import Spinner from "@/components/Spinner.vue";
import Pagination from "@/components/Pagination.vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const searchInput = defineModel();
let searchResults = ref({});
let pagination = ref({
  endIndex: 50,
  startIndex: 1,
  currentPage: 1,
  totalPages: 1,
  perPage: 50,
});
let loading = ref(false);
const makePagination = (page) => {
  pagination.value.startIndex = searchResults.value.data.startIndex;
  pagination.value.endIndex = searchResults.value.data.endIndex;
  pagination.value.currentPage = page ?? 1;
  pagination.value.totalPages = Math.ceil(
    searchResults.value.data.totalItems / pagination.value.perPage,
  );
};
const search = async (page = null) => {
  searchResults.value = {};
  loading.value = true;
  searchResults.value = await axios.get(
    page
      ? `https://chroniclingamerica.loc.gov/search/titles/results/?terms=${searchInput.value}&format=json&page=${page}`
      : `https://chroniclingamerica.loc.gov/search/titles/results/?terms=${searchInput.value}&format=json`,
  );
  makePagination(page);
  loading.value = false;
};

const getDetails = (lccn) => {
  router.push(`/details/${lccn}`);
};
</script>

<template>
  <div class="flex flex-col">
    <form class="min-w-[400px] mx-auto my-3" @submit.prevent="search()">
      <label
        for="default-search"
        class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >Search</label
      >
      <div class="relative">
        <div
          class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"
        >
          <svg
            class="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          v-model="searchInput"
          type="search"
          id="default-search"
          class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search..."
          required
        />
        <button
          type="submit"
          class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Search
        </button>
      </div>
    </form>
    <Spinner v-if="loading" />
    <Pagination
      v-if="pagination.totalPages > 1"
      :current-page="pagination.currentPage"
      :total-pages="pagination.totalPages"
      :is-loading="loading"
      @page="search($event)"
    />
    <div
      v-if="searchResults?.data?.items?.length"
      class="relative overflow-x-auto"
    >
      <table
        class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
      >
        <thead
          class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
        >
          <tr>
            <th scope="col" class="px-6 py-3">Title</th>
            <th scope="col" class="px-6 py-3">Place of Publication</th>
            <th scope="col" class="px-6 py-3">Start Year</th>
            <th scope="col" class="px-6 py-3">End Year</th>
            <th scope="col" class="px-6 py-3">Publisher</th>
            <th scope="col" class="px-6 py-3">Frequency</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in searchResults?.data?.items"
            :key="item.id"
            class="cursor-pointer hover:bg-gray-300 bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            @click="getDetails(item.lccn)"
          >
            <th
              scope="row"
              class="px-6 py-4 font-medium text-gray-900 dark:text-white"
            >
              {{ item.title }}
            </th>
            <td class="px-6 py-4">
              {{ item.place_of_publication }}
            </td>
            <td class="px-6 py-4">
              {{ item.start_year }}
            </td>
            <td class="px-6 py-4">
              {{ item.end_year }}
            </td>
            <td class="px-6 py-4">
              {{ item.publisher }}
            </td>
            <td class="px-6 py-4">
              {{ item.frequency }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div
      v-else-if="searchResults?.data?.items?.length === 0"
      class="text-white text-center"
    >
      No results found
    </div>
  </div>
</template>
