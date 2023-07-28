# R_WASM

## Project layout

```
[...]
Content
    tutorials
        class1
            _dir.yml    # Metadata shared in the class
            1.file.md   # The application sorts 1. and after 2. etc
            2.file.md
            3.file.md
        class2
            _dir.yml    # Metadata shared in the class
            1.file.md
            2.file.md
            3.file.md
[...]
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

### Quizz 
#### Simple

```
::Quiz
---
question: "Il est conseillé d'utiliser l'opérateur '=' plutôt que '<-' pour l'assignation ?"
type: simple
choices:
    -   value: "oui"
        valid: false
    -   value: "non"
        valid: true
---
::
```

#### Multiple

```
::Quiz
---
question: "Dans la question précédente, pourquoi faut-il mettre *file* entre guillemets et écrire apropos('file') et non pas apropos(file)"
type: multiple
choices:
    -   value: "Parce que *file* sans guillemet sous-entendrait qu'il existe en mémoire un objet nommé *file*."
        valid: true
    -   value: "Parce que le premier argument de la fonction *apropos()* doit obligatoirement être un chaîne de caractère."
        valid: true
---
::
```

### Order propositions

```
::Sort
---
elements:
    - Description
    - Usage
    - Arguments
    - Value
    - See Also
    - Examples
question: "Quel est l'ordre des différentes section dans la fiche d'aide ?"
---
::
```

### Exercice

```
::Exo
---
consigne: "Recherchez toutes les fonctions dont le nom contient 'file' (*i.e* fichier). Attention 'file' doit être entre guillemets."
tips: En informatique on parle de guillemets simples ou simples guillemets pour faire référence  à l'apostrophe (' '). On parle de guillemets doubles ou doubles guillemets pour faire référence au guillemets (" "). Cette appellation nous vient du monde anglo-saxon (*single quote* et *double quote*). Dans le langage R, les deux formes ont la même signification et permettent de désigner une suite de caractères qu'on appelle *chaîne de caractères* (ici 'file' ou "file"). Cela permet une certaine flexibilité si une chaîne de caractères contient un guillemet simple par exemple (*e.g.* x <- "extrémités 5' et 3' des molécules d'ADN").
solution: apropos("file")
---
::
```

### Executable code

```
:Execute{
    command="x = 15
print(x)"
}
```

## Citation

If you use our guide, please cite us :

IFB-ElixirFr, R WASM platform for teaching, https://github.com/IFB-ElixirFr/sandboxbio-IFB-docs

A DOI with Zenodo is comming.

## Contributors

* [Thomas Denecker](https://github.com/thomasdenecker) <a itemprop="sameAs" content="https://orcid.org/0000-0003-1421-7641" href="https://orcid.org/0000-0003-1421-7641" target="orcid.widget" rel="noopener noreferrer" style="vertical-align:top;"><img src="https://orcid.org/sites/default/files/images/orcid_16x16.png" style="width:1em;margin-right:.5em;" alt="ORCID iD icon"></a>
* [Lucie Khamvongsa](https://github.com/lkhamvongsa) <a itemprop="sameAs" content="https://orcid.org/0000-0002-1194-0546" href="https://orcid.org/0000-0002-1194-0546" target="orcid.widget" rel="noopener noreferrer" style="vertical-align:top;"><img src="https://orcid.org/sites/default/files/images/orcid_16x16.png" style="width:1em;margin-right:.5em;" alt="ORCID iD icon"></a>

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
