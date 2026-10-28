import {buildConfig, type CollectionConfig, type Access} from 'payload';
import {postgresAdapter} from '@payloadcms/db-postgres';
import {lexicalEditor} from '@payloadcms/richtext-lexical';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const dirname = path.dirname(fileURLToPath(import.meta.url));
const authenticated: Access = ({req}) => Boolean(req.user);
const admin: Access = ({req}) => req.user?.role === 'admin';
const published: Access = ({req}) => req.user ? true : {status: {equals: 'published'}};
const seo: CollectionConfig['fields'] = [{name: 'seo', type: 'group', fields: [{name: 'title', type: 'text', localized: true}, {name: 'description', type: 'textarea', localized: true}, {name: 'image', type: 'upload', relationTo: 'media'}]}];
const editorial = (slug: string): CollectionConfig => ({
  slug, admin: {useAsTitle: 'title'}, access: {read: published, create: authenticated, update: authenticated, delete: admin},
  fields: [{name: 'title', type: 'text', required: true, localized: true}, {name: 'slug', type: 'text', required: true, unique: true}, {name: 'status', type: 'select', defaultValue: 'draft', options: ['draft','published'], required: true}, {name: 'summary', type: 'textarea', localized: true}, {name: 'image', type: 'upload', relationTo: 'media'}, {name: 'body', type: 'richText', localized: true}, ...seo],
});
export default buildConfig({
  secret: process.env.PAYLOAD_SECRET || 'local-preview-only-do-not-use-in-production-ipt',
  admin: {user: 'users', importMap: {baseDir: dirname}},
  localization: {locales: ['id','en'], defaultLocale: 'id', fallback: true},
  editor: lexicalEditor(),
  db: postgresAdapter({pool: {connectionString: process.env.DATABASE_URI || 'postgresql://postgres:postgres@localhost:5432/ipt'}}),
  typescript: {outputFile: path.resolve(dirname, 'payload-types.ts')},
  collections: [
    {slug: 'users', auth: true, admin: {useAsTitle: 'email'}, access: {read: admin, create: admin, update: admin, delete: admin}, hooks: {beforeChange: [async ({data, operation, req}) => {if (operation === 'create' && !req.user) {const {totalDocs} = await req.payload.count({collection: 'users', overrideAccess: true}); if (totalDocs === 0) data.role = 'admin';} return data;}]}, fields: [{name: 'name', type: 'text'}, {name: 'role', type: 'select', required: true, defaultValue: 'editor', options: ['admin','editor'], access: {create: ({req}) => !req.user || req.user.role === 'admin', update: ({req}) => req.user?.role === 'admin'}}]},
    {slug: 'media', upload: {staticDir: path.resolve(dirname, '../media'), mimeTypes: ['image/*','application/pdf']}, access: {read: () => true, create: authenticated, update: authenticated, delete: admin}, fields: [{name: 'alt', type: 'text', required: true, localized: true}]},
    {slug: 'categories', admin: {useAsTitle: 'title'}, access: {read: () => true, create: authenticated, update: authenticated, delete: admin}, fields: [{name: 'title', type: 'text', required: true, localized: true}, {name: 'slug', type: 'text', unique: true, required: true}]},
    {...editorial('products'), fields: [...editorial('products').fields, {name: 'category', type: 'relationship', relationTo: 'categories'}, {name: 'origin', type: 'text', localized: true}, {name: 'packaging', type: 'text', localized: true}, {name: 'minimumOrder', type: 'text'}, {name: 'certifications', type: 'textarea', localized: true}]},
    editorial('pages'), editorial('articles'), editorial('careers'),
    {slug:'orders', admin:{useAsTitle:'orderNumber',defaultColumns:['orderNumber','paymentStatus','total','createdAt']}, access:{read:admin,create:()=>false,update:()=>false,delete:admin}, fields:[
      {name:'orderNumber',type:'text',required:true,unique:true,index:true},
      {name:'requestKey',type:'text',required:true,unique:true,index:true,admin:{hidden:true}},
      {name:'fingerprint',type:'text',required:true,admin:{hidden:true}},
      {name:'locale',type:'select',options:['id','en'],required:true},
      {name:'customer',type:'group',fields:['name','email','phone','address','city','province','postalCode','country','notes'].map(name=>({name,type:'text' as const}))},
      {name:'items',type:'array',required:true,fields:[{name:'slug',type:'text',required:true},{name:'name',type:'text',required:true},{name:'quantity',type:'number',min:1,max:99,required:true},{name:'unitPrice',type:'number',min:1,required:true}]},
      ...['subtotal','shipping','total'].map(name=>({name,type:'number' as const,min:0,required:true})),
      {name:'currency',type:'select',options:['IDR'],defaultValue:'IDR',required:true},
      {name:'paymentStatus',type:'select',options:['creating','pending','paid','failed','expired','cancelled','refunded'],defaultValue:'creating',required:true},
      {name:'paymentUrl',type:'text',admin:{hidden:true}},{name:'paymentType',type:'text'},{name:'consent',type:'checkbox',required:true},
    ]},
    {slug: 'inquiries', admin: {useAsTitle: 'name', defaultColumns: ['name','company','email','product','createdAt']}, access: {read: authenticated, create: () => false, update: authenticated, delete: admin}, fields: [
      ...['name','company','email','phone','country','product','volume','destination','incoterm','locale'].map(name => ({name, type: 'text' as const})), {name: 'message', type: 'textarea'}, {name: 'consent', type: 'checkbox', required: true}, {name: 'status', type: 'select', defaultValue: 'new', options: ['new','in-progress','closed']},
    ]},
  ],
  globals: [{slug: 'site-settings', access: {read: () => true, update: admin}, fields: [{name: 'companyName', type: 'text'}, {name: 'email', type: 'email'}, {name: 'phone', type: 'text'}, {name: 'address', type: 'textarea', localized: true}, {name: 'whatsapp', type: 'text'}, {name: 'linkedin', type: 'text'}, {name: 'instagram', type: 'text'}]}],
});
