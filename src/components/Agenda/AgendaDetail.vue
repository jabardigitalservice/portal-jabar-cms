<template>
  <main class="pb-20">
    <HeaderMenu>
      <!-- TODO: Add action on button click -->
      <BaseButton
        variant="secondary"
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
              <tr>
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
                      v-if="event.type === 'online'"
                      :href="event.url"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="text-blue-500 hover:text-blue-400"
                    >{{ event.url }}</a>

                    <span v-else> - </span>
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
      <!-- TODO: Add page content -->
    </section>
  </main>
</template>

<script>
import BaseButton from '@/components/ui/BaseButton.vue';
import HeaderMenu from '@/components/ui/HeaderMenu.vue';

import { RepositoryFactory } from '@/repositories/RepositoryFactory';
import { formatDate } from '@/lib/date-fns';

const agendaRepository = RepositoryFactory.get('agenda');

export default {
  name: 'AgendaDetail',
  components: { HeaderMenu, BaseButton },
  data() {
    return {
      event: {},
      loading: false,
    };
  },
  computed: {
    date() {
      return this.event.title ? formatDate(this.event.date) : '-';
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
      const statusMap = {
        publish: 'Dipublish',
        unpublish: 'Belum Dipublish',
        archive: 'Dibuang',
      };

      return statusMap[this.event.status] ?? this.event.status;
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
};
</script>
