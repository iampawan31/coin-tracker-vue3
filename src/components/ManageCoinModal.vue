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
              class="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full"
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
                <div class="grid grid-cols-2 h-96 gap-2 text-stone-700 px-4">
                  <label
                    v-for="coin in formattedCoinList"
                    :for="coin.Name"
                    :key="coin.Id"
                  >
                    <input type="checkbox" :name="coin.Name" :id="coin.Id" />
                    <span class="ml-2">
                      {{ coin.Name }}({{ coin.Symbol.toUpperCase() }})
                    </span>
                  </label>
                </div>
              </div>
              <div
                class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse"
              >
                <button
                  type="button"
                  class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  @click=""
                >
                  Update
                </button>
                <button
                  type="button"
                  class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  @click="toggleModal"
                  ref="cancelButtonRef"
                >
                  Cancel
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
import { ref } from 'vue'
import { useAddCoinStore } from '../stores/addCoin'
import {
  Dialog,
  DialogPanel,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faExclamation } from '@fortawesome/free-solid-svg-icons'
import { storeToRefs } from 'pinia'
import coinList from '../utils/coinList.json'
import { computed } from '@vue/reactivity'

const queryString = ref('')

const formattedCoinList = computed(() => {
  const query = queryString.value.toLowerCase()
  if (query.length === 0) {
    return []
  }
  return coinList
    .filter((coin) => coin?.Name.toLowerCase().includes(query))
    .slice(0, 15)
})

const { showModal } = storeToRefs(useAddCoinStore())
const { toggleModal } = useAddCoinStore()
</script>
