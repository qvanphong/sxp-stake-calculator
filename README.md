


# Delegate Pool (Based on Goose's TBW)
A pool website for delegate to show their information. Inspired by ARK Explorer style.

## Requirement

Forked Goose's TBW version that provide REST API from: https://github.com/qvanphong/core2_tbw (use **solar** branch if you are using for Solar Network)

## Customize configuration
#### Change API URL
Set up your API URL in `config.json` file at root and change the value of `api_url`.
The API URL must point my API that forked Goose's TBW.

 #### Customize block items
Edit `BlockContainer.vue` at `src/components`, add/remove/custom blocks from there by edit `BlockItem` attribute.
By using other icons, edit `main.js` at `src` and add your icon that you want into this
`import { faMoon, faSun, faChartPie, faRankingStar, faList, faBars, faUserGroup, faMoneyBill, faHammer, YOUR_NEW_ICON_NAME } from  "@fortawesome/free-solid-svg-icons";`

then add it to library:
`library.add(faMoon, faSun, faChartPie, faRankingStar, faList, faBars, faUserGroup, faMoneyBill, faHammer, YOUR_NEW_ICON_NAME )`

These icon is from Font Awesome Free Solid SVGs, so you can find the icon that you want from https://fontawesome.com/icons/


## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.vscode-typescript-vue-plugin).



## Project Setup





```sh



npm install



```





### Compile and Hot-Reload for Development





```sh



npm run dev



```





### Compile and Minify for Production





```sh



npm run build



```





### Lint with [ESLint](https://eslint.org/)





```sh



npm run lint



```