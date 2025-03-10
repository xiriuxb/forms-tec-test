# React + TypeScript + Vite

### Local instalation
1. Clone the repo
`git clone https://github.com/xiriuxb/forms-tec-test.git`
2. Go to the folder you cloned the repo
`cd ./forms-tec-test`
3. Install dependencies
`npm i`
4. Create `.env` file based on `.env.example`. You need the supabase **url** and **key**
5. If you want to execute the supabase migrations need **Supabase CLI**. To install and instructions, please see [This link](https://supabase.com/docs/guides/local-development/cli/getting-started?queryGroups=platform&platform=windows).
6. Then you just can run `npm run dev` to start local dev.

### The App
According to test document, the app needs to do:
- [x] Create forms with diferent kinds of questions:
  - [x] Multiple option
  - [x] Multiple selection
  - [x] Short (text) answer
- [] Edit forms
- [x] Delete forms
- [x] Visualize forms
- [X] Validations at creating form. Only at form name and field name.
- [X] Vercel deploy. Due to limitations of Vercel free plan the integration is made with *GitHub Actions*.

The app uses the following major dependencies:
- React
- React router dom
- React hook form

#### Known Issues
- There is a bug when tries to delete last field(question) from designer page.
- "Backend" conection errors not handled.
- **Delete** not working. Supabase auth error. RLS is disabled so idk.