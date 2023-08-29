# Wasm4Learn

## Project layout

```bash
...
/components
    /content
        ...             # Component usable in content file (md)
    ...                 # content only usable by vue
/composables
    ...                 # function shared in all project
/layouts
    default.vue         # layout of the application
    home.vue            # layout of home page
/pages
    index.vue           # home page
    /language/[lang]/
        index.vue       # home page of language
        [...slug].vue   # How display content
    /learning-path/
        /all/index.vue  # All learning-path available
        [...slug].vue   # How display content
    /tool/[tool]/
        index.vue       # home page of language
        [...slug].vue   # How display content
    about.vue           # About page
    ... 
/plugins                # plugings used by application
    vuetify.js
    markdownit.ts
/publics                # assets available in all web site
    ...
    man/                # Man pages 
/store
    ...                 # Store declaration
nuxt.config.ts          # configuration file
```

!!! warning
    In public folder, webR files must be duplicated like content r folder

### Highlight on `nuxt.config.ts`

#### Nuxt content and GitHub

Configuring Nuxt content to fetch content from GitHub

```ts
content: {
    sources: {
      github: {
        prefix: '', // Prefix for routes used to query contents
        driver: 'github', // Driver used to fetch contents (view unstorage documentation)
        repo: "IFB-ElixirFr/Wasm4Learn-content",
        branch: "main",
        dir: "content", // Directory where contents are located. It could be a subdirectory of the repository.
        // Imagine you have a blog inside your content folder. You can set this option to `content/blog` with the prefix option to `/blog` to avoid conflicts with local files.
      },
    },
    ...
}
```

#### Github pages

For the GitHub pages to work, the name of the repo must be specified in the config file.

```ts
app: {
    baseURL: '/Wasm4Learn/',
    ...
}
,
```

## For collaborators and developers

This part is for collaborators and developers.

### Nuxt 3 Minimal Starter

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

#### Setup

Make sure to install the dependencies:

```bash
yarn install
```

#### Development Server

Start the development server on `http://localhost:3000`:

```bash

yarn dev
```

#### Production

Build the application for production:

```bash
yarn deploy
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

## Components to enrich markdown files

Read the documention available [here](https://ifb-elixirfr.github.io/Wasm4Learn-doc/Components/components_01_intro/)

## Citation

If you use our guide, please cite us :

IFB-ElixirFr, Wasm4learn, [https://github.com/IFB-ElixirFr/sandboxbio-IFB-docs](https://github.com/IFB-ElixirFr/Wasm4Learn)

A DOI with Zenodo is comming.

## Contributors

* [Thomas Denecker](https://github.com/thomasdenecker) <a itemprop="sameAs" content="https://orcid.org/0000-0003-1421-7641" href="https://orcid.org/0000-0003-1421-7641" target="orcid.widget" rel="noopener noreferrer" style="vertical-align:top;"><img src="https://orcid.org/sites/default/files/images/orcid_16x16.png" style="width:1em;margin-right:.5em;" alt="ORCID iD icon"></a>
* [Lucie Khamvongsa](https://github.com/lkhamvongsa) <a itemprop="sameAs" content="https://orcid.org/0000-0002-1194-0546" href="https://orcid.org/0000-0002-1194-0546" target="orcid.widget" rel="noopener noreferrer" style="vertical-align:top;"><img src="https://orcid.org/sites/default/files/images/orcid_16x16.png" style="width:1em;margin-right:.5em;" alt="ORCID iD icon"></a>
* [Imane Messak](https://gitlab.com/imanemessak) <a itemprop="sameAs" content="https://orcid.org/0000-0002-1654-6652" href="https://orcid.org/0000-0002-1654-6652" target="orcid.widget" rel="noopener noreferrer" style="vertical-align:top;"><img src="https://orcid.org/sites/default/files/images/orcid_16x16.png" style="width:1em;margin-right:.5em;" alt="ORCID iD icon"></a>
* [Anliat Mohamed](https://gitlab.com/anliatm) <a itemprop="sameAs" content="https://orcid.org/0000-0002-1105-8262" href="https://orcid.org/0000-0002-1105-8262" target="orcid.widget" rel="noopener noreferrer" style="vertical-align:top;"><img src="https://orcid.org/sites/default/files/images/orcid_16x16.png" style="width:1em;margin-right:.5em;" alt="ORCID iD icon"></a>


## Contributing
Please, see the [CONTRIBUTING](CONTRIBUTING.md) file.

## Contributor Code of Conduct
Please note that this project is released with a [Contributor Code of Conduct](https://www.contributor-covenant.org/). By participating in this project you agree to abide by its terms. See [CODE_OF_CONDUCT](code_of_conduct.md) file.

## License

Our guide is licensed under a [Creative Commons Attribution-ShareAlike 4.0 International License](https://creativecommons.org/licenses/by-sa/4.0/legalcode).

[![CC BY-SA 4.0][cc-by-sa-image]][cc-by-sa]

[cc-by-sa]: http://creativecommons.org/licenses/by-sa/4.0/
[cc-by-sa-image]: https://licensebuttons.net/l/by-sa/4.0/88x31.png
[cc-by-sa-shield]: https://img.shields.io/badge/License-CC%20BY--SA%204.0-lightgrey.svg

## Acknowledgement

* All contributors

## Ressources

* [Nuxt.js](https://nuxt.com/)
* [Nuxt/content](https://content.nuxtjs.org/)
* [Vuetify 3](https://vuetifyjs.com/en/)
* [vueJS 3](https://vuejs.org/)
* [webR](https://docs.r-wasm.org/webr/latest/)
* [Denis Puthier classes]()
* [vue.draggable.next](https://github.com/SortableJS/vue.draggable.next)
