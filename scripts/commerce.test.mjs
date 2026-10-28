import test from 'node:test';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {readFile} from 'node:fs/promises';
import {products} from '../src/lib/content.ts';
import {normalizeCart,removePurchased,parsePriceMap,calculateTotals,validateCheckout} from '../src/lib/commerce.ts';
import {paymentTransition,verifiedPaymentStatus} from '../src/lib/payment-status.ts';
import {verifyNotificationSignature} from '../src/lib/payment-signature.ts';
const slugs=['instax-sq40','instax-wide-400'];
const valid={locale:'id',expectedTotal:2501000,items:[{slug:slugs[0],quantity:1}],customer:{name:'Checkout Test',email:'test@example.com',phone:'+628123456789',address:'Test delivery address',city:'Jakarta',province:'DKI Jakarta',postalCode:'12345',country:'Indonesia'},consent:true};
test('all eight catalog products have real local PNG images and the original logo exists',async()=>{
  assert.equal(products.length,8);
  assert.ok(products.some(product=>product.slug==='gigabyte-graphic-card' && product.category==='graphic-card'));
  assert.ok(products.some(product=>product.slug==='quicksnap' && product.category==='quicksnap'));
  for (const product of products) {const bytes=await readFile(new URL(`../public${product.image}`,import.meta.url));assert.equal(bytes.subarray(1,4).toString(),'PNG',product.slug);assert.ok(bytes.readUInt32BE(16)>=750,product.slug);}
  const logo=await readFile(new URL('../public/brand/logo.png',import.meta.url));assert.equal(logo.subarray(1,4).toString(),'PNG');
});
test('corrupt browser data cannot introduce unknown items or invalid quantities',()=>{
  assert.deepEqual(normalizeCart([{slug:slugs[0],quantity:90},{slug:slugs[0],quantity:50},{slug:'fake',quantity:2},{slug:slugs[1],quantity:-1},{slug:slugs[1],quantity:1.5}],slugs),[{slug:slugs[0],quantity:99}]);
  assert.deepEqual(normalizeCart({},slugs),[]);
});
test('only purchased quantities are removed, once for each paid order',()=>{
  const original={items:[{slug:slugs[0],quantity:3},{slug:slugs[1],quantity:2}],completedOrders:[]};
  const paid=removePurchased(original,'IPT-test',[{slug:slugs[0],quantity:1}]);
  assert.equal(paid.items[0].quantity,2);assert.equal(paid.items[1].quantity,2);
  assert.deepEqual(removePurchased(paid,'IPT-test',[{slug:slugs[0],quantity:1}]),paid);
});
test('missing, zero, fractional, or fabricated prices never become payable',()=>{
  assert.deepEqual(parsePriceMap('{"instax-sq40":0,"instax-wide-400":1.5}',slugs),Object.fromEntries(slugs.map(x=>[x,null])));
  assert.equal(calculateTotals(valid.items,{[slugs[0]]:null},0).total,null);
  assert.equal(calculateTotals(valid.items,{[slugs[0]]:2500000},null).total,null);
  assert.equal(calculateTotals(valid.items,{[slugs[0]]:2500000},1000).total,2501000);
});
test('checkout requires valid recipient, consent, known unique items and bounded quantities',()=>{
  assert.equal(validateCheckout(valid,slugs).customer.name,'Checkout Test');
  for (const changed of [{consent:false},{expectedTotal:0},{items:[{slug:'fake',quantity:1}]},{items:[{slug:slugs[0],quantity:100}]},{items:[valid.items[0],valid.items[0]]},{customer:{...valid.customer,email:'invalid'}}]) assert.throws(()=>validateCheckout({...valid,...changed},slugs));
});
test('payment only succeeds for verified capture/settlement with an accepted fraud status',()=>{
  assert.equal(verifiedPaymentStatus({status_code:'200',transaction_status:'settlement',fraud_status:'accept'}),'paid');
  assert.equal(verifiedPaymentStatus({status_code:'200',transaction_status:'capture',fraud_status:'challenge'}),'pending');
  assert.equal(verifiedPaymentStatus({status_code:'201',transaction_status:'pending'}),'pending');
  assert.equal(verifiedPaymentStatus({status_code:'200',transaction_status:'capture',fraud_status:'deny'}),'failed');
});
test('late pending notifications cannot downgrade paid or refunded orders',()=>{
  assert.equal(paymentTransition('paid','pending'),'paid');assert.equal(paymentTransition('paid','refunded'),'refunded');assert.equal(paymentTransition('refunded','paid'),'refunded');assert.equal(paymentTransition('expired','pending'),'expired');
});
test('notification signatures reject wrong keys, modified amounts, and invalid lengths',()=>{
  const key='sandbox-test-only';const body={order_id:'IPT-test',status_code:'200',gross_amount:'2501000.00'};
  body.signature_key=createHash('sha512').update(`${body.order_id}${body.status_code}${body.gross_amount}${key}`).digest('hex');
  assert.equal(verifyNotificationSignature(body,key),true);assert.equal(verifyNotificationSignature({...body,gross_amount:'1.00'},key),false);assert.equal(verifyNotificationSignature(body,'wrong-key'),false);assert.equal(verifyNotificationSignature({...body,signature_key:'bad'},key),false);
});
