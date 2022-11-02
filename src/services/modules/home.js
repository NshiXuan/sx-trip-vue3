import sxRequest from '../request'

export function getHomeHotSuggests() {
  return sxRequest.get({
    url: '/home/hotSuggests'
  })
}

export function getHomeCategories() {
  return sxRequest.get({
    url: '/home/categories'
  })
}

export function getHomeHouselist(currentPage = 1) {
  return sxRequest.get({
    url: "/home/houselist",
    params: {
      page: currentPage
    }
  })
}