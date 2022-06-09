import{u as z,q as J,A as U,c as v,a as O,o as r,b as m,d as e,G as V,w as _,v as E,t as d,n as F,F as P,D as G,x as W,y as Y,E as M}from"./vendor.586f66d3.js";import{_ as H,A as o,P as i,b as K,t as l,l as f,c as Q}from"./index.caf4c52d.js";const X={setup(){const s=z(),a=J({eventId:s.params.eventId});return U(async()=>{try{s.params.eventId&&(await l.getActiveEvent(s.params.eventId),await l.getCommentsByEvent(s.params.eventId),await l.getTicketsByEvent(s.params.eventId))}catch(n){f.error(n),i.toast(n.message,"error")}}),{comment:a,activeEvent:v(()=>o.activeEvent),activeComments:v(()=>o.activeComments),activeTickets:v(()=>o.activeTickets),myTicketsForEvent:v(()=>o.activeTickets.find(n=>n.eventId==o.activeEvent.id)),account:v(()=>o.account),async createTicket(){try{if(o.activeEvent.capacity==0||o.activeEvent.isCanceled){i.toast("This event is now unavailable");return}if(o.activeTickets.find(n=>n.accountId===this.account.id)){i.toast("You already have a ticket","info");return}await K.createTicket(s.params.eventId),o.activeEvent.capacity--,await l.getTicketsByEvent(s.params.eventId),i.toast("Ticket generation success","success")}catch(n){f.error(n),i.toast(n.message,"error")}},async submitComment(){try{await Q.createComment(a.value),await l.getActiveEvent(s.params.eventId)}catch(n){f.error(n),i.toast(n.message,"error")}},async cancelEvent(){try{await i.confirm()&&(await l.cancelEvent(s.params.eventId),i.toast("event canceled"))}catch(n){f.error(n),i.toast(n.message,"error")}}}}},Z={class:"container-fluid"},$={class:"row bg-light text-dark"},ee=["src"],te={class:"fs-1"},ne={class:"col-md-8 p-4"},ae={class:"d-flex justify-content-between"},se={class:"fs-6 fw-bold"},ce={class:"d-flex justify-content-between"},oe={class:"d-flex justify-content-between my-4"},ie={key:0},re={class:"text-dark"},de=F(" spots left"),le={key:1},ve=e("b",{class:"text-dark"},"NO SPOTS LEFT",-1),me=[ve],_e=["title"],fe=e("i",{class:"mdi mdi-account"},null,-1),Ee={class:"row"},ye={class:"col-md-12"},he=e("small",null,"See who is attending",-1),ue={class:"row"},be={class:"col-md-12 px-5 bg-secondary"},ge=e("small",null,"What are people saying",-1),pe=e("div",{class:"d-flex justify-content-end"},[e("small",null,"Join the conversation")],-1),ke=e("div",{class:"d-flex justify-content-end"},[e("button",{class:"btn btn-success mt-4",type:"submit",title:"submit comment"}," post comment ")],-1);function we(s,a,n,t,Ce,xe){var y,h,u,b,g,p,k,w,C,x,T,I,A,S,B,j,N,D,L;const R=O("Attendees"),q=O("Comment");return r(),m("div",Z,[e("div",$,[e("div",{class:V(["col-md-4 p-4",((y=t.activeEvent)==null?void 0:y.capacity)<=0||((h=t.activeEvent)==null?void 0:h.isCanceled)?"bg-danger":"bg-light"])},[e("img",{src:(u=t.activeEvent)==null?void 0:u.coverImg,alt:"cover image",class:"img-fluid"},null,8,ee),_(e("button",{onClick:a[0]||(a[0]=c=>t.cancelEvent()),type:"button",title:"cancel event",class:"btn btn-danger mt-3"}," Cancel event? ",512),[[E,((b=t.account)==null?void 0:b.id)==((g=t.activeEvent)==null?void 0:g.creatorId)&&((p=t.activeEvent)==null?void 0:p.isCanceled)==!1]]),_(e("span",te,"EVENT NO LONGER AVAILABLE",512),[[E,((k=t.activeEvent)==null?void 0:k.capacity)<=0||((w=t.activeEvent)==null?void 0:w.isCanceled)]])],2),e("div",ne,[e("div",ae,[e("h4",null,d((C=t.activeEvent)==null?void 0:C.name),1),e("p",se," On "+d((x=t.activeEvent)==null?void 0:x.startDate.substring(5,10)),1)]),e("div",ce,[e("h6",null,d((T=t.activeEvent)==null?void 0:T.location),1)]),e("p",null,d((I=t.activeEvent)==null?void 0:I.description),1),e("div",oe,[((A=t.activeEvent)==null?void 0:A.capacity)>0?(r(),m("span",ie,[e("b",re,d((S=t.activeEvent)==null?void 0:S.capacity),1),de])):(r(),m("span",le,me)),_(e("span",null,[e("button",{onClick:a[1]||(a[1]=c=>t.createTicket()),title:"attend "+((B=t.activeEvent)==null?void 0:B.type),class:V([((j=t.activeEvent)==null?void 0:j.capacity)<=0||((N=t.activeEvent)==null?void 0:N.isCanceled)?"btn btn-danger":"","btn btn-warning"])},[F(" Attend "+d((D=t.activeEvent)==null?void 0:D.type)+" ",1),fe],10,_e)],512),[[E,!((L=t.activeEvent)==null?void 0:L.isCanceled)]])])])]),e("div",Ee,[e("div",ye,[he,(r(!0),m(P,null,G(t.activeTickets,c=>(r(),M(R,{key:c.id,attendee:c},null,8,["attendee"]))),128))])]),e("div",ue,[e("div",be,[ge,e("form",{class:"d-flex flex-column border border-dark p-3 rounded",onSubmit:a[3]||(a[3]=W(c=>t.submitComment(),["prevent"]))},[pe,_(e("textarea",{class:"bg-grey",name:"comment-field",id:"comment-field",title:"leave a comment",placeholder:"Tell the people...","onUpdate:modelValue":a[2]||(a[2]=c=>t.comment.body=c)},null,512),[[Y,t.comment.body]]),ke],32),(r(!0),m(P,null,G(t.activeComments,c=>(r(),M(q,{key:c.id,comment:c},null,8,["comment"]))),128))])])])}var Ae=H(X,[["render",we]]);export{Ae as default};
