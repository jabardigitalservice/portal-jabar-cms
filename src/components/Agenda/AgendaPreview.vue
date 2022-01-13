<template>
  <BaseModal
    ref="agenda-preview"
    :open="open"
    @close="$emit('close')"
  >
    <div class="w-full h-full">
      <h1
        ref="agenda-preview-title"
        class="font-roboto text-xl leading-8 font-medium text-green-700 mb-4"
      >
        {{ event.title || '-' }}
      </h1>
      <section
        ref="agenda-preview-body"
        class="w-full grid grid-cols-2"
      >
        <div
          ref="agenda-preview-category"
          class="flex gap-2 mb-6"
        >
          <div class="h-4 w-4">
            <img
              src="@/assets/icons/category-green.svg"
              alt="kategori kegiatan"
              width="16"
              height="16"
              class="min-h-full object-cover object-center"
            >
          </div>
          <div class="flex flex-col gap-1">
            <h2 class="text-xs text-blue-gray-200">
              Kategori Event
            </h2>
            <div
              class="w-fit py-1 px-4 bg-green-50 rounded-lg text-sm text-green-700 line-clamp-1"
              :title="event.category"
            >
              {{ event.category || '-' }}
            </div>
          </div>
        </div>

        <div
          ref="agenda-preview-event-type"
          class="mb-6"
        >
          <div class="flex flex-col gap-1">
            <h2 class="text-xs text-blue-gray-200">
              Tipe Event
            </h2>
            <div
              class="w-fit py-1 px-4 rounded-lg text-sm line-clamp-1 capitalize"
              :class="{
                'text-green-700 bg-green-50': event.type === 'online',
                'text-pink-700 bg-pink-50': event.type === 'offline',
              }"
              :title="event.type"
            >
              {{ event.type || '-' }}
            </div>
          </div>
        </div>

        <div
          ref="agenda-preview-category"
          class="flex gap-2 mb-6"
        >
          <div class="h-4 w-4">
            <img
              src="@/assets/icons/calendar-green.svg"
              alt="tanggal kegiatan"
              width="16"
              height="16"
              class="min-h-full object-cover object-center"
            >
          </div>
          <div class="flex flex-col gap-1">
            <h2 class="text-xs text-blue-gray-200">
              Tanggal
            </h2>
            <p
              class="text-sm text-gray-800 line-clamp-1 capitalize"
              :title="event.category"
            >
              {{ event.date || '-' }}
            </p>
          </div>
        </div>

        <div
          ref="agenda-preview-time"
          class="mb-6"
        >
          <div class="flex flex-col gap-1">
            <h2 class="text-xs text-blue-gray-200">
              Waktu
            </h2>
            <p
              class="text-sm text-gray-800 line-clamp-1"
              :title="event.category"
            >
              {{ `${event.time} WIB` || '-' }}
            </p>
          </div>
        </div>

        <div
          v-if="event.type === 'online'"
          ref="agenda-preview-link"
          class="flex gap-2 col-span-2 mb-6"
        >
          <div class="h-4 w-4">
            <img
              src="@/assets/icons/link-green.svg"
              alt="link kegiatan"
              width="16"
              height="16"
              class="min-h-full object-cover object-center"
            >
          </div>
          <div class="flex flex-col gap-1">
            <h2 class="text-xs text-blue-gray-200">
              Link Kegiatan
            </h2>
            <a
              :href="event.url"
              target="_blank"
              rel="noopener noreferrer"
              class="text-blue-500 hover:text-blue-400 underline"
            >
              {{ event.url || '-' }}
            </a>
          </div>
        </div>

        <div
          v-else
          ref="agenda-preview-address"
          class="flex gap-2 col-span-2 mb-6"
        >
          <div class="h-4 w-4">
            <img
              src="@/assets/icons/marker-green.svg"
              alt="tempat pelaksanaan"
              width="16"
              height="16"
              class="min-h-full object-cover object-center"
            >
          </div>
          <div class="flex flex-col gap-1">
            <h2 class="text-xs text-blue-gray-200">
              Tempat Pelaksanaan
            </h2>
            <p
              class="text-sm text-gray-800 line-clamp-1 capitalize"
              :title="event.category"
            >
              {{ event.address || '-' }}
            </p>
          </div>
        </div>

        <div
          ref="agenda-preview-tags"
          class="flex gap-2 col-span-2"
        >
          <div class="h-4 w-4">
            <img
              src="@/assets/icons/tag-green.svg"
              alt="tags kegiatan"
              width="16"
              height="16"
              class="min-h-full object-cover object-center"
            >
          </div>
          <div class="flex flex-col gap-1">
            <h2 class="text-xs text-blue-gray-200">
              Tags
            </h2>
            <!-- TODO: Add tags pills -->
          </div>
        </div>
      </section>
    </div>
  </BaseModal>
</template>

<script>
import BaseModal from '@/components/ui/BaseModal.vue';

export default {
  name: 'AgendaPreview',
  components: { BaseModal },
  props: {
    open: {
      type: Boolean,
      required: true,
      default: false,
    },
    event: {
      type: Object,
      required: false,
      default: () => ({}),
    },
  },
};
</script>
