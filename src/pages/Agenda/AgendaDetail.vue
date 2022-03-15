<template>
  <main class="pb-20">
    <HeaderMenu>
      <div class="flex gap-3">
        <!-- Delete Button -->
        <BaseButton
          class="border-red-500 hover:bg-red-50 font-lato text-sm text-red-500"
          @click="toggleDeletePrompt"
        >
          Hapus
        </BaseButton>
        <!-- Edit Button -->
        <!-- TODO: Add edit action on button click -->
        <LinkButton
          :href="`/agenda/detail/${$route.params.id}/ubah`"
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
          class="border-green-700 hover:bg-green-50 font-lato text-sm text-green-700"
          @click="togglePreviewModal"
        >
          <template #icon-left>
            <JdsIcon
              name="eye"
              size="16px"
              class="h-4 text-green-700"
            />
          </template>
          <p>
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
                    {{ event.category || '-' }}
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
                  <div v-else>
                    {{ unitName }}
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
            class="border-green-700 hover:bg-green-50 text-sm text-green-700"
            @click="toggleDeletePrompt"
          >
            Batal
          </BaseButton>
          <BaseButton
            class="bg-red-500 hover:bg-red-400 text-sm text-white"
            :disabled="deleteLoading"
            @click="deleteEvent(event.id)"
          >
            <p v-if="!deleteLoading">
              Ya, saya yakin
            </p>
            <p
              v-else
              class="flex gap-2 items-center text-gray-500"
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
import { formatDate } from '@/common/helpers/date';
import BaseButton from '@/common/components/BaseButton';
import BaseModal from '@/common/components/BaseModal';
import LinkButton from '@/common/components/LinkButton';
import HeaderMenu from '@/common/components/HeaderMenu';
import AgendaPreview from '@/components/Agenda/AgendaPreview.vue';

import { RepositoryFactory } from '@/repositories/RepositoryFactory';

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
    unitName() {
      return this.event.created_by?.unit_name || '-';
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
      this.$toast({
        type: 'error',
        message: 'Gagal mendapatkan data Agenda, silakan coba beberapa saat lagi',
      });
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
        this.$toast({
          type: 'success',
          message: 'Data agenda telah berhasil dihapus',
        });
      } catch (error) {
        this.$toast({
          type: 'error',
          message: 'Data agenda gagal dihapus',
        });
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
