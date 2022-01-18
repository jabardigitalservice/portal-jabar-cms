<template>
  <main class="pb-20">
    <HeaderMenu>
      <div class="flex gap-3">
        <!-- Delete Button -->
        <BaseButton
          variant="secondary"
          class="!border-red-500 hover:!bg-red-50"
          @click="toggleDeletePrompt"
        >
          <p class="font-lato font-bold text-sm text-red-500">
            Hapus
          </p>
        </BaseButton>
        <!-- Edit Button -->
        <!-- TODO: Add edit action on button click -->
        <LinkButton
          href="#"
          variant="secondary"
          class="hover:bg-green-50"
        >
          <template #icon-left>
            <JdsIcon
              name="pencil-outline"
              size="16px"
              class="h-4 text-green-700"
            />
          </template>
          <p class="font-lato font-bold text-sm text-green-700">
            Ubah Agenda
          </p>
        </LinkButton>
        <!-- Preview Button -->
        <BaseButton
          variant="secondary"
          @click="togglePreviewModal"
        >
          <template #icon-left>
            <JdsIcon
              name="eye"
              size="16px"
              class="h-4 text-green-700"
            />
          </template>
          <p class="font-lato font-bold text-sm text-green-700">
            Pratinjau
          </p>
        </BaseButton>
      </div>
    </HeaderMenu>
    <section class="px-6 py-4 rounded-lg bg-white mb-4">
      <h1 class="font-roboto font-medium text-[21px] leading-[34px] text-green-700 mb-3">
        Detail Agenda Jawa Barat
      </h1>

      <div class="flex flex-col gap-4">
        <div class="rounded-lg overflow-hidden border border-gray-200">
          <JdsSimpleTable class="!table-auto">
            <thead>
              <tr>
                <th
                  colspan="2"
                  class="!font-roboto !text-sm"
                >
                  Tentang Agenda/Event
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="min-w-[228px] font-lato text-blue-gray-500 font-bold text-sm">
                  Judul Agenda/Event
                </td>
                <td class="w-full font-lato text-blue-gray-500 text-sm">
                  <div
                    v-if="loading"
                    class="h-4 w-1/4 rounded-lg animate-pulse bg-gray-200"
                  />
                  <div v-else>
                    {{ event.title || '-' }}
                  </div>
                </td>
              </tr>
            </tbody>
          </JdsSimpleTable>
        </div>

        <div class="rounded-lg overflow-hidden border border-gray-200">
          <JdsSimpleTable class="!table-auto">
            <thead>
              <tr>
                <th
                  colspan="2"
                  class="!font-roboto !text-sm"
                >
                  Tanggal dan Waktu Pelaksanaan
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="min-w-[228px] font-lato text-blue-gray-500 font-bold text-sm">
                  Tanggal
                </td>
                <td class="w-full font-lato text-blue-gray-500 text-sm">
                  <div
                    v-if="loading"
                    class="h-4 w-1/4 rounded-lg animate-pulse bg-gray-200"
                  />
                  <div v-else>
                    {{ date }}
                  </div>
                </td>
              </tr>
              <tr>
                <td class="font-lato text-blue-gray-500 font-bold text-sm">
                  Waktu
                </td>
                <td class="font-lato text-blue-gray-500 text-sm">
                  <div
                    v-if="loading"
                    class="h-4 w-1/5 rounded-lg animate-pulse bg-gray-200"
                  />
                  <div v-else>
                    {{ time }}
                  </div>
                </td>
              </tr>
            </tbody>
          </JdsSimpleTable>
        </div>

        <div class="rounded-lg overflow-hidden border border-gray-200">
          <JdsSimpleTable class="!table-auto">
            <thead>
              <tr>
                <th
                  colspan="2"
                  class="!font-roboto !text-sm"
                >
                  Kategori Agenda/Event
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="min-w-[228px] font-lato text-blue-gray-500 font-bold text-sm">
                  Tipe Kategori
                </td>
                <td class="w-full font-lato text-blue-gray-500 text-sm">
                  <div
                    v-if="loading"
                    class="h-4 w-1/5 rounded-lg animate-pulse bg-gray-200"
                  />
                  <div v-else>
                    {{ event.published_by || '-' }}
                  </div>
                </td>
              </tr>
              <tr>
                <td class="font-lato text-blue-gray-500 font-bold text-sm">
                  Kategori
                </td>
                <td class="font-lato text-blue-gray-500 text-sm">
                  <div
                    v-if="loading"
                    class="h-4 w-1/4 rounded-lg animate-pulse bg-gray-200"
                  />
                  <div
                    v-else
                    class="capitalize"
                  >
                    {{ event.category || '-' }}
                  </div>
                </td>
              </tr>
            </tbody>
          </JdsSimpleTable>
        </div>

        <div class="rounded-lg overflow-hidden border border-gray-200">
          <JdsSimpleTable class="!table-auto">
            <thead>
              <tr>
                <th
                  colspan="2"
                  class="!font-roboto !text-sm"
                >
                  Tempat Pelaksanaan
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="min-w-[228px] font-lato text-blue-gray-500 font-bold text-sm">
                  Tipe Event
                </td>
                <td class="w-full font-lato text-blue-gray-500 text-sm">
                  <div
                    v-if="loading"
                    class="h-4 w-1/5 rounded-lg animate-pulse bg-gray-200"
                  />
                  <div
                    v-else
                    class="capitalize"
                  >
                    {{ event.type }}
                  </div>
                </td>
              </tr>
              <tr v-if="event.type === 'online'">
                <td class="font-lato text-blue-gray-500 font-bold text-sm">
                  Link Meeting
                </td>
                <td class="font-lato text-blue-gray-500 text-sm">
                  <div
                    v-if="loading"
                    class="h-4 w-1/3 rounded-lg animate-pulse bg-gray-200"
                  />
                  <div v-else>
                    <a
                      :href="event.url"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="text-blue-500 hover:text-blue-400"
                    >
                      {{ event.url }}
                    </a>
                  </div>
                </td>
              </tr>
              <tr v-else>
                <td class="font-lato text-blue-gray-500 font-bold text-sm">
                  Alamat
                </td>
                <td class="font-lato text-blue-gray-500 text-sm">
                  <div
                    v-if="loading"
                    class="h-4 w-1/3 rounded-lg animate-pulse bg-gray-200"
                  />
                  <div v-else>
                    <div class="capitalize">
                      {{ event.address || '-' }}
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </JdsSimpleTable>
        </div>

        <div class="rounded-lg overflow-hidden border border-gray-200">
          <JdsSimpleTable class="!table-auto">
            <thead>
              <tr>
                <th
                  colspan="2"
                  class="!font-roboto !text-sm"
                >
                  Status Agenda/Event
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="min-w-[228px] font-lato text-blue-gray-500 font-bold text-sm">
                  Status Agenda
                </td>
                <td class="w-full font-lato text-blue-gray-500 text-sm">
                  <div
                    v-if="loading"
                    class="h-4 w-1/5 rounded-lg animate-pulse bg-gray-200"
                  />
                  <div v-else>
                    {{ status }}
                  </div>
                </td>
              </tr>
            </tbody>
          </JdsSimpleTable>
        </div>
      </div>
    </section>
    <!-- Agenda Preview Modal -->
    <AgendaPreview
      :open="isPreviewModalOpen"
      :event="event"
      @close="togglePreviewModal"
    />

    <!-- Delete Action Prompt -->
    <BaseModal
      :open="isDeletePromptOpen"
      @close="toggleDeletePrompt"
    >
      <div class="w-full h-full">
        <h1 class="font-roboto text-xl leading-8 font-medium text-green-700 mb-6">
          Hapus Agenda
        </h1>
        <p class="font-lato text-sm text-gray-800 mb-2">
          Apakah Anda yakin akan menghapus agenda ini?
        </p>
        <h2 class="font-lato text-md font-bold text-gray-800">
          {{ event.title }}
        </h2>
      </div>
      <template #footer>
        <div class="flex gap-4 justify-end">
          <BaseButton
            variant="secondary"
            @click="toggleDeletePrompt"
          >
            <p class="text-sm text-green-700">
              Batal
            </p>
          </BaseButton>
          <BaseButton
            variant="primary"
            class="bg-red-500 hover:bg-red-400"
            :disabled="deleteLoading"
            @click="deleteEvent(event.id)"
          >
            <p
              v-if="!deleteLoading"
              class="text-sm text-white"
            >
              Ya, saya yakin
            </p>
            <p
              v-else
              class="flex gap-2 items-center text-sm text-gray-500"
            >
              <JdsSpinner
                size="16"
                foreground="#757575"
              />
              Loading...
            </p>
          </BaseButton>
        </div>
      </template>
    </BaseModal>
  </main>
