<template>
  <main>
    <!-- News Header -->
    <section
      class="relative w-full min-h-[400px] flex flex-col items-center bg-gray-700 bg-no-repeat bg-cover"
      :style="{ backgroundImage: `url('${headerImage}')` }"
    >
      <div
        class="absolute w-full h-full z-10"
        style="background: linear-gradient(270.04deg, rgba(0, 23, 28, 0) 0.04%, rgba(0, 11, 14, 0.5) 50.31%, rgba(0, 35, 25, 0.9) 91.95%);"
      />
      <div class="relative z-20 w-full min-h-[72px] bg-black bg-opacity-[12%] backdrop-filter backdrop-blur-sm flex items-center">
        <div class="max-w-screen-xl w-full mx-auto flex">
          <BaseButton
            class="text-sm text-white"
            title="Perbaharui Berita"
            @click="refreshPage"
          >
            <template #icon-left>
              <ReloadIcon
                width="20"
                height="20"
                class="fill-white"
              />
            </template>
            Perbaharui
          </BaseButton>
          <p class="flex items-center text-white ml-8">
            <JdsIcon
              name="eye"
              size="16px"
              class="mr-3"
            />
            Anda sedang dalam mode pratinjau berita
          </p>
        </div>
      </div>
      <div class="relative z-20 max-w-screen-xl w-full mx-auto mt-[42px] pb-16">
        <h1 class="font-lora font-medium text-[34px] leading-[48px] text-white mb-6 max-w-3xl">
          {{ title }}
        </h1>
        <div class="flex gap-3 items-center mb-6">
          <p class="font-lato font-normal text-sm text-blue-gray-100 flex items-center">
            <CalendarIcon class="inline mr-[10px]" />
            {{ date }}
          </p>
          <p class="font-normal text-sm text-blue-gray-100">
            |
          </p>
          <p class="font-lato font-normal text-sm text-blue-gray-100 flex items-center capitalize">
            <PenIcon class="inline mr-[10px]" />
            Penulis : {{ author }}
          </p>
        </div>
        <div class="w-full flex justify-between">
          <section class="flex gap-10">
            <div class="flex gap-2 items-start">
              <div class="h-8 w-8 rounded-full border border-white flex items-center justify-center">
                <JdsIcon
                  name="eye"
                  size="14px"
                  fill="white"
                />
              </div>
              <div>
                <p class="font-lato text-white text-base leading-7">
                  {{ getViewsText(views) }} kali
                </p>
                <p class="font-lato text-white text-xs">
                  Berita ini dilihat
                </p>
              </div>
            </div>
            <div class="flex gap-2 items-start">
              <div class="h-8 w-8 rounded-full border border-white flex items-center justify-center">
                <JdsIcon
                  name="share"
                  size="14px"
                  fill="white"
                />
              </div>
              <div>
                <p class="font-lato text-white text-base leading-7">
                  {{ getViewsText(shared) }} kali
                </p>
                <p class="font-lato text-white text-xs">
                  Berita ini dibagikan
                </p>
              </div>
            </div>
          </section>
          <BaseButton
            class="bg-green-700 hover:bg-green-600 text-sm text-white border-0 font-lato"
          >
            Bagikan Berita
            <template #icon-right>
              <JdsIcon
                name="share"
                size="16px"
              />
            </template>
          </BaseButton>
        </div>
      </div>
    </section>
    <!-- News Body -->
    <section class="mt-12 mb-12">
      <div class="max-w-screen-xl w-full mx-auto grid grid-cols-[60%_auto] gap-20">
        <div>
          <!-- News Content -->
          <article
            class="article__body min-h-screen"
            v-html="content"
          />
          <!-- News Tags -->
          <div
            v-show="hasTags"
            class="flex gap-4 items-center"
          >
            <span class="inline-flex items-center font-lato font-bold text-green-800 text-sm leading-6">
              Tags
              <TagIcon
                width="20"
                height="20"
                class="fill-green-700 ml-[10px]"
              />
            </span>
            <div
              v-for="tag in tags"
              :key="tag.id"
              class="rounded-full px-[10px] py-2 text-sm text-gray-700 bg-gray-200 lowercase cursor-pointer
              hover:text-green-700 hover:bg-green-50"
            >
              {{ tag.tag_name }}
            </div>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <JdsIcon
            name="share"
            size="16px"
            fill="#16A75C"
          />
          <div>
            <p class="font-lato font-normal text-xs text-blue-gray-200 leading-5 mb-3">
              Bagikan Berita Via
            </p>
            <div class="flex gap-6">
              <div class="w-14 h-14 flex flex-col items-center justify-between font-lato font-normal text-xs text-gray-600 leading-6">
                <FacebookLogo class="mt-1" />
                Facebook
              </div>
              <div class="w-14 h-14 flex flex-col items-center justify-between font-lato font-normal text-xs text-gray-600 leading-6">
                <TwitterLogo class="mt-1" />
                Twitter
              </div>
              <div class="w-14 h-14 flex flex-col items-center justify-between font-lato font-normal text-xs text-gray-600 leading-6">
                <WhatsappLogo class="mt-1" />
                Whatsapp
              </div>
              <div class="w-14 h-14 flex flex-col items-center justify-between font-lato font-normal text-xs text-gray-600 leading-6">
                <EmailLogo class="mt-1" />
                Email
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- News Footer -->
    <footer class="bg-green-700">
      <section class="max-w-screen-xl w-full mx-auto">
        <div class="flex flex-col gap-9 pt-14 pb-12 bg-no-repeat text-white">
          <img
            src="@/assets/icons/portal-jabar-logo.svg"
            alt="Logo Portal Jabar"
            width="151"
            height="46"
          >
          <div class="grid grid-cols-5">
            <div class="flex flex-col items-start col-span-2">
              <div class="flex flex-col">
                <div class="flex items-start gap-3 pb-4 border-b border-white border-opacity-20">
                  <em class="py-1">
                    <LocationIcon
                      width="18"
                      height="18"
                      class="fill-white"
                    />
                  </em>
                  <div class="flex flex-col gap-1">
                    <p class="font-roboto font-bold leading-7">
                      Gedung Sate Bandung
                    </p>
                    <div class="flex flex-col text-sm leading-6">
                      <p>Jl. Diponegoro No. 22, Citarum, Bandung Wetan,</p>
                      <p>Kota Bandung, Jawa Barat 40115</p>
                    </div>
                  </div>
                </div>
                <div class="flex items-start gap-3 py-4 border-b border-white border-opacity-20">
                  <em class="py-1">
                    <PhoneIcon
                      width="18"
                      height="18"
                      class="fill-white"
                    />
                  </em>
                  <div class="flex flex-col gap-1">
                    <p class="font-roboto font-bold leading-7">
                      Telepon
                    </p>
                    <p class="flex flex-col text-sm leading-6">
                      +62 22 423248
                    </p>
                  </div>
                </div>
                <div class="flex items-start gap-3 pt-4">
                  <em class="py-1">
                    <MailIcon
                      width="18"
                      height="18"
                      class="fill-white"
                    />
                  </em>
                  <div class="flex flex-col gap-1">
                    <p class="font-roboto font-bold leading-7">
                      Email
                    </p>
                    <a
                      href="#"
                      class="text-sm leading-6"
                    >
                      info@jabarprov.go.id
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-span-3 grid grid-cols-5">
              <div class="col-span-3 flex flex-col gap-6 px-8">
                <p class="font-bold">
                  Layanan Publik
                </p>
                <ul class="flex flex-col gap-4 text-sm leading-6">
                  <li
                    v-for="menu in menus"
                    :key="menu.id"
                  >
                    <a href="#">
                      {{ menu.title }}
                    </a>
                  </li>
                </ul>
              </div>
              <div class="col-span-2 flex flex-col items-start px-8">
                <div class="flex gap-3 border-b border-white border-opacity-20">
                  <em class="py-1 self-start">
                    <FeedbackIcon
                      width="20"
                      height="20"
                      class="fill-white"
                    />
                  </em>
                  <div class="flex flex-col gap-6 pb-4">
                    <p class="font-bold">
                      Umpan Balik
                    </p>
                    <button
                      type="button"
                      class="text-sm text-left leading-6"
                    >
                      Isi survei performa situs web
                    </button>
                  </div>
                </div>
                <div class="flex gap-3 pt-4">
                  <em class="py-1 self-start">
                    <SocialMediaIcon
                      width="20"
                      height="20"
                      class="fill-white"
                    />
                  </em>
                  <div class="flex flex-col gap-6">
                    <p class="font-bold">
                      Social Media
                    </p>
                    <div class="flex gap-3">
                      <a
                        v-for="socialMediaSite in socialMediaSites"
                        :key="socialMediaSite.id"
                        href="#"
                        :aria-label="socialMediaSite.name"
                        rel="noreferrer"
                        class="p-2 flex justify-center items-center rounded border border-white border-opacity-20"
                      >
                        <JdsIcon
                          :name="socialMediaSite.icon"
                          size="16px"
                        />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div class="border-t border-white border-opacity-20">
        <section class="max-w-screen-xl w-full mx-auto">
          <div class="flex justify-between py-6 text-sm leading-6">
            <p class="text-white">
              Copyright © {{ year }} Pemerintah Daerah Provinsi Jawa Barat. All Right Reserved
            </p>
          </div>
        </section>
      </div>
    </footer>
  </main>
