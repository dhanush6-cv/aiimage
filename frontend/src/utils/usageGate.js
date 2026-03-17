const KEY = "ai_tool_usage_count"

export function checkUsage(){

let count = localStorage.getItem(KEY)

if(!count){

localStorage.setItem(KEY,"1")
return true

}

count = parseInt(count)

if(count < 1){

localStorage.setItem(KEY,String(count + 1))
return true

}

return false

}

export function resetUsage(){

localStorage.removeItem(KEY)

}