JP.VC.DB
========

### MobileFlow Next Firebase Ant Design Template

An 'open source' clone the very popular [ycdb](https://ycdb.co) and extends it for other organizations or, in
this case, whole countries. SEO optimized, performant, opinionated React/Next/AntDesign/Firebase template 
app with fast loading landing page with lazy-loading of Firebase data using a simple provider class.

With code and inspiration from Sam Lolla [Firefly](http://getfirefly.org/) and [react-firestore](https://github.com/green-arrow/react-firestore/blob/master/src/FirestoreCollection.js), with design support from [ManyPixkes](https://manypixels.co/).


Based on `create-next-app` and initially built using `with-firebase-hosting`

```bash
npx create-next-app --example with-firebase-hosting with-firebase-hosting-app
```


<details>
<summary><b>Download manually</b></summary>

Download the example:

```bash
curl https://codeload.github.com/zeit/next.js/tar.gz/canary | tar -xz --strip=2 next.js-canary/examples/with-firebase-hosting
cd with-firebase-hosting
```

</details>

<details>
<summary><b>Set up firebase</b></summary>

* install Firebase Tools: `npm i -g firebase-tools`
* create a project through the [firebase web console](https://console.firebase.google.com/)
* grab the projects ID from the web consoles URL: `https://console.firebase.google.com/project/<projectId>`
* update the `.firebaserc` default project ID to the newly created project
* login to the Firebase CLI tool with `firebase login`

</details>

<details>
<summary><b>Install Project</b></summary>

```bash
npm install
```

#### Run Next.js development:

```bash
npm run dev
```

#### Run Firebase locally for testing:

```
npm run serve
```

#### Deploy it to the cloud with Firebase:

```bash
npm run deploy
```

#### Clean dist folder

```bash
npm run clean
```

</details>

<details>
<summary><b>Bitbucket repo</b></summary>

Clone from Bitbucket repo

```
git remote add bitbucket git@bitbucket.org:mobileflowllc/jpvcdb.git
git push -u bitbucket master
```
</details>


## Serverless hosting with Firebase

Using Firebase hosting with NextJS generated SSR design files. This should allow for easier setup (add new pages via `/pages` subdirectory) and better SEO (using `next-seo` to configure, but also SSR generates 'static' home/blog/faq pages as needed).



### Customization

Ant Design themeing for both landing page and application controls. Use the [Ant Design](https://ant.design/components])summary page and [style sheet guide](https://github.com/ant-design/ant-design/blob/master/components/style/themes/default.less) to customize the look & feel.

The directory structure in the `src/app` folder is as follows:

```bash
|____pages
| |____about.js
| |____index.js
| |____login.js
| |____dashboard.js
|____credentials
| |____client.js
|____landing
| |____Home.js
| |____Header.js
| |____Banner.js
| |____Page1.js
| |____static
| | |____style.js
| | |____default.less
| | |____home.less
| | |____footer.less
| | |____header.less
| | |____responsive.less
|____components
| |____App.js
| |____Header.js
| |____Home.js
| |____Login.js
|____asserts
| |____styles.less
| |____antd-custom.less
|____static
| |____logo-word-white.png
|____lib
| |____redirect.js
| |____auth.js
| |____firebaseManager.js
|____next.config.js
|____next-seo.config.js
|____scripts
```


The Firebase configuration is contained in `credentials/client.js` and is used the by the `firebaseManager.js` singleton to manage authorization, etc.

The home / landing page is `index.js` by default, and loads an Ant Design stylized landing page from `landing/Home.js` with custom `less` styling from within the `landing/static` directory.

The application page is `dashboard` and contains custom application components from the `components` directory. Current functionality is limited to allowing admins to create and edit company data. Extensive use of Firebase admin scripts is made to migrate and shape data. See the `scripts` directory.

Both the application and landing page use the `@zeit/next-less` loading methods as specified within `next.config.js` file, which loads the default Ant Design style sheets and applies overrides using the files contained within `asserts/antd-custom.less`.

