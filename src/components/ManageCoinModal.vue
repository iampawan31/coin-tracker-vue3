<template>
  <TransitionRoot as="template" :show="showModal">
    <Dialog as="div" class="relative z-10" @close="toggleModal">
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div
          class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        />
      </TransitionChild>

      <div class="fixed z-10 inset-0 overflow-y-auto">
        <div
          class="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0"
        >
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <DialogPanel
              class="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 w-full sm:max-w-lg sm:w-full"
            >
              <div class="bg-white">
                <div
                  class="text-center text-2xl font-semibold mb-4 bg-stone-600 text-stone-100 p-2"
                >
                  Manage Coins
                </div>
                <div class="my-6 px-4">
                  <input
                    type="text"
                    class="p-2 bg-stone-50 w-full rounded shadow"
                    name="query"
                    autocomplete="off"
                    id="query"
                    v-model="queryString"
                  />
                </div>
                <div class="h-fit pb-4">
                  <div class="h-96 overflow-y-scroll text-stone-700 px-4">
                    <AddCoinCard
                      v-for="coin in coinList"
                      :key="coin.id"
                      :coin="coin"
                    />
                  </div>
                </div>
              </div>
              <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  class="mt-3 justify-end rounded-md border border-red-600 shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-stone-100 hover:bg-red-500 focus:outline-none focus:ring-2"
                  @click="toggleModal"
                  ref="cancelButtonRef"
                >
                  Close
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useAddCoinStore } from '../stores/addCoin'
import {
  Dialog,
  DialogPanel,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue'
import { storeToRefs } from 'pinia'
import AddCoinCard from './AddCoinCard.vue'

const { coinList, showModal, queryString } = storeToRefs(useAddCoinStore())
const { toggleModal, fetchCoinsUsingQueryString } = useAddCoinStore()

const awaitingSearch = ref(false)

watch(queryString, async (query) => {
  if (!awaitingSearch.value) {
    setTimeout(async () => {
      await fetchCoinsUsingQueryString()
      awaitingSearch.value = false
    }, 300) // 1 sec delay
  }
  awaitingSearch.value = true
})
</script>
