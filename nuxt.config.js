import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

dotenv.config();

import robotsOptions from './config/robots';

/*
 ** NOTE:
 ** The NODE_ENV will always be equal to 'production' when we generate
 ** the website. Thus, we don't have a dev/production env variable
 ** for the preproduction environnement.
 ** The NETLIFY_ENV variable allow us to set a dev/production variable
 ** totaly decorrelated from the NODE_ENV variable.
 ** SEE: https://www.netlify.com/docs/continuous-deployment/#environment-variables
 */
const netlifyEnv = process.env.NODE_ENV;
const isDevEnv = netlifyEnv === 'development';
const websiteUrl = process.env.DEPLOY_PRIME_URL || `http://${process.env.HOST}:${process.env.PORT}`;

const features = ['Array.prototype.indexOf', 'Promise'].join('%2C');

export default {
    mode: 'universal',
    /*
     ** Environnement variables shared for the client and server-side
     */
    env: {
        cmsToken: process.env.CMS_TOKEN,
        isDevEnv,
        websiteUrl
    },
    proxy: {
        '/.netlify': {
            target: 'http://localhost:9000',
            pathRewrite: {
                '^/.netlify/functions': ''
            }
        }
    },
    /*
     ** Headers of the page
     */
    head: {
        title: 'Les Indiens, branding et digital à Nantes',
        htmlAttrs: {
            lang: 'en'
        },
        script: [
            {
                nomodule: 'true',
                src: `https://polyfill.io/v3/polyfill.min.js?features=${features}`
            }
        ],
        meta: [
            {
                charset: 'utf-8'
            },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1'
            },
            {
                'http-equiv': 'X-UA-Compatible',
                content: 'IE=edge'
            },
            {
                hid: 'author',
                name: 'author',
                content: 'Les Indiens'
            },
            {
                hid: 'og:title',
                property: 'og:title',
                content: 'Les Indiens'
            },
            {
                hid: 'og:site_name',
                property: 'og:site_name',
                content: 'Les Indiens'
            },
            {
                hid: 'og:url',
                property: 'og:url',
                content: 'https://www.lesindiens.fr/'
            },
            {
                hid: 'og:image',
                property: 'og:image',
                content: '/share/og.png'
            },
            {
                hid: 'og:image:width',
                property: 'og:image:width',
                content: '1200'
            },
            {
                hid: 'og:image:height',
                property: 'og:image:height',
                content: '628'
            },
            {
                hid: 'og:image:type',
                property: 'og:image:type',
                content: 'image/png'
            },
            {
                hid: 'og:image:alt',
                property: 'og:image:alt',
                content: 'On vous aime !'
            },
            {
                hid: 'twitter:card',
                name: 'twitter:card',
                content: 'summary_large_image'
            },
            {
                hid: 'twitter:site',
                name: 'twitter:site',
                content: '@LesIndiens'
            },
            {
                hid: 'twitter:creator',
                name: 'twitter:creator',
                content: '@LesIndiens'
            },
            {
                hid: 'twitter:image',
                name: 'twitter:image',
                content: '/share/twitter.png'
            },
            {
                name: 'msapplication-TileColor',
                content: '#181A22'
            }
        ],
        link: [
            {
                rel: 'icon',
                type: 'image/png',
                sizes: '32x32',
                href: '/favicon-32x32.png'
            },
            {
                rel: 'manifest',
                href: '/site.webmanifest'
            },
            {
                rel: 'icon',
                type: 'image/png',
                sizes: '16x16',
                href: '/favicon-16x16.png'
            },
            {
                rel: 'mask-icon',
                href: '/safari-pinned-tab.svg',
                color: '#fff'
            }
        ]
    },
    /*
     ** Customize the progress-bar
     */
    loading: '~/components/Layout/Loader.vue',
    /*
     ** Global CSS
     */
    css: ['~/assets/scss/main.scss'],
    /*
     ** Plugins to load before mounting the App
     */
    plugins: ['~/plugins/globals.js', '~/plugins/breakpoints.js', '~/plugins/fastdom.js'],

    generate: {
        fallback: '404.html'
    },
    /*
     ** Nuxt.js modules
     */
    modules: [
        '@nuxtjs/dotenv',
        // Doc: https://axios.nuxtjs.org/usage
        '@nuxtjs/axios',
        '@nuxtjs/style-resources',
        '@nuxtjs/sitemap',
        '@nuxtjs/proxy',
        [
            '@nuxtjs/robots',
            robotsOptions({
                env: netlifyEnv,
                url: websiteUrl
            })
        ]
    ],
    /*
     ** Axios module configuration
     ** SEE: https://axios.nuxtjs.org/options
     */
    axios: {
        baseURL: process.env.DEPLOY_PRIME_URL || 'http://localhost:3000'
    },
    /*
     ** Nuxt Style Resources module configuration
     */
    styleResources: {
        scss: [
            '~/assets/scss/abstracts/_variables.scss',
            '~/assets/scss/abstracts/_animations.scss',
            '~/assets/scss/abstracts/_functions.scss',
            '~/assets/scss/abstracts/_mixins.scss',
            '~/assets/scss/abstracts/_placeholders.scss'
        ]
    },
    /*
     ** Sitemap config
     */
    sitemap: {
        hostname: websiteUrl,
        gzip: true,
        routes: () => {
            let routes = [];
            const routesPath = path.resolve(__dirname, 'dist/routes.json');
            const exists = fs.existsSync(routesPath);
            if (!exists) return routes;
            routes = require(routesPath);
            return routes;
        }
    },
    /*
     ** Build configuration
     */
    build: {
        html: {
            minify: {
                minifyJS: false
            }
        },
        /*
         ** Used to analyse chunks
         */
        analyze: isDevEnv
            ? {
                  analyzerMode: 'static'
              }
            : false,
        /*
         ** You can extend webpack config here
         */
        transpile: [/@stereorepo/],
        extend(config, ctx) {
            config.resolve.alias['vue'] = 'vue/dist/vue.common';
            delete config.resolve.alias['@@'];
            delete config.resolve.alias['@'];

            // Run ESLint on save
            if (ctx.isDev && ctx.isClient) {
                config.devtool = '#source-map';
                config.module.rules.push({
                    enforce: 'pre',
                    test: /\.(js|vue)$/,
                    loader: 'eslint-loader',
                    include: [path.resolve(__dirname, 'assets', 'js')],
                    exclude: /(node_modules)/,
                    options: {
                        sourceMap: true
                    }
                });
            }
        }
    }
};
