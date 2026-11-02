/* Local PNG export: no uploads, external rendering service or remote fonts. */
(function(){
 const width=1080,pad=64,inner=width-pad*2;
 const family='"Pretendard","Noto Sans KR","Malgun Gothic","Apple SD Gothic Neo",sans-serif';
 function filename(kind,key,page){
  return `market-ledger-${kind==='weekly'?'weekly':'daily'}-${String(key).replace(/[^\w-]/g,'')}-${String(page+1).padStart(2,'0')}.png`;
 }
 async function render(card,{page=0,total=1}={}){
  if(document.fonts)await document.fonts.ready;
  const canvas=document.createElement('canvas'),ctx=canvas.getContext('2d');
  if(!ctx)throw new Error('이 브라우저에서 이미지 생성을 사용할 수 없습니다.');
  const commands=[];
  function rect(x,y,w,h,color){commands.push(()=>{ctx.fillStyle=color;ctx.fillRect(x,y,w,h);});}
  function line(x,y,w,color='#cfcdcc'){rect(x,y,w,1,color);}
  function text(value,x,y,max,size=30,weight=500,color='#28272a'){
   const font=`${weight} ${size}px ${family}`,step=Math.ceil(size*1.55),lines=[];
   ctx.font=font;
   // Keep words together; exceptionally long tokens wrap without clipping.
   for(const paragraph of String(value??'').split(/\r?\n/)){
    let current='';
    for(const token of paragraph.match(/\s+|\S+/gu)||[]){
     if(current&&ctx.measureText(current+token).width>max){lines.push(current.trimEnd());current='';}
     if(!current&&!token.trim())continue;
     if(ctx.measureText(token).width>max){
      for(const char of Array.from(token)){
       if(current&&ctx.measureText(current+char).width>max){lines.push(current);current='';}
       current+=char;
      }
     }else current+=token;
    }
    lines.push(current.trimEnd());
   }
   commands.push(()=>{ctx.font=font;ctx.fillStyle=color;ctx.textBaseline='top';lines.forEach((value,i)=>ctx.fillText(value,x,y+i*step));});
   return y+lines.length*step;
  }
  const number=`${String(page+1).padStart(2,'0')} / ${String(total).padStart(2,'0')}`;
  let y=pad;
  const topEnd=text(card.eyebrow,pad,y,inner-180,23,700);
  text(number,width-pad-155,y,155,25,700,'#95101c');
  y=topEnd+26;line(pad,y,inner,'#2d2c30');y+=38;
  y=text(card.title,pad,y,inner,card.kind==='cover'?58:52,800)+26;
  rect(pad,y,inner,2,'#2d2c30');y+=36;
  if(card.summary){
   const start=y;
   // Queue the panel before its text; measure once, paint after its height is known.
   let panelHeight=0;
   commands.push(()=>{ctx.fillStyle=card.kind==='closing'?'#f4bfc4':'#f4f4f3';ctx.fillRect(pad,start,inner,panelHeight);});
   y=text('핵심',pad+30,y+26,inner-60,24,800)+18;
   y=text(card.summary,pad+30,y,inner-60,35,650)+30;
   panelHeight=y-start;y+=34;
  }
  if(card.rows?.length){
   const labelWidth=220;
   rect(pad,y,inner,62,'#ecebea');
   text('항목',pad+20,y+13,labelWidth-40,25,800);
   text('내용',pad+labelWidth+24,y+13,inner-labelWidth-48,25,800);
   y+=62;
   for(const row of card.rows){
    const start=y;line(pad,start,inner);
    const labelEnd=text(row.label,pad+20,start+22,labelWidth-40,29,800,'#7f1220');
    let mainEnd=text(row.value,pad+labelWidth+24,start+22,inner-labelWidth-48,29,600);
    if(row.detail)mainEnd=text(row.detail,pad+labelWidth+24,mainEnd+12,inner-labelWidth-48,25,400,'#57565a');
    y=Math.max(labelEnd,mainEnd)+24;
    rect(pad+labelWidth,start,1,y-start,'#d0cecc');
   }
   line(pad,y,inner);y+=36;
  }
  y=Math.max(y,1320);
  line(pad,y,inner);y+=24;
  const footer=`${card.source} · ${card.sourceWeek||card.sourceDate}`;
  y=text(footer,pad,y,inner-230,23,500,'#6b696b');
  text('MARKET LEDGER',width-pad-220,y-36,220,21,700,'#6b696b');
  const height=Math.ceil(y+pad);
  // Fail explicitly instead of silently exporting a truncated/blank tall card.
  if(height>14000)throw new Error('카드 내용이 너무 길어 PNG로 저장할 수 없습니다.');
  canvas.width=width;canvas.height=height;
  ctx.fillStyle='#fff';ctx.fillRect(0,0,width,height);
  for(const draw of commands)draw();
  return canvas;
 }
 async function png(card,options){
  const canvas=await render(card,options);
  try{return await new Promise((resolve,reject)=>canvas.toBlob(value=>value?resolve(value):reject(new Error('PNG 생성에 실패했습니다.')),'image/png'));}
  finally{canvas.width=canvas.height=1;}
 }
 function save(blob,name){
  const url=URL.createObjectURL(blob),anchor=document.createElement('a');
  anchor.href=url;anchor.download=name;
  document.body.appendChild(anchor);anchor.click();anchor.remove();
  setTimeout(()=>URL.revokeObjectURL(url),60000);
 }
 async function download(card,options){save(await png(card,options),filename(options.kind,options.key,options.page));}
 const crcTable=Array.from({length:256},(_,i)=>{let crc=i;for(let bit=0;bit<8;bit++)crc=(crc&1)?0xedb88320^(crc>>>1):crc>>>1;return crc>>>0;});
 function crc32(data){let crc=0xffffffff;for(const byte of data)crc=crcTable[(crc^byte)&255]^(crc>>>8);return (crc^0xffffffff)>>>0;}
 // PNG is already compressed. Standard ZIP STORE avoids a new library and recompression.
 function zip(entries){
  if(entries.length>65535)throw new Error('저장할 이미지가 너무 많습니다.');
  const parts=[],directory=[];let offset=0,directorySize=0;
  for(const entry of entries){
   const name=new TextEncoder().encode(entry.name),size=entry.data.length,crc=crc32(entry.data);
   if(offset+size+name.length+30>0xffffffff)throw new Error('ZIP 파일 크기 제한을 초과했습니다.');
   const local=new Uint8Array(30),l=new DataView(local.buffer);
   l.setUint32(0,0x04034b50,true);l.setUint16(4,20,true);l.setUint16(6,0x800,true);l.setUint16(12,33,true);
   l.setUint32(14,crc,true);l.setUint32(18,size,true);l.setUint32(22,size,true);l.setUint16(26,name.length,true);
   const central=new Uint8Array(46),c=new DataView(central.buffer);
   c.setUint32(0,0x02014b50,true);c.setUint16(4,20,true);c.setUint16(6,20,true);c.setUint16(8,0x800,true);c.setUint16(14,33,true);
   c.setUint32(16,crc,true);c.setUint32(20,size,true);c.setUint32(24,size,true);c.setUint16(28,name.length,true);c.setUint32(42,offset,true);
   parts.push(local,name,entry.data);directory.push(central,name);
   offset+=30+name.length+size;directorySize+=46+name.length;
  }
  const end=new Uint8Array(22),e=new DataView(end.buffer);
  e.setUint32(0,0x06054b50,true);e.setUint16(8,entries.length,true);e.setUint16(10,entries.length,true);
  e.setUint32(12,directorySize,true);e.setUint32(16,offset,true);
  return new Blob([...parts,...directory,end],{type:'application/zip'});
 }
 async function downloadAll(cards,options,onProgress=()=>{}){
  if(!cards?.length)throw new Error('저장할 카드가 없습니다.');
  const entries=[];
  for(let page=0;page<cards.length;page++){
   const blob=await png(cards[page],{page,total:cards.length});
   entries.push({name:filename(options.kind,options.key,page),data:new Uint8Array(await blob.arrayBuffer())});
   onProgress(page+1,cards.length);
   await new Promise(resolve=>setTimeout(resolve,0));
  }
  save(zip(entries),filename(options.kind,options.key,0).replace(/-01\.png$/,'.zip'));
 }
 window.CardNewsExport={download,downloadAll,render,filename,zip};
})();
