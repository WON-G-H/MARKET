const fs=require('fs');
const path=require('path');
const root=path.resolve(__dirname,'..');
global.window={};
for(const file of ['content.js','updates-20260903.js','updates-20260904.js','updates-20260904-revised.js'])require(path.join(root,'data',file));
const source=window.RESEARCH_DATA;
const write=(relative,body)=>{const target=path.join(root,relative);fs.mkdirSync(path.dirname(target),{recursive:true});fs.writeFileSync(target,body,'utf8');};
const js=(value)=>JSON.stringify(value,null,2);
const header=`/* Market Ledger data module · generated from the verified latest state on 2026-09-04. */\nwindow.MARKET_LEDGER=window.MARKET_LEDGER||{};\n`;
const numberValue=value=>{if(typeof value==='number')return value;if(typeof value!=='string')return null;const m=value.replaceAll(',','').match(/-?\d+(?:\.\d+)?/);return m?Number(m[0]):null;};
const dashboard=structuredClone(source.dashboard);
dashboard.primaryMetrics=dashboard.primaryMetrics.map(item=>({...item,numericCurrent:numberValue(item.current),numericPrevious:numberValue(item.previous),sourceMeta:{name:item.source,url:item.sourceUrl,type:item.source?.includes('거래소')?'exchange':item.source?.includes('협회')?'official':'market-data',accessedAt:'2026-09-04'},verified:!String(item.asOf||'').includes('확인 필요'),verificationNote:item.note||''}));
write('data/core.js',header+`window.MARKET_LEDGER.core=${js({schemaVersion:1,siteName:'Market Ledger',dashboardDate:'2026-09-04',lastUpdatedAt:'2026-09-04 22:10 KST',dashboard})};\n`);
write('data/macro.js',header+`window.MARKET_LEDGER.macro=${js({asOf:'2026-09-04',current:source.macro,createdAt:'2026-09-04',updatedAt:'2026-09-04',verified:true,verificationNote:'BLS·ISM 공식 자료와 시장 종가 자료를 우선 사용'})};\n`);
write('data/korea.js',header+`window.MARKET_LEDGER.korea=${js({asOf:'2026-09-04',current:source.korea,createdAt:'2026-09-04',updatedAt:'2026-09-04',verified:true,verificationNote:'KRX 정규시장 집계 기반'})};\n`);
write('data/ideas.js',header+`window.MARKET_LEDGER.ideas=${js({items:source.ideas,updatedAt:'2026-09-04',statusValues:['채택','검증 중','폐기'],sourceTypeValues:['official','exchange','company','broker','news','expert','community']})};\n`);
write('data/portfolio.js',header+`window.MARKET_LEDGER.portfolio=${js({decisions:source.decisions||[],updatedAt:'2026-09-04',privacy:'private-ready'})};\n`);
const daily={};for(const raw of source.daily){const report=structuredClone(raw);report.report=(report.report||[]).filter(section=>Number(section.no)<8);report.createdAt=report.createdAt||`${report.date} 18:00 KST`;report.updatedAt=report.date==='2026-09-04'?'2026-09-04 22:10 KST':report.createdAt;report.revisionNote=report.date==='2026-09-04'?'수집 자료 재검증 후 미국 금융여건·공급측 물가·국내 수급의 인과관계를 중심으로 전면 개정':'';const month=report.date.slice(0,7);(daily[month]??=[]).push(report);}
for(const [month,reports] of Object.entries(daily)){const addenda=Object.fromEntries(Object.entries(source.dailyAddenda||{}).filter(([date])=>date.startsWith(month)));write(`data/daily/daily-${month}.js`,header+`window.MARKET_LEDGER.daily=window.MARKET_LEDGER.daily||{};\nwindow.MARKET_LEDGER.dailyAddenda=window.MARKET_LEDGER.dailyAddenda||{};\nwindow.MARKET_LEDGER.daily[${JSON.stringify(month)}]=${js(reports)};\nObject.assign(window.MARKET_LEDGER.dailyAddenda,${js(addenda)});\n`);}
const weeklyByYear={};for(const report of source.weekly||[]){const year=String(report.week||report.period||'2026').slice(0,4);(weeklyByYear[year]??=[]).push(report);}if(!weeklyByYear['2026'])weeklyByYear['2026']=[];
for(const [year,reports] of Object.entries(weeklyByYear))write(`data/weekly/weekly-${year}.js`,header+`window.MARKET_LEDGER.weekly=window.MARKET_LEDGER.weekly||{};\nwindow.MARKET_LEDGER.weekly[${JSON.stringify(year)}]=${js(reports)};\n`);
const calendarByMonth={};for(const event of source.calendar.events||[]){const month=event.date.slice(0,7);(calendarByMonth[month]??=[]).push(event);}
for(const [month,events] of Object.entries(calendarByMonth))write(`data/calendar/calendar-${month}.js`,header+`window.MARKET_LEDGER.calendar=window.MARKET_LEDGER.calendar||{};\nwindow.MARKET_LEDGER.calendar[${JSON.stringify(month)}]=${js(events)};\n`);
console.log(JSON.stringify({daily:Object.fromEntries(Object.entries(daily).map(([k,v])=>[k,v.length])),weekly:Object.fromEntries(Object.entries(weeklyByYear).map(([k,v])=>[k,v.length])),calendar:Object.fromEntries(Object.entries(calendarByMonth).map(([k,v])=>[k,v.length])),ideas:source.ideas.length,decisions:(source.decisions||[]).length},null,2));
