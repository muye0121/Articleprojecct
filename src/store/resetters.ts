const resetters:(()=>void)[]=[]
export default resetters
export const resetAllstore=()=>resetters.forEach(fn=>fn())