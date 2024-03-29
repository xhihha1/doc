# vue3 + pinia 輸出物件為 proxy  

pinia 做為 vuex替代時，state輸出給其他元件使用時，state物件會是proxy。  
一般 vue proxy物件可以用 `toRaw` 轉換，但是 pinia物件使用 roRaw只換不會成功。  
改使用   

    JSON.parse(JSON.stringify(XXXX))

# vue3 proxy 物件使用 toRaw 轉換  