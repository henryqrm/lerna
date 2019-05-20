import { cd, exec, echo, touch } from 'shelljs'
import { readFileSync } from 'fs'
import url from 'url'

const libraryName = process.argv[2]
if (!libraryName) {
  throw new Error('Required library name')
}
const pkg = JSON.parse(readFileSync(`packages/${libraryName}/package.json`) as any)

const repoUrl =
  typeof pkg.repository === 'object' && !pkg.repository.hasOwnProperty('url')
    ? (() => {
        throw new Error('URL does not exist in repository section')
      })()
    : pkg.repository.url

const parsedUrl = url.parse(repoUrl)
const repository = (parsedUrl.host || '') + (parsedUrl.path || '')
const ghToken = process.env.GH_TOKEN

echo('Deploying docs!!!')
cd(`packages/${libraryName}/docs`)
touch(`packages/${libraryName}/.nojekyll`)
exec('git init')
exec('git add .')
exec('git config user.name "HenryQRM"')
exec('git config user.email "henryqrm@gmail.com"')
exec('git commit -m "docs(docs): update gh-pages"')
exec(`git push --force --quiet "https://${ghToken}@${repository}" master:gh-pages`)
echo('Docs deployed!!')