</template>

<script>
import BaseButton from '@/components/ui/BaseButton.vue';
import BaseModal from '@/components/ui/BaseModal.vue';
import LinkButton from '@/components/ui/LinkButton.vue';
import HeaderMenu from '@/components/ui/HeaderMenu.vue';
import AgendaPreview from '@/components/Agenda/AgendaPreview.vue';

import { RepositoryFactory } from '@/repositories/RepositoryFactory';
import { formatDate } from '@/lib/date-fns';
import { AGENDA_STATUS_MAP } from '@/static/data';

const agendaRepository = RepositoryFactory.get('agenda');

export default {
  name: 'AgendaDetail',
  components: {
    HeaderMenu,
    BaseButton,
    LinkButton,
    AgendaPreview,
    BaseModal,
  },
  data() {
    return {
      event: {},
      loading: false,
      deleteLoading: false,
      isPreviewModalOpen: false,
      isDeletePromptOpen: false,
    };
  },
  computed: {
    date() {
      return this.event.date ? formatDate(this.event.date) : '-';
    },
    time() {
      const startTime = this.event.start_hour;
      const endTime = this.event.end_hour;

      if (startTime && endTime) {
        return `${startTime.substring(0, 5)} sampai ${endTime.substring(0, 5)}`;
      }

      return '-';
    },
    status() {
      return AGENDA_STATUS_MAP[this.event.status] ?? this.event.status;
    },
  },
  async mounted() {
    try {
      this.loading = true;
      const { id } = this.$route.params;
      const response = await agendaRepository.getEventById(id);
      const { data } = response.data;

      this.event = data;
    } catch (error) {
      // silent error
    } finally {
      this.loading = false;
    }
  },
  methods: {
    /**
     * Delete event by id
     * @param {number} id - id of event to delete
     */
    async deleteEvent(id) {
      try {
        this.deleteLoading = true;
        await agendaRepository.deleteEvent(id);
      } catch (error) {
        // silent error
      } finally {
        this.deleteLoading = false;
        this.toggleDeletePrompt();
        this.$router.back();
      }
    },

    togglePreviewModal() {
      this.isPreviewModalOpen = !this.isPreviewModalOpen;
    },

    toggleDeletePrompt() {
      this.isDeletePromptOpen = !this.isDeletePromptOpen;
    },
  },
};
</script>
