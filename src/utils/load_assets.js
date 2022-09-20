export const getAssetURL = (image) => {
  // 参数一：相对路径
  // 参数二：import.meta.url可以拿到当前文件路径
  // 从当前文件拿到图片后会生成图片的绝对路径
  // console.log('ok', new URL(`../assets/img/${image}`, import.meta.url).href);
  return new URL(`../assets/img/${image}`, import.meta.url).href
}