</template>

<script>
import BaseButton from '@/common/components/BaseButton';
import FacebookLogo from '@/assets/icons/social-media/facebook-logo.svg?inline';
import WhatsappLogo from '@/assets/icons/social-media/whatsapp-logo.svg?inline';
import TwitterLogo from '@/assets/icons/social-media/twitter-logo.svg?inline';
import EmailLogo from '@/assets/icons/social-media/email-logo.svg?inline';
import ReloadIcon from '@/assets/icons/reload.svg?inline';
import CalendarIcon from '@/assets/icons/calendar.svg?inline';
import PenIcon from '@/assets/icons/pen.svg?inline';
import LocationIcon from '@/assets/icons/location.svg?inline';
import PhoneIcon from '@/assets/icons/phone.svg?inline';
import MailIcon from '@/assets/icons/mail.svg?inline';
import FeedbackIcon from '@/assets/icons/feedback.svg?inline';
import SocialMediaIcon from '@/assets/icons/social-media.svg?inline';
import TagIcon from '@/assets/icons/tag.svg?inline';
import { RepositoryFactory } from '@/repositories/RepositoryFactory';
import { formatDate } from '@/common/helpers/date';

const newsRepository = RepositoryFactory.get('news');

export default {
  name: 'NewsPreview',
  components: {
    BaseButton,
    FacebookLogo,
    WhatsappLogo,
    TwitterLogo,
    EmailLogo,
    ReloadIcon,
    CalendarIcon,
    PenIcon,
    LocationIcon,
    PhoneIcon,
    MailIcon,
    FeedbackIcon,
    SocialMediaIcon,
    TagIcon,
  },
  data() {
    return {
      newsData: null,
      menus: [
        {
          id: 1,
          title: 'Kependudukan',
        },
        {
          id: 2,
          title: 'Perpajakan',
        },
        {
          id: 3,
          title: 'Perizinan',
        },
        {
          id: 4,
          title: 'Pariwisata dan Ekonomi Kreatif',
        },
        {
          id: 5,
          title: 'Program Unggulan',
        },
        {
          id: 6,
          title: 'Pengaduan Publik',
        },
      ],
      socialMediaSites: [
        {
          id: 1,
          name: 'Facebook',
          icon: 'facebook',
        },
        {
          id: 2,
          name: 'Instagram',
          icon: 'instagram',
        },
        {
          id: 3,
          name: 'Twitter',
          icon: 'twitter',
        },
        {
          id: 4,
          name: 'YouTube',
          icon: 'youtube',
        },
      ],
    };
  },
  computed: {
    headerImage() {
      return this.newsData?.image || null;
    },
    title() {
      return this.newsData?.title || 'Lorem ipsum';
    },
    date() {
      return formatDate(this.newsData?.updated_at || new Date(), 'EEEE, dd LLLL yyyy');
    },
    author() {
      return this.newsData?.author?.name || '-';
    },
    views() {
      return this.newsData?.views || 0;
    },
    shared() {
      return this.newsData?.shared || 0;
    },
    content() {
      return this.newsData?.content || null;
    },
    tags() {
      return this.newsData?.tags || [];
    },
    year() {
      return new Date().getFullYear();
    },
    hasTags() {
      return this.tags.length !== 0;
    },
  },
  async created() {
    const { id } = this.$route.params;
    const response = await newsRepository.getNewsById(id);
    const { data } = response.data;
    this.newsData = data;
  },
  methods: {
    refreshPage() {
      this.$router.go(this.$router.currentRoute);
    },
    getViewsText(number) {
      return new Intl.NumberFormat('id-ID', {
        notation: 'compact',
        compactDisplay: 'short',
      }).format(number);
    },
  },
};
</script>

<style>
body {
  overflow: auto !important;
}

.article__body h1, .article__body h2, .article__body h3, .article__body h4, .article__body h5, .article__body h6, .article__body p {
  font-family: 'Lora';
  color: #424242 ;
}

.article__body p {
  font-size: 1.125rem;
  line-height: 1.75rem;
  margin-bottom: 1.75rem;
}

.article__body img {
  width: 100%;
  height: auto;
}

.article__body blockquote {
  border-left-width: 8px ;
  border-color: #E0E0E0;
  padding: 0 1.5rem;
  font-family: 'Lora';
  font-size: 1rem;
  line-height: 1.5rem;
  color: #616161;
  font-style: italic;
}
</style>
