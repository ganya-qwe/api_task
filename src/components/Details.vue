<script setup>
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import Spinner from "@/components/Spinner.vue";
import { getDetails } from "@/service/api.js";

const route = useRoute();
const router = useRouter();
let loading = ref(false);
let details = ref({});
onMounted(async () => {
  loading.value = true;
  details.value = await getDetails(route.params.lccn);
  loading.value = false;
});

const backToList = () => {
  router.back();
};
</script>

<template>
  <div class="flex flex-col">
    <Spinner v-if="loading" />
    <div v-else>
      <div
        class="mt-3 w-full p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
      >
        <h2
          class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
        >
          {{ details.name }}
        </h2>
        <ul
          class="max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400"
        >
          <li>place of publication: {{ details.place_of_publication }}</li>
          <li>start year: {{ details.start_year }}</li>
          <li>end year: {{ details.end_year }}</li>
          <li>publisher: {{ details.publisher }}</li>
          <li>frequency: {{ details.frequency }}</li>
          <li>language: {{ details.language }}</li>
          <li v-if="details.subject?.length">
            subjects:
            <ol class="ps-5 mt-2 space-y-1 list-decimal list-inside">
              <li v-for="(item, idx) in details.subject" :key="idx">
                {{ item }}
              </li>
            </ol>
          </li>
        </ul>
        <button
          type="button"
          class="mt-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          @click="backToList"
        >
          Back to list
        </button>
      </div>
    </div>
  </div>
</template>
